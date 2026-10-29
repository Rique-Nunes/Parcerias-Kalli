# Agda Souza — Formação em Nails

Site estático em HTML, CSS e JavaScript, sem dependências de produção e sem etapa de build. Abra `index.html` no navegador ou sirva a pasta em um servidor estático.

## Revitalização de 29/10/2026

O projeto ganhou uma composição própria a partir do material da Agda: palco, bancada, formação e comunidade. A paleta foi atualizada para preto, dourado champanhe e marfim, inspirada no letreiro e nos ambientes do Instituto. O contato de WhatsApp existente foi preservado, também verificado no perfil público nesta revisão.

- `index.html`: apresentação, temas de formação, técnica, história da Agda, turmas, encontros, conversa e dúvidas.
- `css/style.css`: layout responsivo, identidade visual, menu e movimentos.
- `js/main.js`: navegação, galerias, fotos ampliadas e preparação da conversa.
- `assets/img`: imagens locais otimizadas em WebP.
- `banco-imagens.json`: correspondência entre os novos arquivos e as imagens originais.
- `ANALISE-DESIGN.md`: diagnóstico, estrutura e fontes da etapa inicial.
- `ANALISE-CORES.md`: nova direção visual preta/dourada, paleta e validação de contraste.
- `_fonte`: originais e referências, preservados integralmente.

## Identidade das fotos

A capa usa `agda-palco-confirmada-20261029.webp`, derivada de `855352724_18647235928000211_5841252655175895653_n.jpg`. O usuário confirmou expressamente nesta conversa que a mulher de vestido dourado no palco é a Agda.

A seção sobre a Agda usa a peça de apresentação Quem é Agda?, correspondente ao post público de apresentação. Fotos de turmas, atendimentos e bastidores não recebem identificação individual de pessoas. Retratos cuja identidade não foi confirmada ficaram fora da apresentação.

As imagens são arquivos locais, com nomes específicos para evitar reutilização de capas antigas. A abertura usa enquadramento responsivo; as galerias mostram as fotos inteiras e permitem ampliar. Não foram gerados ou alterados rostos.

## Contato

O objeto `CONFIG`, em `js/main.js`, mantém o número de WhatsApp e o Instagram existentes. O webhook continua vazio. O formulário valida os campos, prepara a mensagem e abre o WhatsApp. A visitante revisa e envia no aplicativo; o site não cria uma inscrição automática nem salva um cadastro.

Os cards já selecionam o tema correto no formulário. O campo agora usa um identificador diferente do da seção, eliminando a duplicação que existia.

## Navegação e movimento

Menu com alvo de toque de 48 px, linhas igualmente espaçadas e fechamento pelo toque fora, Escape ou escolha de link. Galerias deslizáveis no celular, ampliação com diálogo e navegação por teclado. Entradas de seções, feedback de toque e destaques de ícones são pontuais; o site respeita a preferência por movimento reduzido.

## Hospedagem

O padrão existente de Docker e nginx foi mantido. Para hospedagem estática, use `index.html`, `css`, `js` e `assets`. A pasta `_fonte` não precisa ser publicada. A revisão foi feita e aplicada somente nos arquivos locais.
