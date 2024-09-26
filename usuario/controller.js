import { Usuario } from "./model.js";

export class UsuarioController {
    async cadastrarUsuario(request, response) {
        try {
            const { email, nome, nomeUsuario, senha } = request.body;

            const usuario = new Usuario();
            usuario.email = email;
            usuario.nome = nome;
            usuario.nomeUsuario = nomeUsuario;
            usuario.senha = senha;

            await usuario.cadastrarUsuario();
            response.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}
