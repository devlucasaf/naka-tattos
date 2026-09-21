(function (global) {
    'use strict';

    var NAKA = global.NAKA || (global.NAKA = {});
    NAKA.componentes = NAKA.componentes || {};

    function iniciarGaleria() {
        var grade = document.querySelector('[data-galeria]');
        var modal = document.getElementById('lightbox');

        if (!grade || !modal) {
            return;
        }

        var gatilhos = Array.prototype.slice.call(grade.querySelectorAll('[data-galeria-item]'));

        if (!gatilhos.length) {
            return;
        }

        var imagem = modal.querySelector('[data-lightbox-imagem]');
        var legenda = modal.querySelector('[data-lightbox-legenda]');
        var contador = modal.querySelector('[data-lightbox-contador]');
        var anterior = modal.querySelector('[data-lightbox-anterior]');
        var proximo = modal.querySelector('[data-lightbox-proximo]');
        var fechar = modal.querySelector('[data-lightbox-fechar]');

        var indice = 0;
        var elementoAnterior = null;

        var itens = gatilhos.map(function (gatilho) {
            var img = gatilho.querySelector('img');
            return {
                src: img.getAttribute('src'),
                alt: img.getAttribute('alt'),
                legenda: gatilho.getAttribute('data-legenda') || img.getAttribute('alt')
            };
        });

        var navegavel = itens.length > 1;
        anterior.hidden = !navegavel;
        proximo.hidden = !navegavel;

        function atualizar() {
            var item = itens[indice];
            imagem.setAttribute('src', item.src);
            imagem.setAttribute('alt', item.alt);
            legenda.textContent = item.legenda;
            contador.textContent = indice + 1 + ' / ' + itens.length;
        }

        function abrir(posicao) {
            indice = posicao;
            elementoAnterior = document.activeElement;
            atualizar();
            modal.setAttribute('data-aberto', 'true');
            modal.removeAttribute('aria-hidden');
            document.body.style.overflow = 'hidden';
            fechar.focus();
        }

        function fecharModal() {
            modal.setAttribute('data-aberto', 'false');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.removeProperty('overflow');

            if (elementoAnterior && typeof elementoAnterior.focus === 'function') {
                elementoAnterior.focus();
            }
        }

        function mover(passo) {
            indice = (indice + passo + itens.length) % itens.length;
            atualizar();
        }

        gatilhos.forEach(function (gatilho, posicao) {
            gatilho.addEventListener('click', function (evento) {
                /* Sem JavaScript o link abre a imagem em tamanho original. */
                evento.preventDefault();
                abrir(posicao);
            });
        });

        fechar.addEventListener('click', fecharModal);
        anterior.addEventListener('click', function () {
            mover(-1);
        });
        proximo.addEventListener('click', function () {
            mover(1);
        });

        modal.addEventListener('click', function (evento) {
            if (evento.target === modal) {
                fecharModal();
            }
        });

        modal.addEventListener('keydown', function (evento) {
            if (evento.key === 'Escape') {
                evento.stopPropagation();
                fecharModal();
                return;
            }

            if (navegavel && evento.key === 'ArrowRight') {
                mover(1);
                return;
            }

            if (navegavel && evento.key === 'ArrowLeft') {
                mover(-1);
                return;
            }

            if (evento.key !== 'Tab') {
                return;
            }

            var focaveis = Array.prototype.slice
                .call(modal.querySelectorAll('button:not([hidden])'))
                .filter(function (elemento) {
                    return elemento.offsetParent !== null;
                });

            if (!focaveis.length) {
                return;
            }

            var primeiro = focaveis[0];
            var ultimo = focaveis[focaveis.length - 1];

            if (evento.shiftKey && document.activeElement === primeiro) {
                evento.preventDefault();
                ultimo.focus();
            } else if (!evento.shiftKey && document.activeElement === ultimo) {
                evento.preventDefault();
                primeiro.focus();
            }
        });
    }

    NAKA.componentes.iniciarGaleria = iniciarGaleria;
})(window);
