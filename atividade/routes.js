import express from "express";
import { AtividadeController } from "./controller.js";

const app = express();
const atividadeController = new AtividadeController()

app.post('/cadastrar', (req, res) => {
    atividadeController.registrarAtividade(req, res)
})

export const atividadeRouter = app