<img 
    width=100% 
    src="https://capsule-render.vercel.app/api?type=waving&color=A020F0&height=120&section=header"
/>


# 龍 Naka Tattos

Site profissional do tatuador **Naka Tattos**, especializado em tatuagem Old School, Oriental e Realismo Preto e Cinza.

## 🔗 Acesse

> _Em breve — deploy via GitHub Pages_

## 📸 Sobre o Projeto

Landing page desenvolvida para divulgar o trabalho do Naka Tattos, com integração de posts do Instagram e formulário de contato.

### Seções

- **Home** — Apresentação com chamada para agendamento
- **Sobre mim** — Trajetória e diferenciais do artista
- **Minhas Artes** — Galeria com imagens e embeds de posts do Instagram
- **Contatos** — Formulário de mensagem, WhatsApp, e-mail e redes sociais

## 🛠️ Tecnologias

- HTML5
- CSS3 (responsivo, variáveis CSS)
- JavaScript (vanilla)
- Google Fonts (Inter, Cormorant Garamond)
- Font Awesome
- Instagram Embed API

## 📁 Estrutura

```
naka-tattos/
├── index.html
├── README.md
├── js/
│   └── script.js
└── styles/
    └── global.css
```

## 🚀 Como usar

1. Clone o repositório:
   ```bash
   git clone https://github.com/devlucasaf/naka-tattos.git
   ```
2. Abra o `index.html` no navegador ou use uma extensão como **Live Server** no VS Code.

## 📌 Posts do Instagram

Para exibir posts reais na galeria, edite o array `artesInstagram` em `js/script.js` e adicione itens com o shortcode do post:

```js
{ tipo: 'instagram', shortcode: 'SHORTCODE_DO_POST', legenda: 'Descrição' }
```

O shortcode é o código que aparece na URL do post:
`https://www.instagram.com/p/DVbgNwAAApi/` → shortcode: `DVbgNwAAApi`

## 📝 Licença

Este projeto é de uso pessoal do Naka Tattos. Todos os direitos reservados.

<img 
    width=100% 
    src="https://capsule-render.vercel.app/api?type=waving&color=A020F0&height=120&section=footer"
/>