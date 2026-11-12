# Site: Anna Mallmann · Estúdio Brilho Perfeito

Site estático em HTML, CSS e JavaScript puros, sem build, com design próprio feito a partir do perfil e da marca dela. Celular primeiro; computador a partir de 900 px. Abra o `index.html` no navegador.

Criado em 11/11/2026. Decisões de design em `ANALISE-DESIGN.md`; origem de cada foto em `banco-imagens.json`.

```
anna-mallmann/
├── index.html          ← todo o texto
├── css/style.css       ← paleta nas variáveis do topo
├── js/main.js          ← CONFIG (WhatsApp, Instagram, webhook), menu, fotos, formulário
├── assets/img/         ← fotos em WebP
├── Dockerfile, nginx.conf, .dockerignore
└── _fonte/ig/          ← originais do Instagram (não enviar)
```

## Origem dos dados (11/11/2026)

- **Instagram:** @brilhoperfeito_annynha, "Anna Mallmann - Mentora CURSO DE UNHAS", perfil verificado, 14.883 seguidores.
- **Bio:** "Te ensino a viver de unhas" · Do zero ao avançado com Método Molde F1 · Mentoria vitalícia + estágio · "Vem para a próxima turma".
- **Links da bio:** WhatsApp +55 51 99309-3803 (mensagem "Oie, gostaria de agendar um horário.") e Kiwify "Redução de Tempo" (`pay.kiwify.com.br/M3QYZlN`; no site vai com `?utm_source=site`).
- **Curso Molde F1:** conteúdo (8 itens), "um dia de imersão", mentoria vitalícia e estágio vêm do post de 25/10/2026.
- **Sobre:** "quase 20 anos", formações nacionais e internacionais e a visão de sucesso vêm do post de 30/07/2026.
- **Estúdio:** conta @estudio_brilhoperfeito ("Unhas de Fibra Porto Alegre"), aniversário de 7 anos (post de 05/11/2026), equipe Anna, Lou, Vany e Isa e regras de agenda (post de 31/10/2026).
- **Frases:** "Acho chique o básico bem executado!" e "Blindagem emocional? Não... blindagem de unhas." são das artes dela.

## ⚠️ Antes de publicar

1. **Kiwify esgotado.** Em 11/11/2026 a página do Redução de Tempo mostrava lote esgotado, sem preço nem descrição. O cartão tem alternativa por WhatsApp e formulário.
2. **Redução de Tempo.** "Aperfeiçoamento avançado", "método exclusivo" e "suporte vitalício" vêm da arte do curso (março/abril). Formato, duração e para quem é: validar com ela.
3. **Turma de novembro.** O post de 25/10 falava em "Turma de Novembro, poucas vagas". O site não cita mês para não ficar vencido.
4. **Porto Alegre.** Vem do nome da conta do estúdio e do DDD 51. Falta endereço; se ela quiser, entra no rodapé e na seção do estúdio.
5. **Sinal de R$ 50.** O post de agenda cita sinal via Pix e regras de manutenção. Não coloquei no site porque é regra operacional que muda; se ela quiser, cabe nas dúvidas.
6. **Fotos.** Confirmar autorização, principalmente das alunas com certificado e das duas publicadas por outras contas.
7. **docker-compose.yml** da raiz ainda não tem este serviço.

## Publicar

Netlify Drop, Vercel, GitHub Pages ou o `Dockerfile` (nginx). Não envie a pasta `_fonte`.
