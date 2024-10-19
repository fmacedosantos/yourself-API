import admin from '../../firebase.js';
import { COLECAO } from '../constants/Collections.js';

const db = admin.firestore();

export async function itemInexistente(id){
    const itemRef = db.collection(COLECAO.ITEM).doc(id);
    const itemSnapshot = await itemRef.get();
    
    return !itemSnapshot.exists
}

export async function itemPossuido(id, email) {
    const usuarioRef = db.collection(COLECAO.USUARIO).doc(email);
    const usuarioSnapshot = await usuarioRef.get();
    const usuarioData = usuarioSnapshot.data();

    return usuarioData.itens.includes(id);
}

export async function pontosInsuficientes(id, email) {
    const itemRef = db.collection(COLECAO.ITEM).doc(id);
    const itemDoc = await itemRef.get();
    const usuarioRef = db.collection(COLECAO.USUARIO).doc(email);
    const usuarioDoc = await usuarioRef.get();

    const pontosUsuario = usuarioDoc.get("pontos");
    const precoItem = itemDoc.get("preco");

    return precoItem > pontosUsuario
}