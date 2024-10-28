import { MENSAGENS } from "../constants/Messages.js";
import admin from "../../firebase.js";

const inicandoBanco = admin;
if (inicandoBanco) {
    console.log('A conexão com o banco de dados Firestore foi iniciada\n');
}

export async function autenticarJWT(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader && authorizationHeader.startsWith("Bearer ") 
        ? authorizationHeader.split(" ")[1] 
        : null;

    if (!token) {
        console.log("Token não encontrado no cabeçalho.");
        return res.status(401).json({ message: MENSAGENS.USUARIO.NAO_AUTORIZADO });
    }

    try {
        console.log("Token recebido para validação:", token); // Log do token

        const decodedIdToken = await admin.auth().verifyIdToken(token);
        
        console.log("Token decodificado com sucesso:", decodedIdToken); // Log do conteúdo decodificado
        
        req.usuario = {
            email: decodedIdToken.email,
        };

        next();
    } catch (error) {
        console.error("Erro ao verificar o token:", error); // Log do erro detalhado
        res.status(401).json({ message: MENSAGENS.USUARIO.NAO_AUTORIZADO });
    }
}
