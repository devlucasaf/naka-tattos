// --- SELEÇÃO DE ELEMENTOS DO DOM ---
const menuHamburguer     = document.getElementById("menuHamburger");    // botão do menu mobile
const listaMenuMobile    = document.querySelector(".lista-menu");        // lista de links do menu
const linksMenu          = document.querySelectorAll(".link-menu");      // todos os links de navegação
const secaoHome          = document.getElementById("home");             // seção inicial
const formularioContato  = document.getElementById("formContato");       // formulário de contato
const mensagemFeedback   = document.getElementById("mensagemFeedback");  // área de feedback do formulário
const gradeInstagram     = document.getElementById("gradeInstagram");    // grade onde entram os posts do Instagram
const botaoInstagramLink = document.getElementById("botaoInstagramLink"); // botão "Seguir no Instagram"

// --- DADOS DO FEED DO INSTAGRAM ---
// Cada item é um post: 'instagram' usa embed via shortcode, 'imagem' usa uma imagem direta
const artesInstagram = [
    { tipo: "instagram", shortcode: "DVbgNwAAApi", legenda: "Fechamento no estilo preto e cinza pro mano @guixz.jpeg Tamo junto mano!🫵🏽👊🏽🔥" },
    { tipo: "instagram", shortcode: "CsETD-qugw1", legenda: "Samurai no estilo preto e cinza q rolou no brother @marcos_esaki ✌🏽Obrigado pela confiança e por aguentar até o fim🫡" },
    { tipo: "instagram", shortcode: "Cr01iRFOKzo", legenda: "Máscara Hannya no estilo preto e cinza finalizada pro meu mano @raasch.png 👊🏼✌🏽Trabalho realizado em 2 sessões. Obrigado pela confiança meu chapa!!! 🫡" },
    { tipo: "instagram", shortcode: "DZP6tUHAESu", legenda: "Primeira sessão desse trampo do Avenged Sevenfold pro mano @__.fr3it4s.__💀🦇🤘🏽" },
    { tipo: "instagram", shortcode: "DXPJULVAOFb", legenda: "Processo de fechamento de braço que tá rolando ⛵️🏴‍☠️" }
];

// --- CARREGAMENTO DO FEED DO INSTAGRAM ---
function carregarFeedInstagram() {
    // interrompe se a grade não existir nesta página
    if (!gradeInstagram) {
        return;
    }
    // limpa o conteúdo antes de renderizar
    gradeInstagram.innerHTML = "";
    // percorre cada arte e cria o card correspondente
    artesInstagram.forEach(arte => {
        const card = document.createElement("div");

        // renderiza embed do Instagram
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
            // renderiza card com imagem comum
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
    // converte milhares para o formato "1.2k"
    if (numero >= 1000) {
        return (numero / 1000).toFixed(1) + "k";
    }
    return numero;
}

// --- DESTAQUE DO LINK ATIVO CONFORME A ROLAGEM ---
function ativarLinkMenu() {
    // considera apenas seções que possuem id
    const secoes = document.querySelectorAll("section[id]");
    // posição atual da rolagem com um deslocamento para o cabeçalho
    const scrollPos = window.scrollY + 150;
    let idAtual = "";

    // descobre qual seção está visível na tela
    secoes.forEach(secao => {
        const topo = secao.offsetTop;
        const altura = secao.offsetHeight;
        if (scrollPos >= topo && scrollPos < topo + altura) {
            idAtual = secao.getAttribute("id");
        }
    });

    // destaca apenas links de âncora interna (que começam com #) da seção atual
    linksMenu.forEach(link => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
            link.classList.toggle("ativo", href === `#${idAtual}`);
        }
    });
}

// --- MENU MOBILE (HAMBÚRGUER) ---
function alternarMenuMobile() {
    if (menuHamburguer && listaMenuMobile) {
        // abre/fecha o menu ao clicar no botão hambúrguer
        menuHamburguer.addEventListener("click", () => {
            listaMenuMobile.classList.toggle("ativo-mobile");
        });
        // fecha o menu ao clicar em qualquer link
        linksMenu.forEach(link => {
            link.addEventListener("click", () => {
                listaMenuMobile.classList.remove("ativo-mobile");
            });
        });
    }
}

// --- ENVIO DO FORMULÁRIO DE CONTATO ---
function enviarFormulario(evento) {
    // impede o recarregamento padrão da página
    evento.preventDefault();
    // captura e limpa os valores dos campos
    const nome = document.getElementById("nomeContato")?.value.trim();
    const email = document.getElementById("emailContato")?.value.trim();
    const mensagem = document.getElementById("mensagemContato")?.value.trim();

    // valida se todos os campos foram preenchidos
    if (!nome || !email || !mensagem) {
        exibirMensagem("Preencha todos os campos, por favor.", "erro");
        return;
    }

    // valida o formato básico do e-mail
    if (!email.includes("@") || !email.includes(".")) {
        exibirMensagem("Digite um e-mail válido.", "erro");
        return;
    }

    // exibe mensagem de sucesso e limpa o formulário
    exibirMensagem(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso. Em breve retornarei.`, "sucesso");
    formularioContato.reset();
    // remove a mensagem de feedback após 5 segundos
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
    // define a cor conforme o tipo: dourado para sucesso, vermelho para erro
    mensagemFeedback.innerHTML = `<span style="color: ${tipo === "sucesso" ? "#d4af37" : "#c53a1f"};">${texto}</span>`;
}

// --- ROLAGEM SUAVE ENTRE AS SEÇÕES ---
function configurarRolagemSuave() {
    linksMenu.forEach(link => {
        link.addEventListener("click", function(e) {
            const destinoId = this.getAttribute("href");
            // aplica apenas em links internos (âncoras que começam com #)
            if (destinoId && destinoId.startsWith("#")) {
                const elementoDestino = document.querySelector(destinoId);
                if (elementoDestino) {
                    e.preventDefault();
                    // rola suavemente até a seção de destino
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

// Fotos do estúdio 
const fotosEstudio = [
    { imagem: "../img/naka-tattos-img.jpg", legenda: "Ambiente do estúdio" }
];

// --- ELEMENTOS DA GALERIA E DO LIGHTBOX ---
const galeriaImagens  = document.getElementById("galeriaImagens");    
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
    // escolhe a fonte de fotos conforme o atributo data-fonte do grid
    fotosAtivas = galeriaImagens.dataset.fonte === "estudio" ? fotosEstudio : galeriaFotos;
    galeriaImagens.innerHTML = "";
    fotosAtivas.forEach((foto, indice) => {
        const card = document.createElement("div");
        card.classList.add("card-galeria");
        card.innerHTML = `
            <img src="${foto.imagem}" alt="${foto.legenda}" loading="lazy">
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

// --- INICIALIZAÇÃO AO CARREGAR A PÁGINA ---
document.addEventListener("DOMContentLoaded", () => {
    
    carregarFeedInstagram();
    carregarGaleria();
    configurarLightbox();
    alternarMenuMobile();
    configurarRolagemSuave();
    definirLinkInstagram();
    ajustarCabecalho();
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
