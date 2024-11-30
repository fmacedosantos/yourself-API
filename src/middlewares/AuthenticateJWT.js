const  MENSAGENS = require("../constants/Messages.js");
const admin = require("../../firebase.js");

const inicandoBanco = admin;

async function autenticarJWT(req, res, next) {
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
        console.error('Erro na validação do JWT:', error.message);

        if (error.code === 'auth/id-token-expired') {
            return res.status(401).json({ message: 'Sessão expirada. Faça login novamente.' });
        }

        return res.status(401).json({ message: MENSAGENS.USUARIO.NAO_AUTORIZADO });
    }
}

module.exports = autenticarJWT;