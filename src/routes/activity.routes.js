// importações
import express from "express";
import { AtividadeController } from "../controllers/ActivityController.js";
import { validarAtualizarAtividade, validarCadastroAtividade } from "../middlewares/ValidateActivity.js";
import { validarEmailUsuario } from "../middlewares/ValidateUser.js";

// criando a aplicação express
const app = express();

// chamando o controller
const atividadeController = new AtividadeController();

// rotas
app.post('/cadastrar', validarCadastroAtividade, (req, res) => {
    atividadeController.cadastrarAtividade(req, res);
});

app.post("/mostrar", validarEmailUsuario, (req, res) => {
    atividadeController.mostrarAtividades(req, res);
});

app.patch('/atualizar', validarAtualizarAtividade, (req, res) => {
    atividadeController.atualizarAtividade(req, res);
})

// exportando as rotas
export const atividadeRouter = app;
