# Ingrid Cristina — Método Lash Empresária

Site estático em HTML, CSS e JavaScript, sem dependências de produção ou etapa de build. Abra `index.html` no navegador ou sirva a pasta com um servidor estático. A revitalização de 26/10/2026 mantém a identidade rosa, vinho e creme do projeto.

- `index.html`: apresentação, pilares do método, bastidores, Ingrid, contato e dúvidas.
- `css/style.css`: paleta original, layout responsivo, menu e animações.
- `js/main.js`: navegação, galeria ampliada, movimento e preparação da conversa.
- `assets/img`: quatro imagens novas otimizadas em WebP; o arquivo antigo foi preservado.
- `_fonte/ig`: imagens originais fornecidas pelo usuário; não são dependências do site.
- `ANALISE-DESIGN.md`: análise, fontes consultadas, decisões de enquadramento e validação.
- `banco-imagens.json`: correspondência entre originais e imagens usadas.

## Design e imagens

Celular primeiro, sem limite artificial de 480 px para a página. A partir de 900 px, a composição usa colunas de computador; o menu completo aparece a partir de 1100 px. A galeria desliza no celular e permite ampliar cada imagem por toque ou teclado.

As fotos da galeria mantêm suas proporções e não recebem desfoque. A abertura usa um close editorial em um painel amplo, com enquadramento adaptado à tela e transição para o fundo vinho. Registros de atendimento e sala de aula são apresentados como bastidores, sem atribuir nomes às pessoas. As peças com urgência de Black Friday ficaram fora do conteúdo permanente.

As animações acompanham entrada na tela e toque, com execução pontual. A preferência do dispositivo por movimento reduzido desativa os efeitos.

## Conteúdo e contato

Fontes: materiais locais e perfil público [@lashempresaria](https://www.instagram.com/lashempresaria/), consultado em 26/10/2026. A formação presencial em Goiânia aparece na publicação de 16/10/2026. Datas, valores e condições devem ser consultados com a equipe; benefícios associados a campanhas não são anunciados como permanentes.

Em `js/main.js`, `CONFIG.instagram` permanece `lashempresaria`. `CONFIG.whatsapp`, `CONFIG.whatsappLink` e `CONFIG.webhook` permanecem vazios. O formulário valida os dados, mostra uma mensagem para copiar e abre o Instagram. O visitante revisa e envia a mensagem no aplicativo. Nenhum cadastro é salvo no site, e o formulário não faz uma inscrição automática.

Se houver um contato de WhatsApp confirmado, configure `CONFIG.whatsapp` com DDI, DDD e número, somente dígitos. Os botões e o formulário passam a usar esse destino. O webhook opcional só deve ser configurado com um serviço próprio para receber os dados.

## Hospedagem

O padrão existente de `Dockerfile`, `nginx.conf` e `.dockerignore` foi mantido. Para hospedagem estática, são necessários `index.html`, `css`, `js` e `assets`. A pasta `_fonte` contém o material de referência e não precisa ser publicada.
