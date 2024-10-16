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
    let novaOfensiva = usuarioData.ofensiva || 0;
    let novaMaiorOfensiva = usuarioData.maiorOfensiva || 0;

    if (dataUltimaAtividade) {
        // Corrigir a formatação da data de pt-BR para comparação correta
        const ultimaData = new Date(dataUltimaAtividade.split('/').reverse().join('-'));
        const dataAtualFormatada = new Date(dataAtual.toLocaleDateString('pt-BR').split('/').reverse().join('-'));

        // Diferença de dias entre a última atividade e a data atual
        const diffDias = Math.floor((dataAtualFormatada - ultimaData) / (1000 * 60 * 60 * 24));

        if (diffDias === 1) {
            novaOfensiva += 1;
        } else if (diffDias > 1) {
            novaOfensiva = 1; // Reinicia a ofensiva se mais de 1 dia passou, mas começa em 1 com nova atividade
        }

        if (novaOfensiva > novaMaiorOfensiva) {
            novaMaiorOfensiva = novaOfensiva;
        }
    } else {
        novaOfensiva = 1; // Primeira atividade registrada
    }

    return { novaOfensiva, novaMaiorOfensiva };
}
