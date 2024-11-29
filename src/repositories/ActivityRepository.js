const admin = require('firebase-admin');
const { atualizarOfensiva, calcularPontos } = require('../services/ActivityServices.js');
const  COLECAO  = require('../constants/Collections.js');

class AtividadeRepository {

    db = admin.firestore();

    async cadastrarAtividade(titulo, descricao, categoria, dificuldade, tempoConcentracao, email) {
        const pontos = calcularPontos(tempoConcentracao, dificuldade);
        const atividadeRef = this.db.collection(COLECAO.ATIVIDADE).doc();
        const atividadeId = atividadeRef.id;
    
        // Obter a data e a hora atuais
        const data = new Date();
        
        // Formatar apenas o dia para o campo ultimaAtividade
        const ultimaAtividade = data.toLocaleDateString('pt-BR');

        const atividade = {
            id: atividadeId,
            titulo,
            descricao: descricao || "",
            categoria,
            dificuldade,
            tempoConcentracao,
            pontos,
            email,
            data: admin.firestore.Timestamp.fromDate(data)
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
            ultimaAtividade 
        });

        await atividadeRef.set(atividade);
    }
        

    async mostrarAtividades(email) {
        const usuarioRef = this.db.collection(COLECAO.USUARIO).doc(email);
        const usuarioSnapshot = await usuarioRef.get();
    
        const usuarioData = usuarioSnapshot.data();
        const idAtividades = usuarioData.atividades || [];
        const atividades = [];
    
        const dataLimite = new Date();
        dataLimite.setMonth(dataLimite.getMonth() - 5);
    
        for (const id of idAtividades) {
            const atividadeSnapshot = await this.db.collection(COLECAO.ATIVIDADE).doc(id).get();
    
            if (atividadeSnapshot.exists) {
                const atividadeData = atividadeSnapshot.data();
    
                if (atividadeData.data.toDate() >= dataLimite) {
                    atividades.push(atividadeData);
                }
            }
        }
    
        atividades.sort((a, b) => b.data.toDate() - a.data.toDate());
    
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

module.exports = AtividadeRepository;