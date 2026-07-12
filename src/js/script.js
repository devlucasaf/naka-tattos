const menuHamburguer     = document.getElementById("menuHamburger");        
const listaMenuMobile    = document.querySelector(".lista-menu");           
const linksMenu          = document.querySelectorAll(".link-menu");         
const secaoHome          = document.getElementById("home");                 
const formularioContato  = document.getElementById("formContato");          
const mensagemFeedback   = document.getElementById("mensagemFeedback");     
const gradeInstagram     = document.getElementById("gradeInstagram");       
const botaoInstagramLink = document.getElementById("botaoInstagramLink");   

// --- DADOS DO FEED DO INSTAGRAM ---
const artesInstagram = [
    { tipo: "instagram", shortcode: "DVbgNwAAApi", legenda: "Fechamento no estilo preto e cinza pro mano @guixz.jpeg Tamo junto mano!🫵🏽👊🏽🔥" },
    { tipo: "instagram", shortcode: "CsETD-qugw1", legenda: "Samurai no estilo preto e cinza q rolou no brother @marcos_esaki ✌🏽Obrigado pela confiança e por aguentar até o fim🫡" },
    { tipo: "instagram", shortcode: "Cr01iRFOKzo", legenda: "Máscara Hannya no estilo preto e cinza finalizada pro meu mano @raasch.png 👊🏼✌🏽Trabalho realizado em 2 sessões. Obrigado pela confiança meu chapa!!! 🫡" },
    { tipo: "instagram", shortcode: "DZP6tUHAESu", legenda: "Primeira sessão desse trampo do Avenged Sevenfold pro mano @__.fr3it4s.__💀🦇🤘🏽" },
    { tipo: "instagram", shortcode: "DXPJULVAOFb", legenda: "Processo de fechamento de braço que tá rolando ⛵️🏴‍☠️" }
];

// --- CARREGAMENTO DO FEED DO INSTAGRAM ---
function carregarFeedInstagram() {
    if (!gradeInstagram) {
        return;
    }
    
    gradeInstagram.innerHTML = "";
    artesInstagram.forEach(arte => {
        const card = document.createElement("div");

        if (arte.tipo === "instagram") {
            card.classList.add("card-instagram", "card-instagram-embed");
            card.innerHTML = `
                <iframe
                    src="https://www.instagram.com/p/${arte.shortcode}/embed/"
                    frameborder="0"
                    scrolling="no"
                    allowtransparency="true"
                    loading="lazy"
                    title="Post Instagram: ${arte.legenda}"
                ></iframe>
            `;
        } else {
            card.classList.add("card-instagram");
            card.innerHTML = `
                <img 
                    src="${arte.imagem}" 
                    alt="Tatuagem oriental: ${arte.legenda}" 
                    loading="lazy"
                />
                <div class="info-instagram">
                    <span class="legenda-pequena">
                        ${arte.legenda}
                    </span>
                    <span class="curtidas">
                        <i class="fas fa-heart"></i> 
                        ${formatarCurtidas(arte.curtidas)}
                    </span>
                </div>
            `;
        }

        gradeInstagram.appendChild(card);
    });
}

// --- FORMATAÇÃO DO NÚMERO DE CURTIDAS ---
function formatarCurtidas(numero) {
    if (numero >= 1000) {
        return (numero / 1000).toFixed(1) + "k";
    }
    return numero;
}

// --- DESTAQUE DO LINK ATIVO CONFORME A ROLAGEM ---
function ativarLinkMenu() {
    const secoes = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 150;
    let idAtual = "";

    secoes.forEach(secao => {
        const topo = secao.offsetTop;
        const altura = secao.offsetHeight;
        if (scrollPos >= topo && scrollPos < topo + altura) {
            idAtual = secao.getAttribute("id");
        }
    });

    linksMenu.forEach(link => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
            link.classList.toggle("ativo", href === `#${idAtual}`);
        }
    });
}

// --- MENU MOBILE ---
function alternarMenuMobile() {
    if (menuHamburguer && listaMenuMobile) {
        menuHamburguer.addEventListener("click", () => {
            listaMenuMobile.classList.toggle("ativo-mobile");
        });
        
        linksMenu.forEach(link => {
            link.addEventListener("click", () => {
                listaMenuMobile.classList.remove("ativo-mobile");
            });
        });
    }
}

// --- ENVIO DO FORMULÁRIO DE CONTATO ---
function enviarFormulario(evento) {
    evento.preventDefault();
    const nome = document.getElementById("nomeContato")?.value.trim();
    const email = document.getElementById("emailContato")?.value.trim();
    const mensagem = document.getElementById("mensagemContato")?.value.trim();

    if (!nome || !email || !mensagem) {
        exibirMensagem("Preencha todos os campos, por favor.", "erro");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        exibirMensagem("Digite um e-mail válido.", "erro");
        return;
    }

    exibirMensagem(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso. Em breve retornarei.`, "sucesso");
    formularioContato.reset();
    setTimeout(() => {
        if (mensagemFeedback) {
            mensagemFeedback.innerHTML = "";
        }
    }, 5000);
}

// --- EXIBIÇÃO DE MENSAGEM DE FEEDBACK ---
function exibirMensagem(texto, tipo) {
    if (!mensagemFeedback) {
        return;
    }
    mensagemFeedback.innerHTML = `<span style="color: ${tipo === "sucesso" ? "#d4af37" : "#c53a1f"};">${texto}</span>`;
}

// --- ROLAGEM SUAVE ENTRE AS SEÇÕES ---
function configurarRolagemSuave() {
    linksMenu.forEach(link => {
        link.addEventListener("click", function(e) {
            const destinoId = this.getAttribute("href");
            if (destinoId && destinoId.startsWith("#")) {
                const elementoDestino = document.querySelector(destinoId);
                if (elementoDestino) {
                    e.preventDefault();
                    elementoDestino.scrollIntoView({ 
                        behavior: "smooth", 
                        block: "start" 
                    });
                }
            }
        });
    });
}

// --- DEFINIÇÃO DO LINK DO BOTÃO DO INSTAGRAM ---
function definirLinkInstagram() {
    if (botaoInstagramLink) {
        botaoInstagramLink.href = "https://www.instagram.com/naka.tattoos/";
    }
}

// --- DADOS DA GALERIA DE FOTOS ---

// Fotos das tatuagens
const galeriaFotos = [
    { imagem: "../img/naka-tattos-img.jpg", legenda: "Trabalho autoral no estilo oriental" }
];


// --- ELEMENTOS DA GALERIA E DO LIGHTBOX ---
const galeriaImagens   = document.getElementById("galeriaImagens");    
const lightbox         = document.getElementById("lightbox");         
const lightboxImagem   = document.getElementById("lightboxImagem");   
const lightboxLegenda  = document.getElementById("lightboxLegenda");  
const lightboxFechar   = document.getElementById("lightboxFechar");   
const lightboxAnterior = document.getElementById("lightboxAnterior"); 
const lightboxProximo  = document.getElementById("lightboxProximo");  

let indiceAtualGaleria = 0;
let fotosAtivas = galeriaFotos;

// --- CARREGAMENTO DA GALERIA DE FOTOS ---
function carregarGaleria() {
    if (!galeriaImagens) {
        return;
    }
    
    fotosAtivas = galeriaImagens.dataset.fonte === "estudio" ? fotosEstudio : galeriaFotos;
    galeriaImagens.innerHTML = "";
    fotosAtivas.forEach((foto, indice) => {
        const card = document.createElement("div");
        card.classList.add("card-galeria");
        card.innerHTML = `
            <img 
                src="${foto.imagem}" 
                alt="${foto.legenda}" 
                loading="lazy"
            />
            <div class="legenda">
                <i class="fas fa-image"></i> ${foto.legenda}
            </div>
        `;
        card.addEventListener("click", () => abrirLightbox(indice));
        galeriaImagens.appendChild(card);
    });
}

// --- ABERTURA DO LIGHTBOX ---
function abrirLightbox(indice) {
    if (!lightbox) {
        return;
    }
    indiceAtualGaleria = indice;
    atualizarLightbox();
    lightbox.classList.add("ativo");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

// --- FECHAMENTO DO LIGHTBOX ---
function fecharLightbox() {
    if (!lightbox) {
        return;
    }
    lightbox.classList.remove("ativo");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

// --- ATUALIZAÇÃO DO CONTEÚDO DO LIGHTBOX ---
function atualizarLightbox() {
    const foto = fotosAtivas[indiceAtualGaleria];
    if (!foto || !lightboxImagem) {
        return;
    }

    lightboxImagem.src = foto.imagem;
    lightboxImagem.alt = foto.legenda;
    if (lightboxLegenda) {
        lightboxLegenda.textContent = foto.legenda;
    }

    const mostrarSetas = fotosAtivas.length > 1;
    if (lightboxAnterior) {
        lightboxAnterior.style.display = mostrarSetas ? "flex" : "none";
    }

    if (lightboxProximo) {
        lightboxProximo.style.display = mostrarSetas ? "flex" : "none";
    }
}

// --- NAVEGAÇÃO PARA A PRÓXIMA IMAGEM ---
function proximaImagem() {
    indiceAtualGaleria = (indiceAtualGaleria + 1) % fotosAtivas.length;
    atualizarLightbox();
}

// --- NAVEGAÇÃO PARA A IMAGEM ANTERIOR ---
function imagemAnterior() {
    indiceAtualGaleria = (indiceAtualGaleria - 1 + fotosAtivas.length) % fotosAtivas.length;
    atualizarLightbox();
}

// --- CONFIGURAÇÃO DOS EVENTOS DO LIGHTBOX ---
function configurarLightbox() {
    if (!lightbox) {
        return;
    }
    
    lightboxFechar?.addEventListener("click", fecharLightbox);
    lightboxProximo?.addEventListener("click", proximaImagem);
    lightboxAnterior?.addEventListener("click", imagemAnterior);

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            fecharLightbox();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("ativo")) {
            return;
        }

        if (e.key === "Escape") {
            fecharLightbox();
        } else if (e.key === "ArrowRight") {
            proximaImagem();
        } else if (e.key === "ArrowLeft") {
            imagemAnterior();
        }
    });
}

// --- EFEITO DE FUNDO DO CABEÇALHO AO ROLAR ---
function ajustarCabecalho() {
    const cabecalho = document.getElementById("cabecalho");
    if (!cabecalho) {
        return;
    }
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            cabecalho.style.background = "rgba(10, 10, 10, 0.96)";
            cabecalho.style.backdropFilter = "blur(16px)";
        } else {
            cabecalho.style.background = "rgba(10, 10, 10, 0.92)";
        }
    });
}

// --- FECHAMENTO DE TODOS OS SELECTS CUSTOMIZADOS ---
function fecharSelectsCustomizados() {
    document.querySelectorAll(".select-custom.aberto").forEach(wrapper => {
        wrapper.classList.remove("aberto");
        wrapper.querySelector(".select-custom-trigger")?.setAttribute("aria-expanded", "false");
    });
}

// --- SELECTS CUSTOMIZADOS ---
function inicializarSelectsCustomizados() {
    document.querySelectorAll("select").forEach(select => {
        if (select.dataset.customizado === "true") {
            return;
        }
        select.dataset.customizado = "true";

        const wrapper = document.createElement("div");
        wrapper.classList.add("select-custom");

        const trigger = document.createElement("button");
        trigger.type = "button";
        trigger.classList.add("select-custom-trigger");
        trigger.setAttribute("aria-haspopup", "listbox");
        trigger.setAttribute("aria-expanded", "false");

        const texto = document.createElement("span");
        texto.classList.add("select-custom-texto");
        const opcaoInicial = select.options[select.selectedIndex];
        texto.textContent = opcaoInicial ? opcaoInicial.textContent : "";
        
        if (!select.value) {
            texto.classList.add("placeholder-texto");
        }

        const icone = document.createElement("i");
        icone.className = "fas fa-chevron-down select-custom-icone";

        trigger.appendChild(texto);
        trigger.appendChild(icone);

        const lista = document.createElement("ul");
        lista.classList.add("select-custom-opcoes");
        lista.setAttribute("role", "listbox");

        Array.from(select.options).forEach((opcao, indice) => {
            const item = document.createElement("li");
            item.classList.add("select-custom-opcao");
            item.textContent = opcao.textContent;
            item.setAttribute("role", "option");
            
            if (indice === select.selectedIndex) {
                item.classList.add("selecionada");
            }
            
            if (opcao.value === "") {
                item.classList.add("placeholder");
            }

            item.addEventListener("click", () => {
                select.value = opcao.value;
                texto.textContent = opcao.textContent;
                texto.classList.toggle("placeholder-texto", opcao.value === "");
                lista.querySelectorAll(".select-custom-opcao").forEach(o => o.classList.remove("selecionada"));
                item.classList.add("selecionada");
                fecharSelectsCustomizados();
                select.dispatchEvent(new Event("change", { 
                    bubbles: true 
                }));
            });

            lista.appendChild(item);
        });

        select.parentNode.insertBefore(wrapper, select);
        wrapper.appendChild(trigger);
        wrapper.appendChild(lista);
        wrapper.appendChild(select);
        select.classList.add("select-nativo-oculto");

        trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            const jaAberto = wrapper.classList.contains("aberto");
            fecharSelectsCustomizados();
            if (!jaAberto) {
                wrapper.classList.add("aberto");
                trigger.setAttribute("aria-expanded", "true");
            }
        });
    });

    document.addEventListener("click", fecharSelectsCustomizados);
}

// --- INICIALIZAÇÃO AO CARREGAR A PÁGINA ---
document.addEventListener("DOMContentLoaded", () => {
    
    carregarFeedInstagram();
    carregarGaleria();
    configurarLightbox();
    alternarMenuMobile();
    configurarRolagemSuave();
    definirLinkInstagram();
    ajustarCabecalho();
    inicializarSelectsCustomizados();
    window.addEventListener("scroll", ativarLinkMenu);
    ativarLinkMenu(); 

    if (formularioContato) {
        formularioContato.addEventListener("submit", enviarFormulario);
    }

    const botaoAgendar = document.querySelector(".botao-primario");
    if (botaoAgendar && botaoAgendar.getAttribute("href") === "#contato") {
        botaoAgendar.addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("contato")?.scrollIntoView({ 
                behavior: "smooth" 
            });
        });
    }
});
