---
description: Monta a dieta mensal de uma aluna seguindo TODA a metodologia Breno Xavier (formato Deborah/Gabriela). Para aluna em uso de Mounjaro/GLP-1, use /dieta-mounjaro.
---

Você vai **montar ou atualizar a dieta mensal** de uma aluna.

**Dados informados pelo usuário:** $ARGUMENTS

---

## Fluxo OBRIGATÓRIO

### 1. Leia ANTES de qualquer coisa, NESTA ORDEM
- `agents/dieta-mensal.md` — persona e fluxo do agente
- `core/metodologia.md` — princípios gerais da consultoria
- `core/fases-composicao.md` — pra decidir fase (déficit / manutenção / superávit)
- `core/dieta-principios.md` — regras inegociáveis (porcionamento, suplementos, etc.)
- `core/formato-dieta.md` — como a dieta SAI (texto corrido, sem tabela colorida)
- `core/regras-veto-alimento.md` — o que NÃO pode entrar
- `core/repertorio-receitas.md` — receitas validadas
- `templates/dieta-mensal.md` — template de saída
- `checklists/dieta.md` — validação final
- `CLAUDE.md` — regras globais

### 2. Verifica se há aluna em uso de GLP-1
Se a anamnese OU os dados passados mencionarem **Mounjaro, Ozempic, Wegovy, Saxenda, Trulicity** ou qualquer análogo de GLP-1 → **PARA** e avisa: "Aluna em uso de GLP-1 → use `/dieta-mounjaro` em vez de `/dieta`."

### 3. Confirma dados da aluna
Você precisa de:
- Nome completo
- Idade, peso, altura
- Nível de atividade
- Objetivo declarado (definição / manutenção / etc.)
- Fase do protocolo (decide com base em `core/fases-composicao.md`)
- Restrições, preferências, alergias, medicamentos
- **Anamnese completa colada**
- Última reavaliação postural (se existir, em `data/<aluna>/`)
- Dieta anterior (se existir)
- Relato do mês (se aluna ativa) — fome, energia, aderência

Se faltar qualquer item → **pergunta antes**. NÃO chuta.

### 4. Decide a fase
Usa `core/fases-composicao.md`. Se aluna nova, lê a primeira avaliação postural pra calibrar.

### 5. Monta a dieta
Seguindo TODOS os princípios:
- **Texto corrido**, sem tabela colorida, sem emoji, sem caixinha
- **3 opções no café da manhã e jantar**, 1-2 nas demais refeições
- **Alimentos no formato**: `Alimento - quantidade em g (equivalência caseira)`
- **Mais feijão que arroz** (sempre)
- **Arroz mínimo 40g/refeição** · **Feijão padrão 80g** · **Proteína animal max 90g**
- **Doce de até 150 kcal em TODAS as 3 opções de almoço** (não opcional)
- **3-4 frutas/dia** (banana, mexerica, manga, mamão, laranja)
- **Batata inglesa > batata-doce** por default
- **Primeiro protocolo de déficit: teto 1900 kcal**
- Lanche sem lácteo → **panqueca de banana** (default — nunca banana+amêndoa+ovo)
- Suplementos: whey concentrado default; isolado só se intolerância; ômega 3 só com LDL alterado
- Rodapé oficial: `@brenoxavieer_ · 31 9 7262-8289 · www.brenoxavier.com.br`
- Tabela final de macros com % do VCT por macro (carbo, prot, gord insat, gord sat)

### 6. Gera os arquivos
Em `data/<aluna-slug>/`:
- `dieta-YYYY-MM-DD.md` (markdown)
- `dieta-YYYY-MM-DD.html` (visual oficial — base em `modelo-dieta-novo-padrao.html`)
- `dieta-YYYY-MM-DD.pdf` (via Chrome headless)

### 7. Roda o checklist
`checklists/dieta.md`. Qualquer item falho → não entrega.

### 8. Entrega
- **SEMPRE abre o PDF no visualizador padrão automaticamente** (`start "" "<pdf-path>"` no Bash) — o usuário quer revisar antes de aprovar
- Resumo de 2-3 frases pro WhatsApp
- Pergunta se precisa ajustar algo

---

**Aluna-slug:** nome em minúsculo com hífen (ex.: "Maria Silva" → `maria-silva`).
**Data:** se não passado, usa hoje (YYYY-MM-DD).
