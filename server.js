// importações
import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import { usuarioRouter } from "./src/routes/user.routes.js";
import { atividadeRouter } from "./src/routes/activity.routes.js";
import { itemRouter } from "./src/routes/item.routes.js";
import admin from "./firebase.js";

// criando a aplicação express
const app = express();

// inicializando o acesso ao banco de dados e credenciando a chave de conta de servico
const inicandoBanco = admin;
if (inicandoBanco) {
    console.log('A conexão com o banco de dados Firestore foi iniciada\n');
}

// middleware pra interpretar o corpo da requisição como json
app.use(bodyParser.json());

// ativa o CORS para todas as rotas
app.use(cors());

// rotas de usuario
app.use('/usuario', usuarioRouter);
app.use('/atividade', atividadeRouter);
app.use('/item', itemRouter);

// rodando na porta 3000
app.listen(3000, () => console.log('API REST iniciada em http://localhost:3000'));
