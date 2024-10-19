import admin from '../../firebase.js';
import { COLECAO } from '../constants/Collections.js';

const db = admin.firestore();

export async function itemInexistente(id){
    const itemRef = db.collection(COLECAO.ITEM).doc(id);
    const itemSnapshot = await itemRef.get();
    return !itemSnapshot.exists
}