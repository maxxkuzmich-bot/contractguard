const RULES = [
  {
    id: "payment",
    weight: 22,
    severity: "high",
    patterns: [
      /payment\s+after\s+(final\s+)?acceptance/i,
      /payment\s+.*approval/i,
      /delay\s+payment/i,
      /paid\s+only\s+after/i,
      /subject\s+to\s+client\s+approval/i,
      /upon\s+client\s+satisfaction/i,
      /payment\s+only\s+after\s+satisfaction/i,

      /оплата\s+після\s+прийняття/i,
      /оплата\s+після\s+схвалення/i,
      /оплата\s+лише\s+після/i,
      /оплата\s+тільки\s+після/i,
      /затримати\s+оплату/i,
      /має\s+право\s+затримати\s+оплату/i,
      /до\s+моменту\s+повного\s+задоволення/i,
      /після\s+повного\s+задоволення/i
    ],
    en: {
      title: "Payment Risk",
      explanation: "Payment depends on approval, acceptance, satisfaction, or unclear conditions. This can let the client delay or avoid payment.",
      suggestion: "Add a clear payment deadline, for example payment within 7 days after delivery or invoice.",
      clause: "Payment must be made within 7 days after delivery or invoice. IP rights transfer only after full payment.",
      step: "Ask the client to add a clear payment deadline before signing."
    },
    uk: {
      title: "Ризик з оплатою",
      explanation: "Оплата залежить від схвалення, прийняття, задоволення клієнта або нечітких умов. Це може дозволити замовнику затягувати оплату або уникати її.",
      suggestion: "Додай чіткий строк оплати, наприклад оплату протягом 7 днів після здачі роботи або інвойсу.",
      clause: "Оплата має бути здійснена протягом 7 днів після здачі роботи або інвойсу. Права передаються тільки після повної оплати.",
      step: "Попроси клієнта додати чіткий строк оплати перед підписанням."
    }
  },
  {
    id: "ip_transfer",
    weight: 22,
    severity: "high",
    patterns: [
      /all\s+(intellectual\s+property\s+)?rights\s+transfer/i,
      /ownership\s+.*transfer/i,
      /assigns?\s+all\s+rights/i,
      /perpetual\s+.*license/i,
      /irrevocable\s+.*license/i,
      /exclusive\s+.*license/i,
      /rights\s+.*immediately\s+after\s+delivery/i,
      /transfer\s+before\s+payment/i,

      /усі\s+права\s+інтелектуальної\s+власності\s+переходять/i,
      /всі\s+права\s+інтелектуальної\s+власності\s+переходять/i,
      /права\s+інтелектуальної\s+власності\s+переходять/i,
      /права\s+переходять\s+до\s+замовника/i,
      /передає\s+всі\s+права/i,
      /передає\s+усі\s+права/i,
      /з\s+моменту\s+створення/i
    ],
    en: {
      title: "Ownership / IP Transfer Risk",
      explanation: "The client may receive broad or permanent rights, possibly before you receive payment.",
      suggestion: "Transfer ownership only after full payment and limit the license scope.",
      clause: "All intellectual property rights transfer only after full payment has been received.",
      step: "Ask to transfer IP rights only after full payment."
    },
    uk: {
      title: "Ризик передачі прав",
      explanation: "Клієнт може отримати широкі або безстрокові права, можливо ще до повної оплати.",
      suggestion: "Передавай права тільки після повної оплати та обмежуй обсяг ліцензії.",
      clause: "Усі права інтелектуальної власності передаються тільки після отримання повної оплати.",
      step: "Попроси, щоб права передавались тільки після повної оплати."
    }
  },
  {
    id: "liability",
    weight: 24,
    severity: "high",
    patterns: [
      /unlimited\s+liability/i,
      /liable\s+for\s+any\s+damages/i,
      /all\s+damages/i,
      /indemnify/i,
      /hold\s+harmless/i,
      /responsible\s+for\s+any\s+loss/i,

      /необмежен(а|у)\s+відповідальн/i,
      /відповідає\s+за\s+будь-які\s+збитки/i,
      /відшкодовує\s+будь-які\s+збитки/i,
      /усі\s+збитки/i,
      /всі\s+збитки/i
    ],
    en: {
      title: "Unlimited Liability",
      explanation: "You may be responsible for unlimited damages or losses. This is a serious freelancer risk.",
      suggestion: "Limit liability to the project value or amount paid.",
      clause: "The freelancer’s liability is limited to the total amount paid under this agreement.",
      step: "Ask to limit liability to the project value."
    },
    uk: {
      title: "Необмежена відповідальність",
      explanation: "Ти можеш відповідати за необмежені збитки. Це серйозний ризик для фрілансера.",
      suggestion: "Обмеж відповідальність сумою проєкту або вже оплаченою сумою.",
      clause: "Відповідальність виконавця обмежується сумою, фактично оплаченою за цим договором.",
      step: "Попроси обмежити відповідальність сумою проєкту."
    }
  },
  {
    id: "revisions",
    weight: 18,
    severity: "medium",
    patterns: [
      /unlimited\s+revisions/i,
      /unlimited\s+changes/i,
      /revisions\s+until\s+satisfied/i,
      /changes\s+until\s+client\s+approval/i,
      /without\s+extra\s+payment.*revision/i,
      /any\s+changes\s+without\s+extra\s+payment/i,

      /будь-яких\s+змін/i,
      /будь-які\s+зміни/i,
      /без\s+додаткової\s+оплати/i,
      /вимагати\s+внесення\s+будь-яких\s+змін/i,
      /необмежен(і|у)\s+правк/i,
      /безлімітн(і|у)\s+правк/i
    ],
    en: {
      title: "Unlimited Revisions",
      explanation: "The client may request endless changes without paying extra.",
      suggestion: "Limit revisions to 2–3 rounds, then charge extra.",
      clause: "The project includes up to 2 revision rounds. Additional revisions are billed separately.",
      step: "Add a revision limit before starting work."
    },
    uk: {
      title: "Безлімітні правки",
      explanation: "Клієнт може просити нескінченні правки або будь-які зміни без додаткової оплати.",
      suggestion: "Обмеж кількість правок до 2–3 раундів, далі — доплата.",
      clause: "Проєкт включає до 2 раундів правок. Додаткові правки оплачуються окремо.",
      step: "Додай ліміт правок перед початком роботи."
    }
  },
  {
    id: "non_compete",
    weight: 25,
    severity: "high",
    patterns: [
      /non[-\s]?compete/i,
      /shall\s+not\s+provide\s+services\s+to\s+competitors/i,
      /competitors?\s+for\s+\d+\s+(months|years)/i,
      /competing\s+business/i,
      /exclusivity/i,
      /exclusive\s+relationship/i,

      /не\s+має\s+права\s+працювати\s+з\s+конкурентами/i,
      /конкурентами\s+замовника/i,
      /конкурентів\s+замовника/i,
      /працювати\s+з\s+конкурентами/i,
      /протягом\s+\d+\s+рок(ів|и|у)?/i,
      /ексклюзивн/i
    ],
    en: {
      title: "Non-Compete / Exclusivity Risk",
      explanation: "The contract may restrict your ability to work with other clients or competitors. Long non-compete clauses can seriously limit your income.",
      suggestion: "Remove the non-compete or limit it by time, geography, and specific clients.",
      clause: "The freelancer may provide services to other clients unless there is a direct conflict with confidential information from this project.",
      step: "Ask to remove or strongly limit the non-compete clause."
    },
    uk: {
      title: "Ризик non-compete / ексклюзивності",
      explanation: "Контракт обмежує можливість працювати з конкурентами або іншими клієнтами. Умова на 5 років може сильно обмежити твій дохід.",
      suggestion: "Прибери non-compete або обмеж його за часом, територією та конкретними клієнтами.",
      clause: "Виконавець може надавати послуги іншим клієнтам, якщо це не створює прямий конфлікт із конфіденційною інформацією цього проєкту.",
      step: "Попроси прибрати або сильно обмежити non-compete пункт."
    }
  },
  {
    id: "termination",
    weight: 20,
    severity: "high",
    patterns: [
      /terminate\s+.*at\s+any\s+time/i,
      /termination\s+.*without\s+compensation/i,
      /client\s+may\s+terminate/i,
      /terminate\s+.*without\s+cause/i,
      /compensation\s+only\s+for\s+accepted\s+work/i,
      /no\s+payment\s+.*terminated/i,

      /розірвати\s+договір/i,
      /розірвання\s+договору/i,
      /в\s+односторонньому\s+порядку/i,
      /без\s+компенсації/i,
      /без\s+оплати\s+виконаних\s+робіт/i,
      /без\s+оплати\s+вже\s+виконан/i
    ],
    en: {
      title: "Unfair Termination Risk",
      explanation: "The client may be able to cancel the contract without fairly paying for work already completed.",
      suggestion: "Require payment for completed work and reasonable notice.",
      clause: "If the client terminates the agreement, the freelancer must be paid for all completed work and approved milestones.",
      step: "Ask to add payment for completed work if the client cancels."
    },
    uk: {
      title: "Ризик несправедливого розірвання",
      explanation: "Клієнт може розірвати договір без справедливої оплати вже виконаної роботи.",
      suggestion: "Додай оплату за виконану роботу та розумний строк попередження.",
      clause: "Якщо клієнт розриває договір, виконавець має отримати оплату за всю виконану роботу та завершені етапи.",
      step: "Попроси додати оплату за виконану роботу у випадку розірвання."
    }
  },
  {
    id: "acceptance",
    weight: 20,
    severity: "high",
    patterns: [
      /final\s+acceptance/i,
      /client\s+acceptance/i,
      /accepted\s+by\s+client/i,
      /satisfaction\s+of\s+client/i,
      /client\s+satisfaction/i,
      /meet\s+client'?s?\s+expectations/i,

      /повного\s+задоволення/i,
      /задоволення\s+результатом/i,
      /момент\s+завершення\s+робіт/i,
      /замовник\s+самостійно\s+визначає\s+момент\s+завершення/i,
      /прийняття\s+робіт\s+замовником/i
    ],
    en: {
      title: "Subjective Acceptance Risk",
      explanation: "Payment or completion may depend on subjective client satisfaction instead of objective criteria.",
      suggestion: "Define objective acceptance criteria and automatic approval after a review period.",
      clause: "Deliverables are considered accepted unless the client provides specific written objections within 5 business days.",
      step: "Ask to define objective acceptance criteria."
    },
    uk: {
      title: "Ризик суб'єктивного прийняття",
      explanation: "Оплата або завершення можуть залежати від суб'єктивного задоволення клієнта, а не від чітких критеріїв.",
      suggestion: "Визнач об'єктивні критерії прийняття та автоматичне схвалення після періоду перевірки.",
      clause: "Результат вважається прийнятим, якщо клієнт не надасть конкретні письмові зауваження протягом 5 робочих днів.",
      step: "Попроси прописати об'єктивні критерії прийняття роботи."
    }
  },
  {
    id: "client_discretion",
    weight: 18,
    severity: "medium",
    patterns: [
      /sole\s+discretion/i,
      /client'?s?\s+discretion/i,
      /client\s+determines/i,
      /client\s+decides/i,
      /reasonably\s+determined\s+by\s+client/i,
      /as\s+determined\s+by\s+client/i,

      /замовник\s+самостійно\s+визначає/i,
      /на\s+розсуд\s+замовника/i,
      /замовник\s+вирішує/i,
      /замовник\s+має\s+право\s+самостійно/i,
      /самостійно\s+визначає\s+момент/i
    ],
    en: {
      title: "Client Discretion Risk",
      explanation: "The client may have too much unilateral power to decide whether your work is acceptable or payable.",
      suggestion: "Replace client discretion with clear measurable criteria.",
      clause: "Acceptance must be based on the agreed project scope and written requirements, not unilateral discretion.",
      step: "Ask to remove vague client-discretion wording."
    },
    uk: {
      title: "Ризик рішення на розсуд клієнта",
      explanation: "Замовник має занадто багато односторонньої влади вирішувати, коли робота завершена або чи вона прийнята.",
      suggestion: "Заміни розсуд клієнта на чіткі вимірювані критерії.",
      clause: "Прийняття роботи має базуватися на погодженому обсязі робіт і письмових вимогах, а не на односторонньому розсуді.",
      step: "Попроси прибрати нечіткі формулювання про рішення на розсуд клієнта."
    }
  },
  {
    id: "penalties",
    weight: 24,
    severity: "high",
    patterns: [
      /penalty/i,
      /fine/i,
      /liquidated\s+damages/i,
      /forfeiture/i,
      /\$?\d{3,}[\d,\s]*\s*(penalty|fine|damages)/i,
      /(penalty|fine|damages)\s+of\s+\$?\d+/i,

      /штраф/i,
      /сплачує\s+штраф/i,
      /штраф\s+у\s+розмірі/i,
      /200\s*000\s*грн/i,
      /200000\s*грн/i,
      /неустойк/i,
      /пен[яі]/i
    ],
    en: {
      title: "Excessive Penalty Risk",
      explanation: "The contract may include large penalties or damages that are disproportionate to the project value.",
      suggestion: "Limit penalties and make them proportional to direct proven losses.",
      clause: "Any penalties must be reasonable, clearly defined, and limited to direct proven losses.",
      step: "Ask to remove excessive penalties or cap them."
    },
    uk: {
      title: "Ризик надмірних штрафів",
      explanation: "Контракт містить великий штраф, який може бути непропорційним вартості проєкту.",
      suggestion: "Обмеж штрафи та прив’яжи їх до реальних доведених збитків.",
      clause: "Будь-які штрафи мають бути розумними, чітко визначеними та обмеженими прямими доведеними збитками.",
      step: "Попроси прибрати надмірні штрафи або встановити ліміт."
    }
  }
];

function hasPattern(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function pushUnique(array, value) {
  if (!array.includes(value)) array.push(value);
}

export function localDemoAnalysis(input, language = "en") {
  const text = (input || "").toLowerCase();
  const uk = language === "uk";

  const risks = [];
  const suggestions = [];
  const saferClauses = [];
  const nextSteps = [];

  let totalPenalty = 0;
  const foundIds = new Set();

  for (const rule of RULES) {
    if (hasPattern(text, rule.patterns)) {
      const copy = uk ? rule.uk : rule.en;

      risks.push({
        id: rule.id,
        severity: rule.severity,
        title: copy.title,
        explanation: copy.explanation
      });

      suggestions.push({
        title: copy.title,
        text: copy.suggestion
      });

      saferClauses.push({
        title: copy.title,
        text: copy.clause
      });

      pushUnique(nextSteps, copy.step);
      totalPenalty += rule.weight;
      foundIds.add(rule.id);
    }
  }

  const toxicCombos = [
    ["payment", "acceptance"],
    ["payment", "ip_transfer"],
    ["payment", "client_discretion"],
    ["ip_transfer", "acceptance"],
    ["client_discretion", "acceptance"],
    ["non_compete", "penalties"],
    ["termination", "payment"]
  ];

  for (const combo of toxicCombos) {
    if (combo.every((id) => foundIds.has(id))) totalPenalty += 18;
  }

  let score = Math.max(15, 100 - totalPenalty);

  if (foundIds.has("non_compete")) score = Math.min(score, 55);
  if (foundIds.has("penalties")) score = Math.min(score, 55);
  if (foundIds.has("termination")) score = Math.min(score, 60);
  if (foundIds.has("acceptance")) score = Math.min(score, 70);
  if (foundIds.has("client_discretion")) score = Math.min(score, 65);
  if (foundIds.has("client_discretion") && foundIds.has("acceptance")) score = Math.min(score, 45);
  if (foundIds.has("payment") && foundIds.has("ip_transfer")) score = Math.min(score, 45);
  if (foundIds.has("payment") && foundIds.has("acceptance")) score = Math.min(score, 50);
  if (foundIds.has("non_compete") && foundIds.has("penalties")) score = Math.min(score, 40);

  if (foundIds.size >= 4) score = Math.min(score, 45);
  if (foundIds.size >= 5) score = Math.min(score, 35);
  if (foundIds.size >= 6) score = Math.min(score, 25);
  if (foundIds.size >= 7) score = Math.min(score, 20);

  if (!risks.length) {
    score = 89;

    risks.push({
      id: "no_obvious_risks",
      severity: "low",
      title: uk ? "Очевидних demo-ризиків не знайдено" : "No obvious demo risks found",
      explanation: uk
        ? "Локальний аналіз не знайшов типових ризикових умов. Але це не гарантія юридичної безпеки."
        : "The local analysis did not detect common risky clauses. This does not guarantee legal safety."
    });

    suggestions.push({
      title: uk ? "Все одно перечитай ключові умови" : "Still review key terms",
      text: uk
        ? "Перевір оплату, права, відповідальність, розірвання договору та правки."
        : "Check payment, rights, liability, termination, and revisions."
    });

    nextSteps.push(
      uk
        ? "Якщо сума велика — покажи контракт юристу."
        : "If the project value is high, consider asking a lawyer to review it."
    );
  }

  const level =
    score >= 80
      ? uk ? "Низький ризик" : "Low Risk"
      : score >= 60
      ? uk ? "Середній ризик" : "Medium Risk"
      : uk ? "Високий ризик" : "High Risk";

  const summary =
    score >= 80
      ? uk
        ? "Контракт виглядає відносно безпечним, але ключові умови все одно варто перевірити."
        : "The contract looks relatively safe, but key terms should still be reviewed."
      : score >= 60
      ? uk
        ? "Контракт містить помітні ризики. Його краще підписувати тільки після уточнень."
        : "The contract contains noticeable risks. It is better to sign only after clarifications."
      : uk
      ? "Контракт містить серйозні ризики. Не рекомендується підписувати без змін або консультації."
      : "The contract contains serious risks. Do not sign without changes or review.";

  const categoryScores = {
    payment: foundIds.has("payment") ? "🔴" : "🟢",
    ownership: foundIds.has("ip_transfer") ? "🔴" : "🟢",
    revisions: foundIds.has("revisions") ? "🔴" : "🟢",
    liability: foundIds.has("liability") || foundIds.has("penalties") ? "🔴" : "🟢",
    termination: foundIds.has("termination") ? "🔴" : "🟢",
    acceptance: foundIds.has("acceptance") || foundIds.has("client_discretion") ? "🔴" : "🟢",
    nonCompete: foundIds.has("non_compete") ? "🔴" : "🟢"
  };

  const signRecommendation =
    score >= 85
      ? uk
        ? "✅ Можна підписувати, але перечитай ключові умови."
        : "✅ Safe to sign, but still review key terms."
      : score >= 60
      ? uk
        ? "🟡 Підписувати краще тільки після уточнень і змін."
        : "🟡 Sign only after changes and clarifications."
      : uk
      ? "🔴 Високий ризик. Не підписуй без змін або консультації."
      : "🔴 High caution advised. Do not sign without changes or review.";

  return {
    score,
    level,
    summary,
    risks,
    suggestions,
    saferClauses,
    nextSteps,
    categoryScores,
    signRecommendation
  };
}

export function localFollowUp(question, language = "en") {
  const uk = language === "uk";

  if (uk) {
    return "Я б відповів клієнту спокійно, але твердо: поясни, що готовий працювати, але перед підписанням потрібно уточнити оплату, передачу прав, кількість правок, відповідальність і умови розірвання.";
  }

  return "A good reply would be polite but firm: say you are ready to work, but before signing you need to clarify payment, IP transfer, revisions, liability, and termination terms.";
}
