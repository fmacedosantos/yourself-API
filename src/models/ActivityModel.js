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
    data = () => {
        const dataAtual = new Date();
        const dataFormatada = dataAtual.toISOString().split('T')[0];
        return dataFormatada;
    }

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
