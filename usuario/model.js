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
        if (!this.email || !this.nome || !this.nomeUsuario || !this.senha) {
            return Promise.reject({
                code: 500,
                message: "Informações necessárias não informadas!"
            });
        }

        return this.#repository.cadastrarUsuario(this.email, this.senha, this.nome, this.nomeUsuario);
    }
}
