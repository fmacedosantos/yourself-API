import express from "express";
import { AtividadeController } from "../controllers/ActivityController.js";
import { validarCadastroAtividade } from '../validations/validateRoutes.js';

const app = express();
const atividadeController = new AtividadeController();

app.post('/cadastrar', validarCadastroAtividade, (req, res) => {
    atividadeController.registrarAtividade(req, res);
});

export const atividadeRouter = app;
