> Histórico da revitalização inicial. A pedido do usuário, a paleta rosa/vinho desta etapa foi substituída por preto, dourado champanhe e marfim. Consulte [a nova análise de cores](ANALISE-CORES.md) para a direção visual atual.

# Agda Souza — análise e revitalização

Revisão em 29/10/2026. Projeto local: `D:\programação\Parcerias-Kalli\agda-souza`.

## Diagnóstico e direção

O projeto anterior dependia de três imagens, repetia fotografias em uma faixa automática e limitava a largura da página em parte das telas móveis. A abertura e o texto tinham pouco vínculo com a personalidade da Agda, e não havia uma galeria técnica com o novo material. O menu não tinha o mesmo tratamento de toque e fechamento aplicado aos outros projetos.

A direção escolhida conecta três aspectos verificáveis do trabalho da Agda: a prática em Nails, a atuação como educadora e a relação com as turmas. A linguagem é acolhedora e ligada à ideia de começar e evoluir profissionalmente, sem prometer faturamento ou transformações garantidas.

## Composição

- **Abertura:** Agda no palco, com imagem de identidade confirmada, título compacto e texto de apoio. O retrato acompanha o bloco central de texto no computador; não vai para a borda do monitor enquanto o conteúdo fica afastado. O degradê preserva o rosto e não apaga a boca à direita.
- **Celular:** imagem na largura inteira, seguida de uma transição para o vinho e dos botões. Espaçamento lateral confortável, controles de pelo menos 48 px e conteúdo legível sem depender de hover.
- **Formação:** três temas para a conversa — fundamentos, técnica com acabamento, negócio — em cards que selecionam o interesse no formulário. Não são apresentados como uma lista de turmas com vagas abertas.
- **Na bancada:** imagens inteiras de comparação de métodos, acabamento e estudo. Ampliáveis e com legenda de contexto.
- **A Agda:** história e atuação profissional ao lado da peça Quem é Agda?, com a composição original preservada.
- **Turmas:** sala de aula, certificação coletiva e encontro com público. Sem atribuir identidades a participantes individuais.
- **Encontros:** foto ampla do evento e texto sobre troca de experiências, para que a personalidade não se limite à abertura.
- **Contato:** conversa preparada no WhatsApp e explicação clara de que a visitante revisa e envia. Sem confirmação fictícia de inscrição.

## Paleta e movimentos

Foram preservadas todas as cores originais: creme `#fbf6f4`, rosa `#c1466b`, rosa escuro `#a23659`, rosa claro `#e8a9bf`, vinho `#472431`, vinho profundo `#30161f` e os demais tons auxiliares. As cores do palco pertencem à fotografia original, não a uma mudança da paleta do site.

Os emojis da apresentação do Instagram não foram transportados para os controles do site. Foram usados ícones SVG de estudo, Nails, comunidade, negócio, contato e ampliação.

As animações acompanham entrada na tela e toque, sem um carrossel automático infinito. Preferência por movimento reduzido respeitada, inclusive quando alterada durante a visita. O conteúdo permanece visível sem JavaScript.

## Imagens e identificação

O arquivo `banco-imagens.json` relaciona os nove novos WebP aos originais. As imagens receberam apenas orientação EXIF, redimensionamento proporcional e compressão; não houve geração de pessoas, alteração de rostos, remoção de texto ou edição de cores.

| Original | Uso |
| --- | --- |
| `855352724_18647235928000211_5841252655175895653_n.jpg` | Capa: Agda no palco, identificação expressamente confirmada pelo usuário. |
| `476741791_18491766952000211_5427800018119315463_n.jpg` | Apresentação Quem é Agda?, mantida inteira e ampliável. |
| `792585426_18630875479000211_8431918494595874003_n.jpg` | Comparação de métodos de alongamento, com os rótulos originais. |
| `867425828_18649843231000211_8389788226450020681_n.jpg` | Detalhe de unha com acabamento rosa, sem identificar cliente. |
| `864485162_18649892896000211_950437388482766112_n.jpg` | Estudo na bancada, profissional sem identificação individual. |
| `869106712_18649926256000211_3626611789150530029_n.jpg` | Turma no espaço de formação. |
| `869130154_18650359054000211_8459467320751574548_n.jpg` | Registro coletivo com certificados. |
| `855967711_18647608135000211_8603218120978834279_n.jpg` | Encontro com público, como contexto da comunidade. |
| `861214658_18648272119000211_3229230355694417598_n.jpg` | Troca com público no evento. |

Outros retratos que não possuem identificação confirmada não foram usados como se fossem a Agda. Nenhuma imagem de Ana, Ingrid ou de outros projetos foi importada.

## Fontes públicas

[Perfil @agdaesmalteria](https://www.instagram.com/agdaesmalteria/), consultado em 29/10/2026: empresária, mentora, palestrante e educadora; indicação de 24 anos em Nails e mais de 12 mil alunas; referência à Escola de Beleza e Negócio; WhatsApp público correspondente ao contato já configurado. A contagem de seguidores não foi transformada em destaque permanente.

[Apresentação de 09/02/2025](https://www.instagram.com/agdaesmalteria/p/DF2wm-GuCij/): trajetória iniciada como manicure e desenvolvimento do trabalho na beleza e formação. A versão nova usa essa base profissional, sem explorar detalhes pessoais sensíveis da história.

[Publicação de 26/10/2026](https://www.instagram.com/agdaesmalteria/p/De-MeqBCci9/): reforça ensino, técnica e a trajetória profissional das alunas. Serviu de referência para o tom acolhedor e para a progressão da página. O conteúdo foi reescrito, sem copiar a legenda.

Não foram criados valores, datas, depoimentos, nomes de alunas ou garantias de resultado. Formato, programa e disponibilidade são consultados diretamente com a equipe.

## Correções funcionais e validação

Identificadores duplicados de seção e campo de interesse foram separados. A seleção pelos cards passou a alcançar o campo correto. Os ícones dos botões são preservados quando o contato muda entre WhatsApp e Instagram. O formulário apresenta a mensagem pronta e não afirma ter salvo ou enviado dados sem que isso tenha acontecido.

Verificado em 320, 360, 375, 390, 430, 600, 768, 899, 900, 1024, 1100, 1440, 1920 e 2560 px: imagens, enquadramento dentro da abertura, proximidade entre retrato e texto, ausência de vazamento lateral, proporção natural nas galerias, contatos, âncoras, ícones e IDs únicos.

Também verificados menu por toque/Escape, seleção de tema, formulário inválido e válido com abertura externa simulada, mensagem preparada, galerias, ampliação por toque/teclado e fechamento fora, dúvidas, tela baixa, texto a 200%, movimento reduzido e leitura sem JavaScript. Nenhuma mensagem foi enviada durante os testes.

A entrega é local. Os arquivos originais e a configuração existente foram preservados; a versão anterior dos arquivos editados foi guardada na pasta de trabalho da revisão.
