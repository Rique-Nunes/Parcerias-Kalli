# Site — Dra. Silvana Kosinski (proposta de parceria)

Site estático (HTML + CSS + JS puro, sem build). Abra `index.html` no navegador para ver.
Feito como **proposta de valor**: a parceria ainda não foi fechada, então o selo "Parceira oficial da Kalliagendia"
**não** foi incluído — só o crédito "Site desenvolvido por Kalliagendia" no rodapé. Ao fechar, copie o bloco
`<aside class="kalli">` de outro site (ex.: `jhenyffervauna_nails`) para antes do `</main>`.

## Estrutura
1. Início (retrato + "+7.000 alunos")
2. Números
3. **Clínica Belle** (2ª seção, em destaque: recepção, Facial/Corporal/Capilar, horário, WhatsApp, Maps, feed)
4. Imersões e mentorias (4 cards que pré-preenchem o formulário)
5. Método ("Anatomia antes da agulha")
6. Palcos (palestras e congressos)
7. Turmas
8. Sobre
9. Contato (formulário → direct do Instagram; cartão lateral → WhatsApp da clínica)
10. Dúvidas

## De onde veio cada informação
| Informação | Fonte |
|---|---|
| "Mentora em Harmonização Facial e Corporal", "+7.000 alunos", "ensina profissionais a faturarem mais com injetáveis" | Bio do @drasilvanakosinski |
| Biomédica esteta, empreendedora, doutora em Ciências Biomédicas | Post do IV Encontro Maranhense de Biomedicina |
| Palestras (Estética in Nordeste, Encontro Maranhense) e AMWC Dubai | Posts dela de 2026 |
| Nomes das imersões (Full Face VIP, Toxina e Microtox, Fios de PDO) | Texto das artes em `_fonte/ig` |
| Itens do "método" | Temas dos posts educativos dela (planos anatômicos, aspiração, marcas de toxina, anestesia intraoral, preenchimento artificial) |
| Clínica Belle: slogan, horários, WhatsApp, Maps, serviços | Bio e posts do @clinicabelleoficial |

## Antes de publicar — confirmar com ela
- [ ] **Vínculo com a Clínica Belle**: o site diz que ela "faz parte" e "atende" lá. Confirmar o termo certo (sócia? proprietária? profissional da casa?).
- [ ] **WhatsApp da clínica**: usei o link da bio, `wa.me/559884232862` (tem 8 dígitos após o DDD; testar se abre a conversa certa).
- [ ] **Contato dela**: o link da bio (linkr.bio/yn930) não pôde ser lido. O formulário abre o direct do Instagram. Se ela tiver WhatsApp comercial, preencha `CONFIG.whatsapp` em `js/main.js` e o formulário passa a usar o WhatsApp sozinho.
- [ ] **Instituto Revitalle**: aparece nas artes das turmas; o site diz que "as turmas levam a marca do Instituto Revitalle". Confirmar a relação.
- [ ] **Imersões**: nomes vieram das artes; descrições são texto meu, genéricas de propósito. Sem preço, data ou carga horária (nada disso é público). Confirmar se as quatro seguem ativas e os pré-requisitos (FAQ diz "profissionais da estética e da saúde").
- [ ] **Cidade**: não escrevi cidade da clínica (só o link do Maps). O DDD 98 e o evento em São Luís sugerem Maranhão, mas não confirmei.
- [ ] **Fotos com terceiros**: `turma-pratica.webp` e `turma-certificados.webp` mostram alunas — pedir autorização. `belle-endolaser.webp` mostra uma profissional da clínica.
- [ ] **Foto do congresso**: aparece a marca de um expositor (Renova). Trocar se ela preferir.
- [ ] **Retrato do início**: é uma selfie; espelhei a foto para o slide ao fundo ficar legível ("Toxina Botulínica / Microtox / Dra. Silvana Kosinski"). Se ela estranhar, é só desfazer o espelhamento.
- [ ] **Regras do conselho** (CRBM) sobre publicidade: o site não usa antes/depois nem promete resultado; ainda assim vale ela revisar.
- [ ] **docker-compose.yml** da raiz: falta criar o serviço `silvana-kosinski` (não mexi no arquivo).

## Fotos não usadas
Antes/depois de testa e lábios (resultado de paciente), artes com rosto de paciente, artes com texto grande sobre a foto e fotos de grupo com muitas alunas.

## Testes
Playwright em 360, 390, 768, 1024, 1440 e 1920 px: sem rolagem horizontal, sem erro de console, fluxo do formulário ok
(as fontes do Google não carregam no ambiente de teste; conferir Poppins no navegador real).
