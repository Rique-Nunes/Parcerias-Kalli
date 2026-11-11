# Site: Jaqueline Ornela (nail designer, educadora, palestrante e mentora)

Site estático em HTML, CSS e JavaScript puros, sem build, com design próprio feito a partir das artes e do perfil dela. Celular primeiro; computador a partir de 900 px. Abra o `index.html` no navegador. Substitui a página do Canva (`floreluzpersonalizados.my.canva.site/in-cio`).

Criado em 11/11/2026. Decisões de design em `ANALISE-DESIGN.md`; origem de cada foto em `banco-imagens.json`.

```
jaqueornela/
├── index.html          ← todo o texto
├── css/style.css       ← paleta nas variáveis do topo
├── js/main.js          ← CONFIG (WhatsApp, Instagram, webhook), menu, fotos, formulário
├── assets/img/         ← fotos em WebP
├── Dockerfile, nginx.conf, .dockerignore
└── _fonte/ig/          ← originais do Instagram (não enviar)
```

## Origem dos dados (11/11/2026)

- **Instagram:** @jaqueornela, "Jaqueline Ornela Instrutora CERTIFICADA PELO MEC", 27.633 seguidores.
- **Bio:** Nail Designer/Educadora/Palestrante/Mentora · "Te ensino a viver seu propósito através das unhas" · Cursos presenciais, Palestra Além da Mesa.
- **WhatsApp:** +55 21 96463-8946 (`5521964638946`), informado pela Kalli. O link da bio dela está sem o DDD (`wa.me/55964638946`) e não funciona.
- **Página do Canva:** só tinha o título "Sólid Master", a frase sobre o curso (fibra de vidro e acrigel), "Empresária Cristã" e dois botões para arquivos do Google Drive ("curso solid master" e "investimento").
- **Posts usados:** curso Manutenção Express (05/11/2026), "Experiência que vira direção" (06/09/2026), nova direção de carreira (05/09/2026), Lisboa (17/10/2026), artes "Desafio Além da Mesa" e "Deus não te deu talento para esconder".

## ⚠️ Antes de publicar

1. **Arquivos do Drive.** Não consegui abrir os dois arquivos ligados à página do Canva (apresentação do Solid Master e investimento). Por isso o site não tem conteúdo programático, carga horária nem preço. Se ela enviar os arquivos, dá para completar o cartão do curso. Links: `drive.google.com/file/d/18DNVXq1hJs72REoCRX488T5Of5cIVUiW` e `.../14hvR0EyilKHl2aYWwEMZBpwum65Feumw`.
2. **"Instrutora certificada pelo MEC".** Está no nome do perfil dela e aparece no site como "como ela se apresenta". Confirmar qual é o certificado antes de dar mais destaque.
3. **"Rio de Janeiro".** Deduzido do DDD 21 e das fotos (Copacabana Palace, painel do Rio). Confirmar cidade e bairro do espaço.
4. **Mentoria.** Ela se apresenta como mentora, mas não achei uma oferta de mentoria descrita. O cartão é genérico: validar ou trocar.
5. **Eventos.** "O Resgate", "Governar" e Copacabana Palace vêm dos painéis e de uma legenda; não sei se ela palestrou ou participou. As legendas do site são neutras.
6. **Fotos.** Confirmar autorização; a do salão cheio e a da abertura mostram outras pessoas.
7. **docker-compose.yml** da raiz ainda não tem este serviço.

## Publicar

Netlify Drop, Vercel, GitHub Pages ou o `Dockerfile` (nginx). Não envie a pasta `_fonte`.
