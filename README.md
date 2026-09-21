<img 
    width=100% 
    src="https://capsule-render.vercel.app/api?type=waving&color=A020F0&height=120&section=header"
/>

# 仲村渠グスタボ Naka Tattos

Landing page do tatuador **Gustavo Nakandakari**, especializado em Old School, Oriental e Realismo em preto e cinza.

## 🔗 Acesse

> _Em breve — deploy via GitHub Pages_

## 📸 Sobre o projeto

Site multipágina, sem build e sem framework, construído para um objetivo: fazer o visitante marcar um horário.

### Páginas

| Página | Arquivo | Conteúdo |
| --- | --- | --- |
| Início | `index.html` | Hero, assinatura do artista, atalhos para as seções, prévia da galeria e informações legais |
| Orçamento | `src/pages/orcamento.html` | Formulário com validação, dropdowns customizados e upload opcional de referências |
| Galeria | `src/pages/galeria.html` | Fotos com lazy loading e lightbox acessível |
| Dúvidas | `src/pages/faq.html` | Accordion acessível com as perguntas frequentes |
| Contatos | `src/pages/contatos.html` | WhatsApp, redes sociais, endereço e mapa |
| Privacidade | `privacidade.html` | Política de Privacidade |

Todas as páginas compartilham o mesmo cabeçalho, rodapé, CSS e componentes JavaScript.

## 🛠️ Tecnologias

HTML semântico, CSS moderno (grid, custom properties, `clamp()`) e JavaScript sem dependências.
Única dependência externa: **Google Fonts** (Inter + Cormorant Garamond). Os ícones são SVG inline.

## 📁 Estrutura

```
naka-tattos/
├── index.html                → home
├── privacidade.html          → política de privacidade
├── robots.txt
├── sitemap.xml
└── src/
    ├── img/                  → logo e fotos
    ├── pages/
    │   ├── orcamento.html
    │   ├── galeria.html
    │   ├── faq.html
    │   └── contatos.html
    ├── styles/
    │   ├── base.css          → tokens, reset, tipografia, utilitários
    │   ├── componentes.css   → botões, campos, select, accordion, modal
    │   └── secoes.css        → cabeçalho, hero, seções e rodapé
    └── js/
        ├── config.js         → contatos, redes sociais e modo de envio
        ├── main.js           → inicialização
        ├── services/
        │   └── envio-orcamento.js
        └── components/
            ├── contatos.js
            ├── navegacao.js
            ├── select-custom.js
            ├── formulario-orcamento.js
            ├── galeria.js
            └── faq.js
```

Cada página carrega apenas os componentes que usa.

## 🚀 Como executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/devlucasaf/naka-tattos.git
   ```
2. Abra o `index.html` no navegador ou use a extensão **Live Server** no VS Code.

Não há dependências para instalar nem etapa de build.

## ⚙️ Configuração

Todos os contatos e links de redes sociais ficam em **`src/js/config.js`**. Alterar lá atualiza o site inteiro.

### Envio do formulário de orçamento

O envio fica isolado em `src/js/servicos/envio-orcamento.js` e tem dois modos:

| Modo | Comportamento |
| --- | --- |
| `whatsapp` _(padrão)_ | Monta a mensagem e abre a conversa no WhatsApp. Não há simulação de envio. |
| `endpoint` | Faz `POST` multipart para a URL informada, já incluindo as imagens de referência. |

Para usar um backend, em `src/js/config.js`:

```js
envio: {
    modo: 'endpoint',
    endpoint: 'https://sua-api/orcamentos'
}
```

## ✅ Pendências antes de publicar

- Substituir `[DOMINIO]` em `index.html`, `privacidade.html`, nas páginas de `src/pages/`, no `robots.txt` e no `sitemap.xml`.
- Preencher os campos entre colchetes nas **Informações legais**, no **FAQ** e na **Política de Privacidade**.
- Trocar os espaços `[FOTO A SER ADICIONADA]` da galeria por fotos reais e escrever as legendas.
- Revisar a Política de Privacidade com um responsável legal.

## 📝 Licença

``Este projeto é de uso pessoal do Gustavo Nakandakari. Todos os direitos reservados.``
[LICENSE](./LICENSE)

<img 
    width=100% 
    src="https://capsule-render.vercel.app/api?type=waving&color=A020F0&height=120&section=footer"
/>
