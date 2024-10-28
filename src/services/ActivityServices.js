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
    return tempoConcentracao * dificuldadeFormatada;
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
    let dataUltimaAtividade = null;

    if (dataUltimaAtividadeTeste) {
        // Tenta usar a data de teste no formato brasileiro
        dataUltimaAtividade = parseDateBR(dataUltimaAtividadeTeste);
    } else if (usuarioData.ultimaAtividade) {
        // Verifica o tipo de data retornada pelo Firestore
        if (typeof usuarioData.ultimaAtividade === 'string') {
            if (usuarioData.ultimaAtividade.includes('-')) {
                // Tenta tratar como string ISO (YYYY-MM-DD)
                dataUltimaAtividade = new Date(usuarioData.ultimaAtividade);
            } else {
                // Trata como data no formato brasileiro
                dataUltimaAtividade = parseDateBR(usuarioData.ultimaAtividade);
            }
        } else if (usuarioData.ultimaAtividade.toDate) {
            // Caso seja um objeto Firestore Timestamp, converte para Date
            dataUltimaAtividade = usuarioData.ultimaAtividade.toDate();
        } else {
            dataUltimaAtividade = new Date(usuarioData.ultimaAtividade);
        }
    }

    // Validação da data
    if (!isValidDate(dataUltimaAtividade)) {
        console.error('Data inválida:', dataUltimaAtividade);
        return { novaOfensiva: usuarioData.ofensiva || 0, novaMaiorOfensiva: usuarioData.maiorOfensiva || 0 };
    }

    const dataAtual = new Date();
    const dataUltimaAtividadeNormalizada = new Date(dataUltimaAtividade.getFullYear(), dataUltimaAtividade.getMonth(), dataUltimaAtividade.getDate());
    const dataAtualNormalizada = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate());

    const diferencaMs = dataAtualNormalizada - dataUltimaAtividadeNormalizada;
    const diffDias = diferencaMs / (1000 * 60 * 60 * 24);

    let novaOfensiva = usuarioData.ofensiva || 0;
    let novaMaiorOfensiva = usuarioData.maiorOfensiva || 0;

    if (diffDias === 1 && estaCadastrandoAtividade) {
        novaOfensiva += 1;
    } else if (diffDias > 1 && estaCadastrandoAtividade) {
        novaOfensiva = 1; 
    } else if (diffDias > 1) {
        novaOfensiva = 0; 
    }

    if (novaOfensiva > novaMaiorOfensiva) {
        novaMaiorOfensiva = novaOfensiva;
    }

    return { novaOfensiva, novaMaiorOfensiva };
}


