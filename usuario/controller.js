import { Usuario } from "./model.js";

export class UsuarioController {
    cadastrarUsuario(request, response) {
        // pegando as informações necessarias do corpo da requisicao
        const { email, nome, nomeUsuario, senha } = request.body;

        // criando o objeto
        const usuario = new Usuario();
        usuario.email = email;
        usuario.nome = nome;
        usuario.nomeUsuario = nomeUsuario;
        usuario.senha = senha;

        usuario.cadastrarUsuario()
            .then(() => {
                response.status(201).send({ message: 'Usuário cadastrado com sucesso!'});
            })
            .catch(error => {
                response.status(500).json({ message: error.message});
            });
    }
}
