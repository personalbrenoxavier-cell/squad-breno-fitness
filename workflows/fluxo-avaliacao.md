# Workflow — Avaliação Postural (Inicial)

Fluxo end-to-end: da primeira foto da aluna nova até o relatório de avaliação inicial entregue.

```mermaid
flowchart TD
    A[Aluna nova manda 4 fotos no WhatsApp] --> B[Filipe / Breno salva fotos em data/aluna/fotos/YYYY-MM-DD/]
    B --> C{Já existe avaliacao-*.md anterior em data/aluna/?}
    C -->|Sim| D[É reavaliação → workflows/fluxo-reavaliacao.md]
    C -->|Não| E[Agente Avaliação Postural]
    E --> F[Skill avaliacao-postural roda fluxo INICIAL]
    F --> G[Lê template templates/avaliacao-postural.md]
    G --> H[Analisa Vista Anterior — 7 regiões]
    H --> I[Analisa Vista Posterior — 8 regiões]
    I --> J[Analisa Vista Lateral D/E — 8 regiões]
    J --> K[Monta Síntese — Alterações Principais | Achados Leves]
    K --> L[Monta Recomendações — Área de Atenção | Conduta Sugerida]
    L --> M[Roda checklist checklists/avaliacao.md]
    M --> N{Passou no checklist?}
    N -->|Não| O[Volta pedir info / refoto à aluna]
    N -->|Sim| P[Salva em data/aluna/avaliacao-YYYY-MM-DD.md]
    P --> Q[Gera PDF se solicitado]
    Q --> R[Grava log YAML como baseline da próxima reavaliação]
    R --> S[Prepara resumo 2-3 frases para WhatsApp]
    S --> T[Breno revisa e envia à aluna]
```

## Passos em detalhe

### 1. Ingestão
- Filipe/Breno salva as fotos em `data/<aluna>/fotos/YYYY-MM-DD/`
- Nomenclatura padrão: `frontal.jpg`, `posterior.jpg`, `lateral-d.jpg`, `lateral-e.jpg`
- Anota numa linha do JSON/anamnese o Foco/Objetivo da aluna (vem da anamnese do Google Forms)

### 2. Classificação do caso
- Existe `data/<aluna>/avaliacao-*.md` ou `data/<aluna>/reavaliacao-*.md` anterior? → vai pro **fluxo de reavaliação** (`workflows/fluxo-reavaliacao.md`)
- Não existe? → **avaliação inicial** (este workflow)

### 3. Execução do agente
- Carrega `agents/avaliacao-postural.md` como prompt base
- Carrega: anamnese da aluna + 4 fotos atuais + `core/metodologia.md` + `config.yaml`
- Aciona `skills/avaliacao-postural/SKILL.md` no fluxo **inicial**

### 4. Geração do relatório
- Preenche `templates/avaliacao-postural.md` na ordem oficial:
  1. Informações da Aluna
  2. Análise Segmentar por Vista (Anterior → Posterior → Lateral)
  3. Síntese dos Achados Posturais
  4. Recomendações
- Toda **Alteração** aparece nas Recomendações com conduta concreta
- Recomendações usam o repertório padrão Breno (ver `skills/avaliacao-postural/SKILL.md`)

### 5. Gate de qualidade
- `checklists/avaliacao.md` é checklist HARD — qualquer item falho = não entrega
- Se algum item de input falta → volta pedir antes de tentar

### 6. Persistência
- Arquivo final em `data/<aluna>/avaliacao-YYYY-MM-DD.md`
- PDF (se solicitado) em `data/<aluna>/avaliacao-YYYY-MM-DD.pdf`
- Log YAML em `data/<aluna>/logs/avaliacao-YYYY-MM-DD.yaml` com achados por região + grau + conduta amarrada
  - Esse YAML é o **baseline** que a próxima reavaliação vai usar como "Antes"

### 7. Entrega
- Breno recebe preview + mensagem de WhatsApp pronta (2-3 frases)
- Breno valida e dispara para a aluna

## Handoff para outros agentes

- **Agente de dieta** lê `data/<aluna>/avaliacao-YYYY-MM-DD.md` antes de montar a primeira dieta da aluna — usa Foco/Objetivo e Recomendações de Composição Corporal
- **Agente de treino** (futuro) usa as Recomendações como blueprint do plano de hipertrofia/correção postural
- **Próxima reavaliação** acontece em 8-10 semanas e segue `workflows/fluxo-reavaliacao.md`
