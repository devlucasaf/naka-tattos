const menuHamburguer     = document.getElementById("menuHamburger");
const listaMenuMobile    = document.querySelector(".lista-menu");
const linksMenu          = document.querySelectorAll(".link-menu");
const secaoHome          = document.getElementById("home");
const formularioContato  = document.getElementById("formContato");
const mensagemFeedback   = document.getElementById("mensagemFeedback");
const gradeInstagram     = document.getElementById("gradeInstagram");
const botaoInstagramLink = document.getElementById("botaoInstagramLink");

const artesInstagram = [
    { tipo: "instagram", shortcode: "DVbgNwAAApi", legenda: "Fechamento no estilo preto e cinza pro mano @guixz.jpeg Tamo junto mano!🫵🏽👊🏽🔥" },
    { tipo: "instagram", shortcode: "CsETD-qugw1", legenda: "Samurai no estilo preto e cinza q rolou no brother @marcos_esaki ✌🏽Obrigado pela confiança e por aguentar até o fim🫡" },
    { tipo: "instagram", shortcode: "Cr01iRFOKzo", legenda: "Máscara Hannya no estilo preto e cinza finalizada pro meu mano @raasch.png 👊🏼✌🏽Trabalho realizado em 2 sessões. Obrigado pela confiança meu chapa!!! 🫡" },
    { tipo: "instagram", shortcode: "DZP6tUHAESu", legenda: "Primeira sessão desse trampo do Avenged Sevenfold pro mano @__.fr3it4s.__💀🦇🤘🏽" },
    { tipo: "instagram", shortcode: "DXPJULVAOFb", legenda: "Processo de fechamento de braço que tá rolando ⛵️🏴‍☠️" }
];

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
                <img src="${arte.imagem}" alt="Tatuagem oriental: ${arte.legenda}" loading="lazy">
                <div class="info-instagram">
                    <span class="legenda-pequena">${arte.legenda}</span>
                    <span class="curtidas"><i class="fas fa-heart"></i> ${formatarCurtidas(arte.curtidas)}</span>
                </div>
            `;
        }

        gradeInstagram.appendChild(card);
    });
}

function formatarCurtidas(numero) {
    if (numero >= 1000) {
        return (numero / 1000).toFixed(1) + "k";
    }
    return numero;
}

function ativarLinkMenu() {
    const secoes = document.querySelectorAll("section");
    let indexAtual = -1;
    const scrollPos = window.scrollY + 150;

    secoes.forEach((secao, idx) => {
        const topo = secao.offsetTop;
        const altura = secao.offsetHeight;
        if (scrollPos >= topo && scrollPos < topo + altura) {
            indexAtual = idx;
        }
    });

    linksMenu.forEach(link => {
        link.classList.remove("ativo");
    });
    if (indexAtual !== -1 && linksMenu[indexAtual]) {
        linksMenu[indexAtual].classList.add("ativo");
    }
}

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

function exibirMensagem(texto, tipo) {
    if (!mensagemFeedback) {
        return;
    }
    mensagemFeedback.innerHTML = `<span style="color: ${tipo === "sucesso" ? "#d4af37" : "#c53a1f"};">${texto}</span>`;
}

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

function definirLinkInstagram() {
    if (botaoInstagramLink) {
        botaoInstagramLink.href = "https://www.instagram.com/naka.tattoos/";
    }
}

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

document.addEventListener("DOMContentLoaded", () => {
    carregarFeedInstagram();
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