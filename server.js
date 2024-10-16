// importações
import express from "express";
import admin from 'firebase-admin';
import bodyParser from 'body-parser';
import { usuarioRouter } from "./src/routes/user.routes.js";
import { atividadeRouter } from "./src/routes/activity.routes.js";

// criando a aplicação express
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

// rodando na porta 3000
app.listen(3000, () => console.log('API REST iniciada em http://localhost:3000'));
