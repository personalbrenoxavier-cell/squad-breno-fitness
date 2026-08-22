---
description: Monta dieta calibrada para aluna em uso de Mounjaro / Ozempic / Wegovy / Saxenda / Trulicity (análogos de GLP-1). VCT reduzido, proteína concentrada, creatina obrigatória.
---

Você vai **montar a dieta de uma aluna em uso de análogo de GLP-1** (Mounjaro, Ozempic, Wegovy, Saxenda, Trulicity ou similar).

**Dados informados pelo usuário:** $ARGUMENTS

---

## Fluxo OBRIGATÓRIO

### 1. Leia ANTES de qualquer coisa, NESTA ORDEM
- `agents/dieta-mounjaro-glp1.md` — persona específica
- `core/metodologia.md` — princípios gerais
- `core/dieta-principios.md` — regras inegociáveis
- `core/knowledge-base/mounjaro-glp1.md` — CRÍTICO: protocolo específico GLP-1
- `core/knowledge-base/proteina-distribuicao.md`
- `core/knowledge-base/gorduras-omega6.md`
- `core/regras-veto-alimento.md`
- `core/repertorio-receitas.md`
- `core/formato-dieta.md`
- `templates/dieta-mensal.md`
- `checklists/dieta.md`
- `CLAUDE.md`

### 2. Confirma dados específicos GLP-1
Você precisa, **além dos dados normais de dieta**:
- **Qual remédio** (Mounjaro / Ozempic / Wegovy / Saxenda / Trulicity / outro)
- **Dose atual** (mg/semana, etapa do protocolo médico)
- **Há quanto tempo usa**
- **Quanto ela consegue comer hoje** (prato cheio? metade? poucas garfadas?) — CRÍTICO pra calibrar VCT
- **Efeitos colaterais ativos** (náusea, refluxo, constipação, plenitude precoce)
- **Histórico CV familiar** — define tipo de gordura recomendada

E os normais:
- Nome, idade, peso, altura, nível de atividade
- Anamnese completa colada
- Última reavaliação (se existir)
- Dieta anterior (se existir)
- Relato do período (fome, energia, aderência)

Se faltar **"quanto ela consegue comer hoje"** → **pergunta antes**. NÃO chuta VCT. Esse é o input mais crítico.

### 3. Calibração específica GLP-1 (diferente da dieta normal)
Aplica TUDO de `agents/dieta-mounjaro-glp1.md` + `core/knowledge-base/mounjaro-glp1.md`:

- **VCT calibrado pela capacidade gástrica real** (não pelo cálculo teórico)
- **Proteína concentrada ~90g por refeição** (preserva massa magra durante perda forte)
- **Refeições menores e mais frequentes** se ela não consegue prato cheio
- **Creatina OBRIGATÓRIA** (preservação muscular)
- **Psyllium recomendado** (constipação é regra na caneta)
- **Hidratação reforçada** (~35-40 ml/kg)
- **Gorduras moduladas pelo histórico CV** — se familiar CV + LDL alterado, prioriza mono e ômega 3, reduz saturada
- **Atenção a refluxo** — não força volume nem deitar pós-refeição
- **Sem industrializado de difícil digestão** se efeito colateral ativo
- Resto dos princípios Breno (mais feijão que arroz, batata inglesa default, 3-4 frutas, etc.) **respeitados na medida que a capacidade gástrica permitir**

### 4. Monta a dieta
Formato igual ao normal (texto corrido, sem tabela colorida, 3 opções café e jantar, etc.) — só **ajustado em volume e densidade calórica/proteica**.

### 5. Gera os arquivos
Em `data/<aluna-slug>/`:
- `dieta-glp1-YYYY-MM-DD.md`
- `dieta-glp1-YYYY-MM-DD.html` (visual oficial)
- `dieta-glp1-YYYY-MM-DD.pdf`

### 6. Roda o checklist
`checklists/dieta.md` + verifica items específicos de GLP-1:
- [ ] VCT bate com capacidade gástrica relatada?
- [ ] Proteína distribuída em ~90g/refeição?
- [ ] Creatina prescrita?
- [ ] Hidratação reforçada?
- [ ] Considerou efeito colateral ativo?

### 7. Entrega
- **SEMPRE abre o PDF no visualizador padrão automaticamente** (`start "" "<pdf-path>"` no Bash) — o usuário quer revisar antes de aprovar
- Resumo de 2-3 frases pro WhatsApp
- Pergunta se precisa ajustar algo

---

**Aluna-slug:** nome em minúsculo com hífen.
**Data:** se não passado, usa hoje (YYYY-MM-DD).
