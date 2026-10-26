# Ana Torres — site da formação em cílios

Site estático em HTML, CSS e JavaScript. Abra `index.html` no navegador ou sirva a pasta em um servidor estático. Sem etapa de build e sem dependências de produção.

## Atualização de 26/10/2026

Abertura editorial com retrato em painel amplo, texto compacto e identidade vinho/dourado preservada. No celular, a fotografia ocupa toda a largura. Cards, galerias e formulário receberam o mesmo cuidado de apresentação e interação aplicado ao projeto da Ingrid, com elementos próprios da Ana.

- `index.html`: apresentação, formação, trabalhos em clientes, mentora, trajetória, registros de alunas, conversa e dúvidas.
- `css/style.css`: cores originais, composição responsiva, menu e movimento.
- `js/main.js`: navegação, galerias, ampliação das fotos e formulário.
- `assets/img`: banco de imagens usado pelo site.
- `_fonte`: materiais originais e referências; não é dependência de produção.
- `ANALISE-DESIGN.md`: decisões, identificação das imagens e validação.

## Retratos e alunas

A abertura usa `ana-torres-retrato-confirmado-20261026.webp`, com o mesmo conteúdo de `ana-retrato-sentada.webp`. O original é `490407876_18511906453036397_15160364981367130_n.jpg`, confirmado pelo usuário como Ana Torres. A seção da mentora usa o mesmo retrato confirmado.

O nome antigo `hero-ana.webp` já havia sido associado a uma foto de aluna em uma versão anterior e depois reutilizado. Para impedir que uma cópia antiga seja apresentada como Ana, esse nome deixou de ser usado na abertura e na imagem de compartilhamento.

As fotos de certificação aparecem exclusivamente na seção de alunas. Os resultados técnicos são apresentados como fotos em clientes. No celular, os registros de alunas deslizam horizontalmente e podem ser ampliados por toque. Nenhum arquivo de fotografia foi alterado nesta atualização.

## Formulário e contato

A configuração existente em `CONFIG`, no começo de `js/main.js`, foi preservada. O formulário valida os campos e abre a conversa no WhatsApp configurado, com a mensagem preparada. O visitante revisa e envia no aplicativo; o site não faz uma inscrição automática nem salva um cadastro. Uma cópia da mensagem fica disponível para copiar e colar.

Se o número e o link de WhatsApp estiverem vazios, o destino alternativo é o Instagram configurado. O webhook opcional permanece vazio; somente deve ser preenchido com um serviço próprio para receber os dados.

## Manutenção

Atualize o texto em `index.html` e as variáveis de cor no topo do CSS. As imagens da abertura, da mentora, de clientes e de alunas possuem papéis distintos; preserve essa identificação. Os originais ficam em `_fonte`, e as versões usadas pelo site ficam em `assets/img`.

O padrão existente de Docker e nginx foi mantido. Para hospedagem estática, são necessários `index.html`, `css`, `js` e `assets`. A pasta `_fonte` não precisa ser publicada. Esta entrega foi aplicada somente nos arquivos locais.
