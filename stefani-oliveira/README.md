# Site: Stéfani Oliveira (Mentoria para Educadoras Lash)

Site estático em HTML, CSS e JavaScript puros. **Celular primeiro**: até 899 px é uma coluna única (de 600 a 899 px ela fica centralizada). **A partir de 900 px** entra a versão de computador: início em duas colunas, cards em grade, linha do tempo na horizontal, galeria em grade, formulário ao lado do texto. Sem build e sem dependências: abra o `index.html` no navegador.

```
stefani-oliveira/
├── index.html        ← todo o texto das seções (separadas por comentários)
├── css/style.css     ← cores (variáveis no topo), fontes e layout
├── js/main.js        ← menu, formulário (WhatsApp real), galeria
├── assets/img/       ← 5 fotos reais do Instagram, recortadas (sem o texto dos reels) e otimizadas (~78 KB no total)
├── Dockerfile, nginx.conf, .dockerignore   ← mesmo padrão dos outros sites
└── _fonte/
    ├── ig/            fotos originais baixadas do Instagram (não vão para o ar)
    └── design/         mockup em PNG do Google Drive que inspirou este layout
```

## Origem dos dados

O HasData estava sem créditos. Os dados vieram do Instagram público (`@stefanioliveira.oficial`) e do site pessoal dela (`stefanioliveira.vercel.app`, que linka para a oferta real "Lash Educadora" em `worklash.com.br`), ambos abertos no navegador sem login, mais a aba **Pipeline** da planilha (coleta de 24/10/2026).

- **Perfil:** @stefanioliveira.oficial, **92,3 mil seguidores**, 732 seguindo.
- **Bio:** "Como eu tô construindo um negócio na área da beleza sem atender nenhuma cliente. ✨ Tenista amadora 🎾 +15 mil alunas...".
- **Link da bio:** `stefanioliveira.vercel.app` → de lá, um link real de **WhatsApp**: `wa.me/5518996261388`.
- **Produto real:** "Formação Lash Educadora" (`worklash.com.br/lash-educadora`) — um curso que ensina lash designers a **estruturar, precificar e lançar o próprio curso de cílios**. Dados verificados na própria página de vendas: **"mais de 400 educadoras formadas com cursos estruturados"** e **"mais de 15.000 alunas em mais de 46 países"**.
- **Design de referência:** `@stefanioliveira.oficial-web-mobile-premium.png`, mockup do Google Drive (`Kalli-Designs-Pipeline-40-Perfis-v1`), com paleta vinho/carmim — já alinhado ao tema "Mentoria para Educadoras Lash" (bateu com o nicho real dela).

## ⚠️ Este site não é a página de vendas da Formação Lash Educadora

A `worklash.com.br/lash-educadora` já é um funil de vendas completo (oferta "De R$397 por 12x R$10", bônus, depoimentos). Este site aqui é uma página de autoridade/captação no mesmo estilo dos outros perfis do pipeline (Ana Torres, Coral Beauty etc.) — não repete preço nem a oferta específica do funil dela. Se ela preferir, o botão principal pode linkar direto para `worklash.com.br/lash-educadora` em vez do formulário de interesse.

## ⚠️ Confirmar com a Stéfani antes de publicar

1. **WhatsApp.** O número (`5518996261388`) veio do próprio site pessoal dela — confirme antes de publicar, já que não está na bio do Instagram diretamente.
2. **Fotos.** O feed dela é quase todo reels com texto grande sobreposto ("Dava curso meia-boca", "Meses sem fechar nenhuma aluna"). As fotos usadas foram recortadas para remover esse texto — sobrou um enquadramento mais fechado no rosto. Duas fotos de bastidores (bolo de aniversário e um lanche no carro) são momentos pessoais do feed dela; confirme se ela quer esse tom mais pessoal/casual no site ou prefere algo mais formal.
3. **Formato da mentoria.** Não encontrei se a mentoria é 100% online ou tem encontros ao vivo — o FAQ pede para confirmar isso com ela.
4. **"Dava curso meia-boca".** Frase usada na timeline veio de um reels dela mesma (texto na tela) — confirme se ela quer manter esse tom informal no site ou prefere algo mais neutro.

## Decisões de design e UX writing

- **Mesma família dos outros sites do pipeline:** cabeçalho fixo, títulos em serifa, botões em pílula, cards, linha do tempo e FAQ.
- **Identidade própria, a partir do mockup do Drive:** carmim (`#8d1433`) e vinho escuro (`#530d20`) sobre fundo creme.
- **Roteiro de abordagem:** a aba Pipeline sugere "Opção 3 (monetização)" para este perfil — por isso o foco do site é negócio/faturamento (estruturar e vender curso), não técnica de cílios.
- **Botões** começam com verbo e dizem o que acontece. Tocar num tópico já marca a opção no formulário.
- **Erros** explicam como corrigir e aparecem ao sair do campo.
- **Privacidade:** aviso junto ao botão ("Nada fica salvo neste site").
- **Acessibilidade:** link "Pular para o conteúdo", `aria-invalid` nos erros, `alt` descritivo em todas as fotos, contraste AA nos botões e `prefers-reduced-motion`.

## Formulário: WhatsApp real ou lista de interessados

Em `js/main.js`, no bloco `CONFIG`:

- `whatsapp`: já preenchido com o número encontrado no site pessoal dela — confirme antes de publicar.
- `webhook`: URL de n8n, Formspree ou Google Apps Script. Com ela, o formulário envia os dados para lá em vez de abrir uma conversa. O `nginx.conf` já libera `connect-src https:` para isso.

## Publicar

Arraste a pasta para o Netlify Drop, a Vercel ou o GitHub Pages, ou use o `Dockerfile` (nginx). Não envie a pasta `_fonte`. Não precisa de build.
