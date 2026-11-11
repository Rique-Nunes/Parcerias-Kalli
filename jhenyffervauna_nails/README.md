# Site: Jhenyffer Vaúna (mentora e educadora, unhas de alto padrão)

Site estático em HTML, CSS e JavaScript puros, sem build. **Não segue o molde escuro dos outros sites da pasta**: foi desenhado a partir da marca dela (claro, champanhe, lilás do estúdio, batom vermelho). Celular primeiro; computador a partir de 900 px. Abra o `index.html` no navegador.

Criado em 11/11/2026. Decisões de design em `ANALISE-DESIGN.md`; origem de cada foto em `banco-imagens.json`.

```
jhenyffervauna_nails/
├── index.html          ← todo o texto
├── css/style.css       ← paleta nas variáveis do topo
├── js/main.js          ← CONFIG (WhatsApp, Instagram, webhook), menu, fotos, formulário
├── assets/img/         ← fotos em WebP
├── Dockerfile, nginx.conf, .dockerignore
└── _fonte/ig/          ← originais do Instagram (não enviar)
```

## Origem dos dados (11/11/2026)

- **Instagram:** @jhenyffervauna_nails, "jhenyffer Vaúna | Mentora e Educadora", 26.095 seguidores.
- **Bio:** Educadora | nail designer · Especialista em unhas de alto padrão · Jardim Primavera - RJ · "Acesse e entre para minha próxima turma".
- **Link da bio:** Kiwify "Os segredos por trás dos moldes" → `https://pay.kiwify.com.br/dHPgqir` (no site vai com `?utm_source=site`, sem o redirecionamento do Instagram).
- **Cursos citados por ela:** Os Segredos por Trás dos Moldes (turmas), Curso VIP Personalizado Método Vaúna F1 Autoral (arte do post), MME · Método Manicure de Excelência (posts de 30 e 31/10/2026).
- **Frases dela usadas:** manchete do jornal da foto, "Vaúna Beauty | Beleza, técnica e propósito", "Você pode, você consegue" (post de 17/08/2024, abertura do Studio).

## ⚠️ Antes de publicar

1. **Kiwify esgotado.** Em 11/11/2026 a página de pagamento mostrava lote esgotado e tempo encerrado, sem preço. Os botões já apontam para lá; confirmar com ela quando abre o próximo lote.
2. **Sem WhatsApp.** Ela não divulga número. O formulário prepara a mensagem, copia e abre o direct do Instagram. Preencha `CONFIG.whatsapp` (ou `CONFIG.webhook`) em `js/main.js` para mudar o destino.
3. **Fotos.** Confirmar autorização; a foto da turma mostra alunas.
4. **Textos dos cursos.** Formato, duração e conteúdo não são públicos. "Turma com certificado" vem da foto; os itens do VIP vêm da arte; o MME tem só a descrição das legendas. Validar com ela.
5. **"Cinco sinais"** reescreve as anotações da própria foto dela; conferir se ela aprova a redação.
6. **docker-compose.yml** da raiz ainda não tem este serviço.

## Publicar

Netlify Drop, Vercel, GitHub Pages ou o `Dockerfile` (nginx). Não envie a pasta `_fonte`.
