const  ItemRepository  = require("../repositories/ItemRepository.js");

class Item {

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

    mostrarItens() {
        return this.#repository.mostrarItens(this.email);
    }

    mostrarTodosItens() {
        return this.#repository.mostrarTodosItens();
    }

    atualizarItem() {
        return this.#repository.atualizarItem(this.id, this.nome, this.preco, this.icone);
    }

    deletarItem() {
        return this.#repository.deletarItem(this.id);
    }
    
}

module.exports = Item;