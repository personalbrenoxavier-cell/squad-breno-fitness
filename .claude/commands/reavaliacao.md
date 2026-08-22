---
description: Gera Reavaliação Postural COMPARATIVA (Antes×Depois) no padrão oficial Breno Xavier — compara fotos antigas e novas, calcula evolução por região, exporta PDF.
---

Você vai gerar uma **REAVALIAÇÃO POSTURAL COMPARATIVA** (8-12 semanas após a anterior).

**Dados informados pelo usuário:** $ARGUMENTS

---

## Fluxo OBRIGATÓRIO

### 1. Leia ANTES de qualquer coisa
- `agents/reavaliacao-postural.md` — persona, regras e estrutura completa
- `skills/avaliacao-postural/SKILL.md` — repertório de recomendações
- `CLAUDE.md` — regras globais (em especial "sem nome de exercício")
- `checklists/reavaliacao.md` — checklist hard antes de entregar

### 2. Confirme inputs
Você precisa de:
- Nome completo da aluna
- Data da reavaliação atual (default: hoje)
- 4 fotos novas: Frontal, Posterior, Lateral Direita, Lateral Esquerda
- Relato do período da aluna (fome, energia, aderência ao treino e dieta)

Se faltar qualquer item → pergunta antes. NÃO chuta.

### 3. Verifica se existe avaliação/reavaliação anterior
Roda: `ls data/<aluna-slug>/avaliacao-*.md data/<aluna-slug>/reavaliacao-*.md 2>/dev/null`
- Se NÃO existir → **PARA** e avisa: "Não há avaliação anterior dessa aluna — isso é uma avaliação inicial. Use `/avaliacao`."
- Se existir → pega a mais recente como "Antes" e segue.

### 4. Localiza as fotos novas
Procura primeiro em `data/<aluna-slug>/fotos/YYYY-MM-DD/` (data atual). Se não tiver, busca no Downloads do usuário por arquivos com o nome da aluna. Copia pra `data/<aluna-slug>/fotos/YYYY-MM-DD/` com os nomes padrão.

Também carrega as fotos da **avaliação anterior** em `data/<aluna-slug>/fotos/<data-anterior>/` para fazer a comparação visual.

### 5. Analisa as 9 regiões comparativamente
Para cada região (na ordem fixa), preenche `Antes | Grau | Depois | Grau | Evolução`:
1. Cabeça / Cervical
2. Ombros
3. Coluna Torácica
4. Coluna Lombar / Pelve
5. Abdome / Tronco
6. Quadril / Glúteos
7. Joelhos
8. Tornozelos / Pés
9. Escápulas

**Antes:** lê do arquivo `data/<aluna-slug>/logs/<tipo>-<data-anterior>.yaml` ou da avaliação anterior em MD.

**Evolução:**
- `Melhorou` — grau caiu OU avanço claro na descrição
- `Manteve` — grau e descrição similares
- `Piorou` — grau subiu OU surgiu novo achado

NUNCA inventa melhora. Se em dúvida, classifica como `Manteve`.

### 6. Monta Síntese + Recomendações + Próximos Passos
- Síntese: destaca o que MELHOROU em uma frase positiva; lista o que ainda precisa de foco
- Recomendações: tabela `Área de Atenção | Conduta Sugerida` para o que manteve ou piorou
- **🚫 NUNCA escreva nome de exercício**. Só grupo muscular + tipo de trabalho + objetivo
- Próximos Passos: 3-5 bullets + linha fixa "Próxima reavaliação sugerida em 8 a 12 semanas"

### 7. Gera os arquivos da REAVALIAÇÃO
Em `data/<aluna-slug>/`:
- `reavaliacao-YYYY-MM-DD.html` — padrão visual oficial. Use como base o template `templates/reavaliacao-postural.md` adaptado para HTML (ou copia a estrutura do HTML da avaliação inicial e adapta pra comparativa)
- `reavaliacao-YYYY-MM-DD.pdf` — via Chrome headless:
  ```
  "/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="<PDF_PATH>" "file:///<HTML_PATH>"
  ```
- `logs/reavaliacao-YYYY-MM-DD.yaml` — novo baseline com a evolução por região

### 8. Gera a MENSAGEM DE WHATSAPP com link do Google Form (OBRIGATÓRIO)

**Calcular a data da próxima reavaliação:** data desta reavaliação + 35 dias. Formato por extenso ("DD de mês de YYYY"). Exemplo: se hoje é 23/05/2026, próxima = 27/06/2026.

**Onde está o link do formulário Google:** o Breno cria UM Google Form único (instruções em `docs/COMO-CRIAR-FORMULARIO-GOOGLE.md`). O link fica salvo em `config.yaml` em `avaliacao_postural.reavaliacao.feedback_aluna.link_google_form`. Pega esse link.

Se o link AINDA NÃO ESTIVER em `config.yaml` → avisa o usuário: "Pra a parte de feedback, você precisa criar o Google Form uma única vez seguindo `docs/COMO-CRIAR-FORMULARIO-GOOGLE.md`, e depois salvar o link em `config.yaml`. Posso te guiar agora?"

Gera em `data/<aluna-slug>/`:
- `feedback-YYYY-MM-DD-whatsapp.txt` — mensagem pronta pra colar no WhatsApp, com:
  - Saudação personalizada com o primeiro nome da aluna
  - Frase contextual ("acabei de fechar sua reavaliação")
  - **Link do Google Form**
  - Tempo estimado de preenchimento (8-10 min)
  - **Data da próxima reavaliação** sugerida (calculada como atual + 35 dias)
  - Pedido pra confirmar a data

**Modelo da mensagem:**

```
Oi {{primeiro_nome}}! Acabei de fechar sua reavaliação postural — vai junto em PDF.

Pra eu ajustar seu próximo ciclo do jeito certo, responde esse formulário rápido (uns 8-10 min):

👉 {{link_google_form}}

Próxima reavaliação sugerida: {{proxima_reavaliacao}} (em ~35 dias).
Me confirma se essa data dá pra fazer foto nova!

Qualquer dúvida me chama por aqui. 🤝
```

**(Opcional, fallback)** Se o usuário pedir explicitamente PDF do formulário (ex.: aluna sem Google), gera também:
- `feedback-YYYY-MM-DD.pdf` (a partir de `templates/feedback-aluna.html`)

### 9. Roda o checklist
`checklists/reavaliacao.md`. Qualquer item falho → não entrega.

### 10. Entrega
- **SEMPRE abre o PDF da reavaliação no visualizador padrão automaticamente** (`start "" "<pdf-path>"` no Bash) — o usuário quer revisar antes de aprovar
- Apresenta resumo de 2-3 frases pra WhatsApp (com tom celebrativo se houve progresso)
- Apresenta o caminho dos 3 arquivos pro Breno:
  1. PDF da reavaliação (pra mandar pra aluna)
  2. PDF do formulário de feedback (pra mandar pra aluna)
  3. Texto WhatsApp (pra colar no chat)
- Pergunta se precisa ajustar algo

---

**Aluna-slug:** nome em minúsculo com hífen (ex.: "Maria Silva" → `maria-silva`).

**Datas:** se o usuário não passou, usa **hoje** como reavaliação atual e pega a mais recente do histórico como anterior.
