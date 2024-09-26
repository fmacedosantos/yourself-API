import express from "express";
import { AtividadeController } from "./controller.js";
import { validarCadastroAtividade } from '../middlewares/validation.js';

const app = express();
const atividadeController = new AtividadeController();

app.post('/cadastrar', validarCadastroAtividade, (req, res) => {
    atividadeController.registrarAtividade(req, res);
});

export const atividadeRouter = app;
