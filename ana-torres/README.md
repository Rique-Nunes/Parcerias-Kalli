# Site: Ana Torres (Master em Cílios · Instituto Ateliê, RJ)

> **Design atualizado em 26/10/2026:** a versão atual usa um sistema responsivo único, resultados técnicos separados das fotos de alunas, retrato sentado confirmado pelo usuário e galeria com ampliação. Consulte `_fonte/analise-design-20261026.md` para a análise e o mapa de imagens desta revisão. A documentação abaixo mantém o histórico da coleta e das decisões anteriores; a abertura atual coloca título e retrato lado a lado no celular e em duas colunas no computador. A paleta foi preservada.

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

O HasData estava sem créditos no início (mesma situação do site da Juliana) e voltou a responder em 26/10/2026, trazendo perfil, bio, links e as legendas dos 12 posts mais recentes. Os dados vieram da página pública do Instagram (`@annaatorres`) e do site de vendas dela (`annatorres.site`), ambos abertos no navegador sem login, mais a aba **Pipeline** da planilha "Possíveis Parcerias Kalli" (coleta de 24/10/2026).

- **Perfil:** @annaatorres, "Ana Torres | Master em Cílios RJ", **82,5 mil seguidores**, 3.397 seguindo.
- **Bio:** "Mentora • Palestrante • Educadora · +5.000 alunas pelo mundo 🇨🇴🇵🇹🇪🇸🇺🇸🇮🇪 · Te ensino uma aplicação em até 30min...". Os destaques da bio: Alunas, Mentoria, Presencial, Alunas, Cursos, Palestras.
- **Link da bio:** `annatorres.site` — uma página de vendas do curso online **Método V30** (R$ 78,90 na oferta, de R$ 397), com depoimentos reais (Rayssa R., Joyce C., Flaviane O.) e o número **"2.400+ alunas formadas"**.
- **Instituto Ateliê:** marca/instituto dela, citada como mentora no site de vendas.
- **Palestrante premiada:** Infinity Beauty Awards, citado no site de vendas como credencial de autoridade.
- **WhatsApp:** os links da bio (HasData, 26/10/2026) trazem `wa.me/5521978581835`. Já está em `CONFIG.whatsapp` (`js/main.js`). Confirmar com a Ana que é o número de atendimento.
- **Design de referência:** `@annaatorres-web-mobile-premium.png`, mockup em pasta do Google Drive (`Kalli-Designs-Pipeline-40-Perfis-v1`), com paleta rosa/vinho e a proposta "Formação Master em Extensão de Cílios".

## ⚠️ Dois números de "alunas" diferentes — confirmar qual usar

A bio do Instagram diz **"+5.000 alunas pelo mundo"** (ensino de técnica em geral). O site de vendas do Método V30 diz **"2.400+ alunas formadas"** (só quem comprou esse curso específico). Usei o **"+5.000"** no site por vir da própria bio dela, mas os dois aparecem nas fontes — confirme com a Ana qual número ela quer destacar antes de publicar.

## ⚠️ Confirmar com a Ana antes de publicar

1. **Este site não é o funil de vendas do Método V30.** O `annatorres.site` já vende o curso por R$ 78,90 com cronômetro e oferta limitada. Este site aqui é uma página de autoridade/captação (lista de interesse), no mesmo estilo dos sites da Gih, da Karoll e da Juliana — não repete preço, cronômetro nem promessas de faturamento do funil dela. Se ela preferir, dá para linkar o botão principal direto para `annatorres.site` em vez do formulário.
2. **WhatsApp.** O número do link da bio (`5521978581835`) já está configurado, então o formulário e o botão do início abrem o WhatsApp com a mensagem preenchida. Confirme com a Ana antes de publicar. Para voltar ao Instagram, esvazie `CONFIG.whatsapp` em `js/main.js`.
3. **Fotos.** A capa (`hero-ana.webp`) e o recorte do Método (`ana-metodo.webp`) vêm da **foto de perfil atualizada da Ana** (post de 08/04/2025), enviada em print por quem contratou o site; o original está em `_fonte/ig/ana-perfil-atualizada-2025-04-08.png`. Confirme com a Ana (e com o fotógrafo, se houver) o uso no site. As demais fotos são miniaturas de ~640 px do feed público: as de alunas pedem **autorização das alunas** antes de publicar. Tabela de quem aparece em cada foto logo abaixo.
4. **Formato da formação.** Não achei se a próxima turma é presencial, online ou as duas coisas — o FAQ do site pede para "confirmar com a Ana". Ajuste a resposta em `index.html` (seção `#duvidas`) com o formato real.
5. **Certificado.** O FAQ afirma que a formação emite certificado — confirmado pelas fotos reais de certificado no Instagram, mas confirme o texto exato antes de publicar.
6. **Cidade/RJ.** O título "Master em Cílios RJ" vem do próprio nome de perfil dela; não achei endereço de estúdio público, por isso o site não tem seção de local/mapa (diferente do site da Juliana).

## Quem aparece em cada foto (conferido pelas legendas dos posts, 26/10/2026)

Antes, `hero-ana` e `ana-metodo` estavam identificadas como sendo a Ana, mas eram uma aluna e uma cliente. Foi corrigido. Esta tabela segue o que a legenda de cada post diz; não foi feita comparação de rostos.

| Arquivo | Post de origem | Quem aparece, segundo a legenda |
|---|---|---|
| `hero-ana.webp`, `ana-metodo.webp` | foto de perfil atualizada, 08/04/2025 | Ana Torres |
| `aluna-formada.webp` | 17/10/2026, "A Josy veio de São Paulo…" | aluna (a legenda cita a Josy) |
| `aluna-certificado-1.webp` | 23/10/2026, "Mais uma aluna formada no Método V30" | aluna formada |
| `aluna-certificado-2.webp` | 19/10/2026, "Aluna formada no curso de Reciclagem Pro Lash" | aluna formada |
| `aluna-certificado-3.webp` | 11/10/2026, aluna Bruna (Nilópolis → Guaratiba) | aluna |
| `cliente-resultado.webp` | 23/10/2026, legenda só com emojis | cliente, sem identificação |
| `tecnica-mapeamento.webp` | 11/10/2026, "#Efeitokim #lash #animelashes" | cliente (close do olho) |
| `tecnica-lash-1.webp` | reel de 17/10/2026, "Volume Russo" | cliente |
| `tecnica-lash-2.webp` | reel de 16/10/2026, "Método V30 na prática" | cliente |
| `tecnica-lash-3.webp` | reel de 20/10/2026, "Aplicação da técnica Volume Russo" | cliente |

Nos `alt` de `aluna-certificado-1` e `-2` aparecem duas mulheres; como a legenda não diz quem é quem, o texto ficou neutro. Se a Ana estiver nessas fotos, ajuste o `alt`.

## O que as legendas dizem (úteis para o texto do site)

- Cursos presenciais de 2026 com "últimas vagas" (post de 08/10); ela diz que 2026 foi o ano em que mais ministrou cursos presenciais.
- Cursos citados: **Método V30** (técnica de tufo manual com semi-isolamento, online e presencial), **Reciclagem Pro Lash** e **Imersão Online de Volume Russo** (data citada: 25/10, já passou).
- Uma legenda diz que uma aluna veio "de Nilópolis para Guaratiba": o espaço de aulas parece ficar em **Guaratiba, Rio de Janeiro**. Confirmar o endereço com a Ana antes de pôr no site.
- O site hoje fala em "Formação Master em Extensão de Cílios", e nenhum post usa esse nome. Confirmar o nome oficial do curso.

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

- `whatsapp`: já preenchido com o número do link da bio (DDI + DDD + número, só dígitos). Esvazie para o botão abrir o Instagram.
- `webhook`: URL de n8n, Formspree ou Google Apps Script. Com ela, o formulário envia os dados para lá em vez de abrir uma conversa — é o caminho para montar uma lista de interessados. O `nginx.conf` já libera `connect-src https:` para isso.

## Publicar

Arraste a pasta para o Netlify Drop, a Vercel ou o GitHub Pages, ou use o `Dockerfile` (nginx). Não envie a pasta `_fonte`. Não precisa de build.

## Correção da capa — 26/10/2026

A abertura e a imagem de compartilhamento agora usam `ana-torres-retrato-confirmado-20261026.webp`, uma cópia do retrato `ana-retrato-sentada.webp`, derivado de `_fonte/ig/490407876_18511906453036397_15160364981367130_n.jpg`. O usuário confirmou expressamente que essa pessoa é Ana Torres. A imagem aparece inteira, com proporção natural; no computador sua largura foi equilibrada em 320 px.

O nome antigo `hero-ana.webp` já havia sido usado para uma aluna, conforme o histórico acima. Mesmo depois da substituição do conteúdo desse arquivo, cópias antigas em cache podem mostrar a aluna. A página deixou de referenciar esse nome; a foto confirmada possui um caminho exclusivo. Os retratos de apresentação e os registros de alunas continuam em seções distintas.
