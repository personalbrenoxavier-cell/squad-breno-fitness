# Como criar o Formulário de Feedback no Google Forms

Guia rápido pro Breno (ou Filipe) criar **uma única vez** o formulário online que vai junto com cada reavaliação. Depois disso, é só copiar o link e mandar pra aluna no WhatsApp.

> ⏱️ **Tempo total: ~3 minutos.** Você roda 1 script, autoriza, copia o link, pronto.

---

## Passo a passo

### 1. Abra o Google Apps Script

Acesse: **https://script.google.com**

(Faça login com a conta Google que vai receber as respostas — provavelmente a do Breno Xavier.)

### 2. Crie um novo projeto

Clique em **"Novo projeto"** (canto superior esquerdo, botão azul/branco).

Vai abrir um editor com um arquivo chamado `Code.gs` já criado.

### 3. Cole o script

- Apague tudo que estiver dentro do `Code.gs`
- Abra o arquivo `tools/criar-formulario-feedback-google.gs` deste projeto
- **Copie tudo** e cole no editor do Apps Script

### 4. Salve o projeto

Clique no ícone de disquete (💾) no topo, ou **Ctrl+S**.

Dê um nome ao projeto, tipo: **"Criador de Formulário Feedback Breno"**.

### 5. Execute a função

- No editor, em cima, tem um menu suspenso com o nome da função: deve estar mostrando `criarFormularioFeedbackBreno`
- Clique no botão **"Executar"** (▶) ao lado

### 6. Autorize

Na primeira execução o Google vai pedir autorização:

1. Janela: **"Autorização obrigatória"** → clique em **"Revisar permissões"**
2. Escolha sua conta Google
3. Aparece um aviso "Google não verificou este app" → clique em **"Avançado"** → **"Acessar Criador de Formulário Feedback Breno (não seguro)"**
   > Esse aviso aparece porque o script é seu, não foi publicado oficialmente. É seguro — você mesmo está executando código que vai criar coisas no SEU Drive.
4. Clique em **"Permitir"** — vai pedir 2 permissões (criar formulários + criar planilhas)

### 7. Pegue os links

Após executar:

- Aguarde uns 10-15 segundos
- Vai aparecer uma **caixa de alerta** com os links (ou veja em **"Execuções"** → clique na última → role até "Logs")
- Anote 2 links:
  - **Link pra aluna** (URL pública do formulário — termina com `/viewform`)
  - **Link da planilha** (onde as respostas vão cair)

---

## Como usar a partir de agora

### Quando enviar uma reavaliação pra aluna:

1. Roda `/reavaliacao` no Claude (gera o PDF da análise postural)
2. No WhatsApp da aluna, manda:
   - O PDF da reavaliação (que o Claude gerou)
   - O link do formulário (sempre o mesmo, vc anotou no passo 7)
   - Mensagem curta sugerindo a próxima reavaliação em ~35 dias

**Modelo de mensagem WhatsApp** (substitua `[nome]` e `[data próxima]`):

```
Oi [nome]! Acabei de fechar sua reavaliação postural — vai junto em PDF.

Pra eu ajustar seu próximo ciclo do jeito certo, responde esse formulário rápido (uns 8-10 min):

👉 [link do formulário]

Próxima reavaliação sugerida: [data próxima] (em ~35 dias).
Me confirma se essa data dá pra fazer foto nova!

Qualquer dúvida me chama por aqui. 🤝
```

### Pra ver as respostas:

- Abra o link da **planilha de respostas** (passo 7) — ou acesse direto pelo seu Google Drive
- Toda resposta que qualquer aluna enviar vai cair como uma nova linha
- Filtre por **nome da aluna** + **data do preenchimento** pra achar a específica

### Pra editar perguntas:

- Abra o link de **edição** do formulário (passo 7)
- Mexe direto na interface do Google Forms
- Alterações valem pras próximas respostas

---

## Dicas

- **Mesmo link pra todas as alunas.** Não precisa criar formulário novo a cada mês. Todas as respostas vão pra mesma planilha — vc filtra por nome.
- **A primeira pergunta é o nome da aluna** — então mesmo recebendo várias respostas, dá pra identificar quem é quem.
- **A segunda pergunta é a data** — então uma mesma aluna pode preencher várias vezes ao longo do tempo (uma a cada reavaliação) e você consegue rastrear a evolução das respostas.
- **Notificações por email**: dentro do formulário (link de edição), vá em **Respostas** → ícone de 3 pontos → **"Receber notificações por email de novas respostas"**. Aí o Breno recebe um email cada vez que uma aluna preenche.

---

## Estrutura do formulário criado

O script gera um formulário com:

1. **Identificação**: nome + data + (opcional) data da última reavaliação
2. **Seção 1 — Adesão Geral**: 3 escalas 0-10 (dieta, força, cardio)
3. **Seção 2 — Dieta**: 5 perguntas abertas (fácil, chato, alimentos, fome, momentos de saída da linha)
4. **Seção 3 — Treino de Força**: sessões, dor, execução, progressão (múltipla escolha), ajustes
5. **Seção 4 — Cardio**: sessões, modalidade, intensidade (múltipla escolha)
6. **Seção 5 — Sensação Corporal**: corpo, mudanças visíveis, energia/sono/humor (escalas 0-10)
7. **Seção 6 — Ciclo Menstrual**: regularidade (múltipla escolha) + fase/fome
8. **Seção 7 — Feedback Aberto**: incômodo físico, o que funciona, o que mudaria, livre

Total: ~30 perguntas, tempo de preenchimento estimado **8-10 min**.

---

## Se algo der errado

- **"Erro: Limite de execução excedido"** → role aguarde 1 min e clique Executar de novo
- **Não aparece o alerta com os links** → vá em **"Execuções"** (menu lateral esquerdo) → clique na última execução → seção **"Logs"** → os links estão lá
- **Quer começar do zero** → no seu Google Drive, apague o formulário e a planilha criados, e rode o script de novo
- **Outra dúvida** → me chama no Claude que eu desbugo
