# Site: Carol Landim (Esteticista de Sucesso ®)

Site estático em HTML, CSS e JavaScript puros. **Celular primeiro**: até 899 px é uma coluna única (de 600 a 899 px ela fica centralizada). **A partir de 900 px** entra a versão de computador. Sem build e sem dependências: abra o `index.html` no navegador.

```
carol-landim/
├── index.html        ← todo o texto das seções (separadas por comentários)
├── css/style.css     ← cores (variáveis no topo), fontes e layout
├── js/main.js        ← menu, formulário (WhatsApp real)
├── assets/img/       ← 2 imagens reais (ver limitação abaixo)
├── Dockerfile, nginx.conf, .dockerignore   ← mesmo padrão dos outros sites
└── _fonte/
    ├── ig/            imagens originais baixadas do Instagram (não vão para o ar)
    └── design/         mockup em PNG do Google Drive que inspirou este layout
```

## ⚠️ Limitação de fotos reais — importante

O Instagram `@esteticista.sucesso` é quase 100% composto de **artes de divulgação** (capas de curso, personagens ilustrados estilo "Barbie", prints de produto) — não encontrei fotos reais e "limpas" da Carol Landim trabalhando ou posando, sem arte gráfica aplicada. Por isso este site usa só **2 imagens**, bem mais modesto que os outros sites do pipeline:

1. **`hero-carol.webp`** — a foto de perfil dela no Instagram (150×150 px, baixa resolução, ampliada). É uma foto real do rosto dela, mas pequena e com a arte de marca "Esteticista de Sucesso" já aplicada por cima.
2. **`tecnica-extracao.webp`** — foto de um procedimento de limpeza de pele (extração), recortada para remover o texto do post. **Atenção:** a legenda original desse post credita `@esteticanandapereira`, não a Carol — ou seja, pode ser conteúdo republicado/licenciado, não uma foto do trabalho dela mesma. Por isso a legenda no site ficou genérica ("Visão de negócio"), sem atribuir a foto a ela.

**Recomendo fortemente pedir fotos originais à Carol** (dela mesma, do espaço, de clientes com autorização) antes de publicar — as outras seções do site (serviços sem foto, cards de texto) foram desenhadas para funcionar bem mesmo sem imagem, graças ao mesmo sistema de "foto opcional" dos outros sites da pasta.

## Origem dos dados

O HasData estava sem créditos. Os dados vieram do Instagram público (`@esteticista.sucesso`) e da página de linkme.bio dela, ambos abertos no navegador sem login, mais a aba **Pipeline** da planilha (coleta de 24/10/2026).

- **Perfil:** @esteticista.sucesso, "Esteticista de Sucesso ® | Carol Landim", **121 mil seguidores**, 3.389 seguindo.
- **Bio:** "💎 Dê o próximo passo na sua estética ⭐️ Aumente seus resultados 🎯 O próximo nível começa aqui".
- **Link da bio:** `linkme.bio/esteticistadesucesso` → de lá, um **WhatsApp real**: `wa.me/5511941787958` ("Contato no Whatsapp").
- **Produtos reais (Hotmart):** "Emoliência Perfeita", "Guia Secreto", "Curso Limpeza de Pele Avançada e suas Associações", **"Estética Club" (clube de estudos para profissionais)**, "E-book Melasma Controlado".
- **Design de referência:** `@esteticista.sucesso-web-mobile-premium.png`, mockup do Google Drive (`Kalli-Designs-Pipeline-40-Perfis-v1`), com paleta verde/petróleo — nome do produto no mockup ("Esteticista de Sucesso") já batia com a marca real dela.

## ⚠️ Confirmar com a Carol antes de publicar

1. **Fotos reais** — ver limitação acima. É o ponto mais importante antes de publicar.
2. **Qual produto divulgar.** A Carol tem vários produtos (cursos avulsos no Hotmart + o Estética Club, que parece ser a mentoria/comunidade recorrente). O site aponta de forma genérica para "a mentoria" — confirme se ela quer direcionar especificamente para o Estética Club ou para outro produto.
3. **WhatsApp.** O número veio do link oficial da bio dela — confirme antes de publicar.
4. **Formato.** Não encontrei se é mentoria online, encontros ao vivo ou comunidade assíncrona (tipo clube de estudos) — o FAQ pede para confirmar isso com ela.

## Decisões de design e UX writing

- **Mesma família dos outros sites do pipeline:** cabeçalho fixo, títulos em serifa, botões em pílula, cards, linha do tempo e FAQ.
- **Identidade própria, a partir do mockup do Drive:** verde-petróleo (`#4d7669`) e verde-escuro quase preto (`#193332`) sobre fundo creme.
- **Sem seção de galeria/trabalhos** — removida neste site por falta de fotos reais suficientes (diferente dos outros sites do pipeline, que têm uma galeria arrastável).
- **Botões** começam com verbo e dizem o que acontece. Tocar num tópico já marca a opção no formulário.
- **Erros** explicam como corrigir e aparecem ao sair do campo.
- **Privacidade:** aviso junto ao botão ("Nada fica salvo neste site").
- **Acessibilidade:** link "Pular para o conteúdo", `aria-invalid` nos erros, `alt` descritivo nas fotos, contraste AA nos botões e `prefers-reduced-motion`.

## Formulário: WhatsApp real ou lista de interessados

Em `js/main.js`, no bloco `CONFIG`:

- `whatsapp`: já preenchido com o número do link oficial da bio — confirme antes de publicar.
- `webhook`: URL de n8n, Formspree ou Google Apps Script. Com ela, o formulário envia os dados para lá em vez de abrir uma conversa. O `nginx.conf` já libera `connect-src https:` para isso.

## Publicar

Arraste a pasta para o Netlify Drop, a Vercel ou o GitHub Pages, ou use o `Dockerfile` (nginx). Não envie a pasta `_fonte`. Não precisa de build.
