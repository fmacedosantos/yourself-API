// importações
import { Atividade } from "../models/ActivityModel.js";

export class AtividadeController {
    async registrarAtividade(request, response) {
        try {
            // variáveis do body
            const { titulo, descricao, categoria, dificuldade, tempoConcentracao, emailUsuario } = request.body;

            // chamando o model
            const atividade = new Atividade();

            // atribuindo as variáveis ao model
            atividade.titulo = titulo;
            atividade.descricao = descricao;
            atividade.categoria = categoria;
            atividade.dificuldade = dificuldade;
            atividade.tempoConcentracao = tempoConcentracao;
            atividade.emailUsuario = emailUsuario;

            // chamando o método do repository
            const atividadeId = await atividade.registrarAtividade();
            response.status(201).send({ message: "Atividade cadastrada com sucesso!", atividadeId });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    async atualizarAtividade(request, response) {
        try {
            // variáveis do body
            const { id, titulo, descricao, categoria } = request.body;

            // chamando o model
            const atividade = new Atividade();

            // atribuindo as variáveis ao model
            atividade.id = id;
            atividade.titulo = titulo;
            atividade.descricao = descricao;
            atividade.categoria = categoria;

            // chamando o método do repository para atualizar a atividade
            await atividade.atualizarAtividade();

            // envia a resposta com a atividade atualizada
            response.status(200).send({ message: 'Atividade atualizada com sucesso!' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}
