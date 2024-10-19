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
        
    }

    async comprarItem(id, email) {

        const itemRef = this.db.collection(COLECAO.ITEM).doc(id);
        const itemDoc = await itemRef.get();

        const usuarioRef = this.db.collection(COLECAO.USUARIO).doc(email);
        const usuarioDoc = await usuarioRef.get();

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
        
    }
}