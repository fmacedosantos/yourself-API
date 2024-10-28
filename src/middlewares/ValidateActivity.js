import { MENSAGENS } from "../constants/Messages.js";
import { atividadeInexistente } from "../services/ActivityServices.js";
import { usuarioInexistente } from "../services/UserServices.js";

export const validarCadastroAtividade = async (req, res, next) => {
    const { titulo, categoria, dificuldade, tempoConcentracao } = req.body;

    const email = req.usuario.email;

    if (!titulo || !categoria || !dificuldade || !tempoConcentracao || !email) {
        return res.status(400).json({ message: MENSAGENS.ATIVIDADE.ERRO_CADASTRO });
    }

    const usuarioNaoExiste = await usuarioInexistente(email);
    if (usuarioNaoExiste) {  
        return res.status(400).send({ message: MENSAGENS.USUARIO.NAO_EXISTE });
    }

    next();
};

export const validarAtualizarAtividade = async (req, res, next) => {
    const { id, titulo, descricao, categoria } = req.body;

    if (!id) {
        return res.status(400).json({ message: MENSAGENS.ATIVIDADE.ID_NAO_INFORMADO });
    }

    if (!titulo && !descricao && !categoria) {
        return res.status(400).json({ message: MENSAGENS.ATIVIDADE.ERRO_ATUALIZAR });
    }

    if (await atividadeInexistente(id)) {
        return res.status(400).send({ message: MENSAGENS.ATIVIDADE.NAO_EXISTE });
    }

    next();
}

export const validarIdAtividade = async (req, res, next) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: MENSAGENS.ATIVIDADE.ID_NAO_INFORMADO });
    }

    if (await atividadeInexistente(id)) {
        return res.status(400).send({ message: MENSAGENS.ATIVIDADE.NAO_EXISTE });
    }

    next();
}