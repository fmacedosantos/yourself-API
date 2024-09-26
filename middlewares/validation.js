export const validarCadastroUsuario = (req, res, next) => {
    const { email, nome, nomeUsuario, senha } = req.body;
    if (!email || !nome || !nomeUsuario || !senha) {
        return res.status(400).json({ message: "Informações necessárias não informadas!" });
    }
    next();
};

export const validarCadastroAtividade = (req, res, next) => {
    const { titulo, categoria, dificuldade, tempoConcentracao, emailUsuario } = req.body;
    if (!titulo || !categoria || !dificuldade || !tempoConcentracao || !emailUsuario) {
        return res.status(400).json({ message: "Informações necessárias não informadas!" });
    }
    next();
};
