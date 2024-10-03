import express from "express";
import { UsuarioController } from "../controllers/UserController.js";
import { authenticateToken } from '../validations/middlewares/autenticate-jwt.js';
import { validarAtualizarUsuario, validarCadastroUsuario, validarEmailUsuario } from "../validations/validateRoutes.js";

const app = express();
const usuarioController = new UsuarioController();

app.post('/cadastrar', validarCadastroUsuario, (req, res) => {
    usuarioController.cadastrarUsuario(req, res);
});

app.post('/autenticarToken', authenticateToken, (req, res) => {
    res.status(200).send({ message: 'Usuário autenticado com sucesso!', usuario: req.usuario });
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

app.get('/mostrarAtividades', validarEmailUsuario, (req, res) => {
    usuarioController.mostrarAtividades(req, res);
})

export const usuarioRouter = app;
