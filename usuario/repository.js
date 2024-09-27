import admin from 'firebase-admin';

const COLLECTION_USUARIOS = 'usuarios';

export class UsuarioRepository {

    db = admin.firestore();

    async cadastrarUsuario(email, senha, nome, nomeUsuario) {
        try {
            await admin.auth().createUser({
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

    async atualizarUsuario(email, nome = "", nomeUsuario = "", novaSenha = "") {
        try {
            const atualizacoesFirestore = {};

            if (nome) {
                atualizacoesFirestore.nome = nome;
            }

            if (nomeUsuario) {
                atualizacoesFirestore.nomeUsuario = nomeUsuario;
            }

            if (novaSenha) {
                // buscar o uid do usuário pelo email
                const userRecord = await admin.auth().getUserByEmail(email);
                await admin.auth().updateUser(userRecord.uid, { password: novaSenha });
            }

            // atualizar no Firestore se houver mudanças
            if (Object.keys(atualizacoesFirestore).length > 0) {
                await this.db.collection(COLLECTION_USUARIOS).doc(email).update(atualizacoesFirestore);
            }

        } catch (error) {
            throw new Error("Erro ao atualizar usuário: " + error.message);
        }
    }
}
