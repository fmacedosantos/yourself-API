import admin from 'firebase-admin';

const COLLECTION_USUARIOS = 'usuarios';

export class UsuarioRepository {

    db = admin.firestore();

    async cadastrarUsuario(email, senha, nome, nomeUsuario) {
        try {
            // cadastra no authentication
            await admin.auth().createUser({
                email: email,
                password: senha
            });

            // cadastra no firestore, sendo o doc o email do usuário
            await this.db.collection(COLLECTION_USUARIOS).doc(email).set({
                email,
                nome,
                nomeUsuario,
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
            let errorMessage = error.message;
            
            if (error.message == "There is no user record corresponding to the provided identifier.") {
                errorMessage = 'Usuário não cadastrado!';
            }
            throw new Error("Erro ao mostrar usuário: " + errorMessage );
        }
    }

    async atualizarUsuario(email, nome = "", nomeUsuario = "", novaSenha = "") {
        try {
            // armazena as mudanças
            const atualizacoesFirestore = {};

            if (nome) {
                atualizacoesFirestore.nome = nome;
            }

            if (nomeUsuario) {
                atualizacoesFirestore.nomeUsuario = nomeUsuario;
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
            throw new Error("Erro ao atualizar usuário: " + error.message);
        }
    }

    async deletarUsuario(email) {
        try {
            const userRecord = await admin.auth().getUserByEmail(email);
            
            // deletando o usuario do Firebase Authentication
            await admin.auth().deleteUser(userRecord.uid);
    
            // deletando os dados do usuário no Firestore
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
