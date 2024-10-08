const mensagemErroInformacoesNecessarias = "Informações necessárias não informadas!";

export const validarCadastroUsuario = (req, res, next) => {
    const { email, nome, apelido, senha } = req.body;
    if (!email || !nome || !apelido || !senha) {
        return res.status(400).json({ message: mensagemErroInformacoesNecessarias });
    }
    next();
};

export const validarEmailUsuario = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: mensagemErroInformacoesNecessarias });
    }
    next();
}

export const validarCadastroAtividade = (req, res, next) => {
    const { titulo, categoria, dificuldade, tempoConcentracao, email } = req.body;
    if (!titulo || !categoria || !dificuldade || !tempoConcentracao || !email) {
        return res.status(400).json({ message: mensagemErroInformacoesNecessarias });
    }
    next();
};

export const validarAtualizarUsuario = (req, res, next) => {
    const {email, nome, apelido, novaSenha } = req.body;
    if (!email) {
        return res.status(400).json({ message: mensagemErroInformacoesNecessarias });
    }
    if (!nome && !apelido && !novaSenha) {
        return res.status(200).json({ message: "Nenhum dado foi atualizado!" });
    }
    next();
};