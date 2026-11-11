# Site: Negra Ba (nail designer, educadora e mentora)

Site estático em HTML, CSS e JavaScript puros, sem build. A 2ª versão (11/11/2026) tem design próprio, feito a partir da personalidade dela; a 1ª, no molde da Cássia Lima, está em `_fonte/versao-anterior-20261111/`. **Celular primeiro**; a partir de 900 px entra o layout de computador e a partir de 1100 px o menu fica aberto no topo. Abra o `index.html` no navegador.

Criado em 11/11/2026. Cores, seções e decisões em `ANALISE-DESIGN.md`; origem de cada foto em `banco-imagens.json`.

```
negra_ba/
├── index.html          ← todo o texto (seções separadas por comentários)
├── css/style.css       ← paleta nas variáveis do topo
├── js/main.js          ← CONFIG (WhatsApp, Instagram, Google Forms, webhook), menu, fotos, formulário
├── assets/img/         ← fotos em WebP usadas no site
├── Dockerfile, nginx.conf, .dockerignore
└── _fonte/             ← fotos originais do Instagram e versão anterior (não enviar)
```

## Origem dos dados (coletados em 11/11/2026)

- **Instagram:** @negra_ba, "Negra Ba | Nail designer | Palestrante e Mentora", 75.151 seguidores.
- **Bio:** +27 anos no nails · +50 mil alunas formadas · Educadora | Empreendedoras da Beleza · "Transformo manicure em profissão" · Lista de espera.
- **Links da bio:** curso com o Grupo Boticário (empreendedorasdabelezagb.com.br), Pinterest, TikTok (@negra_ba, 84 seguidores), formulário "Se inscreva para os próximos cursos" e WhatsApp +55 11 93909-8999.
- **Posts recentes usados no texto:** abertura do novo espaço na Cidade Tiradentes (06/11/2026), palestra na Fatec Itaquera (19/10/2026), posts sobre valor profissional e fundamento técnico.

## Formulário = lista de espera dela no Google Forms

O formulário do site tem as mesmas 6 perguntas do Google Forms "Inscreva-se" e **grava direto nele** (`CONFIG.googleForm` em `js/main.js`). As respostas caem na planilha dela junto com as do link da bio; nada passa por servidor nosso.

- Os códigos `entry.*` e os `value` das caixinhas precisam ser idênticos aos do Forms. A opção "Acrílico no Molde Acrigel/Poligel no Molde" está junta assim no formulário dela (parece faltar uma quebra); no site aparece como "Acrílico ou acrigel/poligel no molde", mas envia o texto original. Se ela corrigir ou mudar perguntas lá, atualizar aqui.
- O Google não devolve confirmação para outro site. O site só percebe falha de rede; por isso existe o link "Abrir no Google Forms" logo abaixo do botão.
- `CONFIG.webhook` (opcional) manda uma cópia em JSON de cada inscrição para um endereço da Kalli (n8n, por exemplo).

## ⚠️ Antes de publicar

1. **Testar um envio real.** O envio foi conferido só com a requisição interceptada (nada foi gravado no formulário dela). Faça uma inscrição de teste e peça para ela confirmar que apareceu nas respostas.
2. **Fotos.** Confirmar autorização dela; atenção à foto da Fatec (aparecem estudantes) e à de oncinha (publicada por outra conta).
3. **Números e textos.** +27 anos e +50 mil alunas vêm da bio. "Hair Brasil" vem só do painel da foto: confirmar ano e se foi palestra ou visita. A relação com o curso Empreendedoras da Beleza (Grupo Boticário) vem do título do link na bio.
4. **Cursos.** O site lista técnicas (as do formulário), não turmas: não há datas, preços nem formato. Se ela passar a grade, vale uma página `cursos.html` como a da Cássia.
5. **docker-compose.yml** da raiz ainda não tem o serviço `negra_ba` (o arquivo estava com alterações em andamento).

## Publicar

Netlify Drop, Vercel, GitHub Pages ou o `Dockerfile` (nginx). Não envie a pasta `_fonte`.
