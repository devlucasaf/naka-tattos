(function (global) {
    'use strict';

    var NAKA = global.NAKA || (global.NAKA = {});
    NAKA.componentes = NAKA.componentes || {};

    function iniciarFaq() {
        var accordion = document.querySelector('[data-accordion]');

        if (!accordion) {
            return;
        }

        var gatilhos = Array.prototype.slice.call(
            accordion.querySelectorAll('[data-accordion-gatilho]')
        );

        if (!gatilhos.length) {
            return;
        }

        function alternar(gatilho, forcarFechado) {
            var painel = document.getElementById(gatilho.getAttribute('aria-controls'));
            var aberto = gatilho.getAttribute('aria-expanded') === 'true';
            var novoEstado = forcarFechado ? false : !aberto;

            gatilho.setAttribute('aria-expanded', novoEstado ? 'true' : 'false');
            painel.setAttribute('data-aberto', novoEstado ? 'true' : 'false');
        }

        gatilhos.forEach(function (gatilho, posicao) {
            alternar(gatilho, true);

            gatilho.addEventListener('click', function () {
                var vaiAbrir = gatilho.getAttribute('aria-expanded') !== 'true';

                gatilhos.forEach(function (outro) {
                    if (outro !== gatilho) {
                        alternar(outro, true);
                    }
                });

                alternar(gatilho, !vaiAbrir);
            });

            gatilho.addEventListener('keydown', function (evento) {
                var destino = null;

                if (evento.key === 'ArrowDown') {
                    destino = gatilhos[(posicao + 1) % gatilhos.length];
                } else if (evento.key === 'ArrowUp') {
                    destino = gatilhos[(posicao - 1 + gatilhos.length) % gatilhos.length];
                } else if (evento.key === 'Home') {
                    destino = gatilhos[0];
                } else if (evento.key === 'End') {
                    destino = gatilhos[gatilhos.length - 1];
                }

                if (destino) {
                    evento.preventDefault();
                    destino.focus();
                }
            });
        });
    }

    NAKA.componentes.iniciarFaq = iniciarFaq;
})(window);
