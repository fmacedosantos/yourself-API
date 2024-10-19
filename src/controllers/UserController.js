// importações
import { Usuario } from "../models/UserModel.js";

export class UsuarioController {

    async cadastrarUsuario(req, res) {
        try {
            // variáveis do body
            const { email, nome, apelido, senha } = req.body;

            // chamando o model
            const usuario = new Usuario();

            // atribuindo as variáveis ao model
            usuario.email = email;
            usuario.nome = nome;
            usuario.apelido = apelido;
            usuario.senha = senha;

            // chamando o método do repository
            await usuario.cadastrarUsuario();
            res.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async mostrarUsuario(req, res) {
        try {
            // variáveis do body
            const { email } = req.body;

            // chamando o model
            const usuario = new Usuario();

            // atribuindo as variáveis ao model
            usuario.email = email;

            // chamando o método do repository
            const dadosUsuario = await usuario.mostrarUsuario();
            res.status(200).send({ dadosUsuario });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async mostrarEstatisticas(req, res) {
        try {
            // variáveis do body
            const { email } = req.body;

            // chamando o model
            const usuario = new Usuario();

            // atribuindo as variáveis ao model
            usuario.email = email;

            // chamando o método do repository
            const dadosEstatisticas = await usuario.mostrarEstatisticas();
            res.status(200).send({ dadosEstatisticas });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async mostrarPreferencias(req, res) {
        try {
            // variáveis do body
            const { email } = req.body;

            // chamando o model
            const usuario = new Usuario();

            // atribuindo as variáveis ao model
            usuario.email = email;

            // chamando o método do repository
            const dadosPreferencias = await usuario.mostrarPreferencias();
            res.status(200).send({ dadosPreferencias });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async atualizarUsuario(req, res) {
        try {
            // variáveis do body
            const { email, nome, apelido, novaSenha } = req.body;
    
            // chamando o model
            const usuario = new Usuario();

            // atribuindo as variáveis ao model
            usuario.email = email;
            usuario.nome = nome;
            usuario.apelido = apelido;
            usuario.senha = novaSenha;
    
            // chamando o método do repository
            await usuario.atualizarUsuario();
    
            const usuarioAtualizado = await usuario.mostrarUsuario();
            res.status(200).send({ message: 'Usuário atualizado com sucesso!', usuarioAtualizado });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    async atualizarPreferencias(req, res) {
        try {
            const {email, preferenciaConcentracao, preferenciaDescanso } = req.body;

            const usuario = new Usuario();

            usuario.email = email;
            usuario.preferenciaConcentracao = preferenciaConcentracao;
            usuario.preferenciaDescanso = preferenciaDescanso;

            await usuario.atualizarPreferencias();

            const preferenciasAtualizadas = await usuario.mostrarPreferencias();
            res.status(200).send({ message: 'Preferências atualizadas com sucesso!', preferenciasAtualizadas });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deletarUsuario(req, res) {
        try {
            // variáveis do body
            const { email } = req.body;
    
            // chamando o model
            const usuario = new Usuario();

            // atribuindo as variáveis ao model
            usuario.email = email;
    
            // chamando o método do repository
            await usuario.deletarUsuario();
            res.status(200).send({ message: 'Usuário deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
}
