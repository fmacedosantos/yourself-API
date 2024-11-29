// importações
const express = require("express");
const  AtividadeController  = require("../controllers/ActivityController.js");
const { validarAtualizarAtividade, validarCadastroAtividade, validarIdAtividade } = require("../middlewares/ValidateActivity.js");
const { validarEmailUsuario } = require("../middlewares/ValidateUser.js");
const  autenticarJWT  = require("../middlewares/AuthenticateJWT.js");

// criando a aplicação express
const app = express();

// chamando o controller
const atividadeController = new AtividadeController();

// rotas
app.post('/cadastrar', autenticarJWT, validarCadastroAtividade, (req, res) => {
    atividadeController.cadastrarAtividade(req, res);
});

app.get("/mostrar", autenticarJWT, validarEmailUsuario, (req, res) => {
    atividadeController.mostrarAtividades(req, res);
});

app.patch('/atualizar', validarAtualizarAtividade, (req, res) => {
    atividadeController.atualizarAtividade(req, res);
});

app.delete("/deletar", validarIdAtividade, (req, res) => {
    atividadeController.deletarAtividade(req, res);
});

// exportando as rotas
module.exports = app;
