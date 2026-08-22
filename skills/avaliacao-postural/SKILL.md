---
name: avaliacao-postural
description: Gera relatórios de Avaliação (inicial) e Reavaliação (comparativa) Postural em markdown/PDF para a consultoria do Breno Xavier. Lê fotos (frontal, posterior, laterais D e E), classifica cada região em graus Normal/Leve/Alteração, e quando há fotos anteriores monta a coluna de Evolução (Melhorou/Manteve/Piorou).
padroes_oficiais:
  - "Avaliação inicial: PDF Maria Jennifer Pinheiro Lopes — 18/05/2026"
  - "Reavaliação: PDF Gabriela Carline — 17/05/2026"
---

# Skill: Avaliação Postural

Habilidade técnica acionada por **dois** agentes:
- `agents/avaliacao-postural.md` → primeira avaliação (sem comparação)
- `agents/reavaliacao-postural.md` → reavaliação comparativa (Antes×Depois)

## Os dois fluxos

| Fluxo | Quando | Template | Estrutura |
|---|---|---|---|
| **Avaliação Inicial** | Não existe `data/<aluna>/avaliacao-*.md` anterior | `templates/avaliacao-postural.md` | Análise segmentar **por vista** (Anterior, Posterior, Lateral) |
| **Reavaliação Comparativa** | Já existe avaliação/reavaliação anterior | `templates/reavaliacao-postural.md` | Tabela **comparativa** Antes×Depois com coluna Evolução |

> Detectar o caso é responsabilidade do agente que aciona a skill (`avaliacao-postural` vs `reavaliacao-postural`).

## Graus (idêntico nos dois fluxos)

| Grau | Descrição |
|------|-----------|
| **Normal** | Sem alteração postural identificada. Segmento dentro dos padrões fisiológicos esperados. |
| **Leve** | Desvio postural discreto, sem comprometimento funcional significativo. Pode ser corrigido com treino e consciência postural. |
| **Alteração** | Desvio postural evidente que requer atenção no planejamento do treino. Pode impactar o desempenho e aumentar o risco de lesões se não for trabalhado. |

## Views obrigatórias

- **Frontal** (anterior)
- **Posterior**
- **Lateral Direita**
- **Lateral Esquerda**

Se faltar uma view, anota "Não avaliável nesta vista" para as regiões dependentes e pede a foto correta pra próxima rodada.

---

## Estrutura — AVALIAÇÃO INICIAL

Padrão: **PDF Maria Jennifer**. Análise **por vista**, cada uma com sua tabela `Região | Achado | Grau`.

### Regiões por vista (ordem fixa, NÃO MUDAR)

**Vista Anterior (Frontal)** — 7 regiões
1. Cabeça / Pescoço — alinhamento, inclinação lateral
2. Ombros — assimetria de altura, protração
3. Tronco / Abdome — cintura, acúmulo abdominal, tônus parede anterior
4. Quadril / EIAS — estrutura (ginecoide/androide), simetria de cristas ilíacas
5. Coxas — massa muscular em quadríceps, concentração adipocitária medial/lateral
6. Joelhos — tendência ao valgo/varo bilateral
7. Tornozelos / Pés — pronação/supinação

**Vista Posterior** — 8 regiões
1. Cabeça / Pescoço — inclinação, rotação
2. Escápulas — estabilização, alamento
3. Coluna Dorsal — escoliose funcional, alinhamento vertebral
4. Região Lombar — curvatura (relação com anteversão pélvica vista na lateral)
5. Glúteos / Quadril — volume, formato (arredondado/quadrado/lateralizado), acúmulo trocantérico ("culote"), dobra glúteo-femoral
6. Posterior de Coxa — concentração adipocitária, textura adipocitária
7. Joelhos / Poplítea — alinhamento de pregas, assimetria
8. Panturrilhas / Calcâneo — eversão/inversão de calcâneo

**Vista Lateral (D e E)** — 8 regiões
1. Cabeça / Cervical — anteriorização cervical, protrusão do queixo
2. Ombros / Tórax — protração, abertura torácica
3. Coluna Dorsal — cifose, hipercifose
4. Abdome — protuberância anterior, relaxamento de parede
5. Pelve / Lombar — anteversão pélvica, hiperlordose
6. Quadril / Glúteos — projeção posterior, volume
7. Joelhos — alinhamento sagital, hiperextensão (recurvatum)
8. Tornozelos / Pés — alinhamento sagital

### Saída — estrutura completa
1. **Informações da Aluna** (Nome, Data, Foco/Objetivo)
2. **Análise Segmentar por Vista** (com legenda dos graus + 3 sub-seções)
3. **Síntese dos Achados Posturais** (Alterações Principais | Achados Leves em duas colunas)
4. **Recomendações** (tabela Área de Atenção | Conduta Sugerida)

---

## Estrutura — REAVALIAÇÃO COMPARATIVA

Padrão: **PDF Gabriela Carline**. Tabela única **comparativa Antes×Depois**.

### Regiões da tabela comparativa (ordem fixa, 9 regiões)
1. Cabeça / Cervical
2. Ombros
3. Coluna Torácica
4. Coluna Lombar / Pelve
5. Abdome / Tronco
6. Quadril / Glúteos
7. Joelhos
8. Tornozelos / Pés
9. Escápulas

### Coluna "Evolução"
- `Melhorou` — grau caiu (Alteração→Leve, Leve→Normal) OU avanço claro na descrição mesmo com grau mantido
- `Manteve` — grau e descrição similares
- `Piorou` — grau subiu OU surgiu novo achado relevante

### Saída — estrutura completa
1. **Informações da Aluna** (Nome, Avaliação Anterior, Reavaliação)
2. **Comparação Fotográfica** (Frontal · Posterior · Lateral — blocos Antes/Depois)
3. **Legenda dos Graus**
4. **Comparação: Antes vs Depois** (tabela das 9 regiões)
5. **Síntese dos Achados Posturais** (Alterações Principais | Achados Leves)
6. **Recomendações** (tabela Área de Atenção | Conduta Sugerida)
7. **Próximos Passos** (3-5 bullets + linha fixa "Próxima reavaliação sugerida em 8 a 12 semanas")

---

## Repertório padrão de recomendações Breno

> **🚫 REGRA INEGOCIÁVEL — sem nome de exercício na Recomendação**
> O relatório vai pra aluna, e os exercícios já estão configurados na **plataforma de treino**. Colocar nome de exercício aqui gera confusão. A coluna "Conduta Sugerida" descreve **músculo/área + tipo de trabalho + objetivo**, não a lista de exercícios.
>
> - ✅ Permitido: "fortalecimento de glúteo máximo", "core profundo (estabilização)", "core dinâmico (tonificação)", "hipertrofia de isquiotibiais", "trabalho escapular postural", "propriocepção em apoio unipodal", "mobilidade de tornozelo", "alongamento de flexores de quadril", "déficit calórico controlado", "aeróbio de baixa intensidade".
> - ❌ Proibido: nome de exercício (hip thrust, agachamento, prancha, dead bug, face pull, kickback, monster walk, stiff, mesa flexora, leg press, búlgaro, afundo, retração cervical, abdução em pé, clamshell, hollow body, abdominal infra, oblíquos, etc.), equipamento, série/repetição, carga.

Use este vocabulário ao montar a tabela de Recomendações nos dois fluxos:

| Achado | Conduta padrão (sem exercício) |
|---|---|
| Anteversão pélvica + hiperlordose | Fortalecimento de glúteo máximo + core profundo (estabilização) + alongamento de flexores de quadril |
| Protuberância abdominal / parede relaxada | Core profundo (estabilização) + core dinâmico (tonificação da parede anterior) em todas as sessões |
| Glúteo quadrado / lateralizado | Hipertrofia progressiva de glúteo máximo + foco em glúteo médio para arredondamento superior |
| Foco principal Glúteos (hipertrofia) | Hipertrofia progressiva de glúteo máximo, médio e isquiotibiais · mínimo 2 sessões/semana focadas em membros inferiores posteriores |
| Foco principal Quadríceps | Hipertrofia de quadríceps em diferentes amplitudes e ângulos + trabalho unilateral para corrigir assimetrias |
| Acúmulo trocantérico ("culote") | Hipertrofia de glúteo médio + ajuste alimentar com déficit calórico controlado + proteína 1,8-2,2 g/kg + aeróbio de baixa intensidade 2-3x/sem |
| Acúmulo adipocitário posterior de coxa | Hipertrofia de isquiotibiais + déficit calórico controlado |
| Valgo bilateral leve | Fortalecimento de abdutores do quadril + rotadores externos + consciência de alinhamento joelho-pé nos exercícios de base |
| Pronação / eversão de calcâneo | Propriocepção em apoio unipodal + mobilidade de tornozelo + tibial posterior |
| Anteriorização cervical | Trabalho de cervical profunda + trabalho escapular postural |
| Cifose / protração de ombros | Trabalho escapular postural + alongamento de peitoral + mobilidade torácica |
| Manutenção de bom padrão (reavaliação) | Sustentar o trabalho já em curso, consolidar ganho, evitar regressão |

---

## Entregáveis

- `data/<aluna>/avaliacao-YYYY-MM-DD.md` OU `data/<aluna>/reavaliacao-YYYY-MM-DD.md` (obrigatório)
- `data/<aluna>/avaliacao-YYYY-MM-DD.pdf` OU `data/<aluna>/reavaliacao-YYYY-MM-DD.pdf` (quando solicitado)
- `data/<aluna>/logs/<tipo>-YYYY-MM-DD.yaml` — log técnico com achados por região + grau + conduta amarrada (vira baseline da próxima)
- Resumo de **2-3 frases** pro Breno mandar junto no WhatsApp da aluna

## Dependências

- `templates/avaliacao-postural.md` — modelo da avaliação inicial
- `templates/reavaliacao-postural.md` — modelo da reavaliação
- `config.yaml` → `reavaliacao` — parâmetros (graus, regiões, views)
- `checklists/avaliacao.md` — pre-flight da avaliação inicial
- `checklists/reavaliacao.md` — pre-flight da reavaliação
