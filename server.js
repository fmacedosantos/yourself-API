// importações
require('dotenv').config();
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
    console.log("Conexão com o banco de dados Firestore foi estabelecida.\n");
}

// middleware para interpretar o corpo da requisição como JSON
app.use(bodyParser.json());

// ativa o CORS para todas as rotas
app.use(cors());

// rotas
app.use("/usuario", usuarioRouter);
app.use("/atividade", atividadeRouter);
app.use("/item", itemRouter);

function listarRotas() {
    const printRoutes = (stack, basePath = "") => {
        const routes = [];

        stack.forEach((layer) => {
            if (layer.route) {
                let path = basePath + layer.route.path;

                path = path.replace(/\/\//g, ""); 
                path = path.replace(/\\\//g, "").replace(/\?/, ""); 

                const methods = Object.keys(layer.route.methods)
                    .filter(method => layer.route.methods[method])
                    .map(method => method.toUpperCase());

                methods.forEach((method) => {
                    routes.push({ method, path });
                });
            } else if (layer.name === "router" && layer.handle.stack) {
                const newPath = basePath + (layer.regexp.source.replace("\\/", "/").replace("(?=\\/|$)", "").replace("^", "") || "");
                routes.push(...printRoutes(layer.handle.stack, newPath));
            }
        });

        return routes;
    };

    console.log("========================================");
    console.log("Listando rotas disponíveis:");
    console.log("========================================");

    if (app._router && app._router.stack) {
        const routes = printRoutes(app._router.stack);
        const groupedRoutes = routes.reduce((acc, route) => {
            acc[route.method] = acc[route.method] || [];
            acc[route.method].push(route.path);
            return acc;
        }, {});

        Object.keys(groupedRoutes).sort().forEach((method) => {
            console.log(`\n${method}:\n`);
            groupedRoutes[method].forEach((path) => {
                console.log(`  ${path}`);
            });
        });
    } else {
        console.log("Nenhuma rota foi encontrada.");
    }

    console.log("\n========================================\n");
}

app.listen(3000, () => {
    console.log("A API foi iniciada na porta 3000.\n");
    listarRotas();
});
