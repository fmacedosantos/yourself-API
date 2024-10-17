import admin from 'firebase-admin';
import { COLECAO } from '../constants/Collections';

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
}