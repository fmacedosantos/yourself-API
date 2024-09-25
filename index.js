import express from "express";
import admin from 'firebase-admin';
import bodyParser from 'body-parser';
import { usuarioRouter } from './usuario/routes.js';
import { atividadeRouter } from "./atividade/routes.js";

const app = express();

// inicializando o acesso ao banco de dados e credenciando a chave de conta de servico
admin.initializeApp({
    credential: admin.credential.cert("serviceAccountKey.json")
});

// middleware pra interpretar o corpo da requisição como json
app.use(bodyParser.json());

// rotas de usuario
app.use('/usuario', usuarioRouter);
app.use('/atividade', atividadeRouter);

app.listen(3000, () => console.log('API REST iniciada em http://localhost:3000'));
