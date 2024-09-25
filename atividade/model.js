import { AtividadeRepository } from "./repository.js"

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

    constructor(){
        this.#repository = new AtividadeRepository()
    }

    registrarAtividade(){
        if (!this.titulo || !this.categoria || !this.dificuldade || !this.pontos || !this.tempoConcentracao) {
            return Promise.reject({
                code: 500,
                message: "Informações necessárias não informadas!"
            })
        }

        return this.#repository.registrarAtividade(this.titulo, this.descricao, this.categoria, this.tempoConcentracao)
    }


}