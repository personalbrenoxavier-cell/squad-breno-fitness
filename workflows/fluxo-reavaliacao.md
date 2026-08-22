# Workflow — Reavaliação Postural Comparativa

Fluxo end-to-end: da foto nova (8-12 semanas após a anterior) até o relatório comparativo entregue.

```mermaid
flowchart TD
    A[Aluna manda fotos novas no WhatsApp] --> B[Filipe / Breno salva em data/aluna/fotos/YYYY-MM-DD/]
    B --> C{Existe avaliacao-*.md ou reavaliacao-*.md anterior?}
    C -->|Não| D[Vai para fluxo-avaliacao.md — é inicial]
    C -->|Sim| E[Agente Reavaliação Postural]
    E --> F[Carrega fotos anteriores + log YAML baseline]
    F --> G[Skill avaliacao-postural roda fluxo COMPARATIVO]
    G --> H[Lê template templates/reavaliacao-postural.md]
    H --> I[Monta tabela Antes vs Depois — 9 regiões]
    I --> J[Calcula coluna Evolução por região]
    J --> K[Monta Síntese — Alterações Principais | Achados Leves]
    K --> L[Monta Recomendações — Área de Atenção | Conduta Sugerida]
    L --> M[Monta Próximos Passos — 3-5 bullets]
    M --> N[Roda checklist checklists/reavaliacao.md]
    N --> O{Passou no checklist?}
    O -->|Não| P[Volta pedir info / refoto à aluna]
    O -->|Sim| Q[Salva em data/aluna/reavaliacao-YYYY-MM-DD.md]
    Q --> R[Gera PDF se solicitado]
    R --> S[Grava log YAML novo como baseline da próxima]
    S --> T[Prepara resumo 2-3 frases para WhatsApp]
    T --> U[Breno revisa e envia à aluna]
```

## Passos em detalhe

### 1. Ingestão
- Filipe/Breno salva as fotos atuais em `data/<aluna>/fotos/YYYY-MM-DD/`
- Nomenclatura: `frontal.jpg`, `posterior.jpg`, `lateral-d.jpg`, `lateral-e.jpg`
- Anota relato da aluna do período (fome, energia, aderência ao treino e dieta)

### 2. Classificação do caso
- Existe `data/<aluna>/avaliacao-*.md` ou `data/<aluna>/reavaliacao-*.md` anterior? → **reavaliação comparativa** (este workflow)
- Não existe? → vai pro **fluxo de avaliação inicial** (`workflows/fluxo-avaliacao.md`)

### 3. Execução do agente
- Carrega `agents/reavaliacao-postural.md` como prompt base
- Carrega: anamnese + fotos atuais + fotos anteriores + log YAML baseline + `core/metodologia.md` + `config.yaml`
- Aciona `skills/avaliacao-postural/SKILL.md` no fluxo **comparativo**

### 4. Geração do relatório
- Preenche `templates/reavaliacao-postural.md` na ordem oficial:
  1. Informações da Aluna (Nome + duas datas)
  2. Comparação Fotográfica (Frontal · Posterior · Lateral — Antes/Depois)
  3. Legenda dos Graus
  4. Comparação: Antes vs Depois — tabela das **9 regiões** com coluna Evolução
  5. Síntese dos Achados Posturais
  6. Recomendações
  7. Próximos Passos (3-5 bullets) + linha fixa de reavaliação em 8-12 semanas

### 5. Regra da coluna Evolução
- `Melhorou` — grau caiu OU descrição mostra avanço claro mesmo com grau mantido
- `Manteve` — grau e descrição similares à anterior
- `Piorou` — grau subiu OU surgiu novo achado relevante

### 6. Gate de qualidade
- `checklists/reavaliacao.md` é checklist HARD — qualquer item falho = não entrega

### 7. Persistência
- Arquivo final em `data/<aluna>/reavaliacao-YYYY-MM-DD.md`
- PDF da reavaliação em `data/<aluna>/reavaliacao-YYYY-MM-DD.pdf`
- Log YAML em `data/<aluna>/logs/reavaliacao-YYYY-MM-DD.yaml` — vira novo baseline

### 8. Formulário de Feedback (OBRIGATÓRIO)

Toda reavaliação gera junto um segundo PDF — o **Formulário de Feedback da Aluna**:

- `data/<aluna>/feedback-YYYY-MM-DD.html` (fonte)
- `data/<aluna>/feedback-YYYY-MM-DD.pdf` (para enviar à aluna)
- `data/<aluna>/feedback-YYYY-MM-DD-whatsapp.txt` (versão pra colar no chat)

**Cálculo da próxima reavaliação:** data atual + **35 dias** (configurável em `config.yaml`).

Conteúdo do formulário:
1. Adesão (dieta / força / cardio — escala 0-10)
2. Dieta — o que tá fácil/chato, fome, momentos de saída da linha
3. Treino de força — sessões, dor, execução, progressão
4. Cardio — sessões, modalidade, intensidade
5. Sensação corporal — corpo, energia, sono, humor (0-10)
6. Ciclo menstrual
7. Feedback aberto — incômodos, o que funciona, o que mudaria
8. Confirmação da data da próxima reavaliação

### 9. Entrega
- Breno recebe 3 arquivos:
  1. PDF da reavaliação (analise postural comparativa)
  2. PDF do formulário de feedback
  3. Mensagem WhatsApp pronta (texto curto + texto longo do formulário)
- Breno valida e dispara para a aluna

## Handoff para o agente de dieta

Após a reavaliação, a **fase atualizada** da aluna é input direto para o agente de dieta na próxima atualização mensal. O agente de dieta SEMPRE lê a reavaliação mais recente antes de montar, em especial as Recomendações de Composição Corporal.
