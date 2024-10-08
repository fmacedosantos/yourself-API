// importações
import express from "express";
import { AtividadeController } from "../controllers/ActivityController.js";
import { validarCadastroAtividade, validarEmailUsuario } from '../validations/validateRoutes.js';

// criando a aplicação express
const app = express();

// chamando o controller
const atividadeController = new AtividadeController();

// rotas
app.post('/cadastrar', validarCadastroAtividade, (req, res) => {
    atividadeController.registrarAtividade(req, res);
});

app.patch('/atualizar', (req, res) => {
    atividadeController.atualizarAtividade(req, res);
})

// exportando as rotas
export const atividadeRouter = app;
