// --- SERVIÇO DE ENVIO DO ORÇAMENTO ---
(function (global) {
    "use strict";

    var NAKA = global.NAKA || (global.NAKA = {});
    NAKA.servicos = NAKA.servicos || {};

    // --- MONTAGEM DA MENSAGEM ENVIADA PELO WHATSAPP ---
    function montarMensagem(dados) {
        var linhas = [
            "Olá! Gostaria de solicitar um orçamento.",
            "",
            "Nome: " + dados.nome + " " + dados.sobrenome,
            "E-mail: " + dados.email,
            "Telefone: " + dados.telefone,
            "Estilo: " + dados.estilo,
            "Local: " + dados.local,
            "Tamanho: " + dados.tamanho
        ];

        if (dados.mensagem) {
            linhas.push("", "Detalhes: " + dados.mensagem);
        }

        if (dados.quantidadeReferencias > 0) {
            linhas.push(
                "",
                "Tenho " +
                    dados.quantidadeReferencias +
                    " imagem(ns) de referência para enviar aqui na conversa."
            );
        }

        return linhas.join("\n");
    }

    // --- ENVIO DA SOLICITAÇÃO DE ORÇAMENTO ---
    function enviarOrcamento(dados, arquivos) {
        var envio = (NAKA.config && NAKA.config.envio) || {};

        if (envio.modo === "endpoint") {
            if (!envio.endpoint) {
                return Promise.reject(new Error("Endpoint de envio não configurado em NAKA.config.envio.endpoint."));
            }

            // --- MONTAGEM DO CORPO COM OS CAMPOS DO FORMULÁRIO ---
            var corpo = new FormData();

            Object.keys(dados).forEach(function (chave) {
                corpo.append(chave, dados[chave]);
            });

            // --- ANEXO DAS IMAGENS DE REFERÊNCIA ---
            (arquivos || []).forEach(function (arquivo) {
                corpo.append("referencias[]", arquivo, arquivo.name);
            });

            // --- REQUISIÇÃO AO ENDPOINT ---
            return fetch(envio.endpoint, {
                method: "POST",
                body: corpo,
                headers: { Accept: "application/json" }
            }).then(function (resposta) {
                if (!resposta.ok) {
                    throw new Error("Falha no envio. Código " + resposta.status + ".");
                }
                return { canal: "endpoint" };
            });
        }

        // --- ABERTURA DA CONVERSA NO WHATSAPP ---
        var numero = (NAKA.config.contato.whatsappNumero || "").replace(/\D/g, "");
        var url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(montarMensagem(dados));
        var janela = global.open(url, "_blank", "noopener");

        if (!janela) {
            return Promise.resolve({
                canal: "whatsapp",
                aviso: "bloqueado",
                url: url
            });
        }

        return Promise.resolve({ canal: "whatsapp", url: url });
    }

    // --- EXPOSIÇÃO DO SERVIÇO ---
    NAKA.servicos.enviarOrcamento = enviarOrcamento;
    NAKA.servicos.montarMensagemOrcamento = montarMensagem;
})(window);
