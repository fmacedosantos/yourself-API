# Rodando a API localmente
### Tenha acesso à conta de serviço
[Baixe](https://github.com/fmacedosantos/yourself-API/blob/feat_register_activity/raw/main/gpg4win-4.3.1.exe)

1. Instale o programa
2. Feche e abra novamente o ambiente de desenvolvimento
3. Rode:
```bash
gpg --decrypt --output serviceAccountKey.json serviceAccountKey.json.gpg
```

### Rode
```bash
npm instal
```
```bash
npm run start
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
