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

export function atualizarOfensiva(usuarioData, estaCadastrandoAtividade) {
    const dataUltimaAtividade = usuarioData.ultimaAtividade ? new Date(usuarioData.ultimaAtividade) : null;
    const dataAtual = new Date();

    let novaOfensiva = usuarioData.ofensiva || 0;
    let novaMaiorOfensiva = usuarioData.maiorOfensiva || 0;

    if (dataUltimaAtividade) {
        const ultimaAtividadeMs = dataUltimaAtividade.getTime();
        const dataAtualMs = dataAtual.getTime();
        const diferencaMs = dataAtualMs - ultimaAtividadeMs;
        const diffDias = diferencaMs / (1000 * 60 * 60 * 24);

        if (diffDias === 1 && estaCadastrandoAtividade == true) {
            novaOfensiva += 1;
        } else if (diffDias > 1) {
            novaOfensiva = 0; 
        }

        if (novaOfensiva > novaMaiorOfensiva) {
            novaMaiorOfensiva = novaOfensiva;
        }
    } else {
        novaOfensiva = estaCadastrandoAtividade ? 1 : 0;  
    }

    return { novaOfensiva, novaMaiorOfensiva };
}

