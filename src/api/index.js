import express from "express";
import admin from 'firebase-admin';
import bodyParser from 'body-parser';
import { usuarioRouter } from "../routes/user.routes.js";
import { atividadeRouter } from "../routes/activity.routes.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// inicializando o acesso ao banco de dados com variáveis de ambiente
admin.initializeApp({
    credential: admin.credential.cert({
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
        universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
    })
});

// middleware para interpretar o corpo da requisição como json
app.use(bodyParser.json());

// rotas de usuário e atividade
app.use('/usuario', usuarioRouter);
app.use('/atividade', atividadeRouter);

// Exportando o app para o Vercel usar como serverless function
export default app;
