# Ana Torres — atualização editorial

Revisão local em 26/10/2026, a pedido do usuário para levar ao site da Ana o mesmo tratamento visual aplicado ao da Ingrid.

## Direção visual

O painel estreito da capa foi substituído por uma composição de campanha: retrato amplo, fundo vinho e transição suave entre texto e fotografia. A foto ocupa 55% do painel no computador, com limite de 600 px para o conteúdo da imagem, evitando um close excessivo nas telas largas. O enquadramento preserva a cabeça e os ombros. No celular, a foto ocupa toda a largura e antecede o título, com degradê que mantém a leitura fora da área dos olhos.

A paleta original da Ana foi preservada integralmente: vinho, dourado, creme e os tons auxiliares já definidos no CSS. O rosa da Ingrid não foi copiado. A tipografia e os contatos existentes também foram mantidos.

O novo título é mais compacto, e o nome da formação permanece em destaque no texto de apoio. Os registros técnicos seguem em uma seção própria, enquanto a apresentação da mentora e os registros das alunas possuem usos separados.

## Imagens e identidade

- A abertura usa exclusivamente `assets/img/ana-torres-retrato-confirmado-20261026.webp`.
- A seção sobre a mentora usa `assets/img/ana-retrato-sentada.webp`.
- Os dois arquivos possuem conteúdo idêntico, conferido por SHA-256. A origem é `_fonte/ig/490407876_18511906453036397_15160364981367130_n.jpg`, expressamente confirmada pelo usuário como Ana Torres nesta conversa.
- `hero-ana.webp`, nome que já havia sido usado para uma aluna, permanece fora das referências de apresentação e compartilhamento.
- Os arquivos `aluna-certificado-1.webp`, `aluna-certificado-2.webp`, `aluna-certificado-3.webp` e `aluna-formada.webp` permanecem apenas nos registros de certificação. Não foram atribuídos nomes individuais às pessoas nessas fotos.
- Os três arquivos `resultado-volume.webp`, `resultado-leque.webp` e `resultado-definicao.webp` mostram resultados em clientes, com legendas de técnica.

Nenhum arquivo de imagem foi alterado, gerado ou substituído nesta atualização. O close da abertura é feito pelo layout; as imagens da galeria, da seção sobre a mentora e dos registros de alunas mantêm a proporção natural e a imagem inteira.

## Melhorias de experiência

- Registros de alunas em uma faixa horizontal no celular, com cartões maiores, indicação de deslize e navegação por teclado.
- Fotos das alunas agora podem ser ampliadas pelo mesmo diálogo já usado nos trabalhos, com fechamento por botão, toque fora e Escape.
- Composição escalonada de fotos no computador, refinamento dos cards e separação visual entre técnica, mentora, alunas e contato.
- Animações de entrada, feedback de toque, destaque de ícones e transição das fotos continuam com execução pontual. A preferência por movimento reduzido é respeitada inclusive quando alterada durante a visita.
- A seleção de um tema preenche o formulário sem mover o foco após um atraso que poderia interromper a rolagem.
- O formulário prepara a conversa no contato já configurado e mostra uma cópia da mensagem. Os textos deixam claro que o visitante revisa e envia no aplicativo; não é feita uma inscrição automática no site.
- A configuração de contato foi preservada. A alternativa para Instagram mantém os ícones dos botões e não altera a estrutura deles.

## Verificação

Validação em 320, 360, 375, 390, 430, 600, 768, 899, 900, 1024, 1100, 1440 e 1920 px. Conferidos identidade do retrato por hash, imagens locais, proporções das galerias, ausência de vazamento lateral, ícones, âncoras e IDs únicos.

Também verificados menu por toque, fechamento fora/Escape, tema escolhido nos cards, formulário inválido/válido com abertura do WhatsApp simulada, mensagem pronta, galeria de alunas com teclado, ampliação de fotos, galeria técnica, dúvidas, tela baixa, texto a 200%, movimento reduzido e leitura sem JavaScript.

Nenhuma mensagem foi enviada nos testes. A entrega permanece local, com cópia da versão anterior preservada na pasta de trabalho da revisão.
