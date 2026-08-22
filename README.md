# Squad Breno Xavier — Comandos

Cheat sheet dos 4 comandos do dia a dia. Cola e usa.

---

## 🚀 Como abrir o projeto

1. Tecla **Windows** → digita `cmd` → Enter
2. Cola e dá Enter:
   ```
   cd C:\Users\T-GAMER\Downloads\squad-breno-fitness\squad-breno-fitness
   claude
   ```

Pronto. Agora é só digitar os comandos abaixo.

---

## 📋 Os 4 comandos

### 🩻 `/avaliacao` — Primeira foto da aluna (avaliação postural inicial)

```
/avaliacao Maria Silva, foco glúteo definido, fotos no Downloads
```

**O que entrega:**
- PDF da análise postural por vista (Anterior, Posterior, Lateral)
- Síntese dos achados + Recomendações
- Salvo em `data/maria-silva/avaliacao-YYYY-MM-DD.pdf`

---

### 🔄 `/reavaliacao` — Comparação Antes × Depois (mensal)

```
/reavaliacao Maria Silva, fotos novas no Downloads, relato: aderência boa, animada com o treino
```

**O que entrega:**
- PDF comparativo (Antes×Depois nas 9 regiões + coluna Evolução)
- Mensagem WhatsApp pronta com link do **Google Form de feedback**
- Data da próxima reavaliação (+ 35 dias)
- Salvo em `data/maria-silva/reavaliacao-YYYY-MM-DD.pdf` e `feedback-YYYY-MM-DD-whatsapp.txt`

---

### 🍽️ `/dieta` — Dieta mensal (aluna normal)

```
/dieta Maria Silva, 62kg, 1.65m, 28 anos, fase déficit moderado, definição.
Anamnese: [cola aqui a anamnese inteira do Google Forms]
```

**O que entrega:**
- PDF da dieta no padrão oficial (texto corrido, 3 opções café/jantar, etc.)
- Salvo em `data/maria-silva/dieta-YYYY-MM-DD.pdf`

---

### 💉 `/dieta-mounjaro` — Dieta para aluna em Mounjaro/Ozempic/Wegovy/Saxenda/Trulicity

```
/dieta-mounjaro Maria Silva, 62kg, 1.65m, 28 anos, Mounjaro 7.5mg há 3 meses,
consegue comer metade do prato, sem náusea.
Anamnese: [cola aqui]
```

**O que entrega:**
- PDF da dieta calibrada pra capacidade gástrica real
- Proteína concentrada ~90g/refeição + creatina obrigatória + psyllium
- Salvo em `data/maria-silva/dieta-glp1-YYYY-MM-DD.pdf`

---

## ⚠️ Coisas importantes

1. **Pode falar natural** — os comandos funcionam mesmo se você esquecer detalhes. O Claude pergunta o que falta.
2. **Cola a anamnese inteira** quando for dieta. Pedaços geram chute.
3. **Sempre revisa o PDF antes de mandar pra aluna.** O Claude entrega no padrão, mas o filtro final é seu.
4. **Pra reavaliação**, o Google Form de feedback já está configurado. A mensagem WhatsApp sai pronta com o link.

---

## 🔗 Links úteis

- **Google Form de feedback** (mandar pras alunas): https://docs.google.com/forms/d/e/1FAIpQLSfrQQityiWFDeb5sI9Zo3M5mPyHoJUhIRhJ8dwCjaYHsXsorg/viewform
- **Planilha de respostas** (todas as alunas caem aqui): https://docs.google.com/spreadsheets/d/1w5hXGrnLzPLBnQNAf2LLtveYLQGR0epwIEkULGEUFY4/edit
- **Editar o formulário** (mudar perguntas): https://docs.google.com/forms/d/1YaXvVTrxQhU7PjG-Kqi-TU1eKi7FxzuLXyO1YABDUCY/edit

---

## 📁 Onde fica cada coisa

```
data/<aluna>/                    → arquivos da aluna (PDFs, fotos, logs)
agents/                          → os 4 agentes (não mexer sem ler CLAUDE.md)
core/                            → metodologia (regras invioláveis)
templates/                       → modelos de saída
checklists/                      → o que o Claude verifica antes de entregar
config.yaml                      → faixas de macros, datas, parâmetros
docs/COMO-CRIAR-FORMULARIO-GOOGLE.md  → guia do Google Form (já feito)
```

---

## 🚫 NUNCA fazer

- Mandar dieta sem ler `core/` (Claude faz isso sozinho — não pular)
- Colocar nome de exercício nas Recomendações de avaliação/reavaliação
- Inverter "mais feijão que arroz"
- Subir kcal sem confirmar fase
- Recomendar suplemento sem necessidade real
- Chutar quando faltar dado da aluna

---

*Em caso de dúvida operacional, pergunta no Claude — ele lê todo o projeto sozinho e responde com base na metodologia. Não chuta nem inventa.*

---

## 💾 Salvar no GitHub

Repositório privado: `personalbrenoxavier-cell/squad-breno-fitness`

Depois de gerar dietas ou mexer no sistema, dê **dois cliques em `atualizar-github.bat`**.
Ele mostra o que mudou, pede uma descrição (pode só apertar Enter) e envia tudo.

Não precisa fazer isso a cada arquivo. Pode acumular o dia inteiro e enviar uma vez só.

**Fica de fora do GitHub:** `data/` (avaliações posturais), fotos, `.csv` e `.xlsx`.
Ou seja, o GitHub **não** é backup dessa pasta.

