import admin from 'firebase-admin';
import { atualizarOfensiva, calcularPontos } from '../services/ActivityServices.js';
import { COLECAO } from '../constants/Collections.js';

export class AtividadeRepository {

    db = admin.firestore();

    async cadastrarAtividade(titulo, descricao, categoria, dificuldade, tempoConcentracao, email) {

        const pontos = calcularPontos(tempoConcentracao, dificuldade);
    
        const atividadeRef = this.db.collection(COLECAO.ATIVIDADE).doc();
        const atividadeId = atividadeRef.id;
    
        const dataAtual = new Date();
        const data = dataAtual.toLocaleDateString('pt-BR'); 
        const atividade = {
            id: atividadeId,
            titulo,
            descricao: descricao || "",
            categoria,
            dificuldade,
            tempoConcentracao,
            pontos,
            email,
            data: data 
        };
    
        const usuarioRef = this.db.collection(COLECAO.USUARIO).doc(email);
        const usuarioDoc = await usuarioRef.get();
        const usuarioData = usuarioDoc.data();
        const novosPontos = usuarioData.pontos + pontos;
        const novoTotalPontos = usuarioData.totalPontos + pontos;
    
        const { novaOfensiva, novaMaiorOfensiva } = atualizarOfensiva(usuarioData, true);
    
        await usuarioRef.update({
            atividades: admin.firestore.FieldValue.arrayUnion(atividadeId),
            pontos: novosPontos,
            totalPontos: novoTotalPontos,
            ofensiva: novaOfensiva,
            maiorOfensiva: novaMaiorOfensiva,
            ultimaAtividade: data 
        });

        await atividadeRef.set(atividade);

    }
        

    async mostrarAtividades(email) {
        
        const usuarioRef = this.db.collection(COLECAO.USUARIO).doc(email);
        const usuarioSnapshot = await usuarioRef.get();

        const usuarioData = usuarioSnapshot.data();

        const idAtividades = usuarioData.atividades || [];
        const atividades = [];

        for(const id of idAtividades){
            const atividadeSnapshot = await this.db.collection(COLECAO.ATIVIDADE).doc(id).get();
            if (atividadeSnapshot.exists) {
                atividades.push(atividadeSnapshot.data());
            }
        }

        return atividades;
        
    }

    async atualizarAtividade(id, titulo = null, descricao = null, categoria= null) {
        const atividadeSnapshot = await this.db.collection(COLECAO.ATIVIDADE).doc(id).get();

        const atividadeData = atividadeSnapshot.data();

        const atualizacoes = {
            titulo: titulo !== null ? titulo : atividadeData.titulo,
            descricao: descricao !== null ? descricao : atividadeData.descricao,
            categoria: categoria !== null ? categoria : atividadeData.categoria
        }

        if (Object.keys(atualizacoes).length > 0) {
            await this.db.collection(COLECAO.ATIVIDADE).doc(id).update(atualizacoes);
        }
        
    }

    async deletarAtividade(id) {
        
        const atividadeRef = this.db.collection(COLECAO.ATIVIDADE).doc(id);

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
    
    }
    
}
