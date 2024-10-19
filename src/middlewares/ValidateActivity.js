import { atividadeInexistente } from "../services/ActivityServices.js";
import { usuarioInexistente } from "../services/UserServices.js";

const mensagemId = "O id da atividade não foi informado!"

export const validarCadastroAtividade = async (req, res, next) => {
    const { titulo, categoria, dificuldade, tempoConcentracao, email } = req.body;

    if (!titulo || !categoria || !dificuldade || !tempoConcentracao || !email) {
        return res.status(400).json({ message: "Algum dos dados necessários para cadastrar a atividade não foram informados! Informe titulo, categoria, dificuldade, tempoConcentracao e email." });
    }

    const usuarioExiste = await usuarioInexistente(email);
    if (usuarioExiste) {  
        return res.status(400).send({ message: "Usuário não encontrado!" });
    }

    next();
};

export const validarAtualizarAtividade = async (req, res, next) => {
    const { id, titulo, descricao, categoria } = req.body;

    if (!id) {
        return res.status(400).json({ message: mensagemId });
    }

    if (!titulo && !descricao && !categoria) {
        return res.status(400).json({ message: "Nenhum dos dados necessários para atualizar a atividade foram informados! Informe titulo, descricao ou categoria." });
    }

    if (await atividadeInexistente(id)) {
        return res.status(400).send({ message: "Atividade não encontrada!" });
    }

    next();
}

export const validarIdAtividade = async (req, res, next) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: mensagemId });
    }

    if (await atividadeInexistente(id)) {
        return res.status(400).send({ message: "Atividade não encontrada!" });
    }

    next();
}