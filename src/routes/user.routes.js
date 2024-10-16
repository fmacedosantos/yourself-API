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

app.get('/mostrar', validarEmailUsuario, (req, res) => {
    usuarioController.mostrarUsuario(req, res);
})

app.patch('/atualizar', validarAtualizarUsuario, (req, res) => {
    usuarioController.atualizarUsuario(req, res);
})

app.post('/atualizar-preferencias', validarAtualizarPreferencias, (req, res) => {
    usuarioController.atualizarPreferencias(req, res);
})

app.delete('/deletar', validarEmailUsuario, (req, res) => {
    usuarioController.deletarUsuario(req, res);
})

app.post('/mostrar-estatisticas', validarEmailUsuario, (req, res) => {
    usuarioController.mostrarEstatisticasUsuario(req, res);
})

app.post('/autenticar-jwt', autenticarJWT, (req, res) => {
    res.status(200).send({ 
        message: 'Usuário autenticado com sucesso!', 
        usuario: req.usuario 
    });
});

// exportando as rotas
export const usuarioRouter = app;
