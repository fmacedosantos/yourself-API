const express = require("express");
const  ItemController  = require("../controllers/ItemController.js");
const { validarAtualizarItem, validarCadastroItem, validarCompraItem, validarIdItem } = require("../middlewares/ValidateItem.js");
const { validarEmailUsuario } = require("../middlewares/ValidateUser.js");
const  autenticarJWT = require("../middlewares/AuthenticateJWT.js");

const router = express.Router();

const itemController = new ItemController();

router.post('/cadastrar', validarCadastroItem, (req, res) => {
    itemController.cadastrarItem(req, res);
});

router.post('/comprar', autenticarJWT, validarCompraItem, (req, res) => {
    itemController.comprarItem(req, res);
});

router.get('/mostrar', autenticarJWT, validarEmailUsuario, (req, res) => {
    itemController.mostrarItens(req, res);
});

router.get('/mostrar-todos', autenticarJWT, (req, res) => {
    itemController.mostrarTodosItens(req, res);
})

router.patch('/atualizar', validarAtualizarItem, (req, res) => {
    itemController.atualizarItem(req, res);
})

router.delete('/deletar', validarIdItem, (req, res) => {
    itemController.deletarItem(req, res);
})

module.exports = router;