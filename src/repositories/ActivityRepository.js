import admin from 'firebase-admin';

const COLLECTION_ATIVIDADES = 'atividades';
const COLLECTION_USUARIOS = 'usuarios';

export class AtividadeRepository {

    db = admin.firestore();

    calcularPontos(tempoConcentracao, dificuldade) {
        let dificuldadeFormatada = 0;
        switch (dificuldade) {
            case 1:
                dificuldadeFormatada = 0.5;
                break;
            case 2:
                dificuldadeFormatada = 1;
                break;
            case 3:
                dificuldadeFormatada = 1.5;
                break;
        }
        return tempoConcentracao * dificuldadeFormatada;
    }

    async registrarAtividade(titulo, descricao, categoria, dificuldade, tempoConcentracao, emailUsuario) {
        const pontos = this.calcularPontos(tempoConcentracao, dificuldade);
    
        const atividadeRef = this.db.collection(COLLECTION_ATIVIDADES).doc();
        const atividadeId = atividadeRef.id;
        const id = atividadeId;
    
        const atividade = {
            id,
            titulo,
            descricao: descricao || "",
            categoria,
            dificuldade,
            tempoConcentracao,
            pontos,
            usuario: emailUsuario
        };
    
        // registrar a nova atividade
        await atividadeRef.set(atividade);
    
        const usuarioRef = this.db.collection(COLLECTION_USUARIOS).doc(emailUsuario);
        const usuarioDoc = await usuarioRef.get();
    
        if (!usuarioDoc.exists) {
            throw new Error("Usuário não encontrado!");
        }
    
        const usuarioData = usuarioDoc.data();
        const novosPontos = usuarioData.pontos + pontos;
        const novoTotalPontos = usuarioData.totalPontos + pontos;
    
        // atualizar os pontos do usuário
        await usuarioRef.update({
            atividades: admin.firestore.FieldValue.arrayUnion(atividadeId),
            pontos: novosPontos,
            totalPontos: novoTotalPontos
        });
    
        return atividadeId;
    }
    

    async buscarAtividadesPorIds(idsAtividades) {
        try {
            const atividades = [];
    
            for (const id of idsAtividades) {
                const atividadeSnapshot = await this.db.collection(COLLECTION_ATIVIDADES).doc(id).get();
    
                if (atividadeSnapshot.exists) {
                    atividades.push(atividadeSnapshot.data());
                }
            }
    
            return atividades;
        } catch (error) {
            throw new Error("Erro ao buscar atividades no banco de dados.");
        }
    }

    async atualizarAtividade(id, titulo = null, descricao = null, categoria = null) {
        try {
            // recupera a referência da atividade pelo ID
            const atividadeRef = this.db.collection(COLLECTION_ATIVIDADES).doc(id);
            const atividadeSnapshot = await atividadeRef.get();
    
            if (!atividadeSnapshot.exists) {
                throw new Error("Atividade não encontrada!");
            }
    
            // armazena as mudanças
            const atualizacoes = {
                titulo: titulo !== null ? titulo : atividadeSnapshot.get('titulo'),
                descricao: descricao !== null ? descricao : atividadeSnapshot.get('descricao'),
                categoria: categoria !== null ? categoria : atividadeSnapshot.get('categoria')
            };
    
            // verifica se há atualizações para fazer
            if (Object.keys(atualizacoes).length > 0) {
                // atualiza o documento da atividade no Firestore
                await atividadeRef.update(atualizacoes);
            }
    
        } catch (error) {
            throw new Error("Erro ao atualizar a atividade: " + error.message);
        }
    }
    
    
    
}
