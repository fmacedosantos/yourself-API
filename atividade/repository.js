import admin from 'firebase-admin';

export class AtividadeRepository {

    db = admin.firestore();

    calcularPontos(tempoConcentracao, dificuldade){
        const dificuldadeFormatada = 0
        switch (dificuldade) {
            case "Facil":
                dificuldadeFormatada = 0.5
                break
            case "Media":
                dificuldadeFormatada = 1
                break
            case "Dificil":
                dificuldadeFormatada = 1.5
        }
        return pontos = tempoConcentracao * dificuldadeFormatada
    }

    registrarAtividade(titulo, descricao, categoria, dificuldade, tempoConcentracao){
        const pontos = this.calcularPontos(tempoConcentracao, dificuldade)

        const atividade = {
            titulo: titulo,
            descricao: descricao || "",
            categoria: categoria,
            dificuldade: dificuldade,
            tempoConcentracao: tempoConcentracao,
            pontos: pontos
        }
        return this.db
            .collection('atividades')
            .add(atividade)
            .catch(error => {
                return Promise.reject({
                    code: 500,
                    message: "Erro ao cadastrar atividade: " + error.message
                })
            })
    }

}