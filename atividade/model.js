export class Atividade {

    // atributos
    id
    titulo
    descricao
    dificuldade
    categoria
    pontos
    tempoConcentracao
    data = () => {
        const dataAtual = new Date();
        const dataFormatada = dataAtual.toISOString().split('T')[0];
        return dataFormatada;
    }

    #repository

    registrarAtividade(){
        if (!this.titulo || !this.categoria || !this.dificuldade || !this.pontos || !this.tempoConcentracao) {
            return Promise.reject({
                code: 500,
                message: "Informações necessárias não informadas!"
            })
        }
    }


}