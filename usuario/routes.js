import express from "express";
import { UsuarioController } from "./controller.js";
import { authenticateToken } from '../middlewares/autenticate-jwt.js';
import { validarAtualizarUsuario, validarCadastroUsuario } from '../middlewares/validation.js';

const app = express();
const usuarioController = new UsuarioController();

app.post('/cadastrar', validarCadastroUsuario, (req, res) => {
    usuarioController.cadastrarUsuario(req, res);
});

app.post('/autenticarToken', authenticateToken, (req, res) => {
    res.status(200).send({ message: 'Usuário autenticado com sucesso!', usuario: req.usuario });
});

app.get('/mostrar', (req, res) => {
    usuarioController.mostrarUsuario(req, res);
})

app.patch('/atualizar', validarAtualizarUsuario, (req, res) => {
    usuarioController.atualizarUsuario(req, res);
})

export const usuarioRouter = app;
