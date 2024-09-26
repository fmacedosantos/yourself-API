import { AtividadeRepository } from "./repository.js"

export class Atividade {

    // atributos
    emailUsuario
    titulo
    descricao = ""
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
        return this.#repository.registrarAtividade(this.titulo, this.descricao, this.categoria, this.dificuldade, this.tempoConcentracao, this.emailUsuario);
    }
}
