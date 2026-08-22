/**
 * Apps Script — Cria o Formulário de Feedback Mensal da consultoria Breno Xavier.
 *
 * COMO USAR (instruções completas em docs/COMO-CRIAR-FORMULARIO-GOOGLE.md):
 *  1. Acesse https://script.google.com → "Novo projeto"
 *  2. Apague o conteúdo do arquivo `Code.gs` e cole TUDO deste arquivo
 *  3. Clique no botão "Executar" (▶) — vai pedir autorização (autorize com sua conta Google)
 *  4. Volte na aba "Execuções" — copie a URL do formulário e a URL da planilha de respostas
 *  5. Use a URL do formulário em TODA reavaliação (cole no WhatsApp da aluna)
 *
 * VOCÊ RODA ESTE SCRIPT UMA ÚNICA VEZ. Depois disso o formulário existe pra sempre
 * no seu Google Drive, e todas as respostas caem na mesma planilha de respostas.
 */

function criarFormularioFeedbackBreno() {
  // ============================================================
  // CONFIGURAÇÃO BÁSICA
  // ============================================================
  const NOME_FORMULARIO = 'Feedback Mensal — Breno Xavier';
  const NOME_PLANILHA   = 'Respostas — Feedback Mensal Breno';

  const form = FormApp.create(NOME_FORMULARIO);

  form.setTitle(NOME_FORMULARIO);
  form.setDescription(
    'Oi! Esse formulário rápido (uns 8-10 min) me ajuda a refinar sua dieta e ' +
    'seu treino pro próximo ciclo. Responde com calma e sem se preocupar em ' +
    '"parecer certinha" — quanto mais sincero o feedback, melhor o resultado.\n\n' +
    'Tudo que você escrever aqui é confidencial e só serve pra eu ajustar o ' +
    'protocolo. — Breno Xavier'
  );

  form.setCollectEmail(false);
  form.setAllowResponseEdits(true);
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage(
    'Recebido! Obrigado pelo feedback. Vou usar essas respostas pra montar seu ' +
    'próximo ciclo. Em breve te mando a dieta atualizada e o treino ajustado.'
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

  form.addTextItem()
    .setTitle('Data da última reavaliação postural (se lembrar — opcional)')
    .setRequired(false);

  // ============================================================
  // SEÇÃO 1 — ADESÃO GERAL
  // ============================================================
  form.addPageBreakItem()
    .setTitle('1. Adesão Geral')
    .setHelpText('Pensa no último mês — uma média realista.');

  form.addScaleItem()
    .setTitle('Sua adesão à DIETA no último mês')
    .setBounds(0, 10)
    .setLabels('Não consegui nada', 'Segui 100%')
    .setRequired(true);

  form.addScaleItem()
    .setTitle('Sua adesão ao TREINO DE FORÇA no último mês')
    .setBounds(0, 10)
    .setLabels('Quase nada', 'Tudo certinho')
    .setRequired(true);

  form.addScaleItem()
    .setTitle('Sua adesão ao CARDIO no último mês')
    .setBounds(0, 10)
    .setLabels('Quase nada', 'Tudo certinho')
    .setRequired(true);

  // ============================================================
  // SEÇÃO 2 — DIETA
  // ============================================================
  form.addPageBreakItem()
    .setTitle('2. Dieta — o que tá pegando?')
    .setHelpText('Aqui não tem julgamento. Se algo tá te castigando, eu mudo. Pode falar.');

  form.addParagraphTextItem()
    .setTitle('Quais refeições estão MAIS FÁCEIS de seguir?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Quais refeições estão CHATAS / DIFÍCEIS de seguir?')
    .setHelpText('Pode reclamar à vontade — eu ajusto.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Tem algum ALIMENTO da dieta que você não gosta ou não está conseguindo encaixar?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Como tá a FOME ao longo do dia? Tem algum horário específico que fica difícil?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Tem algum momento da semana que você "SAI DA LINHA"? Quando e por quê?')
    .setHelpText('Final de semana, jantar fora, ansiedade à noite, TPM... é normal, só preciso saber.')
    .setRequired(false);

  // ============================================================
  // SEÇÃO 3 — TREINO DE FORÇA
  // ============================================================
  form.addPageBreakItem()
    .setTitle('3. Treino de Força');

  form.addTextItem()
    .setTitle('Quantas SESSÕES DE FORÇA na semana você conseguiu fazer (média)?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Sente DOR ou DESCONFORTO em algum exercício específico?')
    .setHelpText('Se sim, qual exercício e qual região do corpo.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Algum exercício você NÃO ESTÁ CONSEGUINDO executar bem?')
    .setHelpText('Dúvida de técnica, instabilidade, falta de força — pode falar.')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Sente que está PROGREDINDO (subindo carga, mais repetições, mais firmeza)?')
    .setChoiceValues([
      'Sim, claramente — to evoluindo',
      'Mais ou menos — em alguns exercícios sim, outros não',
      'Não muito — sinto que estagnei',
      'Não sei avaliar'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Algo no treino de força que você gostaria de mudar?')
    .setRequired(false);

  // ============================================================
  // SEÇÃO 4 — CARDIO
  // ============================================================
  form.addPageBreakItem()
    .setTitle('4. Cardio');

  form.addTextItem()
    .setTitle('Quantas SESSÕES DE CARDIO na semana você fez (média)?')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Que MODALIDADE tem feito? (esteira, bike, escada, caminhada, etc.)')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Tem conseguido respeitar a INTENSIDADE orientada?')
    .setChoiceValues([
      'Sim, sempre respeito',
      'Geralmente sim, mas às vezes passo do ponto',
      'Não — costumo treinar mais intenso que o orientado',
      'Não — costumo treinar mais leve que o orientado',
      'Não sei qual é a intensidade certa'
    ])
    .setRequired(true);

  // ============================================================
  // SEÇÃO 5 — SENSAÇÃO CORPORAL
  // ============================================================
  form.addPageBreakItem()
    .setTitle('5. Como você está se sentindo');

  form.addParagraphTextItem()
    .setTitle('Como você se sente em relação ao seu CORPO hoje?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Notou alguma MUDANÇA VISÍVEL? (em roupas, espelho, foto)')
    .setRequired(false);

  form.addScaleItem()
    .setTitle('Sua ENERGIA no dia a dia')
    .setBounds(0, 10)
    .setLabels('Exausta', 'Cheia de energia')
    .setRequired(true);

  form.addScaleItem()
    .setTitle('Qualidade do seu SONO')
    .setBounds(0, 10)
    .setLabels('Péssimo', 'Excelente')
    .setRequired(true);

  form.addScaleItem()
    .setTitle('Seu HUMOR em geral')
    .setBounds(0, 10)
    .setLabels('Muito ruim', 'Muito bem')
    .setRequired(true);

  // ============================================================
  // SEÇÃO 6 — CICLO MENSTRUAL
  // ============================================================
  form.addPageBreakItem()
    .setTitle('6. Ciclo Menstrual');

  form.addMultipleChoiceItem()
    .setTitle('Como está o CICLO?')
    .setChoiceValues([
      'Regular, sem grandes alterações',
      'Atrasado',
      'Cólica forte / TPM intensa',
      'Sangramento alterado (muito ou pouco)',
      'Não menstruo (uso contínuo, gravidez, menopausa, etc.)',
      'Outro'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Sente diferença de FOME ou ENERGIA em alguma fase do ciclo?')
    .setHelpText('TPM, ovulação, durante a menstruação...')
    .setRequired(false);

  // ============================================================
  // SEÇÃO 7 — FEEDBACK ABERTO
  // ============================================================
  form.addPageBreakItem()
    .setTitle('7. Ajustes e Feedback Aberto')
    .setHelpText('O mais importante. Quanto mais detalhe, melhor.');

  form.addParagraphTextItem()
    .setTitle('Tem algum INCÔMODO FÍSICO novo? (dor, desconforto, lesão)')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('O que está funcionando MUITO BEM pra você? (o que você quer MANTER)')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('O que você gostaria que MUDASSE no protocolo? (dieta, treino, frequência, qualquer coisa)')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Algo MAIS que você queira me contar?')
    .setRequired(false);

  // ============================================================
  // CRIA PLANILHA DE RESPOSTAS E LINKA
  // ============================================================
  const ss = SpreadsheetApp.create(NOME_PLANILHA);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // ============================================================
  // LOGS COM AS URLS — pega aqui depois de rodar
  // ============================================================
  const linkParaAluna = form.getPublishedUrl();
  const linkParaEditar = form.getEditUrl();
  const linkPlanilha = ss.getUrl();

  Logger.log('========================================');
  Logger.log('FORMULÁRIO CRIADO COM SUCESSO!');
  Logger.log('========================================');
  Logger.log('');
  Logger.log('🔗 LINK PRA MANDAR PRA ALUNA (cole no WhatsApp):');
  Logger.log(linkParaAluna);
  Logger.log('');
  Logger.log('✏️ LINK PRA EDITAR O FORMULÁRIO (use se quiser mudar perguntas):');
  Logger.log(linkParaEditar);
  Logger.log('');
  Logger.log('📊 LINK DA PLANILHA DE RESPOSTAS (todas as alunas caem aqui):');
  Logger.log(linkPlanilha);
  Logger.log('========================================');

  // Mostra também numa caixa de diálogo (se rodar pela interface)
  try {
    SpreadsheetApp.getUi().alert(
      '✅ Formulário criado!\n\n' +
      'LINK PRA MANDAR PRA ALUNA:\n' + linkParaAluna + '\n\n' +
      'LINK DA PLANILHA DE RESPOSTAS:\n' + linkPlanilha + '\n\n' +
      'Veja também os logs do script (Ver > Logs).'
    );
  } catch (e) {
    // Se não estiver em contexto de UI, ignora
  }

  return {
    linkAluna: linkParaAluna,
    linkEdicao: linkParaEditar,
    linkPlanilha: linkPlanilha
  };
}
