# Site: Cássia Lima (Formação em Micropigmentação)

Site estático em HTML, CSS e JavaScript puros. **Celular primeiro**: até 899 px é uma coluna única (de 600 a 899 px ela fica centralizada). **A partir de 900 px** entra a versão de computador. Sem build e sem dependências: abra o `index.html` no navegador.

```
cassia-lima/
├── index.html        ← todo o texto das seções (separadas por comentários)
├── css/style.css     ← cores (variáveis no topo), fontes e layout
├── js/main.js        ← menu, formulário
├── assets/img/       ← 2 fotos reais (retrato + resultado labial cicatrizado), sem texto
├── Dockerfile, nginx.conf, .dockerignore   ← mesmo padrão dos outros sites
└── _fonte/
    ├── ig/            fotos de origem (da pasta salva localmente pelo usuário)
    └── design/         mockup em PNG do Google Drive que inspirou este layout
```

## Origem dos dados

Como no site da Ingrid Cristina, os dados vieram de uma página do Instagram (`@cassialima.micro`) **salva localmente pelo usuário** (`C:\Users\Usuário\Downloads\sites2510\`), não do HasData nem do navegador ao vivo.

- **Perfil:** @cassialima.micro, "Cássia Lima - Micropigmentadora e Mentora", **30,2 mil seguidores**, 6.948 seguindo, 2.095 posts.
- **Bio:** "🏆 Máster Internacional | +11 anos · 🎓 +3.000 alunas formadas · 🇧🇷 Cursos presenciais e online · 💎 Nano Fios • Lábial •...".
- **Link da bio:** `maapp.com.br/cassialimamicro` — não consegui abrir esse link nesta coleta (página salva estática), então **não encontrei WhatsApp público**.
- **Design de referência:** `@cassialima.micro-web-mobile-premium.png`, mockup do Google Drive (`Kalli-Designs-Pipeline-40-Perfis-v1`), com o tema "Formação em Micropigmentação" — já alinhado ao nicho real dela.

## ⚠️ Confirmar com a Cássia antes de publicar

1. **WhatsApp.** Não encontrado nesta coleta — acesse `maapp.com.br/cassialimamicro` para confirmar o contato, ou peça direto a ela.
2. **Fotos.** O feed salvo tem bastante conteúdo de evento/flyer ("Conecta Beauty Internacional", com outras pessoas) e vídeos de ambiente, pouca foto limpa de trabalho. Usei 1 retrato real dela e 1 foto de resultado labial (antes/depois/cicatrizado, recortada para remover o texto). Peça mais fotos de trabalho real antes de publicar.
3. **Nome dos cursos.** "Nano Fios", "Labial", "Dermaplaning" e "Micropigmentação" vêm dos destaques e da bio — confirme a grade oficial de cursos com ela.
4. **Formato.** Confirme se a próxima turma é presencial, online ou as duas coisas.

## Decisões de design e UX writing

- Mesma família dos outros sites do pipeline: cabeçalho fixo, títulos em serifa, botões em pílula, cards, linha do tempo e FAQ.
- Paleta rosa/vinho (`#c1466b` / `#472431`), igual à da Ana Torres e da Ingrid Cristina — o mockup do Drive reaproveita essa paleta.
- Sem seção de galeria/trabalhos, por falta de fotos reais suficientes.

## Formulário

Em `js/main.js`, `CONFIG.whatsapp` e `CONFIG.whatsappLink` estão vazios — o formulário cai no Instagram por padrão. Preencha assim que tiver o contato real dela.

## Publicar

Arraste a pasta para o Netlify Drop, a Vercel ou o GitHub Pages, ou use o `Dockerfile` (nginx). Não envie a pasta `_fonte`. Não precisa de build.
