// importações
import express from "express";
import { UsuarioController } from "../controllers/UserController.js";
import { authenticateToken } from '../validations/middlewares/autenticate-jwt.js';
import { validarAtualizarUsuario, validarCadastroUsuario, validarEmailUsuario } from "../validations/validateRoutes.js";

// criando a aplicação express
const app = express();

// chamando o controller
const usuarioController = new UsuarioController();

// rotas
app.post('/cadastrar', validarCadastroUsuario, (req, res) => {
    usuarioController.cadastrarUsuario(req, res);
});

app.get('/mostrar', validarEmailUsuario, (req, res) => {
    usuarioController.mostrarUsuario(req, res);
})

app.patch('/atualizar', validarAtualizarUsuario, (req, res) => {
    usuarioController.atualizarUsuario(req, res);
})

app.delete('/deletar', validarEmailUsuario, (req, res) => {
    usuarioController.deletarUsuario(req, res);
})

/*app.get('/mostrarAtividades', validarEmailUsuario, (req, res) => {
    usuarioController.mostrarAtividades(req, res);
})*/

app.post('/autenticarToken', authenticateToken, (req, res) => {
    res.status(200).send({ 
        message: 'Usuário autenticado com sucesso!', 
        usuario: req.usuario 
    });
});

// exportando as rotas
export const usuarioRouter = app;
