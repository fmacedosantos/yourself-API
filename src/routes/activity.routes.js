// importações
import express from "express";
import { AtividadeController } from "../controllers/ActivityController.js";
import { validarCadastroAtividade } from '../validations/validateRoutes.js';

// criando a aplicação express
const app = express();

// chamando o controller
const atividadeController = new AtividadeController();

// rotas
app.post('/cadastrar', validarCadastroAtividade, (req, res) => {
    atividadeController.registrarAtividade(req, res);
});

// exportando as rotas
export const atividadeRouter = app;
