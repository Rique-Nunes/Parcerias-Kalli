# Cássia Lima — revitalização de design (29/10/2026)

Base estrutural: site da Ana Torres (abertura em painel, números, formação, técnica, mentora, alunas, trajetória, contato, dúvidas). A identidade visual foi refeita a partir das 9 fotos novas em `_fonte/ig/`.

## Direção visual

O site antigo usava o mesmo rosa/vinho da Ana e da Ingrid. As fotos da Cássia mostram outro universo: fundo de estúdio chocolate, loiro mel, alfaiataria preta e cinza, joias douradas e o estúdio em madeira clara com o logo dourado. A paleta nova sai dessas fotos:

| Variável | Cor | Uso |
| --- | --- | --- |
| `--cacau` / `--espresso` | `#1d130d` / `#160e09` | abertura, cabeçalho, contato, rodapé (cor tirada do fundo do retrato) |
| `--chocolate` | `#2c1d14` | seção da mentora, títulos em fundo claro |
| `--mel` / `--mel-2` | `#d6ad74` / `#e8c995` | dourado dos detalhes, botões e destaques em fundo escuro |
| `--caramel-d` | `#875427` | destaques e textos pequenos em fundo claro (contraste AA) |
| `--champagne`, `--linen`, `--ivory` | `#efdfc4`, `#f2ebe1`, `#faf6f0` | fundos claros alternados |
| `--nude` | `#b86a5c` | asterisco e erros do formulário (tom do labial) |

Tipografia: Cormorant Garamond (títulos, mais "editorial de moda" que a Playfair dos outros sites), DM Sans (texto, igual à família) e Allura (assinatura "Cássia Lima", igual à família).

## Seções

1. **Abertura** — retrato na poltrona em painel largo, fundo da foto fundido ao fundo do site, selo "+3.000 alunas formadas" flutuando, assinatura escrita à mão.
2. **Faixa de cursos** — Nano fios · Labial · Dermaplaning · Presencial e online · Máster Internacional, em movimento lento (pausa ao passar o mouse).
3. **Números** — +11 anos, +3.000 alunas, 30,2 mil seguidores, 2 formatos; contam ao aparecer.
4. **Formação** — Nano fios, Labial, Dermaplaning, com ícones próprios (sobrancelha, lábios, brilho). Tocar no card já marca o interesse no formulário.
5. **Resultados** — o labial em três etapas vira uma linha do tempo interativa (Antes / Logo após / Cicatrizado): a etapa ativa fica iluminada e as outras escurecem. Roda uma volta sozinha ao aparecer; qualquer toque devolve o controle. Ao lado, a sobrancelha em close.
6. **Mentora** — retrato de terno cinza com foto do estúdio sobreposta (logo da marca visível), que acompanha a rolagem de leve no computador.
7. **Pilares** — Técnica, Prática, Carreira.
8. **Alunas** — 3 registros de turmas certificadas; faixa deslizante no celular, grade escalonada no computador.
9. **Trajetória**, **Contato** (com retrato redondo) e **Dúvidas**.

## Animações e detalhes de experiência

- Barra fina dourada de progresso de leitura no topo; cabeçalho ganha sombra ao rolar.
- Entrada da abertura em sequência, foto com zoom suave, assinatura "escrita" da esquerda para a direita.
- Sublinhado dourado que se desenha sob a palavra em itálico de cada título.
- Cards entram alternando esquerda/direita no celular; no computador sobem com borda dourada e ícone girando.
- Fotos ampliáveis em diálogo (botão, Escape ou toque fora), com zoom leve ao passar o mouse.
- Ripple e "aperto" nos botões ao tocar; formulário balança de leve quando falta algo; campo de interesse pisca ao ser preenchido por um card.
- Menu do celular com itens entrando em cascata e fundo clicável para fechar.
- Tudo respeita "reduzir movimento" (inclusive se a pessoa ativar no meio da visita) e o conteúdo fica legível sem JavaScript.

## Verificação

Testado em 360, 390, 768, 1024, 1440 e 1920 px: sem rolagem lateral, sem imagens quebradas, sem erros no console. Conferidos menu, abas do labial por teclado (setas, Home/End), diálogo de fotos, faixa de alunas por teclado, seleção de curso, validação e montagem da mensagem (abertura interceptada; nenhuma mensagem enviada), movimento reduzido e leitura sem JavaScript.

As fontes do Google não carregam no ambiente de teste; a conferência final com as fontes reais deve ser feita no navegador.
