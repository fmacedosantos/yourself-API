export const validarCadastroItem = (req, res, next) => {
    const { nome, preco, icone } = req.body;
    if (!nome || !preco || !icone) {
        return res.status(400).json({ message: "Algum dos dados necessários para cadastrar o item não foram informados! Informe nome, preco e icone." });
    }
    next();
}

export const validarCompraItem = (req, res, next) => {
    const { id, email } = req.body;
    if (!id || !email) {
        return res.status(400).json({ message: "Algum dos dados necessários para comprar o item não foram informados! Informe id e email." });
    }
    next();
}