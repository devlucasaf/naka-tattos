(function (global) {
    'use strict';

    var NAKA = global.NAKA || (global.NAKA = {});
    NAKA.componentes = NAKA.componentes || {};

    var PADRAO_EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

    function formatarTelefone(valor) {
        var digitos = valor.replace(/\D/g, '').slice(0, 11);

        if (digitos.length <= 2) {
            return digitos.length ? '(' + digitos : '';
        }

        if (digitos.length <= 6) {
            return '(' + digitos.slice(0, 2) + ') ' + digitos.slice(2);
        }

        if (digitos.length <= 10) {
            return (
                '(' + digitos.slice(0, 2) + ') ' + digitos.slice(2, 6) + '-' + digitos.slice(6)
            );
        }

        return '(' + digitos.slice(0, 2) + ') ' + digitos.slice(2, 7) + '-' + digitos.slice(7);
    }

    function formatarTamanho(bytes) {
        if (bytes < 1024 * 1024) {
            return Math.max(1, Math.round(bytes / 1024)) + ' KB';
        }
        return (bytes / (1024 * 1024)).toFixed(1).replace('.', ',') + ' MB';
    }

    function iniciarFormularioOrcamento() {
        var form = document.getElementById('formOrcamento');

        if (!form) {
            return;
        }

        var botao = form.querySelector('[data-enviar]');
        var botaoTexto = botao.querySelector('[data-enviar-texto]');
        var estado = form.querySelector('[data-estado]');
        var entradaArquivos = form.querySelector('#referencias');
        var listaArquivos = form.querySelector('[data-lista-arquivos]');
        var gatilhoUpload = form.querySelector('[data-gatilho-upload]');
        var regrasUpload = NAKA.config.upload;

        var arquivos = [];
        var enviando = false;

        form.setAttribute('novalidate', 'novalidate');

        /* --- Validação ---------------------------------------------------- */

        var validadores = {
            nome: function (v) {
                return v.trim().length >= 2 ? '' : 'Informe o seu nome.';
            },
            sobrenome: function (v) {
                return v.trim().length >= 2 ? '' : 'Informe o seu sobrenome.';
            },
            email: function (v) {
                if (!v.trim()) {
                    return 'Informe o seu e-mail.';
                }
                return PADRAO_EMAIL.test(v.trim()) ? '' : 'Digite um e-mail válido, como nome@email.com.';
            },
            telefone: function (v) {
                var digitos = v.replace(/\D/g, '');
                if (!digitos) {
                    return 'Informe um telefone para contato.';
                }
                return digitos.length >= 10 ? '' : 'Digite o telefone com DDD.';
            },
            estilo: function (v) {
                return v ? '' : 'Escolha um estilo.';
            },
            local: function (v) {
                return v ? '' : 'Escolha o local da tatuagem.';
            },
            tamanho: function (v) {
                return v ? '' : 'Escolha o tamanho aproximado.';
            },
            consentimento: function (_, campo) {
                return campo.checked ? '' : 'É necessário aceitar a Política de Privacidade.';
            }
        };

        function obterBloco(campo) {
            return campo.closest('.campo') || campo.closest('.campo-consentimento');
        }

        function alvoDeFoco(campo) {
            var bloco = obterBloco(campo);
            var gatilho = bloco && bloco.querySelector('.select-custom__gatilho');
            return gatilho || campo;
        }

        function mostrarErro(campo, mensagem) {
            var bloco = obterBloco(campo);
            if (!bloco) {
                return;
            }

            var erro = bloco.querySelector('.campo__erro');
            var controle = alvoDeFoco(campo);

            if (mensagem) {
                bloco.classList.add('campo--invalido');
                if (erro) {
                    erro.querySelector('[data-erro-texto]').textContent = mensagem;
                    controle.setAttribute('aria-describedby', erro.id);
                }
                controle.setAttribute('aria-invalid', 'true');
            } else {
                bloco.classList.remove('campo--invalido');
                controle.removeAttribute('aria-invalid');
                if (erro) {
                    controle.removeAttribute('aria-describedby');
                    erro.querySelector('[data-erro-texto]').textContent = '';
                }
            }
        }

        function validarCampo(campo) {
            var validador = validadores[campo.name];
            if (!validador) {
                return true;
            }

            var mensagem = validador(campo.value, campo);
            mostrarErro(campo, mensagem);
            return !mensagem;
        }

        Object.keys(validadores).forEach(function (nome) {
            var campo = form.elements[nome];
            if (!campo) {
                return;
            }

            var evento = campo.type === 'checkbox' ? 'change' : 'blur';
            campo.addEventListener(evento, function () {
                validarCampo(campo);
            });

            if (campo.tagName === 'SELECT') {
                campo.addEventListener('change', function () {
                    validarCampo(campo);
                });
            }
        });

        /* --- Máscara de telefone ------------------------------------------ */

        var telefone = form.elements.telefone;

        telefone.addEventListener('input', function () {
            var posicaoFinal = telefone.selectionStart === telefone.value.length;
            telefone.value = formatarTelefone(telefone.value);
            if (posicaoFinal) {
                telefone.setSelectionRange(telefone.value.length, telefone.value.length);
            }
        });

        /* --- Upload opcional de referências -------------------------------- */

        function sincronizarInput() {
            if (typeof DataTransfer === 'undefined') {
                return;
            }
            var transferencia = new DataTransfer();
            arquivos.forEach(function (arquivo) {
                transferencia.items.add(arquivo);
            });
            entradaArquivos.files = transferencia.files;
        }

        function renderizarArquivos() {
            listaArquivos.innerHTML = '';

            arquivos.forEach(function (arquivo, indice) {
                var item = document.createElement('li');
                item.className = 'upload__item';

                var nome = document.createElement('span');
                nome.className = 'upload__nome';
                nome.textContent = arquivo.name;

                var peso = document.createElement('span');
                peso.className = 'upload__peso';
                peso.textContent = formatarTamanho(arquivo.size);

                var remover = document.createElement('button');
                remover.type = 'button';
                remover.className = 'upload__remover';
                remover.setAttribute('aria-label', 'Remover a referência ' + arquivo.name);
                remover.innerHTML =
                    '<svg class="icone" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#icone-fechar"></use></svg>';

                remover.addEventListener('click', function () {
                    arquivos.splice(indice, 1);
                    sincronizarInput();
                    renderizarArquivos();
                    gatilhoUpload.focus();
                });

                item.appendChild(nome);
                item.appendChild(peso);
                item.appendChild(remover);
                listaArquivos.appendChild(item);
            });

            listaArquivos.hidden = arquivos.length === 0;
        }

        gatilhoUpload.addEventListener('click', function () {
            entradaArquivos.click();
        });

        entradaArquivos.addEventListener('change', function () {
            var recusados = [];

            Array.prototype.slice.call(entradaArquivos.files).forEach(function (arquivo) {
                if (arquivos.length >= regrasUpload.maxArquivos) {
                    recusados.push(arquivo.name + ' (limite de ' + regrasUpload.maxArquivos + ' arquivos)');
                    return;
                }

                if (regrasUpload.formatosAceitos.indexOf(arquivo.type) === -1) {
                    recusados.push(arquivo.name + ' (formato não aceito)');
                    return;
                }

                if (arquivo.size > regrasUpload.maxBytesPorArquivo) {
                    recusados.push(arquivo.name + ' (acima de ' + formatarTamanho(regrasUpload.maxBytesPorArquivo) + ')');
                    return;
                }

                var repetido = arquivos.some(function (existente) {
                    return existente.name === arquivo.name && existente.size === arquivo.size;
                });

                if (!repetido) {
                    arquivos.push(arquivo);
                }
            });

            sincronizarInput();
            renderizarArquivos();

            if (recusados.length) {
                definirEstado('erro', 'Não foi possível anexar: ' + recusados.join('; ') + '.');
            }
        });

        /* --- Estado do envio ----------------------------------------------- */

        function definirEstado(tipo, mensagem) {
            if (!tipo) {
                estado.removeAttribute('data-tipo');
                estado.querySelector('[data-estado-texto]').innerHTML = '';
                return;
            }

            estado.setAttribute('data-tipo', tipo);
            estado.querySelector('[data-estado-texto]').innerHTML = mensagem;
        }

        function definirCarregando(ativo) {
            enviando = ativo;
            botao.disabled = ativo;
            form.setAttribute('aria-busy', ativo ? 'true' : 'false');
            botaoTexto.textContent = ativo ? 'Enviando…' : 'Enviar solicitação';
        }

        function coletarDados() {
            var textoSelecionado = function (nome) {
                var campo = form.elements[nome];
                var opcao = campo.options[campo.selectedIndex];
                return opcao ? opcao.textContent.trim() : '';
            };

            return {
                nome: form.elements.nome.value.trim(),
                sobrenome: form.elements.sobrenome.value.trim(),
                email: form.elements.email.value.trim(),
                telefone: form.elements.telefone.value.trim(),
                estilo: textoSelecionado('estilo'),
                local: textoSelecionado('local'),
                tamanho: textoSelecionado('tamanho'),
                mensagem: form.elements.mensagem.value.trim(),
                quantidadeReferencias: arquivos.length
            };
        }

        function limparFormulario() {
            form.reset();
            arquivos = [];
            sincronizarInput();
            renderizarArquivos();

            form.querySelectorAll('select').forEach(function (select) {
                select.selectedIndex = 0;
                select.dispatchEvent(new Event('naka:atualizar'));
            });

            form.querySelectorAll('.campo--invalido').forEach(function (bloco) {
                bloco.classList.remove('campo--invalido');
            });
        }

        form.addEventListener('submit', function (evento) {
            evento.preventDefault();

            if (enviando) {
                return;
            }

            var invalidos = Object.keys(validadores).filter(function (nome) {
                var campo = form.elements[nome];
                return campo && !validarCampo(campo);
            });

            if (invalidos.length) {
                definirEstado(
                    'erro',
                    'Revise os campos destacados: ' + invalidos.length + ' pendência(s).'
                );
                alvoDeFoco(form.elements[invalidos[0]]).focus();
                return;
            }

            definirEstado(null);
            definirCarregando(true);

            var dados = coletarDados();

            NAKA.servicos
                .enviarOrcamento(dados, arquivos)
                .then(function (resultado) {
                    if (resultado.canal === 'whatsapp' && resultado.aviso === 'bloqueado') {
                        definirEstado(
                            'erro',
                            'O navegador bloqueou a abertura do WhatsApp. ' +
                                '<a href="' +
                                resultado.url +
                                '" target="_blank" rel="noopener noreferrer">Clique aqui para abrir a conversa</a> ' +
                                'com a sua solicitação já preenchida.'
                        );
                        return;
                    }

                    if (resultado.canal === 'whatsapp') {
                        definirEstado(
                            'sucesso',
                            'Solicitação montada e aberta no WhatsApp. Envie a mensagem para concluir' +
                                (dados.quantidadeReferencias
                                    ? ' e anexe as suas referências na conversa.'
                                    : '.')
                        );
                    } else {
                        definirEstado(
                            'sucesso',
                            'Solicitação enviada. O retorno é feito pelo e-mail ou telefone informados.'
                        );
                    }

                    limparFormulario();
                })
                .catch(function (erro) {
                    definirEstado(
                        'erro',
                        'Não foi possível enviar agora. Tente novamente ou fale direto pelo ' +
                            '<a data-link="whatsapp" href="' +
                            NAKA.config.contato.whatsappUrl +
                            '" target="_blank" rel="noopener noreferrer">WhatsApp</a>.'
                    );
                    console.error('[Naka Tattos] Falha no envio do orçamento:', erro.message);
                })
                .then(function () {
                    definirCarregando(false);
                });
        });

        renderizarArquivos();
    }

    NAKA.componentes.iniciarFormularioOrcamento = iniciarFormularioOrcamento;
})(window);
