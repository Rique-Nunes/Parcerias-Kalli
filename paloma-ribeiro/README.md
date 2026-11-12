# Site: Paloma Ribeiro · Academy Class Estética (proposta)

Site estático em HTML, CSS e JavaScript puros, sem build. É uma **proposta** para apresentar à Paloma: a parceria com a Kalli ainda não está fechada, por isso o site **não tem o selo "Parceira oficial da Kalliagendia"** (só o crédito "Site desenvolvido por Kalliagendia" no rodapé). Se a parceria fechar, o selo entra como nos outros sites.

Criado em 11/11/2026. Decisões de design em `ANALISE-DESIGN.md`; origem de cada foto em `banco-imagens.json`.

```
paloma-ribeiro/
├── index.html          ← todo o texto e os 25 cursos
├── css/style.css       ← paleta nas variáveis do topo
├── js/main.js          ← CONFIG (WhatsApp, Instagram, webhook), filtro e busca do catálogo, fotos, formulário
├── assets/img/         ← fotos em WebP
├── Dockerfile, nginx.conf, .dockerignore
└── _fonte/ig/          ← originais do Instagram (não enviar)
```

## O que este site entrega a mais que o atual

O site atual (`academyclassestetica.com.br/bioinsta`) são 26 cards de imagem, sem texto, que abrem o WhatsApp. Este mantém **exatamente o mesmo funil** (mesmo número e as mesmas mensagens prontas de cada curso) e acrescenta:

- catálogo com os 25 cursos e combos em texto (aparece no Google e funciona para leitor de tela);
- filtro por área (Lábios, Pele e corpo, Sobrancelhas e cílios, Massagem, Combos) e busca por nome;
- descrição nos cursos sobre os quais ela já falou no Instagram;
- apresentação dela, do método, das alunas, da Vittrat e da clínica;
- formulário para quem não sabe por onde começar.

## Origem dos dados (11/11/2026)

- **Instagram:** @palomaribeiroacademy, "Paloma Ribeiro | Esteticista e Mentora", perfil verificado, 169.433 seguidores.
- **Bio:** CEO @vittratoficial · Empreendedora | Mãe · Preceptora para profissionais da beleza e Estética · +30K alunos · Cursos | Produtos | Procedimentos.
- **Cursos e mensagens de WhatsApp:** copiados do site atual (número `556299477740`). O card "15 em 1" aparece duas vezes lá; aqui entrou uma vez. Total: 22 cursos + 3 combos = 25.
- **Descrições:** Limpeza de Pele (post de 03/11/2026), Camuflagem de Estrias (04/11), Clareamento Íntimo / Regenera Intimy (29/10), Hydra Gloss (17/10 e 01/09/2024), Dermaplaning (arte dela). "Certificado incluso" vem do post de 24/09/2026.
- **Além da sala:** clínica em obra (post de 09/11/2026), palestra a alunos de Estética e Biomedicina na Unialfa (20/10/2026), feira Estética in SP (painel da foto).
- **Frases:** "Você não trata pele! Você trata um organismo inteiro." e "Nunca pensei em ser professora. Mas a estética me escolheu pra ensinar." são das artes dela.

## ⚠️ Antes de apresentar ou publicar

1. **Parceria.** Ainda não fechada. Não publicar sem ela aprovar; marca, fotos e catálogo são dela.
2. **Formato dos cursos.** O site não afirma "online" nem "presencial". Há indícios de online ("videoaulas", "acesso ao curso", "PDF"), mas vale confirmar para colocar isso em destaque.
3. **Preços.** Não há nenhum público. O site manda sempre para o WhatsApp, como hoje.
4. **Descrições.** 9 dos 25 cursos têm uma linha de descrição; os outros 16 estão só com nome e área. Se ela mandar o resumo de cada um, o catálogo fica completo.
5. **"Combo 15 em 1" e "8 em 1".** As descrições ("quinze cursos de estética em um único acesso", "o pacote completo de massagem") são dedução do nome e da mensagem de WhatsApp. Validar.
6. **Antes e depois.** A foto de lábios não identifica a cliente, mas confirmar se é do Hydra Gloss e se ela autoriza. A foto de rosto inteiro ficou de fora.
7. **Alunas.** Pedir autorização das alunas que aparecem com certificado.
8. **Cidade.** O DDD 62 e a Unialfa indicam Goiânia, mas o site não cita cidade.
9. **docker-compose.yml** da raiz ainda não tem este serviço.

## Publicar

Netlify Drop, Vercel, GitHub Pages ou o `Dockerfile` (nginx). Não envie a pasta `_fonte`.
