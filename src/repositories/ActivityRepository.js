import admin from 'firebase-admin';
import { atualizarOfensiva, calcularPontos } from '../services/ActivityServices.js';
import { COLECAO } from '../constants/Collections.js';

export class AtividadeRepository {

    db = admin.firestore();

    async cadastrarAtividade(titulo, descricao, categoria, dificuldade, tempoConcentracao, email) {
        const pontos = calcularPontos(tempoConcentracao, dificuldade);
    
        const atividadeRef = this.db.collection(COLECAO.ATIVIDADE).doc();
        const atividadeId = atividadeRef.id;
        const id = atividadeId;
    
        const dataAtual = new Date();
        const data = dataAtual.toLocaleDateString('pt-BR'); 
    
        const atividade = {
            id,
            titulo,
            descricao: descricao || "",
            categoria,
            dificuldade,
            tempoConcentracao,
            pontos,
            email,
            data
        };
    
        await atividadeRef.set(atividade);
    
        const usuarioRef = this.db.collection(COLECAO.USUARIO).doc(email);
        const usuarioDoc = await usuarioRef.get();
    
        if (!usuarioDoc.exists) {
            throw new Error("Usuário não encontrado!");
        }
    
        const usuarioData = usuarioDoc.data();
        const novosPontos = usuarioData.pontos + pontos;
        const novoTotalPontos = usuarioData.totalPontos + pontos;
    
        // Atualizar a ofensiva ao registrar a atividade
        const { novaOfensiva, novaMaiorOfensiva } = atualizarOfensiva(usuarioData, true);
    
        await usuarioRef.update({
            atividades: admin.firestore.FieldValue.arrayUnion(atividadeId),
            pontos: novosPontos,
            totalPontos: novoTotalPontos,
            ofensiva: novaOfensiva,
            maiorOfensiva: novaMaiorOfensiva,
            ultimaAtividade: data // Atualizando a data da última atividade
        });
    
        return atividadeId;
    }
        

    async mostrarAtividades(email) {
        try {
            const usuarioRef = this.db.collection(COLECAO.USUARIO).doc(email);
            const usuarioSnapshot = await usuarioRef.get();
            if (!usuarioSnapshot.exists) {
                throw new Error("Usuário não encontrado.");
            }

            const usuarioData = usuarioSnapshot.data();

            // Atualizar a ofensiva ao acessar os dados do usuário
            const dataAtual = new Date();
            const { novaOfensiva, novaMaiorOfensiva } = atualizarOfensiva(usuarioData, false);

            // Se a ofensiva foi atualizada, salvar no Firestore
            if (novaOfensiva !== usuarioData.ofensiva || novaMaiorOfensiva !== usuarioData.maiorOfensiva) {
                await usuarioRef.update({
                    ofensiva: novaOfensiva,
                    maiorOfensiva: novaMaiorOfensiva
                });
            }

            const idAtividades = usuarioData.atividades || [];
            const atividades = [];

            for(const id of idAtividades){
                const atividadeSnapshot = await this.db.collection(COLECAO.ATIVIDADE).doc(id).get();
                if (atividadeSnapshot.exists) {
                    atividades.push(atividadeSnapshot.data());
                }
            }

            return atividades;
        } catch (error) {
            throw new Error("Erro ao buscar atividades no banco de dados.");
        }
    }

    async deletarAtividade(id) {
        try {
            const atividadeRef = this.db.collection(COLECAO.ATIVIDADE).doc(id);
            const atividadeSnapshot = await atividadeRef.get();
    
            if (!atividadeSnapshot.exists) {
                throw new Error("Atividade não encontrada.");
            }
    
            await atividadeRef.delete();
    
            const usuariosQuery = await this.db.collection(COLECAO.USUARIO)
                .where("atividades", "array-contains", id).get();
    
            if (!usuariosQuery.empty) {
                usuariosQuery.forEach(async (usuarioDoc) => {
                    await usuarioDoc.ref.update({
                        atividades: admin.firestore.FieldValue.arrayRemove(id)
                    });
                });
            }
    
        } catch (error) {
            throw new Error("Erro ao deletar a atividade: " + error.message);
        }
    }
    
}
