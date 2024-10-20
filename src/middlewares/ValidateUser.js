import { MENSAGENS } from "../constants/Messages.js";
import { apelidoExistente, usuarioInexistente } from "../services/UserServices.js";

export const validarCadastroUsuario = async (req, res, next) => {  
    const { email, nome, apelido, senha } = req.body;

    if (!email || !nome || !apelido || !senha) {
        return res.status(400).json({ message: MENSAGENS.USUARIO.ERRO_CADASTRO });
    }

    if (senha.length < 6) {
        return res.status(400).json({ message: MENSAGENS.USUARIO.SENHA_MENOR_QUE_6 });
    }

    const apelidoJaExiste = await apelidoExistente(apelido);
    if (apelidoJaExiste) {  
        return res.status(400).send({ message: MENSAGENS.USUARIO.APELIDO_EXISTENTE });
    }

    const usuarioNaoExiste = await usuarioInexistente(email);
    if (!usuarioNaoExiste) {  
        return res.status(400).send({ message: MENSAGENS.USUARIO.JA_CADASTRADO });
    }

    next();
};


export const validarEmailUsuario = async (req, res, next) => {  
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: MENSAGENS.USUARIO.EMAIL_NAO_INFORMADO });
    }

    const usuarioNaoExiste = await usuarioInexistente(email);
    if (usuarioNaoExiste) {  
        return res.status(400).send({ message: MENSAGENS.USUARIO.NAO_EXISTE });
    }

    next();
};


export const validarAtualizarUsuario = async (req, res, next) => {  
    const { email, nome, apelido, novaSenha } = req.body;
    
    if (!email) {
        return res.status(400).json({ message: MENSAGENS.USUARIO.EMAIL_NAO_INFORMADO });
    }
    if (!nome && !apelido && !novaSenha) {
        return res.status(200).json({ message: MENSAGENS.USUARIO.ERRO_ATUALIZAR });
    }
    if (await usuarioInexistente(email)) {  
        return res.status(400).send({ message: MENSAGENS.USUARIO.NAO_EXISTE });
    }

    if (await apelidoExistente(apelido)) {  
        return res.status(400).send({ message: MENSAGENS.USUARIO.APELIDO_EXISTENTE });
    }
    
    next();
};

export const validarAtualizarPreferencias = async (req, res, next) => {  
    const { email, preferenciaConcentracao, preferenciaDescanso } = req.body;

    if (!email) {
        return res.status(400).json({ message: MENSAGENS.USUARIO.EMAIL_NAO_INFORMADO });
    }

    if (!preferenciaConcentracao && !preferenciaDescanso) {
        return res.status(200).json({ message: MENSAGENS.USUARIO.ERRO_ATUALIZAR_PREFERENCIAS });
    }
    
    if (await usuarioInexistente(email)) {  
        return res.status(400).send({ message: MENSAGENS.USUARIO.NAO_EXISTE });
    }

    next();
};
