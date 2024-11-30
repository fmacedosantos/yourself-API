const express = require("express");
const UsuarioController = require("../controllers/UserController.js");
const autenticarJWT = require("../middlewares/AuthenticateJWT.js");
const {
    validarAtualizarPreferencias,
    validarAtualizarUsuario,
    validarCadastroUsuario,
    validarEmailUsuario,
    validarAutenticarUsuario,
    validarReautenticarUsuario,
} = require("../middlewares/ValidateUser.js");

// Use Router em vez de app
const router = express.Router();
const usuarioController = new UsuarioController();

// Definição das rotas
router.post("/cadastrar", validarCadastroUsuario, (req, res) => {
    usuarioController.cadastrarUsuario(req, res);
});

router.post("/autenticar", validarAutenticarUsuario, (req, res) => {
    usuarioController.autenticarUsuario(req, res);
});

router.post("/reautenticar", autenticarJWT, validarReautenticarUsuario, (req, res) => {
    usuarioController.autenticarUsuarioJWT(req, res);
});

router.get("/mostrar", autenticarJWT, validarEmailUsuario, (req, res) => {
    usuarioController.mostrarUsuario(req, res);
});

router.get("/mostrar-estatisticas", autenticarJWT, validarEmailUsuario, (req, res) => {
    usuarioController.mostrarEstatisticas(req, res);
});

router.get("/mostrar-preferencias", autenticarJWT, validarEmailUsuario, (req, res) => {
    usuarioController.mostrarPreferencias(req, res);
});

router.patch("/atualizar", autenticarJWT, validarAtualizarUsuario, (req, res) => {
    usuarioController.atualizarUsuario(req, res);
});

router.patch("/atualizar-preferencias", autenticarJWT, validarAtualizarPreferencias, (req, res) => {
    usuarioController.atualizarPreferencias(req, res);
});

router.delete("/deletar", autenticarJWT, validarEmailUsuario, (req, res) => {
    usuarioController.deletarUsuario(req, res);
});

router.post("/autenticar-jwt", autenticarJWT, (req, res) => {
    res.status(200).send({
        success: true, 
        message: "Usuário autenticado com sucesso!",
        usuario: req.usuario
    });
});

// Exporta o roteador em vez de app
module.exports = router;
