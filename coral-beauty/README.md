# Site: Coral Beauty (Estética Avançada)

Site estático em HTML, CSS e JavaScript puros. **Celular primeiro**: até 899 px é uma coluna única (de 600 a 899 px ela fica centralizada). **A partir de 900 px** entra a versão de computador: início em duas colunas, cards de tratamento em grade, linha do tempo na horizontal, galeria em grade, formulário ao lado do texto. Sem build e sem dependências: abra o `index.html` no navegador.

```
coral-beauty/
├── index.html        ← todo o texto das seções (separadas por comentários)
├── css/style.css     ← cores (variáveis no topo), fontes e layout
├── js/main.js        ← menu, formulário (WhatsApp real), galeria
├── assets/img/       ← 5 fotos reais do Instagram, recortadas (sem o texto dos posts) e otimizadas (~100 KB no total)
├── Dockerfile, nginx.conf, .dockerignore   ← mesmo padrão dos sites da Karoll e da Juliana
└── _fonte/
    ├── ig/            fotos originais baixadas do Instagram (não vão para o ar)
    └── design/         mockup em PNG do Google Drive que inspirou este layout
```

## ⚠️ Antes de tudo: confirmar quem decide

A própria planilha de pipeline já sinaliza isso ("Confirmar quem decide: marca ou fundadora?") — **confirmado nesta coleta**: o Instagram `@coralbeautybrazil` é uma conta de **marca/clínica verificada (selo azul)**, não de uma profissional só. As legendas dos posts aparecem assinadas por pessoas diferentes — "Doutora Kelly Schulios", "Dr. Danilo Almeida", "Stéphanie Schulios" e a própria "Coral Beauty" — ou seja, é um time. Por isso este site fala da **Coral Beauty como marca/equipe**, não como uma pessoa única (diferente dos sites da Gih, Karoll, Juliana e Ana Torres).

## Origem dos dados

O HasData estava sem créditos. Os dados vieram do Instagram público (`@coralbeautybrazil`), aberto no navegador sem login, e da aba **Pipeline** da planilha "Possíveis Parcerias Kalli" (coleta de 24/10/2026).

- **Perfil:** @coralbeautybrazil, **verificado**, "Coral Beauty · Destacando apenas o essencial", **91,8 mil seguidores**, só 3 seguindo (típico de conta de marca).
- **Bio:** "Estética Corporal | Harmonização Facial | PMU | Saúde · +40.000 vidas transformadas entre...".
- **Link da bio:** `wa.me/5511965225959` — WhatsApp público e direto.
- **Design de referência:** `@coralbeautybrazil-web-mobile-premium.png`, mockup do Google Drive (`Kalli-Designs-Pipeline-40-Perfis-v1`). O mockup original vendia uma "Formação Beauty 360" (curso) — mas a bio da Coral não menciona nenhum curso, só tratamentos. Adaptei o layout e a paleta do mockup, mas troquei o conteúdo de "formação" para "tratamentos", que é o que a conta realmente oferece.

## ⚠️ Número de WhatsApp: pequena divergência

A planilha Pipeline trazia `wa.me/5511965225909`, mas o link que está **hoje** na bio do Instagram é `wa.me/5511965225959` (dois dígitos trocados). Usei o número que está ao vivo na bio (mais atual), configurado em `CONFIG.whatsapp` no `js/main.js`. Confirme o número certo antes de publicar.

## ⚠️ Confirmar com a Coral Beauty antes de publicar

1. **Quem aprova o site.** Como é conta de marca/clínica, confirme com quem decide (fundadora, sócios ou time de marketing) antes de enviar o link — ver alerta acima.
2. **Unidades de atendimento.** Não encontrei endereço público no Instagram. O FAQ do site pede para confirmar isso com a equipe; ajuste a resposta em `index.html` (seção `#duvidas`) assim que tiver a informação.
3. **Fotos.** A conta publica majoritariamente **artes com texto** (ex.: "VAI VIAJAR?", "PELE DE PORCELANA"), não fotos limpas de tratamento. As 5 fotos usadas foram recortadas para remover o texto dos posts — sobrou pouco enquadramento em alguns casos (rosto/mão, abdômen). Peça à Coral Beauty fotos originais de antes/depois e da equipe sem arte aplicada, se quiser substituir.
4. **Foto "Protocolo Coral".** A foto usada na seção de método (`retrato-cliente.webp`) é um retrato de divulgação da própria conta — não sei se é cliente, modelo ou profissional da Coral. Por isso a legenda ficou neutra ("Protocolo Coral"), sem atribuir nome. Troque assim que a Coral confirmar quem é.
5. **Foto da equipe em feira.** `hero-equipe.webp` mostra a equipe em um estande "prodigyMED" (feira do setor) — confirme se pode usar essa foto e se o nome do evento deve aparecer.
6. **+40.000 "vidas transformadas".** Número direto da bio; não é possível verificar. Mantido porque é autodeclarado pela própria conta.

## Decisões de design e UX writing

- **Mesma família dos sites da Gih, Karoll, Juliana e Ana Torres:** cabeçalho fixo, títulos em serifa, botões em pílula, cards, linha do tempo e FAQ.
- **Identidade própria, a partir do mockup do Drive:** ameixa/plum (`#774e6b`) e roxo quase preto (`#2d2432`) sobre fundo creme — tom mais clínico/sério que os outros sites, coerente com "estética avançada".
- **Roteiro de abordagem:** a aba Pipeline sugere "Opção 1 (direta)" para este perfil — por isso os CTAs vão direto para "Agendar avaliação" / WhatsApp, sem uma narrativa de autoridade pessoal (não há "sobre ela" por ser conta de marca).
- **Botões** começam com verbo e dizem o que acontece. Tocar num tratamento já marca a opção no formulário.
- **Erros** explicam como corrigir e aparecem ao sair do campo.
- **Privacidade:** aviso junto ao botão ("Nada fica salvo neste site").
- **Acessibilidade:** link "Pular para o conteúdo", `aria-invalid` nos erros, `alt` descritivo em todas as fotos, contraste AA nos botões e `prefers-reduced-motion`.

## Formulário: WhatsApp real ou lista de interessados

Em `js/main.js`, no bloco `CONFIG`:

- `whatsapp`: já preenchido com o número da bio (`5511965225959`) — confirme antes de publicar (ver divergência acima).
- `webhook`: URL de n8n, Formspree ou Google Apps Script. Com ela, o formulário envia os dados para lá em vez de abrir uma conversa — é o caminho para montar uma lista de interessados. O `nginx.conf` já libera `connect-src https:` para isso.

## Publicar

Arraste a pasta para o Netlify Drop, a Vercel ou o GitHub Pages, ou use o `Dockerfile` (nginx). Não envie a pasta `_fonte`. Não precisa de build.
