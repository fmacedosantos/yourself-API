const { MENSAGENS } = require("../constants/Messages.js");
const { itemInexistente, itemPossuido, pontosInsuficientes } = require("../services/ItemServices.js");
const { usuarioInexistente } = require("../services/UserServices.js");

const validarCadastroItem = (req, res, next) => {
    const { nome, preco, icone } = req.body;
    if (!nome || !preco || !icone) {
        return res.status(400).json({ message: MENSAGENS.ITEM.ERRO_CADASTRO });
    }
    next();
}

const validarCompraItem = async (req, res, next) => {
    const { id } = req.body;

    const email = req.usuario.email;

    if (!id || !email) {
        return res.status(400).json({ message: MENSAGENS.ITEM.ERRO_COMPRA });
    }

    if (await itemInexistente(id)) {
        return res.status(400).send({ message: MENSAGENS.ITEM.NAO_EXISTE });
    }
    
    const usuarioNaoExiste = await usuarioInexistente(email);
    if (usuarioNaoExiste) {  
        return res.status(400).send({ message: MENSAGENS.USUARIO.NAO_EXISTE });
    }

    if (await itemPossuido(id, email)) {
        return res.status(400).send({ message: MENSAGENS.ITEM.JA_POSSUIDO });
    }

    if (await pontosInsuficientes(id, email)) {
        return res.status(400).send({ message: MENSAGENS.ITEM.PONTOS_INSUFICIENTES });
    }

    next();
}

const validarIdItem = async (req, res, next) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: MENSAGENS.ITEM.ID_NAO_INFORMADO });
    }

    if (await itemInexistente(id)) {
        return res.status(400).send({ message: MENSAGENS.ITEM.NAO_EXISTE });
    }

    next();
}

const validarAtualizarItem = async (req, res, next) => {
    const { id, nome, preco, icone } = req.body;

    if (!id) {
        return res.status(400).json({ message: MENSAGENS.ITEM.ID_NAO_INFORMADO });
    }

    if (await itemInexistente(id)) {
        return res.status(400).send({ message: MENSAGENS.ITEM.NAO_EXISTE });
    }

    if (!nome && !preco && !icone) {
        return res.status(400).json({ message: MENSAGENS.ITEM.ERRO_ATUALIZAR });
    }

    next();
}

module.exports = {
    validarCadastroItem,
    validarCompraItem,
    validarIdItem,
    validarAtualizarItem
}