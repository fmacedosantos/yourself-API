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
}
