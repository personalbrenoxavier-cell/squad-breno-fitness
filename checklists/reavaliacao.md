# Checklist — Antes de entregar uma Reavaliação Postural

> O Agente de Reavaliação roda esta lista. **Qualquer "não" → volta pedir info antes de gerar.**

## Inputs

- [ ] Tenho as **4 views** da foto atual (Frontal, Posterior, Lateral D, Lateral E)?
- [ ] Tenho as fotos da **avaliação/reavaliação anterior**? (Se não → vira avaliação inicial — outro agente.)
- [ ] Tenho o **nome da aluna** e as **duas datas** (anterior e atual em YYYY-MM-DD)?
- [ ] Li a **anamnese** dela?
- [ ] Tenho o **relato do período** (fome, energia, aderência)?

## Estrutura do relatório

- [ ] Cabeçalho: "REAVALIAÇÃO POSTURAL — Relatório Comparativo de Análise Postural" + assinatura "Breno Xavier — Profissional de Educação Física / Nutricionista"?
- [ ] Seção 1 — Informações da Aluna (Nome, Avaliação Anterior, Reavaliação)?
- [ ] Seção 2 — Comparação Fotográfica em três blocos (Frontal, Posterior, Lateral) Antes×Depois?
- [ ] Seção 3 — Legenda dos Graus?
- [ ] Seção 4 — Tabela Comparativa cobre as **9 regiões** na ordem oficial: Cabeça/Cervical · Ombros · Coluna Torácica · Coluna Lombar/Pelve · Abdome/Tronco · Quadril/Glúteos · Joelhos · Tornozelos/Pés · Escápulas?
- [ ] Cada região tem: descrição Antes + Grau, descrição Depois + Grau, Evolução?
- [ ] Graus usam APENAS: `Normal` / `Leve` / `Alteração`?
- [ ] Evolução usa APENAS: `Melhorou` / `Manteve` / `Piorou`?
- [ ] Seção 5 — Síntese separa "Alterações Principais" de "Achados Leves"?
- [ ] Seção 6 — Recomendações em tabela `Área de Atenção | Conduta Sugerida`?
- [ ] Seção 7 — Próximos Passos com **3 a 5 bullets** + linha fixa "Próxima reavaliação sugerida em 8 a 12 semanas"?

## Conteúdo técnico

- [ ] Achados que **melhoraram** estão destacados na Síntese como progresso?
- [ ] Achados que **mantiveram ou pioraram** estão refletidos nas Recomendações e nos Próximos Passos?
- [ ] As Recomendações amarram cada ponto pendente a uma conduta concreta (treino/dieta)?
- [ ] **🚫 Nenhuma Recomendação ou Próximo Passo contém nome de exercício** (hip thrust, agachamento, prancha, dead bug, face pull, kickback, monster walk, stiff, mesa flexora, leg press, búlgaro, afundo, hollow body, abdominal infra, etc.)? Os exercícios vão na plataforma da aluna, não no relatório.
- [ ] Nenhuma Recomendação cita série/repetição/carga/equipamento?
- [ ] Se alguma região não foi comparável (ângulo diferente, roupa diferente) → escrito explicitamente + pedido de refoto?

## Forma

- [ ] Nome correto da aluna em todo o relatório?
- [ ] Rodapé "Consultoria online — BRENO XAVIER" em todas as páginas?
- [ ] Tom: técnico + direto + sem floreio + sem motivação genérica?
- [ ] Nada que pareça **laudo médico** (é avaliação postural funcional)?

## Formulário de Feedback da Aluna (OBRIGATÓRIO)

- [ ] O link do **Google Form** já está configurado em `config.yaml > avaliacao_postural.reavaliacao.feedback_aluna.link_google_form`?
  - Se NÃO → avisar o Breno pra criar o formulário UMA VEZ seguindo `docs/COMO-CRIAR-FORMULARIO-GOOGLE.md` e salvar o link
- [ ] Gerei `data/<aluna>/feedback-YYYY-MM-DD-whatsapp.txt` com:
  - [ ] Saudação com o primeiro nome da aluna
  - [ ] Link do Google Form
  - [ ] **Data da próxima reavaliação = data atual + 35 dias** (por extenso)
  - [ ] Pedido de confirmação da data
- [ ] Se o usuário pediu PDF fallback (aluna sem Google), gerei `data/<aluna>/feedback-YYYY-MM-DD.pdf`?

## Persistência

- [ ] Salvei o MD em `data/<aluna>/reavaliacao-YYYY-MM-DD.md`?
- [ ] Gerei PDF em `data/<aluna>/reavaliacao-YYYY-MM-DD.pdf` (se solicitado)?
- [ ] Gravei log YAML em `data/<aluna>/logs/reavaliacao-YYYY-MM-DD.yaml` (delta por região, evolução, condutas amarradas, **data da próxima reavaliação calculada**) como baseline da próxima?
- [ ] Preparei resumo de 2–3 frases pro Breno mandar junto no WhatsApp da aluna?
