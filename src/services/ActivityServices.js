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
    const dataUltimaAtividade = usuarioData.ultimaAtividade;
    const dataAtual = new Date();

    const ultimaAtividadeMs = ultimaAtividade.getTime();
    const dataAtualMs = dataAtual.getTime();

    const diferencaMs = dataAtualMs - ultimaAtividadeMs;

    let novaOfensiva = usuarioData.ofensiva || 0;
    let novaMaiorOfensiva = usuarioData.maiorOfensiva || 0;

    if (dataUltimaAtividade) {
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
        novaOfensiva = 0 
    }

    return { novaOfensiva, novaMaiorOfensiva };
}
