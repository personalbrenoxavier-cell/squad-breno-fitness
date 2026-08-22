# Checklist — Antes de entregar uma Avaliação Postural (Inicial)

> O Agente de Avaliação Postural roda esta lista. **Qualquer "não" → volta pedir info antes de gerar.**

## Inputs

- [ ] Tenho as **4 views** da foto atual (Frontal, Posterior, Lateral D, Lateral E)?
- [ ] **Não existe** avaliação anterior dessa aluna em `data/<aluna>/` (se existir, é reavaliação — outro agente)?
- [ ] Tenho o **nome completo** da aluna?
- [ ] Tenho a **data da avaliação** em formato YYYY-MM-DD?
- [ ] Tenho o **Foco / Objetivo** da aluna (vem da anamnese, escrito na voz dela)?
- [ ] Li a **anamnese completa** (preferências, histórico, restrições, medicamentos)?

## Estrutura do relatório

- [ ] Cabeçalho: "AVALIAÇÃO POSTURAL — Relatório de Análise Postural" + assinatura "Breno Xavier — Profissional de Educação Física / Nutricionista"?
- [ ] Seção 1 — Informações da Aluna preenchida (Nome, Data, Foco/Objetivo)?
- [ ] Seção 2 — Análise Segmentar inicia com **Legenda dos Graus**?
- [ ] Seção 2.1 — Vista Anterior cobre as **7 regiões**: Cabeça/Pescoço, Ombros, Tronco/Abdome, Quadril/EIAS, Coxas, Joelhos, Tornozelos/Pés?
- [ ] Seção 2.2 — Vista Posterior cobre as **8 regiões**: Cabeça/Pescoço, Escápulas, Coluna Dorsal, Região Lombar, Glúteos/Quadril, Posterior de Coxa, Joelhos/Poplítea, Panturrilhas/Calcâneo?
- [ ] Seção 2.3 — Vista Lateral cobre as **8 regiões**: Cabeça/Cervical, Ombros/Tórax, Coluna Dorsal, Abdome, Pelve/Lombar, Quadril/Glúteos, Joelhos, Tornozelos/Pés?
- [ ] Cada linha tem **Achado** (descritivo) e **Grau**?
- [ ] Graus usam APENAS: `Normal` / `Leve` / `Alteração`?
- [ ] Seção 3 — Síntese separa "Alterações Principais" de "Achados Leves" em duas colunas?
- [ ] Seção 4 — Recomendações em tabela `Área de Atenção | Conduta Sugerida`?

## Conteúdo técnico

- [ ] Toda **Alteração** aparece nas Recomendações com conduta concreta amarrada?
- [ ] Toda **conduta** está alinhada ao Foco/Objetivo da aluna (não recomenda fora do escopo dela)?
- [ ] As Recomendações usam o vocabulário do **repertório padrão Breno** (grupo muscular + tipo de trabalho + objetivo)?
- [ ] **🚫 Nenhuma Recomendação contém nome de exercício** (hip thrust, agachamento, prancha, dead bug, face pull, kickback, monster walk, stiff, mesa flexora, leg press, búlgaro, afundo, hollow body, abdominal infra, etc.)? Os exercícios vão na plataforma da aluna, não no relatório.
- [ ] Nenhuma Recomendação cita série/repetição/carga/equipamento?
- [ ] Se alguma região não foi avaliável → escrito "Avaliação prejudicada por [motivo]" ou "Não avaliável" + pedido de foto correta?

## Forma

- [ ] Nome correto da aluna em todo o relatório?
- [ ] Rodapé "Consultoria online — BRENO XAVIER" em todas as páginas?
- [ ] Tom: técnico + direto + sem floreio + sem motivação genérica?
- [ ] Nada que pareça **laudo médico** (é avaliação postural funcional)?
- [ ] Sem diagnóstico de patologia?

## Persistência

- [ ] Salvei o MD em `data/<aluna>/avaliacao-YYYY-MM-DD.md`?
- [ ] Gerei PDF em `data/<aluna>/avaliacao-YYYY-MM-DD.pdf` (se foi solicitado)?
- [ ] Gravei log YAML em `data/<aluna>/logs/avaliacao-YYYY-MM-DD.yaml` (achados + graus + condutas amarradas) para servir de baseline da reavaliação?
- [ ] Preparei resumo de 2–3 frases pro Breno mandar junto no WhatsApp da aluna?
