# Ana Torres — análise de design e revitalização

Revisão de 26/10/2026. Escopo: somente `ana-torres`, para computador, tablet e celular.

## Diagnóstico

- A abertura acumulava várias versões de regras de layout, com recortes e alturas conflitantes. Na simulação de computador de 1440 px, ela chegava a aproximadamente 938 px de altura.
- Uma faixa contínua misturava resultados em clientes, retratos e certificações, sem explicar quem aparecia em cada registro. O movimento automático dificultava a observação das fotos.
- O mesmo retrato aparecia no início e no método, enquanto os novos resultados técnicos ainda não tinham uma apresentação própria.
- As fotos de alunas apareciam também junto ao formulário, sem uma seção dedicada à jornada de certificação.
- Símbolos tipográficos e ícones tinham tratamentos diferentes. O botão de WhatsApp usava uma máscara visual de Instagram.
- O menu móvel não oferecia fundo clicável para fechar; a animação de parallax podia deslocar o retrato dentro de um recorte fixo.

## Organização implementada

1. **Abertura:** título, proposta da formação e retrato identificado da Ana. No celular, título e retrato ficam lado a lado, e os botões ocupam uma faixa própria. No computador, a composição tem duas colunas com largura limitada.
2. **Pilares e formação:** ícones SVG com a mesma linguagem e cards de conteúdo mais leves, com seleção de interesse preservada.
3. **Técnica em detalhe:** três novas fotos de resultados em clientes. Grade no computador; galeria deslizável com setas e contador no celular. As fotos podem ser ampliadas em um diálogo acessível.
4. **Apresentação da mentora:** novo retrato sentado, explicitamente confirmado pelo usuário como sendo da Ana, com legenda identificando seu papel.
5. **Trajetória e alunas:** histórico existente preservado; quatro fotos de certificação em uma área própria, com legendas de alunas. Não foram atribuídas identidades às duas participantes de fotos sem identificação individual.
6. **Contato:** formulário mais direto, sem reutilizar uma foto de aluna como ilustração da mentora. Destino e configuração de contato preservados.

## Paleta e linguagem visual

Foram preservados os valores originais das 15 variáveis de cor: `ink`, `wine`, `wine-2`, `plum`, `gold`, `gold-2`, `gold-d`, `rose`, `rose-d`, `cream`, `blush`, `paper`, `txt`, `soft` e `line`.

Continuam os títulos em serifa, detalhes em escrita manual, fundos vinho e creme, acentos rosa e botões dourados. O CSS foi reunido em um único sistema responsivo, removendo versões conflitantes.

## Uso e identificação das imagens

| Arquivo usado | Origem | Identificação e uso |
| --- | --- | --- |
| `assets/img/hero-ana.webp` | Retrato já documentado no README, perfil atualizado de 08/04/2025 | Ana Torres; mantido na abertura |
| `assets/img/ana-retrato-sentada.webp` | `_fonte/ig/490407876_18511906453036397_15160364981367130_n.jpg` | Ana Torres; confirmado pelo usuário nesta conversa |
| `assets/img/resultado-volume.webp` | `_fonte/ig/481415045_18501440662036397_8355063954737544108_n.jpg` | Detalhe de extensão de cílios em cliente, com a marca Instituto Ateliê |
| `assets/img/resultado-leque.webp` | `_fonte/ig/488810198_18510021709036397_5364982831095560937_n.jpg` | Detalhe técnico em cliente, com a marca Instituto Ateliê |
| `assets/img/resultado-definicao.webp` | `_fonte/ig/502166753_18520154344036397_541692280200295864_n.jpg` | Detalhe técnico em cliente, com a marca Instituto Ateliê |
| `assets/img/aluna-certificado-1.webp` e `-2.webp` | Posts já descritos no README | Registro de certificação com duas participantes; legendas neutras, sem identificar individualmente |
| `assets/img/aluna-certificado-3.webp` e `aluna-formada.webp` | Posts já descritos no README | Alunas com seus certificados; usadas somente na seção de alunas |

Os demais retratos novos não foram usados como fotos da Ana sem confirmação específica. A identificação seguiu a documentação e a confirmação do usuário, sem comparação facial.

As quatro novas imagens foram exportadas em WebP, com dimensões apropriadas para a web, sem recorte ou alteração de cores. Os originais da pasta `_fonte/ig` foram preservados. Fotos de certificados e portfólio mantêm a proporção original. Dimensões nos elementos de imagem ajudam a evitar saltos no layout durante o carregamento.

## Movimento e acessibilidade

- Entradas em sequência no início e ao alcançar seções, sem esconder conteúdo na ausência de JavaScript.
- Respostas suaves em botões e cards; sem faixa de imagens em movimento contínuo e sem parallax no retrato.
- Preferência de movimento reduzido respeitada, inclusive quando alterada com a página aberta.
- Menu com área de toque de 48 px, linhas centralizadas, Escape e fechamento ao tocar fora.
- Fotos ampliáveis com rótulos, fechamento por botão, Escape ou toque no fundo; foco devolvido à foto de origem.
- Botões da galeria, contador, navegação por teclado e seleção de interesse nos cards.

## Validação

- 13 larguras: 320, 360, 375, 390, 430, 600, 768, 899, 900, 1024, 1100, 1440 e 1920 px, em navegador Chromium/Edge.
- Sem rolagem horizontal, imagens quebradas, referências de ícones ausentes ou links internos sem destino.
- Proporções das fotos de retratos, resultados e certificações verificadas.
- Texto ampliado em 200%, telas baixas e conteúdo sem JavaScript conferidos.
- Menu, FAQ, galeria, diálogo de fotos e seleção de interesse funcionando.
- Validação de formulário e montagem do link de WhatsApp testadas com abertura interceptada: nenhuma mensagem real foi enviada.
- Nenhuma alteração nas configurações de WhatsApp, Instagram ou webhook; nenhuma publicação realizada nesta revisão.

As verificações móveis usam emulação de tamanho e toque no navegador; não substituem uma conferência no aparelho físico.
