import admin from 'firebase-admin';
import { atualizarOfensiva } from '../services/ActivityServices.js';
import { COLECAO } from '../constants/Collections.js';

export class UsuarioRepository {

    db = admin.firestore();

    async cadastrarUsuario(email, senha, nome, apelido) {

        await admin.auth().createUser({
            email: email,
            password: senha
        });

        const usuarioRef = this.db.collection(COLECAO.USUARIO).doc(email);

        const usuario = {
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
        }
    
        await usuarioRef.set(usuario);

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

        const { novaOfensiva, novaMaiorOfensiva } = atualizarOfensiva(usuarioData, false);

        if (novaOfensiva !== usuarioData.ofensiva || novaMaiorOfensiva !== usuarioData.maiorOfensiva) {
            await usuarioRef.update({
                ofensiva: novaOfensiva,
                maiorOfensiva: novaMaiorOfensiva
            });
        }

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
        
        const usuarioSnapshot = await this.db.collection(COLECAO.USUARIO).doc(email).get();

        const usuarioData = usuarioSnapshot.data();

        const atualizacoes = {
            nome: nome !== null ? nome : usuarioData.nome,
            apelido: apelido !== null ? apelido : usuarioData.apelido
        };

        if (novaSenha !== null) {
            const userRecord = await admin.auth().getUserByEmail(email);
            await admin.auth().updateUser(userRecord.uid, { password: novaSenha });
        }

        if (Object.keys(atualizacoes).length > 0) {
            await this.db.collection(COLECAO.USUARIO).doc(email).update(atualizacoes);
        }

    }
    
    async atualizarPreferencias(email, preferenciaConcentracao = null, preferenciaDescanso = null) {
        
        const usuarioSnapshot = await this.db.collection(COLECAO.USUARIO).doc(email).get();

        const usuarioData = usuarioSnapshot.data();

        const atualizacoes = {};
        if (preferenciaConcentracao !== null) {
            atualizacoes.preferenciaConcentracao = preferenciaConcentracao;
        }
        if (preferenciaDescanso !== null) {
            atualizacoes.preferenciaDescanso = preferenciaDescanso;
        }

        if (Object.keys(atualizacoes).length > 0) {
            await this.db.collection(COLECAO.USUARIO).doc(email).update(atualizacoes);
        }
        
    }    

    async deletarUsuario(email) {
        
        const userRecord = await admin.auth().getUserByEmail(email);

        const usuarioSnapshot = await this.db.collection(COLECAO.USUARIO).doc(email).get();
        
        if (!usuarioSnapshot.exists) {
            throw new Error("Usuário não cadastrado!");
        }

        const atividades = usuarioSnapshot.get('atividades') || [];

        for (const atividadeId of atividades) {
            await this.db.collection(COLECAO.ATIVIDADE).doc(atividadeId).delete();
        }

        await admin.auth().deleteUser(userRecord.uid);

        await this.db.collection(COLECAO.USUARIO).doc(email).delete();
        
    }
    
}
