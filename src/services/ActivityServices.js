const admin = require('../../firebase.js');
const { COLECAO } = require('../constants/Collections.js');

const db = admin.firestore();

async function atividadeInexistente(id) {
    const atividadeRef = db.collection(COLECAO.ATIVIDADE).doc(id);
    const atividadeSnapshot = await atividadeRef.get();
    
    return !atividadeSnapshot.exists;
}

function calcularPontos(tempoConcentracao, dificuldade) {
    let dificuldadeFormatada = 0;
    switch (dificuldade) {
        case 1:
            dificuldadeFormatada = 1;
            break;
        case 2:
            dificuldadeFormatada = 2;
            break;
        case 3:
            dificuldadeFormatada = 3;
            break;
    }

    const pontos = Math.floor(tempoConcentracao * dificuldadeFormatada);
    if (pontos <= 450) {
        return pontos;
    } else {
        return 450;
    }
}

function normalizarData(data) {
    return new Date(
        data.getFullYear(),
        data.getMonth(),
        data.getDate()
    );
}

function parseDateBR(dataString) {
    const [dia, mes, ano] = dataString.split('/').map(Number);
    return new Date(ano, mes - 1, dia);
}

function atualizarOfensiva(usuarioData, estaCadastrandoAtividade, dataUltimaAtividadeTeste = null) {
    // Se não tem dados do usuário, retorna zeros
    if (!usuarioData) {
        return { novaOfensiva: 0, novaMaiorOfensiva: 0 };
    }

    let dataUltimaAtividade = null;
    const dataAtual = new Date();
    
    // Determinar a data da última atividade
    if (dataUltimaAtividadeTeste) {
        dataUltimaAtividade = parseDateBR(dataUltimaAtividadeTeste);
    } else if (usuarioData.ultimaAtividade) {
        if (typeof usuarioData.ultimaAtividade === 'string') {
            dataUltimaAtividade = usuarioData.ultimaAtividade.includes('-') 
                ? new Date(usuarioData.ultimaAtividade)
                : parseDateBR(usuarioData.ultimaAtividade);
        } else if (usuarioData.ultimaAtividade.toDate) {
            dataUltimaAtividade = usuarioData.ultimaAtividade.toDate();
        } else {
            dataUltimaAtividade = new Date(usuarioData.ultimaAtividade);
        }
    }

    // Valores iniciais
    let novaOfensiva = usuarioData.ofensiva || 0;
    let novaMaiorOfensiva = usuarioData.maiorOfensiva || 0;

    // Se está cadastrando atividade
    if (estaCadastrandoAtividade) {
        // Se é a primeira atividade do usuário
        if (!dataUltimaAtividade) {
            novaOfensiva = 1;
        } else {
            const dataUltimaNormalizada = normalizarData(dataUltimaAtividade);
            const dataAtualNormalizada = normalizarData(dataAtual);
            const diferencaDias = Math.floor(
                (dataAtualNormalizada - dataUltimaNormalizada) / (1000 * 60 * 60 * 24)
            );

            if (diferencaDias === 0) {
                // Mesma data, mantém a ofensiva atual
                novaOfensiva = novaOfensiva;
            } else if (diferencaDias === 1) {
                // Dia consecutivo, incrementa ofensiva
                novaOfensiva += 1;
            } else {
                // Quebrou a sequência, reinicia com 1
                novaOfensiva = 1;
            }
        }
    } else {
        // Não está cadastrando, apenas verificando estado atual
        if (dataUltimaAtividade) {
            const dataUltimaNormalizada = normalizarData(dataUltimaAtividade);
            const dataAtualNormalizada = normalizarData(dataAtual);
            const diferencaDias = Math.floor(
                (dataAtualNormalizada - dataUltimaNormalizada) / (1000 * 60 * 60 * 24)
            );

            // Se passou mais de um dia sem atividade, zera a ofensiva
            if (diferencaDias > 1) {
                novaOfensiva = 0;
            }
        } else {
            novaOfensiva = 0;
        }
    }

    // Atualiza maior ofensiva se necessário
    novaMaiorOfensiva = Math.max(novaOfensiva, novaMaiorOfensiva);

    return { novaOfensiva, novaMaiorOfensiva };
}

module.exports = {
    atividadeInexistente,
    calcularPontos,
    atualizarOfensiva,
    parseDateBR,
    normalizarData
}