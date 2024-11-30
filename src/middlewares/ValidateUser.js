const MENSAGENS = require("../constants/Messages.js");
const { apelidoExistente, usuarioInexistente } = require("../services/UserServices.js");

const validarCadastroUsuario = async (req, res, next) => {  
    const { email, nome, apelido, senha } = req.body;

    if (!email || !nome || !apelido || !senha) {
        return res.status(400).json({ success: false, message: MENSAGENS.USUARIO.ERRO_CADASTRO });
    }

    if (senha.length < 6) {
        return res.status(200).json({ success: false, message: MENSAGENS.USUARIO.SENHA_MENOR_QUE_6 });
    }

    const apelidoJaExiste = await apelidoExistente(apelido);
    if (apelidoJaExiste) {  
        return res.status(200).send({ success: false, message: MENSAGENS.USUARIO.APELIDO_EXISTENTE });
    }

    const usuarioNaoExiste = await usuarioInexistente(email);
    if (!usuarioNaoExiste) {  
        return res.status(200).send({ success: false, message: MENSAGENS.USUARIO.JA_CADASTRADO });
    }

    next();
};

const validarAutenticarUsuario = async (req, res, next) => {  
    const {email, senha} = req.body;

    if (!email || !senha) {
        return res.status(400).json({ success: false, message: MENSAGENS.USUARIO.ERRO_AUTENTICACAO });
    }

    const usuarioNaoExiste = await usuarioInexistente(email);
    if (usuarioNaoExiste) {  
        return res.status(200).send({ success: false, message: MENSAGENS.USUARIO.NAO_EXISTE });
    }

    next();
};

const validarReautenticarUsuario = async (req, res, next) => {  
    const {senha} = req.body;
    const email = req.usuario.email;

    if (!email || !senha) {
        return res.status(400).json({ success: false, message: MENSAGENS.USUARIO.ERRO_AUTENTICACAO });
    }

    const usuarioNaoExiste = await usuarioInexistente(email);
    if (usuarioNaoExiste) {  
        return res.status(400).send({ success: false, message: MENSAGENS.USUARIO.NAO_EXISTE });
    }

    next();
};


const validarEmailUsuario = async (req, res, next) => {  
    const email = req.usuario.email;

    if (!email) {
        return res.status(400).json({ success: false, message: MENSAGENS.USUARIO.EMAIL_NAO_INFORMADO });
    }

    const usuarioNaoExiste = await usuarioInexistente(email);
    if (usuarioNaoExiste) {  
        return res.status(400).send({ success: false, message: MENSAGENS.USUARIO.NAO_EXISTE });
    }

    next();
};


const validarAtualizarUsuario = async (req, res, next) => {  
    const { nome, apelido, novaSenha } = req.body;
    const email = req.usuario.email;
    
    if (!email) {
        return res.status(400).json({ success: false, message: MENSAGENS.USUARIO.EMAIL_NAO_INFORMADO });
    }
    if (!nome && !apelido && !novaSenha) {
        return res.status(400).json({ success: false, message: MENSAGENS.USUARIO.ERRO_ATUALIZAR });
    }
    if (await usuarioInexistente(email)) {  
        return res.status(400).send({ success: false, message: MENSAGENS.USUARIO.NAO_EXISTE });
    }

    if (apelido) {
        if (await apelidoExistente(apelido)) {  
            return res.status(200).send({ success: false, message: MENSAGENS.USUARIO.APELIDO_EXISTENTE });
        }
    }
    
    next();
};

const validarAtualizarPreferencias = async (req, res, next) => {  
    const { preferenciaConcentracao, preferenciaDescanso } = req.body;

    const email = req.usuario.email;

    if (!email) {
        return res.status(400).json({ success: false, message: MENSAGENS.USUARIO.EMAIL_NAO_INFORMADO });
    }

    if (!preferenciaConcentracao && !preferenciaDescanso) {
        return res.status(400).json({ success: false, message: MENSAGENS.USUARIO.ERRO_ATUALIZAR_PREFERENCIAS });
    }
    
    if (await usuarioInexistente(email)) {  
        return res.status(400).send({ success: false, message: MENSAGENS.USUARIO.NAO_EXISTE });
    }

    if (preferenciaConcentracao <= 0 || preferenciaDescanso <= 0){
        return res.status(200).json({ success: false, message: MENSAGENS.USUARIO.ERRO_NUMERO_PREFERENCIAS });
    }

    next();
};

module.exports = {
    validarEmailUsuario,
    validarCadastroUsuario,
    validarAtualizarUsuario,
    validarAtualizarPreferencias,
    validarAutenticarUsuario,
    validarReautenticarUsuario
}