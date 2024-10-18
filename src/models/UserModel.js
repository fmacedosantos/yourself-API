import { UsuarioRepository } from "../repositories/UserRepository.js";

export class Usuario {

    // atributos
    email;
    apelido;
    nome;
    senha;
    pontos = 0;  
    totalPontos = 0;
    ofensiva = 0;
    maiorOfensiva = 0;
    anoRegistro = new Date().getFullYear();
    preferenciaConcentracao = 25;
    preferenciaDescanso = 5;
    itens = [];
    atividades = [];
    ultimaAtividade = null;

    #repository;

    // criando acesso à camada que controla o banco
    constructor() {
        this.#repository = new UsuarioRepository();
    }

    // métodos
    cadastrarUsuario() {
        return this.#repository.cadastrarUsuario(this.email, this.senha, this.nome, this.apelido);
    }

    mostrarUsuario() {
        return this.#repository.mostrarUsuario(this.email);
    }

    mostrarEstatisticas() {
        return this.#repository.mostrarEstatisticas(this.email);
    }

    mostrarPreferencias() {
        return this.#repository.mostrarPreferencias(this.email);
    }

    atualizarUsuario(){
        return this.#repository.atualizarUsuario(this.email, this.nome, this.apelido, this.senha);
    }

    atualizarPreferencias() {
        return this.#repository.atualizarPreferencias(this.email, this.preferenciaConcentracao, this.preferenciaDescanso);
    }

    deletarUsuario(){
        return this.#repository.deletarUsuario(this.email);
    }

}
