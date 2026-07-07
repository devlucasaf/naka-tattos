<img 
    width=100% 
    src="https://capsule-render.vercel.app/api?type=waving&color=A020F0&height=120&section=header"
/>


# 仲村渠グスタボ Naka Tattos

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

<div align="center">
    <img 
        alt="JavaScript" 
        title="JavaScript" 
        width="40px" 
        style="padding: 5px;" 
        src="https://skillicons.dev/icons?i=javascript" 
    />
    <img 
        alt="HTML" 
        title="HTML" 
        width="40px" 
        style="padding: 5px;" 
        src="https://skillicons.dev/icons?i=html" 
    />
    <img 
        alt="CSS" 
        title="CSS" 
        width="40px" 
        style="padding: 5px;" 
        src="https://skillicons.dev/icons?i=css" 
    />
    <img 
        alt="Git" 
        title="Git" 
        width="40px" 
        style="padding: 5px;" 
        src="https://skillicons.dev/icons?i=git" 
    />
    <img 
        alt="GitHub" 
        title="GitHub" 
        width="40px" 
        style="padding: 5px;" 
        src="https://skillicons.dev/icons?i=github" 
    />
    <img 
        alt="VS Code" 
        title="VS Code" 
        width="40px" 
        style="padding: 5px;" 
        src="https://skillicons.dev/icons?i=vscode" 
    />
    <img 
        alt="Instagram" 
        title="Instagram" 
        width="40px" 
        style="padding: 5px;" 
        src="https://skillicons.dev/icons?i=instagram" 
    />
</div>

## 📁 Estrutura

```
naka-tattos/
├── index.html
├── README.md
├── src/
│   ├── js/
│   │    └── script.js
│   ├── pages/
│   │    ├── galeria.html
│   │    ├── orcamento.html
│   │    ├── estudio.html
│   │    └── contatos.html
│   └── styles/
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

``Este projeto é de uso pessoal do Gustavo Nakamandari. Todos os direitos reservados.``
[LICENSE](./LICENSE)

<img 
    width=100% 
    src="https://capsule-render.vercel.app/api?type=waving&color=A020F0&height=120&section=footer"
/>