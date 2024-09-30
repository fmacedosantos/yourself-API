import { Usuario } from "./model.js";

export class UsuarioController {
    async cadastrarUsuario(req, res) {
        try {
            const { email, nome, nomeUsuario, senha } = req.body;

            const usuario = new Usuario();
            usuario.email = email;
            usuario.nome = nome;
            usuario.nomeUsuario = nomeUsuario;
            usuario.senha = senha;

            await usuario.cadastrarUsuario();
            res.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async mostrarUsuario(req, res) {
        try {
            const { email } = req.body;

            const usuario = new Usuario();
            usuario.email = email;

            const dadosUsuario = await usuario.mostrarUsuario();
            res.status(200).send({ dadosUsuario });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async atualizarUsuario(req, res) {
        try {
            const { email, nome, nomeUsuario, novaSenha } = req.body;

            const usuario = new Usuario();
            usuario.email = email;
            usuario.nome = nome;
            usuario.nomeUsuario = nomeUsuario;
            usuario.senha = novaSenha;

            await usuario.atualizarUsuario();
            res.status(200).send({ message: 'Usuário atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deletarUsuario(req, res) {
        try {
            const { email } = req.body;
    
            const usuario = new Usuario();
            usuario.email = email;
    
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

    async mostrarIdAtividades(req, res) {
        try {
            const { email } = req.body;
    
            const usuario = new Usuario();
            usuario.email = email;

            const idAtividadesUsuario = await usuario.mostrarIdAtividades();
            res.status(200).send({ idAtividadesUsuario });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async mostrarAtividades(req, res) {
        try {
            const { email } = req.body;

            const usuario = new Usuario();
            usuario.email = email;

            const dadosAtividades = await usuario.mostrarAtividades();
            res.status(200).send({ dadosAtividades })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
