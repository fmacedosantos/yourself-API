export const MENSAGENS = {
    USUARIO: {
        NAO_AUTORIZADO: "Usuário não autorizado!",
        EMAIL_NAO_INFORMADO: "O email do usuário não foi informado!",
        SENHA_MENOR_QUE_6: "A senha deve possuir, pelo menos, 6 caracteres.",
        APELIDO_EXISTENTE: "O apelido já está em uso!",
        JA_CADASTRADO: "Usuário já cadastrado!",
        NAO_EXISTE: "Usuário não encontrado!",
        ERRO_CADASTRO: "Algum dos dados necessários para criar o usuário não foram informados! Informe email, nome, apelido e senha.",
        ERRO_ATUALIZAR: "Nenhum dos dados necessários para atualizar o usuário foram informados! Informe nome, apelido ou novaSenha.",
        ERRO_ATUALIZAR_PREFERENCIAS: "Nenhum dos dados necessários para atualizar as preferências do usuário foram informados! Informe preferenciaConcentracao ou preferenciaDescanso."
    },
    ATIVIDADE: {
        ID_NAO_INFORMADO: "O id da atividade não foi informado!",
        NAO_EXISTE: "Atividade não encontrada!",
        ERRO_CADASTRO: "Algum dos dados necessários para cadastrar a atividade não foram informados! Informe titulo, categoria, dificuldade, tempoConcentracao e email.",
        ERRO_ATUALIZAR: "Nenhum dos dados necessários para atualizar a atividade foram informados! Informe titulo, descricao ou categoria."
    },
    ITEM: {
        ID_NAO_INFORMADO: "O id do item não foi informado!",
        NAO_EXISTE: "Item não encontrado!",
        JA_POSSUIDO: "Item já possuído!",
        PONTOS_INSUFICIENTES: "Pontos insuficientes!",
        ERRO_CADASTRO: "Algum dos dados necessários para cadastrar o item não foram informados! Informe nome, preco e icone.",
        ERRO_COMPRA: "Algum dos dados necessários para comprar o item não foram informados! Informe id e email.",
        ERRO_ATUALIZAR: "Nenhum dos dados necessários para atualizar o item foram informados! Informe nome, preco ou icone."
    }
}