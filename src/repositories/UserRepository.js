import admin from 'firebase-admin';
import { atualizarOfensiva } from '../services/ActivityServices.js';
import { COLECAO } from '../constants/Collections.js';

export class UsuarioRepository {

    db = admin.firestore();

    async cadastrarUsuario(email, senha, nome, apelido) {
        try {
            // verifica se o nomeUsuario já existe no Firestore
            const snapshot = await this.db.collection(COLECAO.USUARIO)
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
            await this.db.collection(COLECAO.USUARIO).doc(email).set({
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
                itens: [],
                atividades: [],
                ultimaAtividade: null
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
            const usuarioRef = this.db.collection(COLECAO.USUARIO).doc(email);
            const usuarioSnapshot = await usuarioRef.get();
            if (!usuarioSnapshot.exists) {
                throw new Error("Usuário não encontrado.");
            }
    
            const usuarioData = usuarioSnapshot.data();
            const dataAtual = new Date();
            
            // Atualiza a ofensiva somente se houver uma nova atividade em um novo dia
            const { novaOfensiva, novaMaiorOfensiva } = atualizarOfensiva(usuarioData, false);
    
            if (novaOfensiva !== usuarioData.ofensiva || novaMaiorOfensiva !== usuarioData.maiorOfensiva) {
                await usuarioRef.update({
                    ofensiva: novaOfensiva,
                    maiorOfensiva: novaMaiorOfensiva
                });
            }
    
            return {
                email: usuarioData.email,
                pontos: usuarioData.pontos,
                totalPontos: usuarioData.totalPontos,
                ofensiva: novaOfensiva,
                maiorOfensiva: novaMaiorOfensiva
            };
        } catch (error) {
            throw new Error("Erro ao mostrar os dados do usuário.");
        }
    }       

    async mostrarEstatisticas(email) {
        try {
            const usuarioRef = this.db.collection(COLECAO.USUARIO).doc(email);
            const usuarioSnapshot = await usuarioRef.get();
            if (!usuarioSnapshot.exists) {
                throw new Error("Usuário não encontrado.");
            }
    
            const usuarioData = usuarioSnapshot.data();
    
            // Atualizar a ofensiva ao acessar as estatísticas do usuário
            const { novaOfensiva, novaMaiorOfensiva } = atualizarOfensiva(usuarioData, false);
    
            // Se a ofensiva foi atualizada, salvar no Firestore
            if (novaOfensiva !== usuarioData.ofensiva || novaMaiorOfensiva !== usuarioData.maiorOfensiva) {
                await usuarioRef.update({
                    ofensiva: novaOfensiva,
                    maiorOfensiva: novaMaiorOfensiva
                });
            }
    
            // Retornar as estatísticas do usuário
            return {
                pontos: usuarioData.pontos,
                totalPontos: usuarioData.totalPontos,
                ofensiva: novaOfensiva,
                maiorOfensiva: novaMaiorOfensiva
            };
        } catch (error) {
            throw new Error("Erro ao mostrar as estatísticas do usuário.");
        }
    }    

    async atualizarUsuario(email, nome = null, apelido = null, novaSenha = null) {
        try {
            // verifica se o apelido já existe no Firestore
            if (apelido !== null) {
                const snapshot = await this.db.collection(COLECAO.USUARIO)
                    .where("apelido", "==", apelido).get();
    
                if (!snapshot.empty) {
                    throw new Error("O nome de usuário já está em uso!");
                }
            }
    
            // recupera o documento do usuário
            const usuarioSnapshot = await this.db.collection(COLECAO.USUARIO).doc(email).get();
            if (!usuarioSnapshot.exists) {
                throw new Error("Usuário não cadastrado!");
            }
    
            const usuarioData = usuarioSnapshot.data();
    
            // monta as atualizações condicionalmente
            const atualizacoes = {
                nome: nome !== null ? nome : usuarioData.nome,
                apelido: apelido !== null ? apelido : usuarioData.apelido
            };
    
            // atualiza a senha no Firebase Authentication, se fornecida
            if (novaSenha !== null) {
                const userRecord = await admin.auth().getUserByEmail(email);
                await admin.auth().updateUser(userRecord.uid, { password: novaSenha });
            }
    
            // atualiza no Firestore, caso tenha algo para atualizar
            if (Object.keys(atualizacoes).length > 0) {
                await this.db.collection(COLECAO.USUARIO).doc(email).update(atualizacoes);
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
    
    async atualizarPreferencias(email, preferenciaConcentracao = null, preferenciaDescanso = null) {
        try {
            // Recupera o documento do usuário no Firestore
            const usuarioSnapshot = await this.db.collection(COLECAO.USUARIO).doc(email).get();
            if (!usuarioSnapshot.exists) {
                throw new Error("Usuário não cadastrado!");
            }
    
            const usuarioData = usuarioSnapshot.data();
    
            // Monta as atualizações condicionalmente
            const atualizacoes = {};
            if (preferenciaConcentracao !== null) {
                atualizacoes.preferenciaConcentracao = preferenciaConcentracao;
            }
            if (preferenciaDescanso !== null) {
                atualizacoes.preferenciaDescanso = preferenciaDescanso;
            }
    
            // Atualiza as preferências no Firestore
            if (Object.keys(atualizacoes).length > 0) {
                await this.db.collection(COLECAO.USUARIO).doc(email).update(atualizacoes);
            }
    
            return { 
                mensagem: "Preferências atualizadas com sucesso!",
                preferenciaConcentracao: preferenciaConcentracao || usuarioData.preferenciaConcentracao,
                preferenciaDescanso: preferenciaDescanso || usuarioData.preferenciaDescanso
            };
        } catch (error) {
            throw new Error("Erro ao atualizar preferências: " + error.message);
        }
    }    

    async deletarUsuario(email) {
        try {
            // recupera o usuário pelo email
            const userRecord = await admin.auth().getUserByEmail(email);
    
            // recupera o documento do usuário no Firestore
            const usuarioSnapshot = await this.db.collection(COLECAO.USUARIO).doc(email).get();
            
            if (!usuarioSnapshot.exists) {
                throw new Error("Usuário não cadastrado!");
            }
    
            // recupera as atividades associadas ao usuário
            const atividades = usuarioSnapshot.get('atividades') || [];
    
            // exclui as atividades associadas ao usuário
            for (const atividadeId of atividades) {
                await this.db.collection(COLECAO.ATIVIDADE).doc(atividadeId).delete();
            }
    
            // deleta o usuário do Firebase Authentication
            await admin.auth().deleteUser(userRecord.uid);
    
            // deleta o documento do usuário no Firestore
            await this.db.collection(COLECAO.USUARIO).doc(email).delete();
    
            return true;
        } catch (error) {
            if (error.message === "There is no user record corresponding to the provided identifier.") {
                throw new Error("Usuário não cadastrado!");
            }
            throw new Error("Erro ao deletar usuário: " + error.message);
        }
    }
    
}
