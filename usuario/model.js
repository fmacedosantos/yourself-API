import { UsuarioRepository } from "./repository.js";

export class Usuario {

    // atributos
    email;
    nomeUsuario;
    nome;
    senha;
    pontos = 0;  
    totalPontos = 0;
    ofensiva = 0;
    maiorOfensiva = 0;
    anoRegistro = new Date().getFullYear();
    preferenciaConcentracao = 25;
    preferenciaDescanso = 5;
    comprasItens = [];
    atividades = [];

    #repository;

    // criando acesso à camada que controla o banco
    constructor() {
        this.#repository = new UsuarioRepository();
    }

    cadastrarUsuario() {
        return this.#repository.cadastrarUsuario(this.email, this.senha, this.nome, this.nomeUsuario);
    }

    atualizarUsuario(){
        return this.#repository.atualizarUsuario(this.email, this.nome, this.nomeUsuario, this.senha)
    }
}
