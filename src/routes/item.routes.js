import express from "express";
import { ItemController } from "../controllers/ItemController.js";
import { validarCadastroItem, validarCompraItem } from "../middlewares/ValidateItem.js";

const app = express();

const itemController = new ItemController();

app.post('/cadastrar', validarCadastroItem, (req, res) => {
    itemController.cadastrarItem(req, res);
})

app.post('/comprar', validarCompraItem, (req, res) => {
    itemController.comprarItem(req, res);
})

export const itemRouter = app;