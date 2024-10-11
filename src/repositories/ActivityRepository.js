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

    async cadastrarAtividade(titulo, descricao, categoria, dificuldade, tempoConcentracao, email) {
        const pontos = this.calcularPontos(tempoConcentracao, dificuldade);
    
        const atividadeRef = this.db.collection(COLLECTION_ATIVIDADES).doc();
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
    
        // registrar a nova atividade
        await atividadeRef.set(atividade);
    
        const usuarioRef = this.db.collection(COLLECTION_USUARIOS).doc(email);
        const usuarioDoc = await usuarioRef.get();
    
        if (!usuarioDoc.exists) {
            throw new Error("Usuário não encontrado!");
        }
    
        const usuarioData = usuarioDoc.data();
        const novosPontos = usuarioData.pontos + pontos;
        const novoTotalPontos = usuarioData.totalPontos + pontos;
    
        // aumentando a ofensiva
        const dataUltimaAtividade = usuarioData.ultimaAtividade;
        const dataFormatada = dataAtual.toLocaleDateString('pt-BR');
        let novaOfensiva = usuarioData.ofensiva;
        let novaMaiorOfensiva = usuarioData.maiorOfensiva;

        if (dataUltimaAtividade !== dataFormatada) {
            novaOfensiva += 1;
            if (novaOfensiva > novaMaiorOfensiva) {
                novaMaiorOfensiva = novaOfensiva;
            }
        }

        // atualizando os pontos e a ofensiva do usuário
        await usuarioRef.update({
            atividades: admin.firestore.FieldValue.arrayUnion(atividadeId),
            pontos: novosPontos,
            totalPontos: novoTotalPontos,
            ofensiva: novaOfensiva,
            maiorOfensiva: novaMaiorOfensiva,
            ultimaAtividade: dataFormatada
        });
    
        return atividadeId;
    }

    async mostrarAtividades(email) {
        try {
            const usuarioSnapshot = await this.db.collection(COLLECTION_USUARIOS).doc(email).get();
            if (!usuarioSnapshot.exists) {
                throw new Error("Usuário não encontrado.");
            }

            const idAtividades = await usuarioSnapshot.get('atividades') || [];
            const atividades = [];

            for(const id of idAtividades){
                const atividadeSnapshot = await this.db.collection(COLLECTION_ATIVIDADES).doc(id).get();

                if (atividadeSnapshot.exists) {
                    atividades.push(atividadeSnapshot.data())
                }
            }

            return atividades;
        } catch (error) {
            throw new Error("Erro ao buscar atividades no banco de dados.");
        }
    }

    async atualizarAtividade(id, titulo = null, descricao = null, categoria = null) {
        try {
            const atividadeRef = this.db.collection(COLLECTION_ATIVIDADES).doc(id);
            const atividadeSnapshot = await atividadeRef.get();
    
            if (!atividadeSnapshot.exists) {
                throw new Error("Atividade não encontrada!");
            }
    
            const atualizacoes = {
                titulo: titulo !== null ? titulo : atividadeSnapshot.get('titulo'),
                descricao: descricao !== null ? descricao : atividadeSnapshot.get('descricao'),
                categoria: categoria !== null ? categoria : atividadeSnapshot.get('categoria')
            };
    
            if (Object.keys(atualizacoes).length > 0) {
                await atividadeRef.update(atualizacoes);
            }
    
        } catch (error) {
            throw new Error("Erro ao atualizar a atividade: " + error.message);
        }
    }

    async deletarAtividade(id) {
        try {
            const atividadeRef = this.db.collection(COLLECTION_ATIVIDADES).doc(id);
            await atividadeRef.delete();
        } catch (error) {
            throw new Error("Erro ao deletar a atividade: " + error.message);
        }
    }
}
