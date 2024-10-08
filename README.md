# Rodando a API localmente
### Tenha acesso à conta de serviço
<a href="https://www.gpg4win.org/get-gpg4win.html" download="gpg4win-4.3.1.exe">Baixar gpg4win-4.3.1.exe</a>


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

### Caso compartilhe o computador, após o uso, rode:
**Em ambientes Windows**:
```bash
npm run delete-key
```
Linux ou mac:
```bash
npm run delete-key-linux
```


# Consumindo a API
## Endpoints
BASE_URL
> http://localhost:3000
### Usuario
> /usuario
#### POST
> /cadastrar
- Body da requisição:
```json
{  
    "email": "teste@email.com",  
    "nomeUsuario": "teste",  
    "nome": "teste",  
    "senha": "senha"  
}
```

> /autenticarToken
- Recebe o jwt pelo cabeçalho da requisição e retorna a validade do token

#### GET
> /mostrar
- Body da requisição:
```json
{
  "email": "teste@email.com"
}
```

#### PATCH
> /atualizar
- Body da requisição:
```json
{
  "email": "teste@email.com",
  "nomeUsuario": "testado001",
  "nome": "Usuario Teste", 
  "novaSenha": "123456"
}
```

#### DELETE
> /deletar
- Body da requisição:
```json
{
  "email": "teste@email.com"
}