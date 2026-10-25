# Site: Pamela Borges (Educadora Nail de Alto Valor)

Site estático em HTML, CSS e JavaScript puros. **Celular primeiro**: até 899 px é uma coluna única (de 600 a 899 px ela fica centralizada). **A partir de 900 px** entra a versão de computador. Sem build e sem dependências: abra o `index.html` no navegador.

```
pamela-borges/
├── index.html        ← todo o texto das seções (separadas por comentários)
├── css/style.css     ← cores (variáveis no topo), fontes e layout
├── js/main.js        ← menu, formulário
├── assets/img/       ← 1 foto real (atendendo cliente), recortada sem texto
├── Dockerfile, nginx.conf, .dockerignore   ← mesmo padrão dos outros sites
└── _fonte/
    ├── ig/            fotos de origem (da pasta salva localmente pelo usuário)
    └── design/         mockup em PNG do Google Drive que inspirou este layout
```

## Origem dos dados

Como nos outros 3 sites desta leva, os dados vieram de uma página do Instagram (`@nails.pamelaborges`) **salva localmente pelo usuário** (`C:\Users\Usuário\Downloads\sites2510\`), não do HasData nem do navegador ao vivo.

- **Perfil:** @nails.pamelaborges, "Pamela | Mentora de Nails Educadoras", **85,8 mil seguidores**, 52 seguindo, 529 posts.
- **Bio:** "— Transforme o seu conhecimento em um curso lucrativo e saia da rotina exaustiva da mesa / ↓ Comece pelos destaques".
- **Link da bio:** `pamelaborges.com.br/bio` — não consegui abrir esse link nesta coleta (página salva estática), então **não encontrei WhatsApp público**.
- **Design de referência:** `@nails.pamelaborges-web-mobile-premium.png`, mockup do Google Drive (`Kalli-Designs-Pipeline-40-Perfis-v1`), com o tema "Educadora Nail de Alto Valor" — já alinhado ao nicho real dela.

## ⚠️ Confirmar com a Pamela antes de publicar

1. **WhatsApp.** Não encontrado nesta coleta — acesse `pamelaborges.com.br/bio` para confirmar o contato, ou peça direto a ela.
2. **Fotos.** O feed salvo é quase todo artes com texto grande sobre fotos de trabalho real ("O segredo para ter conteúdo infinito", "Nail Designer x ChatGPT", "Como a Shy saiu de 2 mil para 41 mil seguidoras"). Usei 1 foto real dela atendendo uma cliente, recortada para remover o texto. Peça mais fotos limpas, se tiver.
3. **Formato.** Não encontrei se a mentoria é online, presencial ou os dois — o FAQ pede para confirmar.

## Decisões de design e UX writing

- Mesma família dos outros sites do pipeline: cabeçalho fixo, títulos em serifa, botões em pílula, cards, linha do tempo e FAQ.
- Paleta rosa/vinho (`#c1466b` / `#472431`), igual à da Ana Torres, Ingrid Cristina, Cássia Lima e Agda Souza — o mockup do Drive reaproveita essa paleta.
- Sem seção de galeria/trabalhos, por falta de fotos reais suficientes.

## Formulário

Em `js/main.js`, `CONFIG.whatsapp` e `CONFIG.whatsappLink` estão vazios — o formulário cai no Instagram por padrão. Preencha assim que tiver o contato real dela.

## Publicar

Arraste a pasta para o Netlify Drop, a Vercel ou o GitHub Pages, ou use o `Dockerfile` (nginx). Não envie a pasta `_fonte`. Não precisa de build.
