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

export function atualizarOfensiva(usuarioData, dataAtual) {
    const dataUltimaAtividade = usuarioData.ultimaAtividade;
    let novaOfensiva = usuarioData.ofensiva;
    let novaMaiorOfensiva = usuarioData.maiorOfensiva;

    if (dataUltimaAtividade) {
        const ultimaData = new Date(dataUltimaAtividade.split('/').reverse().join('-'));
        const diffDias = Math.floor((dataAtual - ultimaData) / (1000 * 60 * 60 * 24));

        if (diffDias === 1) {
            novaOfensiva += 1;
        } else if (diffDias > 1) {
            novaOfensiva = 0; // reinicia a ofensiva
        }

        if (novaOfensiva > novaMaiorOfensiva) {
            novaMaiorOfensiva = novaOfensiva;
        }
    } else {
        novaOfensiva = 0; 
    }

    return { novaOfensiva, novaMaiorOfensiva };
}