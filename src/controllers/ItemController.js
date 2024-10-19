import { Item } from "../models/ItemModel.js";

export class ItemController {

    async cadastrarItem(req, res) {
        try {
            const { nome, preco, icone } = req.body;

            const item = new Item();

            item.nome = nome;
            item.preco = preco;
            item.icone = icone;

            await item.cadastrarItem();
            res.status(201).send({ message: "Item cadastrado com sucesso!" });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    async comprarItem(req, res) {
        try {
            const { id, email } = req.body;

            const item = new Item();

            item.id = id;
            item.email = email;

            await item.comprarItem();
            res.status(200).send({ message: "Item comprado com sucesso!" });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}