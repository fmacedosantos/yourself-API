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

        const atividade = {
            titulo,
            descricao: descricao || "",
            categoria,
            dificuldade,
            tempoConcentracao,
            pontos,
            usuario: emailUsuario
        };

        await atividadeRef.set(atividade);

        const usuarioRef = this.db.collection(COLLECTION_USUARIOS).doc(emailUsuario);
        const usuarioDoc = await usuarioRef.get();

        if (!usuarioDoc.exists) {
            throw new Error("Usuário não encontrado!");
        }

        await usuarioRef.update({
            atividades: admin.firestore.FieldValue.arrayUnion(atividadeId)
        });

        return atividadeId;
    }
}