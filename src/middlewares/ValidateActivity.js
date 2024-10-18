const mensagemId = "O id da atividade não foi informado!"

export const validarCadastroAtividade = (req, res, next) => {
    const { titulo, categoria, dificuldade, tempoConcentracao, email } = req.body;
    if (!titulo || !categoria || !dificuldade || !tempoConcentracao || !email) {
        return res.status(400).json({ message: "Algum dos dados necessários para cadastrar a atividade não foram informados! Informe titulo, categoria, dificuldade, tempoConcentracao e email." });
    }
    next();
};

export const validarAtualizarAtividade = (req, res, next) => {
    const { id, titulo, descricao, categoria } = req.body;
    if (!id) {
        return res.status(400).json({ message: mensagemId });
    }
    if (!titulo && !descricao && !categoria) {
        return res.status(400).json({ message: "Nenhum dos dados necessários para atualizar a atividade foram informados! Informe titulo, descricao ou categoria." });
    }
}

export const validarIdAtividade = (req, res, next) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: mensagemId });
    }
}