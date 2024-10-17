import express from "express";
import { ItemController } from "../controllers/ItemController.js";

const app = express();

const itemController = new ItemController();

app.post('/cadastrar', (req, res) => {
    itemController.cadastrarItem(req, res);
})

export const itemRouter = app;