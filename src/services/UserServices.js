const admin = require('../../firebase.js');
const COLECAO = require('../constants/Collections.js');

const db = admin.firestore();

async function usuarioInexistente(email) {
    const usuarioRef = db.collection(COLECAO.USUARIO).doc(email);
    const usuarioSnapshot = await usuarioRef.get();

    return !usuarioSnapshot.exists;  
}

async function apelidoExistente(apelido) {
    if (apelido !== null) {
        const snapshot = await db.collection(COLECAO.USUARIO)
            .where("apelido", "==", apelido).get();

        return !snapshot.empty;  
    }
    
    return false;
}

module.exports = {
    usuarioInexistente,
    apelidoExistente
}