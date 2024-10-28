// importações
import express from "express";
import { UsuarioController } from "../controllers/UserController.js";
import { autenticarJWT } from '../middlewares/AuthenticateJWT.js';
import { validarAtualizarPreferencias, validarAtualizarUsuario, validarCadastroUsuario, validarEmailUsuario } from "../middlewares/ValidateUser.js";

// criando a aplicação express
const app = express();

// chamando o controller
const usuarioController = new UsuarioController();

// rotas
app.post('/cadastrar', validarCadastroUsuario, (req, res) => {
    usuarioController.cadastrarUsuario(req, res);
});

app.get('/mostrar', autenticarJWT, validarEmailUsuario, (req, res) => {
    usuarioController.mostrarUsuario(req, res);
});

app.get('/mostrar-estatisticas', autenticarJWT, validarEmailUsuario, (req, res) => {
    usuarioController.mostrarEstatisticas(req, res);
});

app.get('/mostrar-preferencias', autenticarJWT, validarEmailUsuario, (req, res) => {
    usuarioController.mostrarPreferencias(req, res);
});

app.patch('/atualizar', autenticarJWT, validarAtualizarUsuario, (req, res) => {
    usuarioController.atualizarUsuario(req, res);
});

app.patch('/atualizar-preferencias', autenticarJWT, validarAtualizarPreferencias, (req, res) => {
    usuarioController.atualizarPreferencias(req, res);
});

app.delete('/deletar', autenticarJWT, validarEmailUsuario, (req, res) => {
    usuarioController.deletarUsuario(req, res);
});

app.post('/autenticar-jwt', autenticarJWT, (req, res) => {
    res.status(200).send({ 
        message: 'Usuário autenticado com sucesso!', 
        usuario: req.usuario 
    });
});

// exportando as rotas
export const usuarioRouter = app;
