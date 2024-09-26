import admin from 'firebase-admin';

const COLLECTION_USUARIOS = 'usuarios';

export class UsuarioRepository {

    db = admin.firestore();

    async cadastrarUsuario(email, senha, nome, nomeUsuario) {
        try {
            const userRecord = await admin.auth().createUser({
                email: email,
                password: senha
            });

            await this.db.collection(COLLECTION_USUARIOS).doc(email).set({
                email,
                nome,
                nomeUsuario,
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

        } catch (error) {
            if (error.message === "The email address is already in use by another account.") {
                throw new Error("Usuário já cadastrado!");
            }
            throw new Error("Erro ao cadastrar usuário: " + error.message);
        }
    }
}
