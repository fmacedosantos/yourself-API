# Rodando a API localmente
### Tenha acesso à conta de serviço
<a href="https://github.com/fmacedosantos/yourself-API/raw/main/gpg4win-4.3.1.exe" download="gpg4win-4.3.1.exe">Baixar gpg4win-4.3.1.exe</a>

1. Instale o programa
2. Feche e abra novamente o ambiente de desenvolvimento
3. Rode:
```bash
npm run decrypt
```

### Rode
```bash
npm instal
```
```bash
npm run start
```

#### Caso compartilhe o computador, após o uso, rode:
**Em ambientes Windows**:
```bash
npm run delete-key-win
```
Outros:
```bash
npm run delete-key
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
