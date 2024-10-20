import { MENSAGENS } from "../constants/Messages.js";
import { itemInexistente, itemPossuido, pontosInsuficientes } from "../services/ItemServices.js";
import { usuarioInexistente } from "../services/UserServices.js";

export const validarCadastroItem = (req, res, next) => {
    const { nome, preco, icone } = req.body;
    if (!nome || !preco || !icone) {
        return res.status(400).json({ message: MENSAGENS.ITEM.ERRO_CADASTRO });
    }
    next();
}

export const validarCompraItem = async (req, res, next) => {
    const { id, email } = req.body;

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

export const validarIdItem = async (req, res, next) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: MENSAGENS.ITEM.ID_NAO_INFORMADO });
    }

    if (await itemInexistente(id)) {
        return res.status(400).send({ message: MENSAGENS.ITEM.NAO_EXISTE });
    }

    next();
}

export const validarAtualizarItem = async (req, res, next) => {
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