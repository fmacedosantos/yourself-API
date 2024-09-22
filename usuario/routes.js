import express from "express";
import { UsuarioController } from "./controller.js";

const app = express();
const usuarioController = new UsuarioController();

app.post('/cadastrar', (req, res) => {
    usuarioController.cadastrarUsuario(req, res);
});

export const usuarioRouter = app;
