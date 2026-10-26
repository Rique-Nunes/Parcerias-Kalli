# Ingrid Cristina — revitalização de design

Revisão local em 26/10/2026. Projeto: `D:\programação\Parcerias-Kalli\ingrid-cristina`.

## Diagnóstico

O site tinha uma única imagem reutilizada, abertura com desfoque no computador e aproveitamento limitado das fotos. A leitura ficava concentrada em blocos genéricos, sem evidência visual da prática. No celular, o menu não fechava por toque fora e as animações dependiam de ocultar o conteúdo antes da rolagem.

O formulário e a seção de contato também compartilhavam o mesmo identificador `interesse`, impedindo a seleção correta do tema pelos cards. No destino alternativo para Instagram, a substituição do texto removia os ícones dos botões.

## Direção aplicada

- Paleta original preservada: creme `#fbf6f4`, rosa `#c1466b`, rosa escuro `#a23659`, vinho `#472431` e vinho profundo `#30161f`. Demais variáveis de cor originais também foram mantidas.
- Abertura editorial com retrato nítido e proporção natural, moldura curva e texto independente da fotografia. Sem desfoque e sem colocar o texto sobre o rosto.
- Sequência de conteúdo: apresentação → sinais de autoridade → técnica, posicionamento e negócio → registros da prática → Ingrid e identidade Lash Empresária LED → conversa → dúvidas.
- Desktop: composição ampla, colunas proporcionais, fotos em alturas diferentes, texto com largura controlada e formulário com boa separação visual.
- Celular: margens de 24 px, cards compactos, botões de pelo menos 48 px, galeria horizontal com indicação da próxima foto e visualização ampliada. Menu com linhas igualmente espaçadas e fechamento pelo toque fora, Escape, escolha de link e saída de foco.
- Animações de entrada em sequência, entradas alternadas dos cards no celular, ícones em destaque, feedback de toque, brilho pontual no primeiro botão e transição das fotos ampliadas. Sem movimento automático infinito. A preferência por movimento reduzido é respeitada, inclusive quando alterada durante o uso.
- Conteúdo continua legível sem JavaScript. Fotos são arquivos locais WebP, com dimensões explícitas e carregamento adiado fora da abertura. Os quatro novos arquivos totalizam cerca de 489 KiB.

## Imagens e identificação

O arquivo `banco-imagens.json` registra os nomes originais e os arquivos publicados.

| Original em `_fonte/ig` | Uso |
| --- | --- |
| `851375795_18438839398183241_5757341701376002143_n.jpg` | Retrato editorial na abertura. Visual da mesma campanha identificada com o nome Ingrid Cristina na peça Lash Empresária LED. |
| `856546692_18438651607183241_2544345841216674063_n.jpg` | Bastidores em sala. A pessoa não recebe identificação individual nem é apresentada como Ingrid. |
| `856611712_17954741673263372_1806992708627981432_n.jpg` | Registro de aplicação. Profissional e cliente não recebem nome ou indicação de que alguma delas seja Ingrid. |
| `857773262_18439377763183241_6785743335237486574_n.jpg` | Identidade visual Lash Empresária LED, com o nome Ingrid Cristina impresso na própria peça. Exibida inteira e ampliável. |

As duas peças com Black Friday e urgência comercial ficaram fora do layout permanente. Nenhum retrato de outro projeto foi usado. Os originais foram preservados; as cópias receberam apenas orientação EXIF, redimensionamento proporcional e compressão WebP, sem geração ou alteração de rostos.

## Fontes e limites do conteúdo

Fonte pública consultada: [perfil @lashempresaria](https://www.instagram.com/lashempresaria/). A apresentação confirma Ingrid Cristina, Master Educadora LED Lash Pro, Goiânia, Método Lash Empresária e a indicação de +5.000 alunas. O site não converte esse número em estatística animada nem atribui resultados financeiros às alunas.

A [publicação de 16/10/2026](https://www.instagram.com/lashempresaria/p/DekjXg_yXba/) descreve a formação presencial em Goiânia e a combinação de técnica, posicionamento, experiência da cliente e estratégia comercial. A inclusão do aparelho e o bônus aparecem associados à campanha Black Friday. Por isso, a seção de dúvidas orienta confirmar as condições da turma, sem anunciar inclusão permanente ou disponibilidade atual de vagas.

A [publicação de 18/10/2026](https://www.instagram.com/lashempresaria/p/DepQ0K5yIWu/) usa urgência de campanha; esse tom não foi incorporado ao site permanente. Não foram criados depoimentos, preços, certificados, garantias, cronogramas ou números de WhatsApp.

## Contato

Configuração existente preservada: Instagram `lashempresaria`, sem número de WhatsApp e sem webhook. A ação abre a conversa no Instagram e deixa uma mensagem pronta, visível para copiar e colar. O visitante revisa e envia no aplicativo; o site não registra uma inscrição nem promete retorno automático. Nenhuma mensagem foi enviada durante a revisão.

## Validação

Testado em 320, 360, 375, 390, 430, 600, 768, 899, 900, 1024, 1100, 1440 e 1920 px: largura, imagens, proporções, âncoras, ícones, identificadores únicos e menu por toque. Verificados formulário inválido/válido com abertura externa simulada, tema escolhido nos cards, galeria, foto ampliada por toque/mouse/Escape, dúvidas, tela baixa, texto a 200%, movimento reduzido e conteúdo sem JavaScript.

Arquivos preparados localmente. Publicação e alterações em outros projetos não fazem parte desta entrega.
