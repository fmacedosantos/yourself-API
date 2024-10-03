import { AtividadeRepository } from "../repositories/ActivityRepository.js";
import { UsuarioRepository } from "../repositories/UserRepository.js";

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

    mostrarUsuario() {
        return this.#repository.mostrarUsuario(this.email);
    }

    atualizarUsuario(){
        return this.#repository.atualizarUsuario(this.email, this.nome, this.nomeUsuario, this.senha);
    }

    deletarUsuario(){
        return this.#repository.deletarUsuario(this.email);
    }

    mostrarIdAtividades(){
        return this.#repository.mostrarIdAtividades(this.email);
    }

    async mostrarAtividades(){
        const atividadeRepository = new AtividadeRepository();

        const idsAtividades = await this.#repository.mostrarIdAtividades(this.email);

        if (idsAtividades.length === 0) {
            throw new Error("Usuário não possui atividades.");
        }

        const atividades = await atividadeRepository.buscarAtividadesPorIds(idsAtividades);
        return atividades;
    }
}
