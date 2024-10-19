import { apelidoExistente, usuarioInexistente } from "../services/UserServices.js";

const mensagemEmail = "O email do usuário não foi informado!"

export const validarCadastroUsuario = async (req, res, next) => {  
    const { email, nome, apelido, senha } = req.body;

    if (!email || !nome || !apelido || !senha) {
        return res.status(400).json({ message: "Algum dos dados necessários para criar o usuário não foram informados! Informe email, nome, apelido e senha." });
    }

    if (senha.length < 6) {
        return res.status(400).json({ message: "A senha deve possuir, pelo menos, 6 caracteres." });
    }

    const apelidoJaExiste = await apelidoExistente(apelido);
    if (apelidoJaExiste) {  
        return res.status(400).send({ message: "O nome de usuário já está em uso!" });
    }

    const usuarioNaoExiste = await usuarioInexistente(email);
    if (!usuarioNaoExiste) {  
        return res.status(400).send({ message: "Usuário já cadastrado!" });
    }

    next();
};


export const validarEmailUsuario = async (req, res, next) => {  
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: mensagemEmail });
    }

    const usuarioNaoExiste = await usuarioInexistente(email);
    if (usuarioNaoExiste) {  
        return res.status(400).send({ message: "Usuário não encontrado!" });
    }

    next();
};


export const validarAtualizarUsuario = async (req, res, next) => {  
    const { email, nome, apelido, novaSenha } = req.body;
    
    if (!email) {
        return res.status(400).json({ message: mensagemEmail });
    }
    if (!nome && !apelido && !novaSenha) {
        return res.status(200).json({ message: "Nenhum dos dados necessários para atualizar o usuário foram informados! Informe nome, apelido ou novaSenha." });
    }
    if (await usuarioInexistente(email)) {  
        return res.status(400).send({ message: "Usuário não encontrado!" });
    }

    if (await apelidoExistente(apelido)) {  
        return res.status(400).send({ message: "O nome de usuário já está em uso!" });
    }
    
    next();
};

export const validarAtualizarPreferencias = async (req, res, next) => {  
    const { email, preferenciaConcentracao, preferenciaDescanso } = req.body;

    if (!email) {
        return res.status(400).json({ message: mensagemEmail });
    }

    if (!preferenciaConcentracao && !preferenciaDescanso) {
        return res.status(200).json({ message: "Nenhum dos dados necessários para atualizar as preferências do usuário foram informados! Informe preferenciaConcentracao ou preferenciaDescanso." });
    }
    
    if (await usuarioInexistente(email)) {  
        return res.status(400).send({ message: "Usuário não encontrado!" });
    }

    next();
};
