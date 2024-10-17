import { ItemRepository } from "../repositories/ItemRepository"

export class Item {

    id
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
}