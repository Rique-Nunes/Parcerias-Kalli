# Site: Cássia Lima (Formação em Micropigmentação)

Site estático em HTML, CSS e JavaScript puros, sem build. **Celular primeiro**; a partir de 900 px entra o layout de computador e a partir de 1100 px o menu fica aberto no topo. Abra o `index.html` no navegador.

Revitalizado em 29/10/2026 com as fotos novas do Instagram, usando a estrutura do site da Ana Torres como base. Detalhes de cores, seções e animações em `ANALISE-DESIGN.md`; origem de cada foto em `banco-imagens.json`.

```
cassia-lima/
├── index.html          ← todo o texto (seções separadas por comentários)
├── css/style.css       ← paleta nas variáveis do topo, layout e animações
├── js/main.js          ← CONFIG (WhatsApp/Instagram/webhook), menu, labial, fotos, formulário
├── assets/img/         ← fotos em WebP usadas no site
├── Dockerfile, nginx.conf, .dockerignore
└── _fonte/
    ├── ig/                         fotos originais do Instagram (não enviar)
    ├── design/                     mockup antigo do Drive
    └── versao-anterior-20261025/   cópia do index/css/js anteriores
```

## Origem dos dados

- **Perfil:** @cassialima.micro, "Cássia Lima - Micropigmentadora e Mentora", 30,2 mil seguidores.
- **Bio:** Máster Internacional · +11 anos · +3.000 alunas formadas · cursos presenciais e online · Nano Fios · Labial.
- **Link da bio:** `maapp.com.br/cassialimamicro` — WhatsApp ainda não confirmado.

## ⚠️ Confirmar com a Cássia antes de publicar

1. **WhatsApp.** `CONFIG.whatsapp` está vazio em `js/main.js`; enquanto isso, botões e formulário levam ao Instagram. Preencha com DDI + DDD + número só com dígitos.
2. **Fotos.** Confirme que os retratos (poltrona, terno cinza, estúdio, foto com alunas) são dela e que ela autoriza o uso das fotos de turmas.
3. **Cursos.** Nano fios, Labial e Dermaplaning vêm da bio e dos destaques — confirme a grade oficial.

## Publicar

Netlify Drop, Vercel, GitHub Pages ou o `Dockerfile` (nginx). Não envie a pasta `_fonte`.
