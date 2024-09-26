import { Atividade } from "./model.js";

export class AtividadeController {
    async registrarAtividade(request, response) {
        try {
            const { titulo, descricao, categoria, dificuldade, tempoConcentracao, emailUsuario } = request.body;

            const atividade = new Atividade();
            atividade.titulo = titulo;
            atividade.descricao = descricao;
            atividade.categoria = categoria;
            atividade.dificuldade = dificuldade;
            atividade.tempoConcentracao = tempoConcentracao;
            atividade.emailUsuario = emailUsuario;

            const atividadeId = await atividade.registrarAtividade();
            response.status(201).send({ message: "Atividade cadastrada com sucesso!", atividadeId });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}
