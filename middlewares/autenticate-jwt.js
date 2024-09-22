
import admin from 'firebase-admin'

export async function authenticateToken(req, res, next) {

    const jwt = req.headers.authorization;
    if (!jwt) {
        res.status(401).json({message: 'Usuário não autorizado!'})
        return;
    }

    let decodedIdToken = '';
    try {
        decodedIdToken = await admin.auth().verifyIdToken(jwt, true);
    } catch (error) {
        res.status(401).json({message: 'Usuário não autorizado!'})
        return;
    }

    req.usuario = decodedIdToken.sub
    
    next();
}