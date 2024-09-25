import { Atividade } from "./model.js"

export class AtividadeController {
    registrarAtividade(request, response){
        const {titulo, descricao, categoria, dificuldade, tempoConcentracao} = request.body

        const atividade = new Atividade()
        atividade.titulo = titulo;
        atividade.descricao = descricao;
        atividade.categoria = categoria;
        atividade.dificuldade = dificuldade;
        atividade.tempoConcentracao = tempoConcentracao;

        atividade.registrarAtividade()
            .then(() => {
                response.status(201).send({ message: "Atividade registrada com sucesso!" })
            })
            .catch(error => {
                response.status(500).json({ message: error.message })
            })
    }
}