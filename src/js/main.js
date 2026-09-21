// --- INICIALIZAÇÃO DO SITE ---
(function (global) {
    "use strict";

    var NAKA = global.NAKA || (global.NAKA = {});

    // --- ENTRADA SUAVE DOS ELEMENTOS AO ROLAR A PÁGINA ---
    function iniciarRevelacao() {
        var alvos = document.querySelectorAll(".revelar");

        if (!alvos.length) {
            return;
        }

        // --- PREFERÊNCIA DO USUÁRIO POR MENOS MOVIMENTO ---
        var reduzirMovimento = global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduzirMovimento || !("IntersectionObserver" in global)) {
            alvos.forEach(function (alvo) {
                alvo.classList.add("visivel");
            });
            return;
        }

        // --- OBSERVADOR QUE REVELA CADA ELEMENTO UMA ÚNICA VEZ ---
        var observador = new IntersectionObserver(
            function (entradas) {
                entradas.forEach(function (entrada) {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("visivel");
                        observador.unobserve(entrada.target);
                    }
                });
            },
            { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
        );

        alvos.forEach(function (alvo) {
            observador.observe(alvo);
        });
    }

    // --- PARTIDA DOS COMPONENTES PRESENTES NA PÁGINA ---
    function iniciar() {
        var componentes = NAKA.componentes || {};

        [
            componentes.iniciarContatos,
            componentes.iniciarNavegacao,
            componentes.iniciarSelects,
            componentes.iniciarFormularioOrcamento,
            componentes.iniciarGaleria,
            componentes.iniciarFaq,
            iniciarRevelacao
        ].forEach(function (funcao) {
            if (typeof funcao !== "function") {
                return;
            }

            try {
                funcao();
            } catch (erro) {
                console.error("[Naka Tattos] Falha ao iniciar componente:", erro);
            }
        });
    }

    // --- DISPARO APÓS O CARREGAMENTO DO DOCUMENTO ---
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar);
    } else {
        iniciar();
    }
})(window);
