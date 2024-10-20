
import admin from 'firebase-admin'
import { MENSAGENS } from '../constants/Messages.js';

export async function autenticarJWT(req, res, next) {

    const jwt = req.headers.authorization;
    if (!jwt) {
        res.status(401).json({message: MENSAGENS.USUARIO.NAO_AUTORIZADO})
        return;
    }

    let decodedIdToken = '';
    try {
        decodedIdToken = await admin.auth().verifyIdToken(jwt, true);
    } catch (error) {
        res.status(401).json({message: MENSAGENS.USUARIO.NAO_AUTORIZADO})
        return;
    }

    req.usuario = decodedIdToken.sub
    
    next();
}