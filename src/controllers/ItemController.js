import { Item } from "../models/ItemModel.js";

export class ItemController {

    async cadastrarItem(req, res) {
        try {
            const { nome, preco, icone } = req.body;

            const item = new Item();

            item.nome = nome;
            item.preco = preco;
            item.icone = icone;

            const itemId = await item.cadastrarItem();
            res.status(201).send({ message: `Item de ID ${itemId} cadastrado com sucesso!` });
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

            const compra = await item.comprarItem();
            res.status(200).send({ message: compra });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}