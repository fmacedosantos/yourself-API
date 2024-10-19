import { itemInexistente } from "../services/ItemServices.js";
import { usuarioInexistente } from "../services/UserServices.js";

export const validarCadastroItem = (req, res, next) => {
    const { nome, preco, icone } = req.body;
    if (!nome || !preco || !icone) {
        return res.status(400).json({ message: "Algum dos dados necessários para cadastrar o item não foram informados! Informe nome, preco e icone." });
    }
    next();
}

export const validarCompraItem = async (req, res, next) => {
    const { id, email } = req.body;

    if (!id || !email) {
        return res.status(400).json({ message: "Algum dos dados necessários para comprar o item não foram informados! Informe id e email." });
    }

    if (await itemInexistente(id)) {
        return res.status(400).send({ message: "Item não encontrado!" });
    }
    
    const usuarioExiste = await usuarioInexistente(email);
    if (usuarioExiste) {  
        return res.status(400).send({ message: "Usuário não encontrado!" });
    }

    next();
}