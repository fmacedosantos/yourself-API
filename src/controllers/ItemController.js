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
            res.status(500).json({ message: error.message });
        }
    }

    async comprarItem(req, res) {
        try {
            const { id } = req.body;

            const email = req.usuario.email;

            const item = new Item();

            item.id = id;
            item.email = email;

            await item.comprarItem();
            res.status(200).send({ message: "Item comprado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async mostrarItens(req, res) {
        try {
            const email = req.usuario.email;

            const item = new Item();

            item.email = email;

            const dadosItens = await item.mostrarItens();
            res.status(200).send({ dadosItens });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async mostrarTodosItens(req, res) {
        try {
            const item = new Item();

            const dadosItens = await item.mostrarTodosItens()
            res.status(200).send({ dadosItens });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async atualizarItem(req, res) {
        try {
            const { id, nome, preco, icone } = req.body;

            const item = new Item();

            item.id = id;
            item.nome = nome;
            item.preco = preco;
            item.icone = icone;

            await item.atualizarItem();
            res.status(200).send({ message: 'Item atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deletarItem(req, res) {
        try {
            const { id } = req.body;

            const item = new Item();

            item.id = id;

            await item.deletarItem();
            res.status(200).send({ message: `O item foi excluído com sucesso!` })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}