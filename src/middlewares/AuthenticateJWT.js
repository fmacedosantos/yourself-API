import { MENSAGENS } from "../constants/Messages.js";
import admin from "../../firebase.js";

const inicandoBanco = admin;

export async function autenticarJWT(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader && authorizationHeader.startsWith("Bearer ") 
        ? authorizationHeader.split(" ")[1] 
        : null;

    if (!token) {
        return res.status(401).json({ message: MENSAGENS.USUARIO.NAO_AUTORIZADO });
    }

    try {

        const decodedIdToken = await admin.auth().verifyIdToken(token);
        
        req.usuario = {
            email: decodedIdToken.email,
        };

        next();
    } catch (error) {
        res.status(401).json({ message: MENSAGENS.USUARIO.NAO_AUTORIZADO });
    }
}
