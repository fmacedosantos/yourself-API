// importações
import express from "express";
import { AtividadeController } from "../controllers/ActivityController.js";
import { validarAtualizarAtividade, validarCadastroAtividade, validarIdAtividade } from "../middlewares/ValidateActivity.js";
import { validarEmailUsuario } from "../middlewares/ValidateUser.js";

// criando a aplicação express
const app = express();

// chamando o controller
const atividadeController = new AtividadeController();

// rotas
app.post('/cadastrar', validarCadastroAtividade, (req, res) => {
    atividadeController.cadastrarAtividade(req, res);
});

app.get("/mostrar", validarEmailUsuario, (req, res) => {
    atividadeController.mostrarAtividades(req, res);
});

app.patch('/atualizar', validarAtualizarAtividade, (req, res) => {
    atividadeController.atualizarAtividade(req, res);
})

app.delete("/deletar", validarIdAtividade, (req, res) => {
    atividadeController.deletarAtividade(req, res);
})

// exportando as rotas
export const atividadeRouter = app;
