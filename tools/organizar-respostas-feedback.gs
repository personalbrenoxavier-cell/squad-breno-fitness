/**
 * Apps Script — Organiza a planilha de respostas do Formulário de Feedback Mensal
 * em ABAS POR SEÇÃO (Resumo + Adesão + Dieta + Treino + Cardio + Sensação + Ciclo + Feedback Aberto)
 *
 * COMO USAR:
 *  1. Abra a planilha de respostas:
 *     https://docs.google.com/spreadsheets/d/1w5hXGrnLzPLBnQNAf2LLtveYLQGR0epwIEkULGEUFY4/edit
 *  2. Menu: Extensões → Apps Script
 *  3. Apague o conteúdo do arquivo `Code.gs` e cole TUDO deste arquivo
 *  4. Salve (Ctrl+S) e clique no botão "Executar" (▶) — função `organizarRespostas`
 *  5. Vai pedir autorização — autorize com sua conta Google
 *  6. Volta na planilha — vai ter 8 abas novas (uma por seção) no final
 *  7. Cada aba mostra: Data | Nome | Respostas só daquela seção, pergunta por pergunta
 *
 * EXECUÇÕES SEGUINTES (depois de chegarem novas respostas):
 *  - Basta clicar em Executar → `organizarRespostas` de novo. Ele atualiza as abas.
 *
 * OU rode `criarMenuAutomatico()` UMA vez — vai colocar um botão "🔄 Atualizar abas"
 * direto no menu da planilha, pra atualizar com 1 clique sem ter que abrir o Apps Script.
 */

// ============================================================
// MAPA DE SEÇÕES → cabeçalhos do formulário
// (se mudar uma pergunta no formulário, atualiza aqui também)
// ============================================================
const SECOES = [
  {
    nome: '🎯 Adesão',
    cor: '#4caf50',
    perguntas: [
      'Sua adesão à DIETA no último mês',
      'Sua adesão ao TREINO DE FORÇA no último mês',
      'Sua adesão ao CARDIO no último mês'
    ]
  },
  {
    nome: '🍽️ Dieta',
    cor: '#ff9800',
    perguntas: [
      'Quais refeições estão MAIS FÁCEIS de seguir?',
      'Quais refeições estão CHATAS / DIFÍCEIS de seguir?',
      'Tem algum ALIMENTO da dieta que você não gosta ou não está conseguindo encaixar?',
      'Como tá a FOME ao longo do dia? Tem algum horário específico que fica difícil?',
      'Tem algum momento da semana que você "SAI DA LINHA"? Quando e por quê?'
    ]
  },
  {
    nome: '💪 Treino Força',
    cor: '#1976d2',
    perguntas: [
      'Quantas SESSÕES DE FORÇA na semana você conseguiu fazer (média)?',
      'Sente DOR ou DESCONFORTO em algum exercício específico?',
      'Algum exercício você NÃO ESTÁ CONSEGUINDO executar bem?',
      'Sente que está PROGREDINDO (subindo carga, mais repetições, mais firmeza)?',
      'Algo no treino de força que você gostaria de mudar?'
    ]
  },
  {
    nome: '🏃 Cardio',
    cor: '#7b1fa2',
    perguntas: [
      'Quantas SESSÕES DE CARDIO na semana você fez (média)?',
      'Que MODALIDADE tem feito? (esteira, bike, escada, caminhada, etc.)',
      'Tem conseguido respeitar a INTENSIDADE orientada?'
    ]
  },
  {
    nome: '💚 Sensação Corporal',
    cor: '#00897b',
    perguntas: [
      'Como você se sente em relação ao seu CORPO hoje?',
      'Notou alguma MUDANÇA VISÍVEL? (em roupas, espelho, foto)',
      'Sua ENERGIA no dia a dia',
      'Qualidade do seu SONO',
      'Seu HUMOR em geral'
    ]
  },
  {
    nome: '🩸 Ciclo Menstrual',
    cor: '#c2185b',
    perguntas: [
      'Como está o CICLO?',
      'Sente diferença de FOME ou ENERGIA em alguma fase do ciclo?'
    ]
  },
  {
    nome: '💬 Feedback Aberto',
    cor: '#e65100',
    perguntas: [
      'Tem algum INCÔMODO FÍSICO novo? (dor, desconforto, lesão)',
      'O que está funcionando MUITO BEM pra você? (o que você quer MANTER)',
      'O que você gostaria que MUDASSE no protocolo? (dieta, treino, frequência, qualquer coisa)',
      'Algo MAIS que você queira me contar?'
    ]
  }
];

// ============================================================
// FUNÇÃO PRINCIPAL — chame essa
// ============================================================
function organizarRespostas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const planilhaOriginal = ss.getSheets()[0];  // assume primeira aba = respostas brutas

  if (!planilhaOriginal) {
    SpreadsheetApp.getUi().alert('❌ Não achei a aba de respostas. Roda esse script ABERTO NA PLANILHA de respostas.');
    return;
  }

  const dados = planilhaOriginal.getDataRange().getValues();
  if (dados.length < 2) {
    SpreadsheetApp.getUi().alert('⚠️ Ainda não tem respostas na planilha. Quando chegar a primeira, rode o script de novo.');
    return;
  }

  const headers = dados[0];
  const respostas = dados.slice(1);

  // Identifica coluna de data e nome
  const colData = headers.findIndex(h => String(h).toLowerCase().includes('carimbo'));
  const colNome = headers.findIndex(h => String(h).toLowerCase().includes('nome completo'));

  if (colNome === -1) {
    SpreadsheetApp.getUi().alert('❌ Não achei a coluna "Nome completo". Verifica se o formulário tá ligado nessa planilha.');
    return;
  }

  // ============================================================
  // RESUMO — primeira aba criada
  // ============================================================
  criarAbaResumo(ss, respostas, headers, colData, colNome);

  // ============================================================
  // 1 aba por seção
  // ============================================================
  SECOES.forEach(secao => {
    criarAbaSecao(ss, secao, respostas, headers, colData, colNome);
  });

  SpreadsheetApp.getUi().alert(
    '✅ Pronto!\n\n' +
    'Criei 1 aba de RESUMO + ' + SECOES.length + ' abas por seção.\n' +
    'Cada aba mostra as respostas pergunta por pergunta, com nome e data.\n\n' +
    'Quando chegarem novas respostas, basta rodar de novo essa função.'
  );
}

// ============================================================
// ABA DE RESUMO — visão geral de todas as alunas
// ============================================================
function criarAbaResumo(ss, respostas, headers, colData, colNome) {
  const nomeAba = '📋 Resumo';
  let aba = ss.getSheetByName(nomeAba);
  if (aba) ss.deleteSheet(aba);
  aba = ss.insertSheet(nomeAba, 1);

  // Cabeçalho do resumo
  const colsResumo = [
    'Data',
    'Aluna',
    'Adesão Dieta',
    'Adesão Força',
    'Adesão Cardio',
    'Energia',
    'Sono',
    'Humor',
    'Sessões Força/sem',
    'Sessões Cardio/sem',
    'Ciclo'
  ];

  aba.getRange(1, 1, 1, colsResumo.length).setValues([colsResumo]);

  // Mapeia índices das colunas
  const idx = {
    adesaoDieta:   findCol(headers, 'Sua adesão à DIETA'),
    adesaoForca:   findCol(headers, 'TREINO DE FORÇA no último mês'),
    adesaoCardio:  findCol(headers, 'adesão ao CARDIO'),
    energia:       findCol(headers, 'ENERGIA no dia a dia'),
    sono:          findCol(headers, 'Qualidade do seu SONO'),
    humor:         findCol(headers, 'HUMOR em geral'),
    sessoesForca:  findCol(headers, 'SESSÕES DE FORÇA na semana'),
    sessoesCardio: findCol(headers, 'SESSÕES DE CARDIO na semana'),
    ciclo:         findCol(headers, 'Como está o CICLO')
  };

  // Popula linhas
  const linhas = respostas.map(r => [
    formatarData(r[colData]),
    r[colNome] || '—',
    r[idx.adesaoDieta]   ?? '',
    r[idx.adesaoForca]   ?? '',
    r[idx.adesaoCardio]  ?? '',
    r[idx.energia]       ?? '',
    r[idx.sono]          ?? '',
    r[idx.humor]         ?? '',
    r[idx.sessoesForca]  ?? '',
    r[idx.sessoesCardio] ?? '',
    r[idx.ciclo]         ?? ''
  ]);

  if (linhas.length > 0) {
    aba.getRange(2, 1, linhas.length, colsResumo.length).setValues(linhas);
  }

  // Formatação
  formatarCabecalho(aba, colsResumo.length, '#1b5e20');
  aba.setFrozenRows(1);
  aba.setFrozenColumns(2);
  aba.autoResizeColumns(1, colsResumo.length);
  aba.setTabColor('#1b5e20');
}

// ============================================================
// ABA POR SEÇÃO — mostra perguntas separadas em colunas
// ============================================================
function criarAbaSecao(ss, secao, respostas, headers, colData, colNome) {
  let aba = ss.getSheetByName(secao.nome);
  if (aba) ss.deleteSheet(aba);
  aba = ss.insertSheet(secao.nome);

  // Encontra as colunas da seção
  const colsSecao = secao.perguntas.map(p => findCol(headers, p));
  const perguntasOk = secao.perguntas.filter((_, i) => colsSecao[i] !== -1);
  const colsOk = colsSecao.filter(c => c !== -1);

  // Cabeçalho: Data | Aluna | (perguntas da seção)
  const headersAba = ['Data', 'Aluna', ...perguntasOk];
  aba.getRange(1, 1, 1, headersAba.length).setValues([headersAba]);

  // Popula
  const linhas = respostas.map(r => {
    const linha = [formatarData(r[colData]), r[colNome] || '—'];
    colsOk.forEach(c => linha.push(r[c] ?? ''));
    return linha;
  });

  if (linhas.length > 0) {
    aba.getRange(2, 1, linhas.length, headersAba.length).setValues(linhas);
  }

  // Formatação
  formatarCabecalho(aba, headersAba.length, secao.cor);
  aba.setFrozenRows(1);
  aba.setFrozenColumns(2);
  aba.setTabColor(secao.cor);

  // Largura das colunas
  aba.setColumnWidth(1, 120);  // Data
  aba.setColumnWidth(2, 180);  // Aluna
  for (let i = 3; i <= headersAba.length; i++) {
    aba.setColumnWidth(i, 280); // Perguntas
  }

  // Wrap nas células de resposta longa
  if (linhas.length > 0) {
    aba.getRange(2, 3, linhas.length, headersAba.length - 2)
       .setWrap(true)
       .setVerticalAlignment('top');
  }
}

// ============================================================
// HELPERS
// ============================================================
function findCol(headers, trecho) {
  return headers.findIndex(h => String(h).toLowerCase().includes(trecho.toLowerCase()));
}

function formatarData(valor) {
  if (!valor) return '';
  try {
    return Utilities.formatDate(new Date(valor), Session.getScriptTimeZone(), 'dd/MM/yy HH:mm');
  } catch (e) {
    return String(valor);
  }
}

function formatarCabecalho(aba, numColunas, cor) {
  const range = aba.getRange(1, 1, 1, numColunas);
  range
    .setBackground(cor)
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setFontSize(10)
    .setVerticalAlignment('middle')
    .setHorizontalAlignment('left')
    .setWrap(true);
  aba.setRowHeight(1, 50);
}

// ============================================================
// EXTRA — adiciona menu na planilha pra reorganizar com 1 clique
// (rode UMA vez essa função e o menu fica fixo na planilha)
// ============================================================
function criarMenuAutomatico() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.newTrigger('aoAbrirPlanilha')
    .forSpreadsheet(ss)
    .onOpen()
    .create();
  aoAbrirPlanilha();
  SpreadsheetApp.getUi().alert(
    '✅ Menu criado!\n\n' +
    'Reabra a planilha (F5) — vai aparecer um menu "🔄 Feedback Breno" no topo.\n' +
    'Clica em "Atualizar abas" sempre que chegar nova resposta.'
  );
}

function aoAbrirPlanilha() {
  SpreadsheetApp.getUi()
    .createMenu('🔄 Feedback Breno')
    .addItem('Atualizar abas (Resumo + Seções)', 'organizarRespostas')
    .addToUi();
}
