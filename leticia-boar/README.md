# Letícia Boaroli

Site estático criado em 30/10/2026 para o projeto `leticia-boar`, com HTML, CSS e JavaScript. Abra `index.html` no navegador. Não exige instalação para visualizar.

## Conteúdo

- Abertura com retrato da Letícia confirmado pelo usuário.
- Experiências de maquiagem, portfólio com abas, noivas, cursos, apresentação e bastidores.
- Ícones SVG, animações de entrada e toque, faixa com botão de pausa, rolagem e fotos ampliáveis.
- Menu móvel com fechamento por toque fora, Escape e seleção de item.
- Preferência por movimento reduzido respeitada; links de contato continuam acessíveis sem JavaScript.

## Contatos

Os canais foram consultados nos links públicos do perfil `@leticiaboar` em 30/10/2026:

- Agendamentos: https://wa.me/message/NNXYGKA5TB4UF1
- Cursos: https://wa.me/message/UDWPFGALAUJTM1
- Automake sem Mistério: https://pay.kiwify.com.br/MbXPVQ7

O formulário valida e prepara uma mensagem para copiar. Abre o canal correspondente ao interesse. A pessoa precisa colar e enviar a mensagem no WhatsApp; não existe gravação de leads ou envio automático. Os links de contato estão também no HTML e podem ser atualizados junto com `CONFIG` em `js/main.js`.

## Imagens

Originais preservados em `_fonte/ig`. As cópias WebP em `assets/img` mantêm a proporção e não têm edição de rosto. `banco-imagens.json` relaciona cada cópia ao arquivo original e registra seu contexto.

Somente os retratos explicitamente confirmados são identificados como Letícia. Demais pessoas aparecem como portfólio e bastidores, sem nomes ou afirmação de serem alunas.

## Hospedagem

Publicar `index.html`, `css`, `js` e `assets` em hospedagem estática. Incluídos `Dockerfile` e `nginx.conf` seguindo a estrutura dos projetos existentes. Fontes do Google têm alternativas locais do sistema. Esta entrega foi verificada localmente e não foi publicada.

## Verificação

Layouts de 320, 360, 375, 390, 430, 600, 768, 899, 900, 1024, 1100, 1440, 1920 e 2560 pixels sem rolagem horizontal da página. Conferidos menu, teclado, abas, ampliação de fotos, validação, seleção de canal, carregamento de imagens, conteúdo sem JavaScript, pausa de animação e mudança dinâmica para movimento reduzido. A integração de contato foi verificada por interceptação da abertura, sem enviar mensagens reais.
