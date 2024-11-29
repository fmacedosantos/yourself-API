// importações
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const usuarioRouter = require("./src/routes/user.routes.js");
const atividadeRouter = require("./src/routes/activity.routes.js");
const itemRouter = require("./src/routes/item.routes.js");
const admin = require("./firebase.js");

// criando a aplicação express
const app = express();

// inicializando o acesso ao banco de dados e credenciando a chave de conta de servico
const iniciandoBanco = admin;
if (iniciandoBanco) {
    console.log("A conexão com o banco de dados Firestore foi iniciada\n");
}

// middleware para interpretar o corpo da requisição como JSON
app.use(bodyParser.json());

// ativa o CORS para todas as rotas
app.use(cors());

// rotas
app.use("/usuario", usuarioRouter);
app.use("/atividade", atividadeRouter);
app.use("/item", itemRouter);

// rodando na porta 3000
app.listen(3000, () => console.log("API REST iniciada em http://localhost:3000"));
