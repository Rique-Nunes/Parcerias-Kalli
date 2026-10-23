# Site: Amanda Marins (colorista e educadora · Cabo Frio, RJ)

Site estático em HTML, CSS e JavaScript puros. Não tem build nem dependências: basta abrir o `index.html` no navegador. A única coisa externa são as fontes do Google Fonts (Playfair Display, Mulish e Pinyon Script).

```
amanda-marins/
├── index.html        ← todo o texto das seções
├── parceria.html     ← proposta de parceria Kalli (90 dias, site sem custo, 10% OFF)
├── css/style.css     ← cores, fontes, layout e responsivo
├── css/kalli-parceria.css, css/parceria.css
├── js/main.js        ← menu, galeria, formulário (WhatsApp ou webhook)
├── assets/img/       ← 13 fotos reais do Instagram dela, recortadas e otimizadas (~1,4 MB)
└── _fonte/ig/        ← as 9 imagens originais usadas. Não vão para o ar.
```

## O que o Instagram mostrou (coleta em 23/10/2026, via HasData)

- **Perfil:** @amanda.marinscf, "Amanda Marins", conta verificada, 54.370 seguidores.
- **Bio:** "Amor em transformar cabelos. Educadora | Colorista especialista em Mechas e Terapia Capilar. Cabo Frio - RJ".
- **Link da bio:** WhatsApp de "Agendamentos": +55 22 99744-2750. Não há site, página de cursos nem endereço público.
- **Nome do salão:** só aparece na hashtag usada nas legendas (#AmandaMarinsHairConcept) e na placa "AM" ao fundo de uma foto. Por isso o "Hair Concept" do logo.
- **Conteúdo dos posts:** loiros e mechas (glow blonde, ice cream blonde, hair contour), morena iluminada (dark chocolate com avelã), ruivo sem descoloração e terapia capilar (Óleo Terapia + Chá Terapia).

## Inspiração nos outros projetos

| Vem de | O que foi aproveitado |
|---|---|
| Karoll Tavares (rosé e creme) | Cards numerados 01 a 04 com seta, faixa escura de "resultados reais", formulário em cartão branco ao lado de foto com assinatura manuscrita |
| Gih D'Oliveira (preto e dourado) | Hero escuro com retrato, seção escura "como funciona" com 4 passos em ícones redondos, foto em arco, título grande em serifa |
| Gaby | Lições de responsividade: grids que não estouram, menu preso ao cabeçalho, campos de 16 px no celular |

A paleta é nova e vem das fotos dela: café, caramelo e mel, sobre creme e areia.

## ⚠️ Confirmar com a Amanda antes de publicar

1. **Cursos e aulas.** A bio diz "Educadora", mas não achei nenhum curso, valor ou turma. O site só tem um aviso discreto em "Sobre" ("Também é educadora… Falar sobre aulas") e a opção "Quero aprender (aulas)" no formulário. Se ela tiver cursos, vale criar uma seção como a da Karoll, com os nomes reais.
2. **Texto de "Como funciona".** Os 4 passos (avaliação, estratégia, execução, cuidado) resumem o que ela diz nas legendas ("a cor perfeita começa com um diagnóstico", "nem todo cabelo permite essa transformação"). Peça para ela confirmar se é assim que ela atende.
3. **Frases tiradas das legendas dela:** "Nosso trabalho vai além da técnica. É revelar a beleza que já existe em cada mulher" e "ruivo sem descoloração quando o cabelo permite".
4. **Fotos.** Só foi possível pegar a capa de cada post. O retrato do topo é a foto do perfil (704 px). As clientes aparecem sem nome: peça autorização de imagem. Fotos com o filho dela (aniversário de 18 anos) e legendas pessoais ficaram de fora de propósito.
5. **Logo.** "Amanda Marins · Hair Concept" é texto em fonte manuscrita, não o logo oficial.
6. **Endereço e horários.** Não existem no Instagram. Se ela quiser, é fácil acrescentar em "Contato".
7. **Parceria Kalli.** A proposta menciona "submódulo nos seus cursos". Se ela não tiver cursos, ajuste o texto de `parceria.html` antes de enviar.

## Formulário: WhatsApp ou lista de interessadas

Em `js/main.js`, no bloco `CONFIG`:

- `whatsapp`: número que recebe a mensagem montada pelo formulário. Já está com o WhatsApp de agendamentos do perfil. Esse é o padrão.
- `webhook`: cole aqui a URL de um webhook (n8n, Formspree, Google Apps Script). Com isso, o formulário envia os dados para esse endereço em vez de abrir o WhatsApp.

Os cards de transformação e o botão "Falar sobre aulas" já marcam o interesse no formulário quando clicados. O campo "Seu cabelo já tem química?" ajuda a Amanda a avaliar antes de responder.

## Decisões de UX writing

- **Título:** usa a frase da bio dela: "Amor em transformar cabelos."
- **Botões:** começam com verbo e dizem o que acontece. Ex.: "Agendar minha avaliação", "Quero a minha transformação".
- **Erros:** explicam como corrigir. Ex.: "Digite o WhatsApp com DDD. Ex.: (22) 99999-9999". O erro aparece quando a pessoa sai do campo e some assim que ela corrige.
- **Privacidade:** o formulário avisa que nada fica salvo no site. Os dados vão só na mensagem para a Amanda.
