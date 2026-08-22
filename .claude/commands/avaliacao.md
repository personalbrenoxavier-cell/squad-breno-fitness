---
description: Gera Avaliação Postural INICIAL (primeira foto da aluna) no padrão oficial Breno Xavier — analisa fotos, monta relatório, exporta PDF.
---

Você vai gerar uma **AVALIAÇÃO POSTURAL INICIAL** (primeira vez da aluna).

**Dados informados pelo usuário:** $ARGUMENTS

---

## Fluxo OBRIGATÓRIO

### 1. Leia ANTES de qualquer coisa
- `agents/avaliacao-postural.md` — persona, regras e estrutura completa
- `skills/avaliacao-postural/SKILL.md` — repertório de recomendações
- `CLAUDE.md` — regras globais do projeto (em especial a regra "sem nome de exercício")
- `checklists/avaliacao.md` — checklist hard antes de entregar

### 2. Confirme inputs
Você precisa de:
- Nome completo da aluna
- Data da avaliação (default: hoje)
- Foco / Objetivo da aluna (vem da anamnese, na voz dela)
- 4 fotos: Frontal, Posterior, Lateral Direita, Lateral Esquerda

Se faltar qualquer item → pergunta antes de continuar. NÃO chuta.

### 3. Verifica se já existe avaliação anterior
Roda: `ls data/<aluna-slug>/avaliacao-*.md 2>/dev/null`
- Se existir → **PARA** e avisa: "Já existe avaliação anterior — isso é uma reavaliação. Use `/reavaliacao`."
- Se não existir → segue.

### 4. Localiza as fotos
Procura primeiro em `data/<aluna-slug>/fotos/YYYY-MM-DD/`. Se não tiver, procura no Downloads do usuário (`/c/Users/T-GAMER/Downloads/`) por arquivos com o nome da aluna. Copia pra `data/<aluna-slug>/fotos/YYYY-MM-DD/` com os nomes padrão: `frontal.jpg`, `posterior.jpg`, `lateral-d.jpg`, `lateral-e.jpg`.

### 5. Analisa as 4 vistas
Para cada vista, preenche a tabela `Região | Achado | Grau` seguindo as regiões exatas listadas em `agents/avaliacao-postural.md`:
- Vista Anterior: 7 regiões
- Vista Posterior: 8 regiões
- Vista Lateral: 8 regiões

Graus válidos: `Normal` / `Leve` / `Alteração`. Se algo não é avaliável, escreve "Não avaliável" + qual view pedir na próxima.

### 6. Monta Síntese + Recomendações
- Síntese em duas colunas: Alterações Principais × Achados Leves
- Recomendações em tabela `Área de Atenção | Conduta Sugerida`
- **🚫 NUNCA escreva nome de exercício** nas Recomendações. Só grupo muscular + tipo de trabalho + objetivo. Ver `CLAUDE.md`.

### 7. Gera os arquivos
Em `data/<aluna-slug>/`:
- `avaliacao-YYYY-MM-DD.html` — usa o padrão visual oficial (teal #1B7A7A, laranja #D4880F, fotos embedded). Base: o HTML da Isa Schimidt em `data/isa-schimidt/avaliacao-2026-05-20.html`
- `avaliacao-YYYY-MM-DD.pdf` — converte via Chrome headless:
  ```
  "/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="<PDF_PATH>" "file:///<HTML_PATH>"
  ```
- `logs/avaliacao-YYYY-MM-DD.yaml` — log técnico com achados, graus e condutas amarradas (vira baseline da próxima reavaliação)

### 8. Roda o checklist
Passa por `checklists/avaliacao.md` mentalmente. Qualquer item falho → não entrega, volta pedir info.

### 9. Entrega — ORDEM OBRIGATÓRIA
1. **Confirma que o PDF existe**: `ls -la "<pdf-path>"` — se não existir, NÃO PROSSEGUE. Volta e roda o Chrome headless pra gerar.
2. **Abre o PDF no visualizador padrão** (`start "" "<pdf-path>"` no Bash) — o usuário quer revisar antes de aprovar
3. **Mostra na resposta os 2 caminhos completos** (PDF + HTML) em blocos de código pra clique/cópia
4. Apresenta resumo de 2-3 frases pra mandar no WhatsApp
5. Pergunta se precisa ajustar algo

⚠️ NUNCA termine a entrega sem ter gerado o PDF a partir do HTML via Chrome headless. Gerar só o HTML é falha — o usuário precisa do PDF pra mandar pra aluna.

---

**Aluna-slug:** transforma o nome em slug minúsculo com hífen (ex.: "Maria Silva" → `maria-silva`, "Isa Schimidt" → `isa-schimidt`).

**Data:** se o usuário não passou data, usa **hoje** (formato YYYY-MM-DD no nome de arquivo, "DD de mês por extenso de YYYY" no relatório).
