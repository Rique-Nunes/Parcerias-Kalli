# Jaqueline Ornela — design (11/11/2026)

Mesmo processo da Jhenyffer Vaúna e da 2ª versão da Negra Ba: site escrito do zero a partir da personalidade e do material dela.

## De onde vem a identidade

| O que aparece no perfil | Como virou design |
| --- | --- |
| Artes em marrom e terracota em degradê ("Desafio Além da Mesa", "Deus não te deu talento...") | Abertura e contato em degradê marrom (`--brown`, `--espresso`); terracota (`--terra`) na faixa e na seção da palestra |
| Título em caixa alta condensada com palavra manuscrita por cima | Padrão de todos os títulos: Barlow Condensed em caixa alta + palavra em Allura, levemente inclinada (classe `.title` com `<i>`) |
| Dourado e trigo (painel "O Resgate", joias) | Dourado (`--gold`) nos botões principais, losangos ◆ e manuscrito sobre fundo escuro |
| Roupas em terracota, laranja, bege | Creme e areia nos fundos claros |
| "Além da Mesa" como marca dela | Frase da abertura, seção própria da palestra e fio condutor dos textos |
| Fé e propósito em quase toda legenda | Seção só com a frase dela em tamanho grande; "Fé" e "Propósito" entre os pilares |
| Unhas amendoadas, naturais, com dourado | Galeria com cantos arredondados assimétricos e legendas manuscritas |

Fontes: Barlow Condensed (títulos), Allura (manuscrito), DM Sans (texto).

## Seções

Abertura · faixa · Cursos (Solid Master, Manutenção Express, Mentoria) · Além da Mesa (arte + 4 fotos de palcos) · Frase · Resultados (6 fotos) · Atendimento (catálogo) · Sobre · Formulário (WhatsApp) · Dúvidas · selo Kalli · rodapé. No celular, barra fixa com "Quero uma vaga", WhatsApp e Instagram.

## Verificação

360, 390, 768, 1024, 1440 e 1920 px: sem rolagem lateral, sem imagem quebrada, sem erro no console. Conferidos menu, validação, escolha pelo cartão e mensagem montada para o WhatsApp (abertura interceptada, nada enviado).

**Atenção:** as fontes do Google não carregam no ambiente de teste, e este site depende muito delas (condensada + manuscrita). As prévias saíram com fontes de reserva, mais largas. Conferir no navegador real se a palavra manuscrita encosta demais no título; o ajuste é o `margin` de `.title i` e `.hero h1 i` no CSS.
