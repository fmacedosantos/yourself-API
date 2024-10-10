import { AtividadeRepository } from "../repositories/ActivityRepository.js"

export class Atividade {

    // atributos
    id
    email
    titulo
    descricao = ""
    dificuldade
    categoria
    pontos
    tempoConcentracao
    data 

    #repository

    // criando acesso à camada que controla o banco
    constructor(){
        this.#repository = new AtividadeRepository();
    }

    // métodos
    cadastrarAtividade(){
        return this.#repository.cadastrarAtividade(this.titulo, this.descricao, this.categoria, this.dificuldade, this.tempoConcentracao, this.email);
    }

    mostrarAtividades(){
        return this.#repository.mostrarAtividades(this.email);
    }

    atualizarAtividade(){
        return this.#repository.atualizarAtividade(this.id, this.titulo, this.descricao, this.categoria)
    }
}
