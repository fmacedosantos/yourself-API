import admin from 'firebase-admin';

export class UsuarioRepository {

    // acessando o firestore
    db = admin.firestore();

    cadastrarUsuario(email, senha, nome, nomeUsuario) {
        // registrando o usuario no firebase authentication
        return admin.auth().createUser({
            email: email,
            password: senha
        })
        .then((userRecord) => {
            // armazenando informacoes adicionais no firestore
            return this.db.collection('usuarios').doc(userRecord.uid).set({
                email: email,
                nome: nome,
                nomeUsuario: nomeUsuario,
                anoRegistro: new Date().getFullYear(),
                pontos: 0,
                totalPontos: 0,
                ofensiva: 0,
                maiorOfensiva: 0,
                preferenciaConcentracao: 25,
                preferenciaDescanso: 5,
                comprasItens: [],
                atividades: []
            });
        })
        .catch((error) => {
            if (error.message == "The email address is already in use by another account.") {
                return Promise.reject({
                    code: 500,
                    message: "Usuário já cadastrado!"
                })
            }
            return Promise.reject({
                code: 500,
                message: "Erro ao cadastrar usuário: " + error.message
            });
        });
    }
}
