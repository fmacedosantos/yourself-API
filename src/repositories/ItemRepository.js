import admin from 'firebase-admin';
import { COLECAO } from '../constants/Collections.js';

export class ItemRepository {

    db = admin.firestore();

    async cadastrarItem(nome, preco, icone) {

        const itemRef = this.db.collection(COLECAO.ITEM).doc();
        const id = itemRef.id;

        const item = {
            id,
            nome,
            preco, 
            icone
        };

        await this.db.collection(COLECAO.ITEM).doc(id).set(item);
        return id;
    }

    async comprarItem(id, email) {

        const itemRef = this.db.collection(COLECAO.ITEM).doc(id);
        const itemDoc = await itemRef.get();

        if (!itemDoc.exists) {
            return "Item não encontrado!"
        }

        const usuarioRef = this.db.collection(COLECAO.USUARIO).doc(email);
        const usuarioDoc = await usuarioRef.get();
    
        if (!usuarioDoc.exists) {
            return "Usuário não encontrado!";
        }

        const pontosUsuario = usuarioDoc.get("pontos");
        const precoItem = itemDoc.get("preco");

        if (precoItem > pontosUsuario) {
            return "Os pontos do usuário são insuficientes para comprar o item!";
        }

        const usuarioData = usuarioDoc.data();
        const novosPontos = usuarioData.pontos - precoItem;

        await usuarioRef.update({
            itens: admin.firestore.FieldValue.arrayUnion(id),
            pontos: novosPontos
        });
        return `O usuário de email ${email} adquiriu com sucesso o item de ID ${id}!`;
    }
}