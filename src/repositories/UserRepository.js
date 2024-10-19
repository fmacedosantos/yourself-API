import admin from 'firebase-admin';
import { atualizarOfensiva } from '../services/ActivityServices.js';
import { COLECAO } from '../constants/Collections.js';

export class UsuarioRepository {

    db = admin.firestore();

    async cadastrarUsuario(email, senha, nome, apelido) {

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

    }    

    async mostrarUsuario(email) {

        const usuarioRef = this.db.collection(COLECAO.USUARIO).doc(email);
        const usuarioSnapshot = await usuarioRef.get();

        const usuarioData = usuarioSnapshot.data();

        return {
            email: usuarioData.email,
            nome: usuarioData.nome,
            apelido: usuarioData.apelido,
            anoRegistro: usuarioData.anoRegistro,
            ultimaAtividade: usuarioData.ultimaAtividade
        };

    }       

    async mostrarEstatisticas(email) {
        
        const usuarioRef = this.db.collection(COLECAO.USUARIO).doc(email);
        const usuarioSnapshot = await usuarioRef.get();

        const usuarioData = usuarioSnapshot.data();

        // Verifique se 'ultimaAtividade' está presente e no formato correto
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
        
    } 
    
    async mostrarPreferencias(email) {

        const usuarioRef = this.db.collection(COLECAO.USUARIO).doc(email);
        const usuarioSnapshot = await usuarioRef.get();

        const usuarioData = usuarioSnapshot.data();

        return {
            preferenciaConcentracao: usuarioData.preferenciaConcentracao,
            preferenciaDescanso: usuarioData.preferenciaDescanso
        };
        
    }

    async atualizarUsuario(email, nome = null, apelido = null, novaSenha = null) {
        
        // recupera o documento do usuário
        const usuarioSnapshot = await this.db.collection(COLECAO.USUARIO).doc(email).get();

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

    }
    
    async atualizarPreferencias(email, preferenciaConcentracao = null, preferenciaDescanso = null) {
        
        // Recupera o documento do usuário no Firestore
        const usuarioSnapshot = await this.db.collection(COLECAO.USUARIO).doc(email).get();

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
        
    }    

    async deletarUsuario(email) {
        
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
        
    }
    
}
