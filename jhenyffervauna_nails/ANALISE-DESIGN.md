# Jhenyffer Vaúna — design (11/11/2026)

Pedido: dar espaço à personalidade e ao perfil dela, saindo do molde dos outros sites se preciso. Este site tem HTML, CSS e JS próprios (não é derivado do da Cássia).

## De onde vem a identidade

| O que aparece no perfil | Como virou design |
| --- | --- |
| Caixa, sacola e laço champanhe com a marca "Jhenyffer Vaúna" | Fundo claro (`--paper`, `--cream`), champanhe (`--champ`) e dourado fosco (`--gold-d`); logotipo em duas linhas (negrito + fino) como na caixa; faixa "de fita" abaixo da abertura |
| Terno branco, fundo lilás de estúdio | Seção Manchete em lilás (`--lilac`), mesmo tom do fundo das fotos |
| Batom e unhas vermelhas | Vermelho (`--red`) só em três pontos: monograma do selo, subtítulo da manchete, erros do formulário |
| Foto segurando o jornal "O alongamento virou tendência" | Seção em forma de página de jornal: cabeçalho, manchete condensada, capitular, duas colunas |
| Formato das unhas (amendoada, arco) | Molduras em arco na abertura, galeria e história |
| "Vaúna Beauty | Beleza, técnica e propósito" | Selo circular girando sobre o retrato |
| Foto com as cinco anotações | Seção "Padrão Vaúna", lista numerada |
| Legenda sobre a origem e a abertura do Studio | Seção História, única área escura do site |

Tipografia: Instrument Serif (títulos), Manrope (texto, próxima do logotipo dela), Oswald (só a manchete).

## 2ª rodada (11/11/2026)

Pedido: mais ajustes, no nível dos outros sites. O que mudou (a versão anterior está em `_fonte/versao-anterior-20261111/`):

- **Abertura:** título e texto maiores, fundo com um halo lilás atrás do retrato, arco com sombra champanhe deslocada, laço de cetim (SVG) no topo do arco e cartão escuro "Próxima turma" que leva à Kiwify.
- **Jornal:** manchete maior, folha levemente inclinada, carimbo vermelho "Edição especial" no canto e rodapé com as técnicas.
- **Cursos:** 02 e 03 lado a lado no computador; o MME ganhou um bloco tipográfico no lugar da foto que não existe.
- **Nova seção "Uma aula, três conquistas":** formato, esmaltação e francesinha sorriso, tirados da legenda da aula com uma aluna iniciante (03/11/2026).
- **Galeria:** todas as molduras em arco, com o mesmo contorno champanhe do retrato.
- Corpo de texto um pouco maior no site todo.

## Seções

Abertura · faixa · Manchete · Cursos (3) · Na aula · Padrão Vaúna · Resultados (8 fotos) · História · Formulário · Dúvidas · selo Kalli · rodapé. No celular, barra fixa com "Próxima turma" (Kiwify) e Instagram.

## Verificação

360, 390, 768, 1024, 1440 e 1920 px: sem rolagem lateral, sem imagem quebrada, sem erro no console. Conferidos menu, validação, escolha de curso pelo cartão, mensagem montada e cópia para o direct (abertura interceptada). Fontes do Google não carregam no ambiente de teste; conferir no navegador real.
