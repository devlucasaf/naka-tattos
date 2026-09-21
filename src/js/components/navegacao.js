(function (global) {
    'use strict';

    var NAKA = global.NAKA || (global.NAKA = {});
    NAKA.componentes = NAKA.componentes || {};

    var LARGURA_DESKTOP = 861;

    function iniciarNavegacao() {
        var cabecalho = document.querySelector('[data-cabecalho]');
        var alternador = document.querySelector('[data-alternador-menu]');
        var nav = document.getElementById('navPrincipal');

        if (!cabecalho) {
            return;
        }

        /* --- Estado visual do cabeçalho ao rolar --- */
        var aguardandoQuadro = false;

        function atualizarCabecalho() {
            cabecalho.setAttribute('data-rolado', global.scrollY > 24 ? 'true' : 'false');
            aguardandoQuadro = false;
        }

        global.addEventListener(
            'scroll',
            function () {
                if (!aguardandoQuadro) {
                    aguardandoQuadro = true;
                    global.requestAnimationFrame(atualizarCabecalho);
                }
            },
            { passive: true }
        );

        atualizarCabecalho();

        /* --- Menu mobile --- */
        if (alternador && nav) {
            var fecharMenu = function (devolverFoco) {
                if (alternador.getAttribute('aria-expanded') !== 'true') {
                    return;
                }
                alternador.setAttribute('aria-expanded', 'false');
                alternador.setAttribute('aria-label', 'Abrir menu de navegação');
                nav.setAttribute('data-aberto', 'false');
                document.body.style.removeProperty('overflow');
                if (devolverFoco) {
                    alternador.focus();
                }
            };

            var abrirMenu = function () {
                alternador.setAttribute('aria-expanded', 'true');
                alternador.setAttribute('aria-label', 'Fechar menu de navegação');
                nav.setAttribute('data-aberto', 'true');
                document.body.style.overflow = 'hidden';
            };

            alternador.addEventListener('click', function () {
                if (alternador.getAttribute('aria-expanded') === 'true') {
                    fecharMenu(false);
                } else {
                    abrirMenu();
                }
            });

            nav.addEventListener('click', function (evento) {
                if (evento.target.closest('a')) {
                    fecharMenu(false);
                }
            });

            document.addEventListener('keydown', function (evento) {
                if (evento.key === 'Escape') {
                    fecharMenu(true);
                }
            });

            document.addEventListener('click', function (evento) {
                if (
                    nav.getAttribute('data-aberto') === 'true' &&
                    !nav.contains(evento.target) &&
                    !alternador.contains(evento.target)
                ) {
                    fecharMenu(false);
                }
            });

            global.addEventListener('resize', function () {
                if (global.innerWidth >= LARGURA_DESKTOP) {
                    fecharMenu(false);
                }
            });
        }
    }

    NAKA.componentes.iniciarNavegacao = iniciarNavegacao;
})(window);
