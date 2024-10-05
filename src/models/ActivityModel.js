import { AtividadeRepository } from "../repositories/ActivityRepository.js"

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

    // criando acesso à camada que controla o banco
    constructor(){
        this.#repository = new AtividadeRepository()
    }

    // métodos
    registrarAtividade(){
        return this.#repository.registrarAtividade(this.titulo, this.descricao, this.categoria, this.dificuldade, this.tempoConcentracao, this.emailUsuario);
    }
}
