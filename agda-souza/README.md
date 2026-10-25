# Site: Agda Souza (Academia Profissional de Nails)

Site estático em HTML, CSS e JavaScript puros. **Celular primeiro**: até 899 px é uma coluna única (de 600 a 899 px ela fica centralizada). **A partir de 900 px** entra a versão de computador. Sem build e sem dependências: abra o `index.html` no navegador.

```
agda-souza/
├── index.html        ← todo o texto das seções (separadas por comentários)
├── css/style.css     ← cores (variáveis no topo), fontes e layout
├── js/main.js        ← menu, formulário (WhatsApp real)
├── assets/img/       ← 2 fotos reais (evento ao vivo + sala da academia), sem texto
├── Dockerfile, nginx.conf, .dockerignore   ← mesmo padrão dos outros sites
└── _fonte/
    ├── ig/            fotos de origem (da pasta salva localmente pelo usuário)
    └── design/         mockup em PNG do Google Drive que inspirou este layout
```

## Origem dos dados

Como nos sites da Ingrid Cristina e da Cássia Lima, os dados vieram de uma página do Instagram (`@agdaesmalteria`) **salva localmente pelo usuário** (`C:\Users\Usuário\Downloads\sites2510\`), não do HasData nem do navegador ao vivo.

- **Perfil:** @agdaesmalteria, "💫Agda Souza", **340 mil seguidores**, 206 seguindo, 11.894 posts.
- **Bio:** "🔑Empresária | Mentora | Palestrante | Educadora · 📚+de 12 mil alunas | 24 anos Nails · 👩🏾‍💻CEO @escoladebeleza__negocio · 👩🏾‍💻CEO @lojaagdaesmalteria".
- **Link da bio:** `wa.me/5511980674404` — **WhatsApp público e direto**, já configurado no site.
- **Design de referência:** `@agdaesmalteria-web-mobile-premium.png`, mockup do Google Drive (`Kalli-Designs-Pipeline-40-Perfis-v1`), com o tema "Academia Profissional de Nails" — já alinhado ao nicho real dela.

## ⚠️ Confirmar com a Agda antes de publicar

1. **Qual produto divulgar.** A bio menciona a Escola de Beleza e Negócio (mentoria) e a loja própria (produtos) — o site foca no curso/formação de Nails. Confirme se é o produto certo para captar nesse momento.
2. **Fotos.** Usei uma foto real de um evento ao vivo dela (bastante movimentada, com público ao fundo) e uma foto da sala de aula da academia (recortada para remover o texto do post). Peça fotos de trabalho/técnica mais diretas, se tiver.
3. **Formato.** As fotos sugerem turmas presenciais — confirme com a equipe dela antes de publicar essa informação no FAQ.

## Decisões de design e UX writing

- Mesma família dos outros sites do pipeline: cabeçalho fixo, títulos em serifa, botões em pílula, cards, linha do tempo e FAQ.
- Paleta rosa/vinho (`#c1466b` / `#472431`), igual à da Ana Torres, Ingrid Cristina e Cássia Lima — o mockup do Drive reaproveita essa paleta.
- Sem seção de galeria/trabalhos, por falta de fotos de técnica reais suficientes.

## Formulário

Em `js/main.js`, `CONFIG.whatsapp` já está preenchido com o número real encontrado no link da bio — confirme antes de publicar.

## Publicar

Arraste a pasta para o Netlify Drop, a Vercel ou o GitHub Pages, ou use o `Dockerfile` (nginx). Não envie a pasta `_fonte`. Não precisa de build.
