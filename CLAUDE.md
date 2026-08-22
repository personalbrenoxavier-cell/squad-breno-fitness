# Squad Breno Xavier — Consultoria Fitness

Este projeto é o squad de agentes da consultoria do Breno Xavier (personal/nutricionista). Atende mulheres 24–45 com foco em **corpo definido** (não emagrecimento). Idioma: pt-BR.

---

## REGRA DE OURO (LEIA ANTES DE QUALQUER COISA)

**Nunca responda nada sobre dieta, treino, avaliação ou metodologia sem ANTES ler os arquivos relevantes do `core/` e do agente específico.** O squad inteiro vive nesses arquivos. Responder de cabeça = responder errado.

Se o usuário pedir dieta sem dar dados completos → **pergunte antes**, não chute.

Se a metodologia interna do Breno entrar em conflito com a knowledge-base científica → **flague a tensão pro Breno decidir**, não escolha sozinho.

---

## Como o squad está organizado

```
agents/          → agentes prontos (dieta-mensal, reavaliacao-postural, dieta-mounjaro-glp1)
core/            → metodologia, princípios, formato, regras de veto, knowledge-base
skills/          → skills detalhadas que os agentes usam
templates/       → modelos de saída (formato final da entrega)
checklists/      → verificações antes de entregar
workflows/       → fluxos passo a passo
config.yaml      → faixas de macros, déficit, parâmetros
squad.yaml       → manifesto do squad
```

---

## Fluxo OBRIGATÓRIO ao montar uma dieta

> **Dois cenários distintos:**
> - **Dieta nova / mensal completa** → fluxo abaixo + `workflows/fluxo-dieta-mensal.md`
> - **Ajuste pós-reavaliação** (Filipe manda PDF anterior + kcal alvo, sem anamnese nova) → seguir **`workflows/ajuste-dieta-pos-reavaliacao.md`** (fluxo lean, com cheatsheet de quantidades). Aplicar mesmo conjunto de leitura obrigatória abaixo.

Quando alguém pedir "monta a dieta da aluna X", o Claude SEMPRE:

1. **Lê primeiro, na ordem:**
   - `agents/dieta-mensal.md` (a persona e o fluxo)
   - `core/metodologia.md` (princípios gerais)
   - `core/fases-composicao.md` (decide a fase: déficit / manutenção / superávit)
   - `core/dieta-principios.md` (regras inegociáveis — porcionamento, suplementos, etc.)
   - `core/formato-dieta.md` (como a dieta tem que SAIR)
   - `core/regras-veto-alimento.md` (o que NÃO pode entrar)
   - `core/repertorio-receitas.md` (receitas validadas)
   - **`core/reforco-repertorio-combinacao.md`** (REFORÇO oficial — anatomia de cada refeição, industrializados que encaixam, teste das 4 perguntas antes de entregar) ← **SEMPRE LER**
   - `templates/dieta-mensal.md` (template de saída)
   - `checklists/dieta.md` (validação final)

2. **Confirma os dados da aluna.** Se faltar peso, altura, idade, objetivo, preferências, restrições, fase → **pergunta antes**.

3. **Decide a fase** consultando `core/fases-composicao.md`.

4. **Monta a dieta** seguindo TODOS os princípios.

5. **Roda o `checklists/dieta.md`** antes de entregar.

6. **Entrega no formato exato** de `core/formato-dieta.md` (texto corrido, sem tabela de macros visual com emojis, sem caixinhas, sem floreio).

---

## Não-negociáveis (resumo prático)

### Formato
- **Texto corrido**, igual o PDF da Gabriela Carline. Sem tabelas coloridas, sem emojis, sem boxes.
- **3 opções no café da manhã e no jantar.** 1–2 opções nas demais refeições.
- **Alimentos em formato:** `Alimento - quantidade em g (equivalência caseira)`.
- **Rodapé oficial:** `@brenoxavieer_ · 31 9 7262-8289 · www.brenoxavier.com.br`.
- **Tabela final de macros** com % do VCT por macro (carbo, proteína, gordura insat, gordura sat).

### Porcionamento
- Arroz: mínimo **40g/refeição**.
- Feijão: padrão **80g/refeição** (sempre MAIS feijão que arroz).
- Proteína animal: máximo **90g/refeição**.
- Doce de até 150 kcal em **TODAS as 3 opções de almoço** (não opcional).
- 3–4 frutas/dia (frutas comuns: banana, mexerica, manga, mamão, laranja).
- **Batata inglesa > batata-doce** por default.

### Marcas internas (não escrever marca explícita na dieta, mas usar nos cálculos)
- Pão de forma: **Vigor light**.
- Carne para "meia cura": padrão.
- **Mais feijão que arroz** sempre.

### Primeiro protocolo de déficit
- **Teto de 1.900 kcal** por padrão, mesmo se a aluna for muito ativa. Só sobe se ela pedir explicitamente depois.

### Combinações PROIBIDAS
- Banana + amêndoa/castanha + ovo cozido (castigo, não lanche).
- Proteína seca sem molho/feijão/fundo.
- Salada + frango grelhado + batata-doce 3x no dia.

### Lanche sem lácteo / sem whey → DEFAULT
- **Panqueca de banana** (1 banana + 2 ovos + 20g aveia + canela + 1 colher chá pasta de amendoim). Nunca substituir por "banana + amêndoa + ovo cozido".

### Suplementos
- Whey **concentrado** = default (90% dos casos).
- Whey isolado = SÓ se intolerância à lactose declarada.
- Whey hidrolisado = só pós-bariátrica / má absorção declarada.
- Ômega 3 = só se exame com LDL alterado ou histórico CV + marcador ruim.
- Creatina = quem treina força + obrigatória em GLP-1.
- Não empilhar suplemento "porque é bom".

### Tom escrito
- Direto, comando curto. Aluna precisa saber **o que** fazer, não **por que**.
- Sem "vamos juntas!", "você consegue!", floreio motivacional.
- Sem justificar protocolo pra aluna.

---

## Público-alvo do produto

**"Falsa magra"** — mulher 24–45 que veste P/M mas tem gordura localizada / flacidez. Não é a obesa que precisa emagrecer. Toda comunicação, dieta e linguagem assume esse perfil.

---

## Agentes ativos

- **`agents/dieta-mensal.md`** → monta/atualiza dieta mensal.
- **`agents/dieta-mounjaro-glp1.md`** → dieta para alunas em uso de Mounjaro/Ozempic/Wegovy/Saxenda (VCT calibrado, proteína ~90g/refeição, creatina obrigatória, psyllium recomendado).
- **`agents/dieta-ciclagem.md`** → dieta CICLADA (carbo/caloria) com 2 tipos de dia (ALTO encaixado no treino pesado + BAIXO no descanso). Ativa em: aderência caindo, reverse diet, entrada em superávit leve. NUNCA ativa em primeira dieta ou aluna em GLP-1. Lê `core/knowledge-base/ciclagem-carbo-caloria.md`.
- **`agents/avaliacao-postural.md`** → **avaliação INICIAL** (primeira foto da aluna). Análise segmentar por vista (Anterior, Posterior, Lateral). Padrão: PDF Maria Jennifer.
- **`agents/reavaliacao-postural.md`** → **reavaliação COMPARATIVA** (Antes×Depois). Tabela das 9 regiões com coluna Evolução. Padrão: PDF Gabriela Carline.

### Regra de roteamento postural

Antes de gerar qualquer relatório postural, **checar se existe** `data/<aluna>/avaliacao-*.md` ou `data/<aluna>/reavaliacao-*.md` anterior:
- **NÃO existe** → primeira vez → usa `agents/avaliacao-postural.md`
- **Existe** → reavaliação → usa `agents/reavaliacao-postural.md`

### 📂 REGRA — sempre abrir o PDF de preview após gerar

Toda vez que o Claude gerar um PDF (avaliação, reavaliação, dieta, feedback, qualquer um) **abrir automaticamente o arquivo** no visualizador padrão pro usuário poder revisar antes de aprovar.

Comando: `start "" "<caminho-completo-do-pdf>"` no Bash (sem `cd`).

Aplica a TODOS os comandos: `/avaliacao`, `/reavaliacao`, `/dieta`, `/dieta-mounjaro`. Pode pular SÓ se o usuário pedir explicitamente "não abre o PDF agora".

### 📱 REGRA — padrão da mensagem WhatsApp pra aluna

A mensagem de WhatsApp em `feedback-YYYY-MM-DD-whatsapp.txt` segue este formato exato:

- **Sem emojis** (sem 👉 🤝 etc.)
- **Sem a frase "Vai junto em PDF"** ou similar no início
- **Link inline com o texto** (sem 👉 e sem o link em linha separada). Exemplo: "responde esse formulário rápido (uns 8 a 10 min): https://..."
- **Sem espaços ou linhas em branco extras** dentro de cada parágrafo
- **Estrutura de 4 parágrafos** separados por linha em branco simples:
  1. Saudação + frase curta sobre a reavaliação/avaliação
  2. Análise (achados/evolução)
  3. Pedido do formulário com link inline
  4. Próxima reavaliação + pedido de confirmação + (se reavaliação) pedido de perimetria + "Qualquer dúvida me chama por aqui."

Modelo de referência (reavaliação):

```
Oi {{primeiro_nome}}! Acabei de fechar sua reavaliação postural.

{{análise curta da evolução em ~3-5 frases}}

Pra eu ajustar seu próximo ciclo do jeito certo, responde esse formulário rápido (uns 8 a 10 min): https://docs.google.com/forms/d/e/1FAIpQLSfrQQityiWFDeb5sI9Zo3M5mPyHoJUhIRhJ8dwCjaYHsXsorg/viewform

Próxima reavaliação sugerida: {{data_proxima}} (em ~35 dias). Me confirma se essa data dá pra fazer foto nova! Aproveita pra atualizar as medidas também (peso, quadril, cintura, coxa, braço). Qualquer dúvida me chama por aqui.
```

Modelo de referência (avaliação inicial — sem perimetria histórica):

```
Oi {{primeiro_nome}}! Acabei de fechar sua avaliação postural inicial.

{{análise curta dos achados em ~3-5 frases}}

Pra eu calibrar seu protocolo do jeito certo, responde esse formulário rápido (uns 8 a 10 min): https://docs.google.com/forms/d/e/1FAIpQLSfrQQityiWFDeb5sI9Zo3M5mPyHoJUhIRhJ8dwCjaYHsXsorg/viewform

Próxima reavaliação sugerida: {{data_proxima}} (em ~35 dias). Me confirma se essa data dá pra fazer foto nova! Qualquer dúvida me chama por aqui.
```

---

### 🔗 REGRA — sempre mostrar links HTML e PDF na resposta

Ao terminar qualquer entrega, **sempre mostrar no chat os caminhos completos do HTML e do PDF gerados**, em formato fácil de copiar. Exemplo:

```
📄 PDF: C:\Users\T-GAMER\Downloads\squad-breno-fitness\squad-breno-fitness\data\<aluna>\<arquivo>.pdf
🌐 HTML: C:\Users\T-GAMER\Downloads\squad-breno-fitness\squad-breno-fitness\data\<aluna>\<arquivo>.html
```

O usuário sempre quer ver os 2 (PDF pra mandar pra aluna, HTML pra editar se precisar). Vale pra TODOS os comandos.

---

### 🚫 REGRA INEGOCIÁVEL — sem nome de exercício no relatório postural

**Nenhum relatório de Avaliação ou Reavaliação Postural** que vai pra aluna pode conter nome de exercício (hip thrust, agachamento, prancha, dead bug, face pull, kickback, monster walk, stiff, mesa flexora, leg press, búlgaro, afundo, hollow body, abdominal infra, retração cervical, abdução em pé, clamshell, etc.). Os exercícios já estão configurados na plataforma de treino dela — colocar no relatório gera dúvida.

A coluna **Conduta Sugerida** descreve apenas: **grupo muscular + tipo de trabalho + objetivo**.
- ✅ "Fortalecimento de glúteo máximo + core profundo (estabilização)"
- ❌ "Hip thrust + dead bug + bird dog"

---

## Workflow do estagiário (Filipe)

1. Recebe anamnese (Google Forms) e foto da aluna.
2. Abre o Claude Code no projeto.
3. Pede a dieta dando **TODOS** os dados:
   - Nome, idade, peso, altura
   - Nível de atividade
   - Objetivo (definição / manutenção / etc.)
   - Fase do protocolo
   - Restrições, preferências, alergias, medicamentos
   - Anamnese completa colada
4. Revisa a saída do Claude rodando `checklists/dieta.md` mentalmente.
5. **Manda pro Breno aprovar antes de enviar pra aluna.**

---

## O que o Claude NUNCA pode fazer

1. ❌ Entregar dieta sem ter lido o `core/` inteiro.
2. ❌ Inventar quantidades / calorias sem base na TACO ou em marcas validadas.
3. ❌ Incluir alimento marcado "não gosto" na anamnese.
4. ❌ Subir calorias para ganho sem confirmação da fase.
5. ❌ Entregar dieta com emoji, tabela colorida, caixinha, bullet `✅`.
6. ❌ Justificar protocolo pra aluna dentro da dieta.
7. ❌ Recomendar suplemento sem necessidade real.
8. ❌ Inverter "mais arroz que feijão".
9. ❌ Empilhar 3+ suplementos numa aluna que disse "não uso suplementos".
10. ❌ Mexer em `core/` sem o Breno autorizar explicitamente.

---

## Em caso de dúvida

**Pergunta.** Não chuta. A consultoria do Breno tem mais de 5 anos de método consolidado — chute aqui quebra resultado de aluna real.
