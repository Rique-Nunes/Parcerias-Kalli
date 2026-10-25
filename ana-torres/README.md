# Site: Ana Torres (Master em Cílios · Instituto Ateliê, RJ)

Site estático em HTML, CSS e JavaScript puros. **Celular primeiro**: até 899 px é uma coluna única (de 600 a 899 px ela fica centralizada). **A partir de 900 px** entra a versão de computador: início em duas colunas, cards de formação em grade, linha do tempo na horizontal, galeria em grade, formulário ao lado do texto. Sem build e sem dependências: abra o `index.html` no navegador.

```
ana-torres/
├── index.html        ← todo o texto das seções (separadas por comentários)
├── css/style.css     ← cores (variáveis no topo), fontes e layout
├── js/main.js        ← menu, formulário (Instagram ou webhook), galeria
├── assets/img/       ← 9 fotos reais do Instagram, recortadas e otimizadas (~286 KB no total)
├── Dockerfile, nginx.conf, .dockerignore   ← mesmo padrão dos sites da Karoll e da Juliana
└── _fonte/
    ├── ig/            fotos originais baixadas do Instagram (não vão para o ar)
    └── design/         mockup em PNG do Google Drive que inspirou este layout
```

## Origem dos dados

O HasData estava sem créditos (mesma situação do site da Juliana). Os dados vieram da página pública do Instagram (`@annaatorres`) e do site de vendas dela (`annatorres.site`), ambos abertos no navegador sem login, mais a aba **Pipeline** da planilha "Possíveis Parcerias Kalli" (coleta de 24/10/2026).

- **Perfil:** @annaatorres, "Ana Torres | Master em Cílios RJ", **82,5 mil seguidores**, 3.398 seguindo.
- **Bio:** "Mentora • Palestrante • Educadora · +5.000 alunas pelo mundo 🇨🇴🇵🇹🇪🇸🇺🇸🇮🇪 · Te ensino uma aplicação em até 30min...". Os destaques da bio: Alunas, Mentoria, Presencial, Alunas, Cursos, Palestras.
- **Link da bio:** `annatorres.site` — uma página de vendas do curso online **Método V30** (R$ 78,90 na oferta, de R$ 397), com depoimentos reais (Rayssa R., Joyce C., Flaviane O.) e o número **"2.400+ alunas formadas"**.
- **Instituto Ateliê:** marca/instituto dela, citada como mentora no site de vendas.
- **Palestrante premiada:** Infinity Beauty Awards, citado no site de vendas como credencial de autoridade.
- **Sem WhatsApp público.** Não encontrei número nem link de WhatsApp na bio do Instagram nem no site de vendas — só o checkout do curso.
- **Design de referência:** `@annaatorres-web-mobile-premium.png`, mockup em pasta do Google Drive (`Kalli-Designs-Pipeline-40-Perfis-v1`), com paleta rosa/vinho e a proposta "Formação Master em Extensão de Cílios".

## ⚠️ Dois números de "alunas" diferentes — confirmar qual usar

A bio do Instagram diz **"+5.000 alunas pelo mundo"** (ensino de técnica em geral). O site de vendas do Método V30 diz **"2.400+ alunas formadas"** (só quem comprou esse curso específico). Usei o **"+5.000"** no site por vir da própria bio dela, mas os dois aparecem nas fontes — confirme com a Ana qual número ela quer destacar antes de publicar.

## ⚠️ Confirmar com a Ana antes de publicar

1. **Este site não é o funil de vendas do Método V30.** O `annatorres.site` já vende o curso por R$ 78,90 com cronômetro e oferta limitada. Este site aqui é uma página de autoridade/captação (lista de interesse), no mesmo estilo dos sites da Gih, da Karoll e da Juliana — não repete preço, cronômetro nem promessas de faturamento do funil dela. Se ela preferir, dá para linkar o botão principal direto para `annatorres.site` em vez do formulário.
2. **WhatsApp.** Sem número público, o formulário abre o Instagram (copia a mensagem e abre a conversa). Assim que ela passar um número, preencha `CONFIG.whatsapp` em `js/main.js` (DDI + DDD + número) para a mensagem já ir preenchida.
3. **Fotos.** Vieram do feed público do Instagram (miniaturas ~640×640 px). São 3 fotos de técnica (mapeamento e aplicação de cílios), 1 foto dela no estúdio, 1 selfie com extensão aplicada, e 3 fotos com alunas segurando certificado — **peça autorização às alunas que aparecem** antes de publicar, ou troque por fotos que ela já tenha autorização de uso.
4. **Formato da formação.** Não achei se a próxima turma é presencial, online ou as duas coisas — o FAQ do site pede para "confirmar com a Ana". Ajuste a resposta em `index.html` (seção `#duvidas`) com o formato real.
5. **Certificado.** O FAQ afirma que a formação emite certificado — confirmado pelas fotos reais de certificado no Instagram, mas confirme o texto exato antes de publicar.
6. **Cidade/RJ.** O título "Master em Cílios RJ" vem do próprio nome de perfil dela; não achei endereço de estúdio público, por isso o site não tem seção de local/mapa (diferente do site da Juliana).

## Decisões de design e UX writing

- **Mesma família dos sites da Gih, da Karoll e da Juliana:** cabeçalho fixo, títulos em serifa, botões em pílula, cards, linha do tempo e FAQ. No celular, a foto da Ana abre a página antes do título e aparece inteira; no computador, fica ao lado do texto.
- **Identidade própria, a partir do mockup do Drive:** rosa (`#c1466b`) e vinho escuro (`#472431`) sobre fundo creme, com círculos suaves no início — oposto aos tons escuros frios dos outros três sites, mais clean e "clínica de beleza".
- **Roteiro de abordagem:** a aba Pipeline sugere "Opção 2 (autoridade)" para este perfil — por isso o site foca em credenciais reais (seguidoras, palestra premiada, alunas, trajetória) em vez de preço ou urgência.
- **Botões** começam com verbo e dizem o que acontece. Tocar numa formação já marca a opção no formulário.
- **Erros** explicam como corrigir e aparecem ao sair do campo.
- **Privacidade:** aviso junto ao botão ("Nada fica salvo neste site").
- **Acessibilidade:** link "Pular para o conteúdo", `aria-invalid` nos erros, `alt` descritivo em todas as fotos, contraste AA nos botões e `prefers-reduced-motion`.

## Formulário: Instagram ou lista de interessados

Em `js/main.js`, no bloco `CONFIG`:

- `whatsapp`: preencha com DDI + DDD + número (só dígitos) assim que a Ana passar o contato. Sem isso, o botão abre o Instagram dela.
- `webhook`: URL de n8n, Formspree ou Google Apps Script. Com ela, o formulário envia os dados para lá em vez de abrir uma conversa — é o caminho para montar uma lista de interessados. O `nginx.conf` já libera `connect-src https:` para isso.

## Publicar

Arraste a pasta para o Netlify Drop, a Vercel ou o GitHub Pages, ou use o `Dockerfile` (nginx). Não envie a pasta `_fonte`. Não precisa de build.
