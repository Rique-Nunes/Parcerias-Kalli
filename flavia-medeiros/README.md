# Site: Dra. Flávia Medeiros (Estética Avançada)

Site estático em HTML, CSS e JavaScript puros. **Celular primeiro**: até 899 px é uma coluna única (de 600 a 899 px ela fica centralizada). **A partir de 900 px** entra a versão de computador. Sem build e sem dependências: abra o `index.html` no navegador.

```
flavia-medeiros/
├── index.html        ← todo o texto das seções (separadas por comentários)
├── css/style.css     ← cores (variáveis no topo), fontes e layout
├── js/main.js        ← menu, formulário (WhatsApp), galeria
├── assets/img/       ← 3 fotos reais do Instagram (perfil, clínica, técnica), sem texto de posts
├── Dockerfile, nginx.conf, .dockerignore   ← mesmo padrão dos outros sites
└── _fonte/
    ├── ig/            fotos originais baixadas do Instagram (não vão para o ar)
    └── design/         mockup em PNG do Google Drive que inspirou este layout
```

## Origem dos dados

O HasData estava sem créditos. Os dados vieram do Instagram público (`@esteticaflaviamedeiros`) e do `bio.site/esteticaflaviamedeiros`, abertos no navegador sem login, mais a aba **Pipeline** da planilha (coleta de 24/10/2026).

- **Perfil:** @esteticaflaviamedeiros, "Dra.Flávia Medeiros", **138 mil seguidores**, 1.115 seguindo.
- **Bio:** "23 anos de Estética Avançada · Estratégias para Face e Corpo · 📍Jardins | SP".
- **Link da bio:** `bio.site/esteticaflaviamedeiros` → de lá, dois links de WhatsApp (sem número visível): **"CONTACTAR CLÍNICA FLÁVIA MEDEIROS"** e **"SUPORTE CURSOS FLÁVIA MEDEIROS"**. Usei o de cursos (`wa.me/message/4OINDZJVWPP7K1`), por este site ser sobre a formação, não sobre agendar atendimento clínico.
- **Design de referência:** `@esteticaflaviamedeiros-web-mobile-premium.png`, mockup do Google Drive (`Kalli-Designs-Pipeline-40-Perfis-v1`), já com o tema "Imersão em Estética Avançada" — alinhado ao nicho real dela.

## ⚠️ Confirmar com a Dra. Flávia antes de publicar

1. **Qual WhatsApp usar.** O site usa o link de "Suporte Cursos", mas ela também tem um link separado para a clínica — confirme qual ela prefere para captar interesse na formação.
2. **Outros negócios.** O Instagram dela também promove **perfumes árabes** (destaque "PERFUMES ÁRABES", vários posts) — isso ficou de fora do site de propósito, por não ter relação com a formação em estética.
3. **Formato da formação.** Não encontrei se é presencial, online ou ambos — o FAQ pede para confirmar.
4. **Fotos.** As 3 fotos (perfil, uma na clínica com jaleco, uma demonstrando técnica com aparelho de radiofrequência) são reais e sem texto de post. Há bastante conteúdo pessoal no feed dela (vídeos com o marido, memes) que ficou de fora por não ser relevante ao tema profissional do site.

## Decisões de design e UX writing

- Mesma família dos outros sites do pipeline: cabeçalho fixo, títulos em serifa, botões em pílula, cards, linha do tempo, galeria e FAQ.
- Paleta verde-petróleo (`#4d7669` / `#193332`), igual à da Carol Landim — o mockup do Drive usa a mesma paleta para os dois perfis.
- Roteiro sugerido na planilha: "Opção 1 (direta)" — CTAs diretos para WhatsApp/lista de interesse.

## Formulário

Em `js/main.js`, `CONFIG.whatsappLink` já aponta para o link de suporte a cursos. `CONFIG.webhook` pode ser preenchido para enviar os dados a um n8n/Formspree em vez de abrir o WhatsApp.

## Publicar

Arraste a pasta para o Netlify Drop, a Vercel ou o GitHub Pages, ou use o `Dockerfile` (nginx). Não envie a pasta `_fonte`. Não precisa de build.

## ⚠️ Nota desta sessão

Este site **não passou pelo teste visual no navegador** (mobile/desktop) que os outros sites do pipeline receberam, por limite de uso atingido durante a sessão. A estrutura é idêntica à dos sites já testados (mesmo sistema de CSS/JS), mas vale conferir visualmente antes de publicar.
