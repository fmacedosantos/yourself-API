// importações
const  Usuario  = require("../models/UserModel.js");

class UsuarioController {

    async cadastrarUsuario(req, res) {
        try {
            // variáveis do body
            const { email, nome, apelido, senha } = req.body;

            // chamando o model
            const usuario = new Usuario();

            // atribuindo as variáveis ao model
            usuario.email = email;
            usuario.nome = nome;
            usuario.apelido = apelido;
            usuario.senha = senha;

            // chamando o método do repository
            await usuario.cadastrarUsuario();
            res.status(201).send({ success: true, message: 'Usuário cadastrado com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async autenticarUsuario(req, res) {
        try {
            const {email, senha} = req.body;

            const usuario = new Usuario();

            usuario.email = email;
            usuario.senha = senha;

            const {success, message} = await usuario.autenticarUsuario();
            res.status(200).send({ success: success, message: message });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async autenticarUsuarioJWT(req, res) {
        try {
            const {senha} = req.body;
            const email = req.usuario.email;

            const usuario = new Usuario();

            usuario.email = email;
            usuario.senha = senha;

            const {success, message} = await usuario.autenticarUsuario();
            res.status(200).send({ success: success, message: message });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async mostrarUsuario(req, res) {
        try {
            // variáveis do jwt
            const email = req.usuario.email;

            // chamando o model
            const usuario = new Usuario();

            // atribuindo as variáveis ao model
            usuario.email = email;

            // chamando o método do repository
            const dadosUsuario = await usuario.mostrarUsuario();
            res.status(200).send({ success: true, data: dadosUsuario, message: 'Usuário exibido com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async mostrarEstatisticas(req, res) {
        try {
            // variáveis do jwt
            const email = req.usuario.email;

            // chamando o model
            const usuario = new Usuario();

            // atribuindo as variáveis ao model
            usuario.email = email;

            // chamando o método do repository
            const dadosEstatisticas = await usuario.mostrarEstatisticas();
            res.status(200).send({ success: true, data: dadosEstatisticas, message: 'Estatísticas exibidas com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async mostrarPreferencias(req, res) {
        try {
            // variáveis do jwt
            const email = req.usuario.email;

            // chamando o model
            const usuario = new Usuario();

            // atribuindo as variáveis ao model
            usuario.email = email;

            // chamando o método do repository
            const dadosPreferencias = await usuario.mostrarPreferencias();
            res.status(200).send({ success: true, data: dadosPreferencias, message: 'Preferências exibidas com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async atualizarUsuario(req, res) {
        try {
            // variáveis do body
            const { nome, apelido, novaSenha } = req.body;

            // variáveis do jwt
            const email = req.usuario.email;
    
            // chamando o model
            const usuario = new Usuario();

            // atribuindo as variáveis ao model
            usuario.email = email;
            usuario.nome = nome;
            usuario.apelido = apelido;
            usuario.senha = novaSenha;
    
            // chamando o método do repository
            await usuario.atualizarUsuario();
    
            res.status(200).send({ success: true, message: 'Usuário atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    
    async atualizarPreferencias(req, res) {
        try {
            const {preferenciaConcentracao, preferenciaDescanso } = req.body;

            // variáveis do jwt
            const email = req.usuario.email;

            const usuario = new Usuario();

            usuario.email = email;
            usuario.preferenciaConcentracao = preferenciaConcentracao;
            usuario.preferenciaDescanso = preferenciaDescanso;

            await usuario.atualizarPreferencias();

            res.status(200).send({ success: true, message: 'Preferências atualizadas com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async deletarUsuario(req, res) {
        try {
            // variáveis do jwt
            const email = req.usuario.email;
    
            // chamando o model
            const usuario = new Usuario();

            // atribuindo as variáveis ao model
            usuario.email = email;
    
            // chamando o método do repository
            await usuario.deletarUsuario();
            res.status(200).send({ success: true, message: 'Usuário deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    
}

module.exports = UsuarioController;