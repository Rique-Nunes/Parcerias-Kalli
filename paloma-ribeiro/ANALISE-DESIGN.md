# Paloma Ribeiro — design (11/11/2026)

Mesmo processo das outras parceiras, com um objetivo a mais: como ela já tem site e a parceria ainda não existe, o site precisa mostrar valor de cara.

## Quem é a Paloma no perfil

A maior conta do grupo (169 mil seguidores, verificada, "+30K alunos"). Fala como professora de clínica: "raciocínio clínico", "entender a pele antes de tocar", "alinhar expectativa". É também CEO da Vittrat, está montando a própria clínica e palestra em faculdade. A comunidade se chama Esteticlass.

## De onde vem a identidade

| O que aparece no perfil | Como virou design |
| --- | --- |
| Artes em vinho e rosa | Vinho (`--wine`) como cor principal, rosa claro nos fundos |
| Frase em faixa vinho nas artes ("Você trata um organismo inteiro.") | A "tarja": em cada título, uma frase dentro de uma faixa vinho levemente inclinada (classe `.tarja`) |
| Títulos em sem-serifa pesada e apertada | Plus Jakarta Sans 800 nos títulos |
| Arte "Nunca pensei em ser professora" em serifa itálica | A citação dela na seção Sobre em Lora itálica |
| Blazer verde em várias fotos | Verde (`--green`) só em detalhes: selo "Certificado incluso", tarja de "sai certificada", marcadores |
| Tom clínico e didático | Layout claro e arejado, cartões limpos, textos curtos e diretos |
| Site atual: só cards para WhatsApp | Catálogo com filtro por área e busca, mantendo as mesmas mensagens de WhatsApp |

## Seções

Abertura · faixa · **Catálogo** (25 cursos, filtro e busca fixos no topo enquanto rola) · Destaques (Hydra Gloss Color, Dermaplaning, Limpeza de Pele) · Método (frase + três princípios) · Alunas · Além da sala (Vittrat, clínica, palestras) · Sobre · Formulário · Dúvidas · rodapé. No celular, barra fixa com "Encontrar meu curso", WhatsApp e Instagram.

## Verificação

360, 390, 768, 1024, 1440 e 1920 px: sem rolagem lateral, sem imagem quebrada, sem erro no console. Conferidos os seis filtros (25 / 3 / 8 / 6 / 5 / 3), a busca ("sobrancelha" → 6), o estado vazio, o link de WhatsApp de um curso (mesma mensagem do site dela), validação do formulário e mensagem montada (abertura interceptada, nada enviado).

As fontes do Google não carregam no ambiente de teste; as prévias usam fontes de reserva parecidas. Conferir no navegador real.
