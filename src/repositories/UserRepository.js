import admin from 'firebase-admin';

const COLLECTION_ATIVIDADES = 'atividades';
const COLLECTION_USUARIOS = 'usuarios';

export class UsuarioRepository {

    db = admin.firestore();

    async cadastrarUsuario(email, senha, nome, apelido) {
        try {
            // verifica se o nomeUsuario já existe no Firestore
            const snapshot = await this.db.collection(COLLECTION_USUARIOS)
            .where("apelido", "==", apelido).get();

            if (!snapshot.empty) {
                throw new Error("O nome de usuário já está em uso!");
            }

            // cadastra no authentication
            await admin.auth().createUser({
                email: email,
                password: senha
            });

            // cadastra no firestore, sendo o doc o email do usuário
            await this.db.collection(COLLECTION_USUARIOS).doc(email).set({
                email,
                nome,
                apelido,
                // valores padrões (não informados no cadastro)
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
            if (error.message === "The password must be a string with at least 6 characters.") {
                throw new Error("A senha deve possuir, ao menos, 6 caracteres!");
            }
            if (error.message === "O nome de usuário já está em uso!") {
                throw new Error("O nome de usuário já está em uso!");
            }
            throw new Error("Erro ao cadastrar usuário: " + error.message);
        }
    }

    async mostrarUsuario(email) {
        try {
    
            // busca os dados do usuário no firestore
            const usuarioSnapshot = await this.db.collection(COLLECTION_USUARIOS).doc(email).get();
    
            if (!usuarioSnapshot.exists) {
                throw new Error("Usuário não cadastrado!");
            }
    
            return usuarioSnapshot.data(); 
        } catch (error) {
            if (error.message == "Usuário não cadastrado!") {
                throw new Error("Usuário não cadastrado!");
            }
            throw new Error("Erro ao mostrar usuário: " + error.message );
        }
    }

    async atualizarUsuario(email, nome = "", apelido = "", novaSenha = "") {
        try {

            // verifica se o nomeUsuario já existe no Firestore
            const snapshot = await this.db.collection(COLLECTION_USUARIOS)
            .where("apelido", "==", apelido).get();

            if (!snapshot.empty) {
                throw new Error("O nome de usuário já está em uso!");
            }

            // armazena as mudanças
            const atualizacoesFirestore = {};

            if (nome) {
                atualizacoesFirestore.nome = nome;
            }

            if (apelido) {
                atualizacoesFirestore.apelido = apelido;
            }

            if (novaSenha) {
                // atualiza no authenticate
                const userRecord = await admin.auth().getUserByEmail(email);
                await admin.auth().updateUser(userRecord.uid, { password: novaSenha });
            }

            // atualiza no firestore se houver mudanças
            if (Object.keys(atualizacoesFirestore).length > 0) {
                await this.db.collection(COLLECTION_USUARIOS).doc(email).update(atualizacoesFirestore);
            }

        } catch (error) {
            if (error.message === "The password must be a string with at least 6 characters.") {
                throw new Error("A nova senha deve possuir, ao menos, 6 caracteres!");
            }
            if (error.message === "O nome de usuário já está em uso!") {
                throw new Error("O nome de usuário já está em uso!");
            }
            throw new Error("Erro ao atualizar usuário: " + error.message);
        }
    }

    async deletarUsuario(email) {
        try {
            // recupera o usuário pelo email
            const userRecord = await admin.auth().getUserByEmail(email);
    
            // recupera o documento do usuário no Firestore
            const usuarioSnapshot = await this.db.collection(COLLECTION_USUARIOS).doc(email).get();
            
            if (!usuarioSnapshot.exists) {
                throw new Error("Usuário não cadastrado!");
            }
    
            // recupera as atividades associadas ao usuário
            const atividades = usuarioSnapshot.get('atividades') || [];
    
            // exclui as atividades associadas ao usuário
            for (const atividadeId of atividades) {
                await this.db.collection(COLLECTION_ATIVIDADES).doc(atividadeId).delete();
            }
    
            // deleta o usuário do Firebase Authentication
            await admin.auth().deleteUser(userRecord.uid);
    
            // deleta o documento do usuário no Firestore
            await this.db.collection(COLLECTION_USUARIOS).doc(email).delete();
    
            return true;
        } catch (error) {
            if (error.message === "There is no user record corresponding to the provided identifier.") {
                throw new Error("Usuário não cadastrado!");
            }
            throw new Error("Erro ao deletar usuário: " + error.message);
        }
    }
    

    async mostrarIdAtividades(email) {
        try {
            const usuarioSnapshot = await this.db.collection(COLLECTION_USUARIOS).doc(email).get();
            if (!usuarioSnapshot.exists) {
                throw new Error("Usuário não encontrado.");
            }

            const atividades = usuarioSnapshot.get('atividades') || [];
            return atividades;
    
        } catch (error) {
            let errorMessage = error.message;
            
            if (error.message == "There is no user record corresponding to the provided identifier.") {
                errorMessage = 'Usuário não cadastrado!';
            }
            throw new Error(`Erro ao mostrar atividades de ${email}: ` + errorMessage);
        }
    }
    
}
