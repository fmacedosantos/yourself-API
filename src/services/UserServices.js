import admin from '../../firebase.js';
import { COLECAO } from '../constants/Collections.js';

const db = admin.firestore();

export async function usuarioInexistente(email) {
    const usuarioRef = db.collection(COLECAO.USUARIO).doc(email);
    const usuarioSnapshot = await usuarioRef.get();
    return !usuarioSnapshot.exists;  
}

export async function apelidoExistente(apelido) {
    if (apelido !== null) {
        const snapshot = await db.collection(COLECAO.USUARIO)
            .where("apelido", "==", apelido).get();

        return !snapshot.empty;  
    }
    return false;
}
