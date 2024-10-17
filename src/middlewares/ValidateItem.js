export const validarCadastroItem = (req, res, next) => {
    const { nome, preco, icone } = req.body;
    if (!nome || !preco || !icone) {
        return res.status(400).json({ message: "Algum dos dados necessários para cadastrar o item não foram informados! Informe nome, preco e icone." });
    }
    next();
}