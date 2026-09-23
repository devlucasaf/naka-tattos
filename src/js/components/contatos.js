(function (global) {
    'use strict';

    var NAKA = global.NAKA || (global.NAKA = {});
    NAKA.componentes = NAKA.componentes || {};

    function montarIcone(nome, solido) {
        return (
            '<svg class="icone' +
            (solido ? ' icone--solido' : '') +
            '" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#icone-' +
            nome +
            '"></use></svg>'
        );
    }

    function resolverUrl(chave) {
        var config = NAKA.config;
        var rede = config.redes.filter(function (item) {
            return item.id === chave;
        })[0];

        if (rede) {
            return rede.url;
        }

        if (chave === 'mapa') {
            return config.contato.enderecoMapa;
        }

        return null;
    }

    function resolverTexto(chave) {
        var contato = NAKA.config.contato;

        if (chave === 'whatsapp') {
            return contato.whatsappExibicao;
        }

        if (chave === 'email') {
            return contato.email;
        }

        if (chave === 'endereco') {
            return contato.endereco;
        }

        return null;
    }

    function iniciarContatos() {
        if (!NAKA.config) {
            return;
        }

        document.querySelectorAll('[data-link]').forEach(function (elemento) {
            var url = resolverUrl(elemento.getAttribute('data-link'));
            if (!url) {
                return;
            }

            elemento.setAttribute('href', url);

            if (url.indexOf('mailto:') !== 0) {
                elemento.setAttribute('target', '_blank');
                elemento.setAttribute('rel', 'noopener noreferrer');
            }
        });

        document.querySelectorAll('[data-texto]').forEach(function (elemento) {
            var texto = resolverTexto(elemento.getAttribute('data-texto'));
            if (texto) {
                elemento.textContent = texto;
            }
        });

        document.querySelectorAll('[data-redes]').forEach(function (container) {
            container.innerHTML = NAKA.config.redes
                .map(function (rede) {
                    var externo =
                        rede.url.indexOf('mailto:') === 0
                            ? ''
                            : ' target="_blank" rel="noopener noreferrer"';

                    return (
                        '<li><a class="rodape__social" href="' +
                        rede.url +
                        '"' +
                        externo +
                        ' aria-label="' +
                        rede.nome +
                        ' de Naka Tattoos — ' +
                        rede.usuario +
                        '" title="' +
                        rede.nome +
                        '">' +
                        montarIcone(rede.icone, rede.solido) +
                        '</a></li>'
                    );
                })
                .join('');
        });

        document.querySelectorAll('[data-contatos-lista]').forEach(function (container) {
            var itens = NAKA.config.redes.map(function (rede) {
                return {
                    url: rede.url,
                    rotulo: rede.nome,
                    valor: rede.usuario,
                    icone: rede.icone,
                    solido: rede.solido
                };
            });

            itens.push({
                url: NAKA.config.contato.enderecoMapa,
                rotulo: 'Endereço',
                valor: NAKA.config.contato.endereco,
                icone: 'mapa'
            });

            itens.push({
                rotulo: 'Atendimento',
                valor: NAKA.config.contato.atendimento,
                icone: 'relogio'
            });

            container.innerHTML = itens
                .map(function (item) {
                    var conteudo =
                        montarIcone(item.icone, item.solido) +
                        '<span class="contato-item__rotulo">' +
                        item.rotulo +
                        '</span><span class="contato-item__valor">' +
                        item.valor +
                        '</span>';

                    if (!item.url) {
                        return (
                            '<li class="contato-item"><div class="contato-item__estatico">' +
                            conteudo +
                            '</div></li>'
                        );
                    }

                    var externo =
                        item.url.indexOf('mailto:') === 0
                            ? ''
                            : ' target="_blank" rel="noopener noreferrer"';

                    return (
                        '<li class="contato-item"><a class="contato-item__link" href="' +
                        item.url +
                        '"' +
                        externo +
                        '>' +
                        conteudo +
                        '</a></li>'
                    );
                })
                .join('');
        });

        document.querySelectorAll('[data-ano]').forEach(function (elemento) {
            elemento.textContent = String(new Date().getFullYear());
        });
    }

    NAKA.componentes.iniciarContatos = iniciarContatos;
})(window);
