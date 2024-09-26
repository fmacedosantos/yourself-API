# Tenha acesso à conta de serviço
[Baixe](https://github.com/fmacedosantos/yourself-API.git/raw/main/gpg4win-4.3.1.exe)

1. Instale o programa
2. Feche e abra novamente o ambiente de desenvolvimento
3. Rode:
```bash
gpg --decrypt --output serviceAccountKey.json serviceAccountKey.json.gpg
```

# Consumindo a API
## Endpoints
- URL padrão:
> http://localhost:3000
### Usuario
> /usuario
#### POST
> /cadastrar
- Body da requisição:
> {  
    "email": "teste@email.com",  
    "nomeUsuario": "teste",  
    "nome": "teste",  
    "senha": "senha"  
}

> /autenticarToken
- Recebe o jwt pelo cabeçalho da requisição e retorna a validade do token
# Desenvolvimento
## Configurando o ambiente 
### Iniciando o projeto

> $ npm init -y

### Baixando dependências

> $ npm install express nodemon firebase-admin body-parser

### Configurando o **npm start**

- ./package.json, na seção scripts, adicione:

> "start": "node ./index.js localhost 3000"

### Acessando o banco (Firebase)

- Crie um **Authenticate** com email e senha
- Crie uma instância **Firestore**
- Gere uma **Chave SDK** 
    - Renomeie o arquivo para "serviceAccountKey"
    - Cole na raiz do projeto

