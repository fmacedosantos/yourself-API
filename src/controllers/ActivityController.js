// importações
import { Atividade } from "../models/ActivityModel.js";

export class AtividadeController {
    async cadastrarAtividade(request, response) {
        try {
            // variáveis do body
            const { titulo, descricao, categoria, dificuldade, tempoConcentracao, email } = request.body;

            // chamando o model
            const atividade = new Atividade();

            // atribuindo as variáveis ao model
            atividade.titulo = titulo;
            atividade.descricao = descricao;
            atividade.categoria = categoria;
            atividade.dificuldade = dificuldade;
            atividade.tempoConcentracao = tempoConcentracao;
            atividade.email = email;

            // chamando o método do repository
            const atividadeId = await atividade.cadastrarAtividade();
            response.status(201).send({ message: "Atividade cadastrada com sucesso!", atividadeId });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    async mostrarAtividades(request, response) {
        try {
            const { email } = request.body;
    
            const atividade = new Atividade();
            atividade.email = email;
    
            const atividades = await atividade.mostrarAtividades();
    
            response.status(200).send({ atividades });
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
