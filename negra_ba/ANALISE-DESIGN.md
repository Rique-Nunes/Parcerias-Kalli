# Negra Ba — design (11/11/2026, 2ª versão)

A primeira versão seguia o molde escuro da Cássia Lima (primeiro em azul, depois em ameixa). A pedido, o site foi refeito do zero a partir da personalidade dela, como o da Jhenyffer Vaúna. A versão anterior está em `_fonte/versao-anterior-20261111/`.

## De onde vem a identidade

| O que aparece no perfil | Como virou design |
| --- | --- |
| Cabelo loiro mel, sempre em destaque | Amarelo-mel (`--honey`) como cor principal: abertura, manifesto, destaques |
| Unhas longas em coral, vermelho e rosa | Coral (`--coral`) na faixa e nos acentos; rosa (`--pink`) em um cartão e um adesivo |
| Blusa e unhas de oncinha | Estampa de onça desenhada em SVG, em fundo da abertura e do manifesto |
| Unhas stiletto, "afiar cada garra" | Galeria "Garras": molduras altas de ponta arredondada, abertas em leque como dedos; marca com uma unha coral ao lado do nome |
| Discurso direto: profissão, valor, periferia | Tipografia de cartaz (Bricolage Grotesque, caixa alta), frases em tarja preta, bordas grossas e sombras duras "de adesivo" |
| "+27 anos", "+50 mil alunas" | Adesivos redondos sobre o retrato |
| Abertura do espaço na Cidade Tiradentes | Seção-manifesto com a frase dela em tamanho de cartaz |

Cores: `--ink #1a1210`, `--paper #fff7e8`, `--cream #fdecc8`, `--honey #f5b52e`, `--coral #ea4b2a`, `--pink #f8b4c2`. Texto sempre em preto sobre mel, coral e rosa (contraste AA). Fontes: Bricolage Grotesque (títulos) e DM Sans (texto).

## Seções

Abertura · faixa de técnicas · números · Cursos (4 cartões que marcam o formulário) · Garras (5 trabalhos) · Empreendedoras da Beleza · Quem ensina · Manifesto/Cidade Tiradentes · Palestras · Lista de espera (Google Forms dela) · Dúvidas · selo Kalli · rodapé. No celular, barra fixa com lista de espera, Instagram e TikTok.

O formulário e o envio ao Google Forms não mudaram (mesmos campos, mesmos códigos `entry.*`).

## Verificação

360, 390, 768, 1024, 1440 e 1920 px: sem rolagem lateral, sem imagem quebrada, sem erro no console. Conferidos menu, validação, marcação por cartão, exclusividade do "Nenhuma ainda", montagem do envio (requisição interceptada, nada gravado) e diálogo de fotos. As fontes do Google não carregam no ambiente de teste; conferir no navegador real, onde a Bricolage é mais estreita que a fonte de reserva.
