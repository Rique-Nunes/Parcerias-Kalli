# Negra Ba — design (11/11/2026)

Base: site da Cássia Lima, mesma estrutura de HTML/CSS/JS (abertura em painel, faixa, números, cursos, galeria, mentora, pilares, trajetória, formulário, dúvidas, selo Kalli). Mudou a identidade, o conteúdo e o formulário.

## Direção visual

As fotos dela são coloridas e solares: cabelo loiro mel, unhas cor-de-rosa, coral e douradas. A paleta troca o chocolate/dourado da Cássia por ameixa escuro com mel. (A primeira versão era azul-noite; não agradou e foi trocada em 11/11/2026. Alternativas testadas: preto quente e verde-esmeralda.)

| Variável (nome herdado) | Cor | Uso |
| --- | --- | --- |
| `--cacau` / `--espresso` | `#1f0e1b` / `#170a14` | abertura, cabeçalho, lista de espera, rodapé |
| `--chocolate` | `#2e1528` | seção da mentora, títulos em fundo claro, caixinhas marcadas |
| `--mel` / `--mel-2` | `#f2b84b` / `#f8d27e` | botões e destaques em fundo escuro (loiro do cabelo) |
| `--caramel-d` | `#8a5a0c` | destaques e textos pequenos em fundo claro |
| `--champagne`, `--linen`, `--ivory` | `#f4e7c6`, `#f2ebe1`, `#faf6f0` | fundos claros alternados |
| `--nude` | `#c8452e` | asterisco e erros (coral das unhas) |

Tipografia igual à da Cássia: Cormorant Garamond, DM Sans e Allura (assinatura "Negra Ba").

## Seções

1. **Abertura** — retrato de jeans com as unhas em primeiro plano, selo "+50 mil alunas formadas", frase da bio como título.
2. **Faixa** — técnicas do formulário dela.
3. **Números** — +27 anos, +50 mil alunas, 75,1 mil seguidores, São Paulo/Cidade Tiradentes.
4. **Cursos** — 4 cartões de técnicas; tocar marca as caixinhas correspondentes em "quero aprender".
5. **Nail art** — 5 trabalhos; faixa deslizante no celular, grade escalonada no computador (no lugar do labial da Cássia).
6. **Empreendedoras da Beleza** — faixa com o link do curso com o Grupo Boticário.
7. **Mentora** — retrato no espaço dela + foto de óculos sobreposta, três princípios tirados das legendas e uma frase curta dela.
8. **Pilares**, **Palestras** (Hair Brasil e Fatec Itaquera), **Trajetória**.
9. **Lista de espera** — as 6 perguntas do Google Forms dela, com caixinhas em formato de etiqueta; "Nenhuma ainda" desmarca as outras.
10. **Dúvidas**, **selo Kalli**, rodapé com Instagram, TikTok e WhatsApp. No celular, barra fixa com lista de espera, Instagram e TikTok.

## Verificação

Testado em 360, 390, 768, 1024, 1440 e 1920 px: sem rolagem lateral, sem imagens quebradas, sem erros no console. Conferidos validação, marcação por cartão, exclusividade do "Nenhuma ainda", montagem do envio ao Google Forms (requisição interceptada, nada gravado), menu e diálogo de fotos. As fontes do Google não carregam no ambiente de teste; conferir no navegador real.
