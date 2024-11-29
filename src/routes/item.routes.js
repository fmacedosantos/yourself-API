const express = require("express");
const  ItemController  = require("../controllers/ItemController.js");
const { validarAtualizarItem, validarCadastroItem, validarCompraItem, validarIdItem } = require("../middlewares/ValidateItem.js");
const { validarEmailUsuario } = require("../middlewares/ValidateUser.js");
const  autenticarJWT = require("../middlewares/AuthenticateJWT.js");

const app = express();

const itemController = new ItemController();

app.post('/cadastrar', validarCadastroItem, (req, res) => {
    itemController.cadastrarItem(req, res);
});

app.post('/comprar', autenticarJWT, validarCompraItem, (req, res) => {
    itemController.comprarItem(req, res);
});

app.get('/mostrar', autenticarJWT, validarEmailUsuario, (req, res) => {
    itemController.mostrarItens(req, res);
});

app.get('/mostrar-todos', autenticarJWT, (req, res) => {
    itemController.mostrarTodosItens(req, res);
})

app.patch('/atualizar', validarAtualizarItem, (req, res) => {
    itemController.atualizarItem(req, res);
})

app.delete('/deletar', validarIdItem, (req, res) => {
    itemController.deletarItem(req, res);
})

module.exports = app;