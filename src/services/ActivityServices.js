import admin from '../../firebase.js';
import { COLECAO } from '../constants/Collections.js';

const db = admin.firestore();

export async function atividadeInexistente(id){
    const atividadeRef = db.collection(COLECAO.ATIVIDADE).doc(id);
    const atividadeSnapshot = await atividadeRef.get();
    
    return !atividadeSnapshot.exists
}

export function calcularPontos(tempoConcentracao, dificuldade) {
    let dificuldadeFormatada = 0;
    switch (dificuldade) {
        case 1:
            dificuldadeFormatada = 0.5;
            break;
        case 2:
            dificuldadeFormatada = 1;
            break;
        case 3:
            dificuldadeFormatada = 1.5;
            break;
    }
    return Math.floor(tempoConcentracao * dificuldadeFormatada);
}

function parseDateBR(dataString) {
    // Verifica se a data foi passada no formato brasileiro (DD/MM/YYYY)
    const [dia, mes, ano] = dataString.split('/').map(Number);
    return new Date(ano, mes - 1, dia);  // Mês no JS é 0-indexado
}

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

export function atualizarOfensiva(usuarioData, estaCadastrandoAtividade, dataUltimaAtividadeTeste = null) {
    // Se for a primeira atividade do usuário (usuário novo)
    if (!usuarioData.ultimaAtividade && estaCadastrandoAtividade) {
        return {
            novaOfensiva: 1, // Começa com 1 já que é a primeira atividade
            novaMaiorOfensiva: 1
        };
    }

    let dataUltimaAtividade = null;

    if (dataUltimaAtividadeTeste) {
        dataUltimaAtividade = parseDateBR(dataUltimaAtividadeTeste);
    } else if (usuarioData.ultimaAtividade) {
        if (typeof usuarioData.ultimaAtividade === 'string') {
            if (usuarioData.ultimaAtividade.includes('-')) {
                dataUltimaAtividade = new Date(usuarioData.ultimaAtividade);
            } else {
                dataUltimaAtividade = parseDateBR(usuarioData.ultimaAtividade);
            }
        } else if (usuarioData.ultimaAtividade.toDate) {
            dataUltimaAtividade = usuarioData.ultimaAtividade.toDate();
        } else {
            dataUltimaAtividade = new Date(usuarioData.ultimaAtividade);
        }
    }

    // Se ainda não tem última atividade e não está cadastrando
    if (!dataUltimaAtividade && !estaCadastrandoAtividade) {
        return {
            novaOfensiva: usuarioData.ofensiva || 0,
            novaMaiorOfensiva: usuarioData.maiorOfensiva || 0
        };
    }

    // Se está cadastrando a primeira atividade, use a data atual
    if (!dataUltimaAtividade && estaCadastrandoAtividade) {
        dataUltimaAtividade = new Date();
    }

    const dataAtual = new Date();
    const dataUltimaAtividadeNormalizada = new Date(
        dataUltimaAtividade.getFullYear(),
        dataUltimaAtividade.getMonth(),
        dataUltimaAtividade.getDate()
    );
    const dataAtualNormalizada = new Date(
        dataAtual.getFullYear(),
        dataAtual.getMonth(),
        dataAtual.getDate()
    );

    const diferencaMs = dataAtualNormalizada - dataUltimaAtividadeNormalizada;
    const diffDias = diferencaMs / (1000 * 60 * 60 * 24);

    let novaOfensiva = usuarioData.ofensiva || 0;
    let novaMaiorOfensiva = usuarioData.maiorOfensiva || 0;

    if (estaCadastrandoAtividade) {
        if (diffDias === 0) { // Mesma data
            novaOfensiva = novaOfensiva || 1; // Mantém a ofensiva ou inicia com 1
        } else if (diffDias === 1) { // Dia consecutivo
            novaOfensiva += 1;
        } else { // Mais de um dia ou primeira atividade
            novaOfensiva = 1;
        }
    } else if (diffDias > 1) {
        novaOfensiva = 0;
    }

    if (novaOfensiva > novaMaiorOfensiva) {
        novaMaiorOfensiva = novaOfensiva;
    }

    return { novaOfensiva, novaMaiorOfensiva };
}


