import admin from 'firebase-admin';
import { MENSAGENS } from '../constants/Messages.js';

export async function autenticarJWT(req, res, next) {
    const jwt = req.headers.authorization;
    if (!jwt) {
        return res.status(401).json({ message: MENSAGENS.USUARIO.NAO_AUTORIZADO });
    }

    try {
        const decodedIdToken = await admin.auth().verifyIdToken(jwt, true);
        
        req.usuario = {
            email: decodedIdToken.email
        };

        next();
    } catch (error) {
        res.status(401).json({ message: MENSAGENS.USUARIO.NAO_AUTORIZADO });
    }
}
