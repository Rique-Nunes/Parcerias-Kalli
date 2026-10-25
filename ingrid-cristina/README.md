# Site: Ingrid Cristina (Método Lash Empresária)

Site estático em HTML, CSS e JavaScript puros. **Celular primeiro**: até 899 px é uma coluna única (de 600 a 899 px ela fica centralizada). **A partir de 900 px** entra a versão de computador. Sem build e sem dependências: abra o `index.html` no navegador.

```
ingrid-cristina/
├── index.html        ← todo o texto das seções (separadas por comentários)
├── css/style.css     ← cores (variáveis no topo), fontes e layout
├── js/main.js        ← menu, formulário
├── assets/img/       ← 1 foto real (recortada de uma arte de campanha), sem texto
├── Dockerfile, nginx.conf, .dockerignore   ← mesmo padrão dos outros sites
└── _fonte/
    ├── ig/            página do Instagram salva localmente (fornecida pelo usuário) e fotos de origem
    └── design/         mockup em PNG do Google Drive que inspirou este layout
```

## Origem dos dados

Desta vez os dados **não vieram do HasData nem do navegador ao vivo** — o usuário forneceu a página do Instagram (`@lashempresaria`) já salva localmente (HTML completo + pasta de imagens), em `C:\Users\Usuário\Downloads\sites2510\`. Os dados foram extraídos direto desse HTML salvo, mais a aba **Pipeline** da planilha.

- **Perfil:** @lashempresaria, verificado, "Ingrid Cristina | Master Educadora LED Lash Pro", **44,8 mil seguidores**, 1.432 seguindo, 1.224 posts.
- **Bio:** "A mentora Nº1 de Goiânia que transforma Lash Designers em CEOs - Método Lash Empresária | +5.000 alunas | Master Educadora LED Lash Pro".
- **Link da bio:** `ingridlashes.my.canva.site/page` — não encontrei WhatsApp público nesse HTML salvo (a página salva não carrega conteúdo dinâmico como o site de destino do link).
- **Design de referência:** `@lashempresaria-web-mobile-premium.png`, mockup do Google Drive (`Kalli-Designs-Pipeline-40-Perfis-v1`), já com o nome real do método dela ("Método Lash Empresária") — bateu exatamente com a marca.

## ⚠️ Limitação de fotos reais

O feed salvo é quase todo **artes de campanha de Black Friday** ("Black Friday Lash Empresária LED", sacolas de compras, bexigas de chiclete com o nome do curso) — não fotos de trabalho/técnica. Usei **1 única foto real**: um recorte de uma dessas artes, cortando a parte com texto e mantendo só o retrato dela. Recomendo pedir fotos originais (dela, de alunas, de trabalhos reais de lash) antes de publicar.

## ⚠️ Confirmar com a Ingrid antes de publicar

1. **WhatsApp.** Não encontrado nesta coleta — acesse `ingridlashes.my.canva.site/page` para confirmar o contato antes de publicar, ou peça direto a ela.
2. **Fotos.** Ver limitação acima — pedir material original.
3. **Formato do método.** Não encontrei se é presencial, online ou os dois — o FAQ pede para confirmar.

## Decisões de design e UX writing

- Mesma família dos outros sites do pipeline: cabeçalho fixo, títulos em serifa, botões em pílula, cards, linha do tempo e FAQ.
- Paleta rosa/vinho (`#c1466b` / `#472431`), igual à da Ana Torres — o mockup do Drive usa a mesma paleta para os dois perfis.
- Sem seção de galeria/trabalhos, por falta de fotos reais suficientes (mesmo motivo do site da Carol Landim).

## Formulário

Em `js/main.js`, `CONFIG.whatsapp` e `CONFIG.whatsappLink` estão vazios — o formulário cai no Instagram por padrão. Preencha assim que tiver o contato real dela.

## Publicar

Arraste a pasta para o Netlify Drop, a Vercel ou o GitHub Pages, ou use o `Dockerfile` (nginx). Não envie a pasta `_fonte`. Não precisa de build.
