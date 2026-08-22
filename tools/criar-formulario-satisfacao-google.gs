/**
 * Apps Script — Cria o "Questionário de Alunas (Durante o Acompanhamento)" da
 * consultoria Breno Xavier. Mede SATISFAÇÃO com o programa (não execução do
 * protocolo — pra isso use o `criar-formulario-feedback-google.gs`).
 *
 * Cobre: experiência geral, atendimento via WhatsApp, comercial, conteúdos do
 * Instagram e indicação (NPS).
 *
 * COMO USAR:
 *  1. Acesse https://script.google.com → "Novo projeto"
 *  2. Apague o conteúdo do `Code.gs` e cole TUDO deste arquivo
 *  3. Clique em "Executar" (▶) — autorize com a conta Google do Breno
 *  4. Pegue as URLs do formulário e da planilha de respostas nos logs/alerta
 *  5. Manda o link da aluna no WhatsApp quando quiser colher avaliação
 *
 * RODA UMA ÚNICA VEZ. Depois disso o formulário existe pra sempre no Drive,
 * e todas as respostas caem na mesma planilha.
 */

function criarFormularioSatisfacaoBreno() {
  // ============================================================
  // CONFIGURAÇÃO BÁSICA
  // ============================================================
  const NOME_FORMULARIO = 'Questionário de Alunas (Durante o Acompanhamento) — Breno Xavier';
  const NOME_PLANILHA   = 'Respostas — Questionário de Satisfação Breno';

  const form = FormApp.create(NOME_FORMULARIO);

  form.setTitle(NOME_FORMULARIO);
  form.setDescription(
    'Oi! Esse questionário rápido (uns 5-7 min) me ajuda a entender o que tá ' +
    'funcionando no programa e o que eu posso melhorar pra você — desde o ' +
    'acompanhamento por WhatsApp até os conteúdos que você consome.\n\n' +
    'Responde com sinceridade total. Crítica é o que faz a consultoria crescer ' +
    'e o seu resultado melhorar. Tudo é confidencial. — Breno Xavier'
  );

  form.setCollectEmail(false);
  form.setAllowResponseEdits(true);
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage(
    'Recebido! Obrigado pela sinceridade. Vou ler com calma e usar pra ajustar ' +
    'o que precisar — desde o atendimento até o conteúdo que entrego.'
  );

  // ============================================================
  // IDENTIFICAÇÃO
  // ============================================================
  form.addTextItem()
    .setTitle('Seu nome completo')
    .setRequired(true);

  form.addDateItem()
    .setTitle('Data do preenchimento')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Há quanto tempo você é aluna?')
    .setChoiceValues([
      'Menos de 1 mês',
      '1 a 3 meses',
      '3 a 6 meses',
      '6 a 12 meses',
      'Mais de 1 ano'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Qual plano você contratou?')
    .setChoiceValues([
      'Trimestral (3 meses)',
      'Semestral (6 meses)',
      'Semestral em dobro (6 + 6 grátis)',
      'Anual',
      'Não lembro / Outro'
    ])
    .setRequired(false);

  // ============================================================
  // SEÇÃO 1 — SATISFAÇÃO GERAL COM O PROGRAMA
  // ============================================================
  form.addPageBreakItem()
    .setTitle('1. O programa em geral')
    .setHelpText('Pensa no programa como um todo: dieta + treino + acompanhamento + conteúdo.');

  form.addScaleItem()
    .setTitle('Em uma escala de 0 a 10, quão satisfeita você está com o programa em geral?')
    .setBounds(0, 10)
    .setLabels('Muito insatisfeita', 'Extremamente satisfeita')
    .setRequired(true);

  form.addScaleItem()
    .setTitle('Os resultados estão batendo com o que você esperava quando contratou?')
    .setBounds(0, 10)
    .setLabels('Muito abaixo', 'Acima da expectativa')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('O que mais te SURPREENDEU positivamente desde que entrou no programa?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Algo te DECEPCIONOU ou ficou abaixo do que você esperava?')
    .setHelpText('Pode falar sem medo — é exatamente isso que eu preciso saber pra melhorar.')
    .setRequired(false);

  // ============================================================
  // SEÇÃO 2 — ACOMPANHAMENTO PELO WHATSAPP
  // ============================================================
  form.addPageBreakItem()
    .setTitle('2. Acompanhamento pelo WhatsApp')
    .setHelpText('A forma principal de contato durante o programa.');

  form.addScaleItem()
    .setTitle('Quão satisfeita você está com o acompanhamento pelo WhatsApp?')
    .setBounds(0, 10)
    .setLabels('Muito insatisfeita', 'Extremamente satisfeita')
    .setRequired(true);

  form.addScaleItem()
    .setTitle('Tempo de resposta às suas dúvidas')
    .setBounds(0, 10)
    .setLabels('Muito demorado', 'Muito rápido')
    .setRequired(true);

  form.addScaleItem()
    .setTitle('Clareza nas orientações que você recebe')
    .setBounds(0, 10)
    .setLabels('Confusas', 'Super claras')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Como você avalia a FREQUÊNCIA de contato?')
    .setChoiceValues([
      'Pouca — gostaria de mais contato',
      'Boa — está no ponto certo',
      'Muita — às vezes acho excessiva'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Você sente que é ouvida quando traz um problema ou dúvida?')
    .setChoiceValues([
      'Sempre — me sinto acolhida e levada a sério',
      'Geralmente sim',
      'Às vezes não',
      'Raramente — sinto que minhas dúvidas são respondidas de forma genérica'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('O que você mudaria ou melhoraria no acompanhamento pelo WhatsApp?')
    .setRequired(false);

  // ============================================================
  // SEÇÃO 3 — COMERCIAL (PROCESSO DE COMPRA)
  // ============================================================
  form.addPageBreakItem()
    .setTitle('3. Atendimento Comercial')
    .setHelpText('Como foi quando você ainda não era aluna — do primeiro contato até fechar o plano.');

  form.addScaleItem()
    .setTitle('Como você avalia o atendimento comercial ANTES de contratar?')
    .setBounds(0, 10)
    .setLabels('Péssimo', 'Excelente')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('No processo de compra, você se sentiu...')
    .setChoiceValues([
      'Bem orientada, sem pressão',
      'Bem orientada, mas com alguma pressão pra fechar',
      'Pouco orientada, com pressão pra fechar',
      'Mal orientada / experiência ruim'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('As informações sobre o plano (preço, prazo, o que está incluso) ficaram claras?')
    .setChoiceValues([
      'Sim, tudo claro',
      'Em parte — algumas coisas só entendi depois',
      'Não — me senti confusa em alguns pontos'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('O que poderia melhorar no processo de venda / primeiro contato?')
    .setRequired(false);

  // ============================================================
  // SEÇÃO 4 — CONTEÚDOS DO INSTAGRAM
  // ============================================================
  form.addPageBreakItem()
    .setTitle('4. Conteúdos do Instagram (@brenoxavieer_)');

  form.addMultipleChoiceItem()
    .setTitle('Com que frequência você acompanha o conteúdo do @brenoxavieer_?')
    .setChoiceValues([
      'Todo dia',
      'Algumas vezes na semana',
      'Raramente',
      'Quase nunca',
      'Não sigo / não acompanho'
    ])
    .setRequired(true);

  form.addScaleItem()
    .setTitle('Quão útil é o conteúdo pra você?')
    .setBounds(0, 10)
    .setLabels('Nada útil', 'Extremamente útil')
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('Que tipo de conteúdo mais te ajuda? (pode marcar quantas quiser)')
    .setChoiceValues([
      'Treino (técnica, execução, dicas)',
      'Dieta e nutrição',
      'Antes e depois / transformações de alunas',
      'Mindset / motivação',
      'Stories do dia a dia',
      'Lives',
      'Conteúdo educativo (vídeos longos / carrosséis)',
      'Bastidores e rotina do Breno'
    ])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Que tipo de conteúdo você gostaria de ver MAIS?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Tem algum conteúdo que você acha que o Breno deveria PARAR de fazer ou fazer menos?')
    .setRequired(false);

  // ============================================================
  // SEÇÃO 5 — RECOMENDAÇÃO / NPS
  // ============================================================
  form.addPageBreakItem()
    .setTitle('5. Indicação')
    .setHelpText('A pergunta mais importante. Sua resposta aqui me diz se eu tô entregando o que prometi.');

  form.addScaleItem()
    .setTitle('De 0 a 10, o quanto você indicaria o programa do Breno pra uma amiga ou pessoa próxima?')
    .setBounds(0, 10)
    .setLabels('De jeito nenhum', 'Com certeza indicaria')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Por que essa nota?')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Você já indicou o programa pra alguém?')
    .setChoiceValues([
      'Sim, e a pessoa fechou',
      'Sim, mas a pessoa não fechou',
      'Ainda não, mas pretendo',
      'Não pretendo indicar'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Se você indicou alguém que fechou — quem foi? (pra eu reconhecer e te agradecer)')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Posso usar trechos da sua resposta como DEPOIMENTO em divulgação?')
    .setChoiceValues([
      'Sim, com meu nome e/ou foto',
      'Sim, mas só anônimo (sem nome/foto)',
      'Não, prefiro que fique privado'
    ])
    .setRequired(true);

  // ============================================================
  // SEÇÃO 6 — FEEDBACK ABERTO
  // ============================================================
  form.addPageBreakItem()
    .setTitle('6. Aberto')
    .setHelpText('Espaço livre. O que tiver pra dizer.');

  form.addParagraphTextItem()
    .setTitle('Se você pudesse mudar UMA COISA no programa, qual seria?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Tem algo que está te impedindo de ter resultados ainda melhores?')
    .setHelpText('Pode ser interno (rotina, ansiedade, tempo) ou algo do programa.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Algo mais que você queira me contar?')
    .setRequired(false);

  // ============================================================
  // CRIA PLANILHA DE RESPOSTAS E LINKA
  // ============================================================
  const ss = SpreadsheetApp.create(NOME_PLANILHA);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // ============================================================
  // LOGS COM AS URLS
  // ============================================================
  const linkParaAluna = form.getPublishedUrl();
  const linkParaEditar = form.getEditUrl();
  const linkPlanilha = ss.getUrl();

  Logger.log('========================================');
  Logger.log('QUESTIONÁRIO DE SATISFAÇÃO CRIADO COM SUCESSO!');
  Logger.log('========================================');
  Logger.log('');
  Logger.log('🔗 LINK PRA MANDAR PRA ALUNA:');
  Logger.log(linkParaAluna);
  Logger.log('');
  Logger.log('✏️ LINK PRA EDITAR O FORMULÁRIO:');
  Logger.log(linkParaEditar);
  Logger.log('');
  Logger.log('📊 LINK DA PLANILHA DE RESPOSTAS:');
  Logger.log(linkPlanilha);
  Logger.log('========================================');

  try {
    SpreadsheetApp.getUi().alert(
      '✅ Questionário de Satisfação criado!\n\n' +
      'LINK PRA MANDAR PRA ALUNA:\n' + linkParaAluna + '\n\n' +
      'LINK DA PLANILHA DE RESPOSTAS:\n' + linkPlanilha + '\n\n' +
      'Veja também os logs do script (Ver > Logs).'
    );
  } catch (e) {
    // Sem contexto de UI — ignora
  }

  return {
    linkAluna: linkParaAluna,
    linkEdicao: linkParaEditar,
    linkPlanilha: linkPlanilha
  };
}
