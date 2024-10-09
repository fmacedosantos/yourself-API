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
    

    async deletarUsuario(req, res) {
        try {
            // variáveis do body
            const { email } = req.body;
    
            // chamando o model
            const usuario = new Usuario();

            // atribuindo as variáveis ao model
            usuario.email = email;
    
            // chamando o método do repository
            const deletado = await usuario.deletarUsuario();
    
            if (deletado) {
                res.status(200).send({ message: 'Usuário deletado com sucesso!' });
            } else {
                res.status(400).send({ message: 'Falha ao deletar usuário.' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /*async mostrarIdAtividades(req, res) {
        try {
            // variáveis do body
            const { email } = req.body;
    
            // chamando o model
            const usuario = new Usuario();

            // atribuindo as variáveis ao model
            usuario.email = email;

            // chamando o método do repository
            const idAtividadesUsuario = await usuario.mostrarIdAtividades();
            res.status(200).send({ idAtividadesUsuario });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async mostrarAtividades(req, res) {
        try {
            // variáveis do body
            const { email } = req.body;

            // chamando o model
            const usuario = new Usuario();

            // atribuindo as variáveis ao model
            usuario.email = email;
    
            // chamando o método do repository
            const dadosAtividades = await usuario.mostrarAtividades();
            res.status(200).send({ dadosAtividades });
        } catch (error) {
            if (error.message === "Usuário não possui atividades.") {
                res.status(404).send({ message: "O usuário não possui atividades cadastradas." });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }*/
}
