(function (global) {
    "use strict";

    var NAKA = global.NAKA || (global.NAKA = {});
    NAKA.componentes = NAKA.componentes || {};

    var abertos = [];

    function fecharTodos(exceto) {
        abertos.forEach(function (instancia) {
            if (instancia !== exceto) {
                instancia.fechar(false);
            }
        });
    }

    function criarSelect(select) {
        var id = select.id || "select-" + Math.random().toString(36).slice(2, 8);
        select.id = id;

        var rotulo = (select.labels && select.labels[0]) || null;
        var rotuloId = "";

        if (rotulo) {
            rotuloId = rotulo.id || id + "-rotulo";
            rotulo.id = rotuloId;
        }

        var opcoes = Array.prototype.slice.call(select.options);
        var indiceSelecionado = select.selectedIndex < 0 ? 0 : select.selectedIndex;
        var indiceAtivo = indiceSelecionado;
        var aberto = false;

        var raiz = document.createElement("div");
        raiz.className = "select-custom";
        raiz.setAttribute("data-aberto", "false");

        var gatilho = document.createElement("button");
        gatilho.type = "button";
        gatilho.className = "select-custom__gatilho";
        gatilho.id = id + "-gatilho";
        gatilho.setAttribute("role", "combobox");
        gatilho.setAttribute("aria-haspopup", "listbox");
        gatilho.setAttribute("aria-expanded", "false");
        gatilho.setAttribute("aria-controls", id + "-lista");

        var valor = document.createElement("span");
        valor.className = "select-custom__valor";
        valor.id = id + "-valor";
        gatilho.appendChild(valor);

        gatilho.insertAdjacentHTML(
            "beforeend",
            "<svg class='icone select-custom__seta' viewBox='0 0 24 24' aria-hidden='true' focusable='false'><use href='#icone-chevron'></use></svg>"
        );

        gatilho.setAttribute(
            "aria-labelledby",
            (rotuloId ? rotuloId + " " : "") + valor.id
        );

        var lista = document.createElement("ul");
        lista.className = "select-custom__lista";
        lista.id = id + "-lista";
        lista.setAttribute("role", "listbox");
        lista.setAttribute("tabindex", "-1");

        if (rotuloId) {
            lista.setAttribute("aria-labelledby", rotuloId);
        }

        var itens = opcoes.map(function (opcao, indice) {
            var item = document.createElement("li");
            item.className = "select-custom__opcao";
            item.id = id + "-opcao-" + indice;
            item.setAttribute("role", "option");
            item.setAttribute("aria-selected", "false");
            item.textContent = opcao.textContent;
            lista.appendChild(item);

            item.addEventListener("click", function () {
                selecionar(indice);
                fechar(true);
            });

            return item;
        });

        function atualizarValor() {
            var opcao = opcoes[indiceSelecionado];
            valor.textContent = opcao ? opcao.textContent : "";
            valor.setAttribute("data-vazio", opcao && opcao.value ? "false" : "true");

            itens.forEach(function (item, indice) {
                item.setAttribute(
                    "aria-selected",
                    indice === indiceSelecionado ? "true" : "false"
                );
            });
        }

        function marcarAtivo(indice) {
            indiceAtivo = Math.max(0, Math.min(indice, itens.length - 1));

            itens.forEach(function (item, i) {
                if (i === indiceAtivo) {
                    item.setAttribute("data-ativo", "true");
                } else {
                    item.removeAttribute("data-ativo");
                }
            });

            gatilho.setAttribute("aria-activedescendant", itens[indiceAtivo].id);
            itens[indiceAtivo].scrollIntoView({ block: "nearest" });
        }

        function selecionar(indice) {
            indiceSelecionado = indice;
            select.selectedIndex = indice;
            atualizarValor();
            marcarAtivo(indice);
            select.dispatchEvent(new Event("change", { bubbles: true }));
        }

        function abrir() {
            if (aberto) {
                return;
            }
            fecharTodos(instancia);
            aberto = true;
            raiz.setAttribute("data-aberto", "true");
            gatilho.setAttribute("aria-expanded", "true");
            marcarAtivo(indiceSelecionado);
        }

        function fechar(devolverFoco) {
            if (!aberto) {
                return;
            }
            aberto = false;
            raiz.setAttribute("data-aberto", "false");
            gatilho.setAttribute("aria-expanded", "false");
            gatilho.removeAttribute("aria-activedescendant");

            if (devolverFoco) {
                gatilho.focus();
            }
        }

        gatilho.addEventListener("click", function (evento) {
            evento.stopPropagation();
            if (aberto) {
                fechar(false);
            } else {
                abrir();
            }
        });

        gatilho.addEventListener("keydown", function (evento) {
            switch (evento.key) {
                case "ArrowDown":
                    evento.preventDefault();
                    if (!aberto) {
                        abrir();
                    } else {
                        marcarAtivo(indiceAtivo + 1);
                    }
                    break;
                case "ArrowUp":
                    evento.preventDefault();
                    if (!aberto) {
                        abrir();
                    } else {
                        marcarAtivo(indiceAtivo - 1);
                    }
                    break;
                case "Home":
                    if (aberto) {
                        evento.preventDefault();
                        marcarAtivo(0);
                    }
                    break;
                case "End":
                    if (aberto) {
                        evento.preventDefault();
                        marcarAtivo(itens.length - 1);
                    }
                    break;
                case "Enter":
                case " ":
                    evento.preventDefault();
                    if (aberto) {
                        selecionar(indiceAtivo);
                        fechar(true);
                    } else {
                        abrir();
                    }
                    break;
                case "Escape":
                    if (aberto) {
                        evento.stopPropagation();
                        fechar(true);
                    }
                    break;
                case "Tab":
                    fechar(false);
                    break;
                default:
                    break;
            }
        });

        lista.addEventListener("click", function (evento) {
            evento.stopPropagation();
        });

        if (rotulo) {
            rotulo.addEventListener("click", function (evento) {
                evento.preventDefault();
                gatilho.focus();
            });
        }

        select.parentNode.insertBefore(raiz, select);
        raiz.appendChild(gatilho);
        raiz.appendChild(lista);
        raiz.appendChild(select);

        select.classList.add("select-custom__nativo");
        select.setAttribute("tabindex", "-1");
        select.setAttribute("aria-hidden", "true");

        select.addEventListener("naka:atualizar", function () {
            indiceSelecionado = select.selectedIndex < 0 ? 0 : select.selectedIndex;
            atualizarValor();
        });

        atualizarValor();

        var instancia = {
            raiz: raiz,
            gatilho: gatilho,
            fechar: fechar
        };

        abertos.push(instancia);
        return instancia;
    }

    function iniciarSelects(escopo) {
        var alvo = escopo || document;
        var selects = alvo.querySelectorAll("select[data-select-custom]");

        if (!selects.length) {
            return;
        }

        selects.forEach(function (select) {
            if (select.dataset.aprimorado === "true") {
                return;
            }
            select.dataset.aprimorado = "true";
            criarSelect(select);
        });

        document.addEventListener("click", function () {
            fecharTodos(null);
        });
    }

    NAKA.componentes.iniciarSelects = iniciarSelects;
})(window);
