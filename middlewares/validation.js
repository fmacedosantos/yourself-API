const mensagemErroInformacoesNecessarias = "Informações necessárias não informadas!";

export const validarCadastroUsuario = (req, res, next) => {
    const { email, nome, nomeUsuario, senha } = req.body;
    if (!email || !nome || !nomeUsuario || !senha) {
        return res.status(400).json({ message: mensagemErroInformacoesNecessarias });
    }
    next();
};

export const validarMostrarUsuario = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: mensagemErroInformacoesNecessarias });
    }
    next();
}

export const validarCadastroAtividade = (req, res, next) => {
    const { titulo, categoria, dificuldade, tempoConcentracao, emailUsuario } = req.body;
    if (!titulo || !categoria || !dificuldade || !tempoConcentracao || !emailUsuario) {
        return res.status(400).json({ message: mensagemErroInformacoesNecessarias });
    }
    next();
};

export const validarAtualizarUsuario = (req, res, next) => {
    const {email, nome, nomeUsuario, novaSenha } = req.body;
    if (!email) {
        return res.status(400).json({ message: mensagemErroInformacoesNecessarias });
    }
    if (!nome && !nomeUsuario && !novaSenha) {
        return res.status(200).json({ message: "Nenhum dado foi atualizado!" });
    }
    next();
};