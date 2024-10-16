const mensagemEmail = "O email do usuário não foi informado!"

export const validarCadastroUsuario = (req, res, next) => {
    const { email, nome, apelido, senha } = req.body;
    if (!email || !nome || !apelido || !senha) {
        return res.status(400).json({ message: "Algum dos dados necessários para criar o usuário não foram informados! Informe email, nome, apelido e senha." });
    }
    if (senha.length < 6) {
        return res.status(400).json({ message: "A senha deve possuir, pelo menos, 6 caracteres. UI" });
    }
    next();
};

export const validarEmailUsuario = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: mensagemEmail });
    }
    next();
};

export const validarAtualizarUsuario = (req, res, next) => {
    const {email, nome, apelido, novaSenha } = req.body;
    if (!email) {
        return res.status(400).json({ message: mensagemEmail });
    }
    if (!nome && !apelido && !novaSenha) {
        return res.status(200).json({ message: "Nenhum dos dados necessários para atualizar o usuário foram informados! Informe nome, apelido ou novaSenha." });
    }
    next();
};

export const validarAtualizarPreferencias = (req, res, next) => {
    const { email, preferenciaConcentracao, preferenciaDescanso } = req.body;

    if (!email) {
        return res.status(400).json({ message: mensagemEmail });
    }

    if (!preferenciaConcentracao && !preferenciaDescanso) {
        return res.status(200).json({ message: "Nenhum dos dados necessários para atualizar as preferências do usuário foram informados! Informe preferenciaConcentracao ou preferenciaDescanso." });
    }
    next();
};