import { ItemRepository } from "../repositories/ItemRepository.js"

export class Item {

    id
    email
    nome 
    preco
    icone

    #repository

    constructor() {
        this.#repository = new ItemRepository();
    }

    cadastrarItem() {
        return this.#repository.cadastrarItem(this.nome, this.preco, this.icone);
    }

    comprarItem() {
        return this.#repository.comprarItem(this.id, this.email);
    }
}