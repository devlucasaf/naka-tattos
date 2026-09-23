window.NAKA = window.NAKA || {};

window.NAKA.config = {
    artista: {
        nome: "Gustavo Nakandakari",
        nomeArtistico: "Naka Tattoos",
        kanji: "仲村渠グスタボ"
    },

    contato: {
        whatsappNumero: "5561992387016",
        whatsappExibicao: "(61) 99238-7016",
        whatsappUrl: "https://api.whatsapp.com/message/TLLHO6BXFIZGD1",
        email: "nakandakari.ttt13@gmail.com",
        atendimento: "Somente com hora marcada",
        endereco: "Av. Pau Brasil, 10 — Águas Claras, Brasília/DF, 71926-000",
        enderecoMapa:
            "https://www.google.com/maps/search/?api=1&query=Av.+Pau+Brasil,+10+-+%C3%81guas+Claras,+Bras%C3%ADlia+-+DF,+71926-000"
    },

    redes: [
        {
            id: "whatsapp",
            nome: "WhatsApp",
            usuario: "(61) 99238-7016",
            url: "https://api.whatsapp.com/message/TLLHO6BXFIZGD1",
            icone: "whatsapp"
        },
        {
            id: "instagram",
            nome: "Instagram",
            usuario: "@naka.tattoos",
            url: "https://www.instagram.com/naka.tattoos",
            icone: "instagram"
        },
        {
            id: "threads",
            nome: "Threads",
            usuario: "@naka.tattoos",
            url: "https://www.threads.com/@naka.tattoos",
            icone: "threads",
            solido: true
        },
        {
            id: "facebook",
            nome: "Facebook",
            usuario: "Naka Tattoos",
            url: "https://www.facebook.com/share/1BndRyHR6f/?mibextid=wwXlfr",
            icone: "facebook"
        },
        {
            id: "email",
            nome: "E-mail",
            usuario: "nakandakari.ttt13@gmail.com",
            url: "mailto:nakandakari.ttt13@gmail.com",
            icone: "email"
        }
    ],
    upload: {
        maxArquivos: 5,
        maxBytesPorArquivo: 5 * 1024 * 1024,
        formatosAceitos: ["image/jpeg", "image/png", "image/webp"],
        formatosTexto: "JPG, PNG ou WEBP"
    },
    envio: {
        modo: "whatsapp",
        endpoint: null
    }
};
