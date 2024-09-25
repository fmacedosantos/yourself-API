import express from "express";
import { UsuarioController } from "./controller.js";
import { authenticateToken } from '../middlewares/autenticate-jwt.js';

const app = express();
const usuarioController = new UsuarioController();

app.post('/cadastrar', (req, res) => {
    usuarioController.cadastrarUsuario(req, res);
});

app.post('/autenticarToken', authenticateToken, (req, res) => {
    res.status(200).send({ message: 'Usuário autenticado com sucesso!', usuario: req.usuario });
})

export const usuarioRouter = app;
