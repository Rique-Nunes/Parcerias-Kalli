# Site: Make com Gaby (Gabriely Pereira · maquiadora de noivas no RJ)

Site estático em HTML, CSS e JavaScript puros. Não tem build nem dependências: basta abrir o `index.html` no navegador. A única coisa externa são as fontes do Google Fonts (Cormorant Garamond, Jost e Allura).

```
makecomgaby/
├── index.html        ← todo o texto das seções
├── parceria.html     ← proposta de parceria Kalli (90 dias, site sem custo, 10% OFF)
├── css/style.css     ← cores, fontes, layout e responsivo
├── css/kalli-parceria.css, css/parceria.css
├── js/main.js        ← menu, galeria, formulário (WhatsApp ou webhook)
├── assets/img/       ← 14 fotos reais do Instagram dela, recortadas e otimizadas (~1,1 MB)
└── _fonte/ig/        ← as 13 imagens originais (capas dos posts + foto do perfil). Não vão para o ar.
```

## O que o Instagram e o link da bio mostraram (coleta em 23/10/2026)

- **Perfil:** @makecomgaby, "Gabriely Pereira | Maquiadora no Rio de Janeiro", conta verificada, 35.693 seguidores.
- **Bio:** "Assino a beleza de noivas únicas & autênticas · Entre as 10 melhores maquiadoras de noivas negras do RJ · Cursos | Informações".
- **Link da bio (bio.site/makecomgaby):**
  - WhatsApp: +55 21 97336-2361
  - Serviços: Beleza para Noivas Autênticas (Dia de Noiva), Beleza para Eventos, Curso Vip Pro, Automake Class
  - Método Noivas Autênticas, vendido online na Kiwify
  - Imersão Noivas Autênticas ("em breve")
  - Criação de conteúdo para marcas e eventos
  - Redes: Instagram e YouTube (/makecomgaby)
- **Provas nos posts recentes:**
  - Dia de Noiva com acompanhamento pós-cerimônia
  - Imersão Noivas Autênticas realizada em outubro
  - Masterclass MAC Pro na Semana do Maquiador

## Mockup × site

| Mockup | Site | Por quê |
|---|---|---|
| "Make by Gabi" | "Make com Gaby" | É a grafia do @ e da bio dela |
| Serviços: Noivas, Eventos Especiais, Maquiagem Social, Automaquiagem | Noivas, Eventos, Curso VIP Pro, Automake Class | São os 4 botões reais do bio.site |
| "+ de milhares de mulheres maquiadas" | "+35 mil" pessoas acompanham a Gaby no Instagram | Número inventado é risco de reputação. Este é verificável |
| Fotos de modelos geradas por IA | Fotos reais do Instagram dela | Prova real gera confiança |
| "Aprenda comigo": aulas práticas, certificado… | Lista dos 4 produtos reais: Curso VIP Pro, Automake Class, Método Noivas Autênticas, Imersão | "Certificado" e "suporte individual" não aparecem em nenhuma fonte |
| Formulário com e-mail | Nome, WhatsApp, serviço, data do evento, mensagem | Data é o dado que ela mais precisa para fechar noiva. E-mail não é o canal dela |

A identidade visual do mockup continua: fundo café escuro, nude no botão, títulos em serifa, assinatura manuscrita no topo, retrato P&B em "Sobre mim" e foto sangrando na borda do contato.

## ⚠️ Confirmar com a Gaby antes de publicar

1. **"Entre as 10 melhores maquiadoras de noivas negras do RJ".** A frase vem da bio dela, mas ela precisa confirmar que pode usar no site.
2. **Imersão Noivas Autênticas.** No bio.site está "em breve" e o card diz "Próxima turma em breve". Atualize quando abrir a lista.
3. **Curso VIP Pro: "Aula individual, no seu ritmo".** Deduzido da legenda ("curso vip pra minha aluna") e do nome do produto. Confirme a descrição.
4. **Método Noivas Autênticas.** O botão leva à página de compra da Kiwify que está no bio.site. Confira se o link está ativo.
5. **Fotos.** Só foi possível pegar a capa de cada post (12 posts + foto do perfil). A foto do hero é a do perfil (1080 px). Se ela mandar 3 ou 4 fotos originais (retrato e noivas), o topo do site melhora bastante. Todas as noivas aparecem sem nome: peça autorização de imagem às modelos.
6. **Logo.** O "MAKE COM GABY" do cabeçalho é texto, não o logo oficial dela. Se ela tiver um arquivo de logo, é só trocar em `.brand`.
7. **Domínio.** O site ainda não tem endereço. Para o `og:image` funcionar no WhatsApp, o endereço final precisa estar no ar.

## Formulário: WhatsApp ou lista de interessados

Em `js/main.js`, no bloco `CONFIG`:

- `whatsapp`: número que recebe a mensagem montada pelo formulário. Já está com o número do bio.site. Esse é o padrão.
- `webhook`: cole aqui a URL de um webhook (n8n, Formspree, Google Apps Script). Com isso, o formulário envia os dados para esse endereço em vez de abrir o WhatsApp. É o caminho para montar uma lista de interessadas.

Os cards de serviço e os botões de curso já marcam o interesse no formulário quando clicados.

## Decisões de UX writing

- **Título:** mantém o slogan do mockup: "Beleza real em grandes histórias."
- **Botões:** começam com verbo e dizem o que acontece. Ex.: "Quero me maquiar", "Conheça os cursos".
- **Erros:** explicam como corrigir. Ex.: "Digite o WhatsApp com DDD. Ex.: (21) 98765-4321". O erro aparece quando a pessoa sai do campo e some assim que ela corrige.
- **Privacidade:** o formulário avisa que nada fica salvo no site. Os dados vão só na mensagem para a Gaby.
