
export function localDemoAnalysis(input, language = "en") {
  const text = (input || "").toLowerCase();
  const risks = [];
  const suggestions = [];
  const saferClauses = [];
  const nextSteps = [];
  const uk = language === "uk";

  const add = (titleEn, explanationEn, sTitleEn, sTextEn, clauseTitleEn, clauseTextEn, stepEn, titleUk, explanationUk, sTitleUk, sTextUk, clauseTitleUk, clauseTextUk, stepUk) => {
    risks.push({ title: uk ? titleUk : titleEn, explanation: uk ? explanationUk : explanationEn });
    suggestions.push({ title: uk ? sTitleUk : sTitleEn, text: uk ? sTextUk : sTextEn });
    saferClauses.push({ title: uk ? clauseTitleUk : clauseTitleEn, text: uk ? clauseTextUk : clauseTextEn });
    nextSteps.push(uk ? stepUk : stepEn);
  };

  if (text.includes("payment") || text.includes("delay") || text.includes("deadline") || text.includes("approval")) {
    add(
      "Payment Risk", "Payment terms may allow the client to delay payment or avoid a clear deadline.",
      "Add payment deadline", "Set a fixed payment deadline, for example payment within 7 days after delivery.",
      "Payment deadline clause", "Payment must be completed within 7 days after delivery or invoice approval.",
      "Ask the client to add a clear payment deadline before signing.",
      "Ризик з оплатою", "Умови можуть дозволити клієнту затягувати оплату або не мати чіткого дедлайну.",
      "Додай дедлайн оплати", "Вкажи чіткий дедлайн, наприклад оплата протягом 7 днів після здачі роботи.",
      "Пункт про дедлайн оплати", "Оплата має бути здійснена протягом 7 днів після здачі роботи або підтвердження інвойсу.",
      "Попроси клієнта додати чіткий дедлайн оплати перед підписанням."
    );
  }

  if (text.includes("ownership") || text.includes("intellectual property") || text.includes("rights")) {
    add(
      "Ownership Transfer Risk", "The client may receive full rights before you receive final payment.",
      "Transfer rights after payment", "Ownership should transfer only after full payment is received.",
      "IP transfer clause", "All intellectual property rights transfer only after full payment has been received.",
      "Ask to transfer IP rights only after full payment.",
      "Ризик передачі прав", "Клієнт може отримати всі права до того, як ти отримаєш повну оплату.",
      "Передача прав після оплати", "Права мають передаватися тільки після повної оплати.",
      "Пункт про передачу прав", "Усі права інтелектуальної власності передаються тільки після отримання повної оплати.",
      "Попроси, щоб права передавались тільки після повної оплати."
    );
  }

  if (text.includes("liability") || text.includes("damages")) {
    add(
      "Unlimited Liability", "You may be responsible for unlimited damages, which is dangerous for freelancers.",
      "Limit liability", "Limit liability to the total project value or paid amount.",
      "Liability limit clause", "The freelancer’s liability is limited to the total amount paid under this agreement.",
      "Ask to limit liability to the project value.",
      "Необмежена відповідальність", "Ти можеш відповідати за необмежені збитки, що небезпечно для фрілансера.",
      "Обмеж відповідальність", "Обмеж відповідальність сумою проєкту або вже оплаченою сумою.",
      "Пункт про обмеження відповідальності", "Відповідальність фрілансера обмежується сумою, фактично оплаченою за цим договором.",
      "Попроси обмежити відповідальність сумою проєкту."
    );
  }

  if (text.includes("revision")) {
    add(
      "Unlimited Revisions", "The client may request too many changes without paying extra.",
      "Limit revisions", "Include 2-3 revision rounds, then charge extra.",
      "Revision limit clause", "The project includes up to 2 revision rounds. Additional revisions are billed separately.",
      "Add a revision limit before starting work.",
      "Безлімітні правки", "Клієнт може просити нескінченні правки без додаткової оплати.",
      "Обмеж кількість правок", "Вкажи 2–3 раунди правок, далі — доплата.",
      "Пункт про правки", "Проєкт включає до 2 раундів правок. Додаткові правки оплачуються окремо.",
      "Додай ліміт правок перед початком роботи."
    );
  }

  if (!risks.length) {
    risks.push({
      title: uk ? "Очевидних demo-ризиків не знайдено" : "No obvious demo risks found",
      explanation: uk ? "Локальний demo-аналіз не знайшов типових ризикових фраз. Повний AI-аналіз все одно рекомендований." : "The local demo did not detect common risky phrases. Full AI review is still recommended."
    });
    suggestions.push({
      title: uk ? "Використай повний AI-аналіз" : "Use full AI analysis",
      text: uk ? "Підключи OpenAI API, щоб аналіз був глибшим." : "Connect OpenAI API to analyze the document deeper."
    });
    nextSteps.push(uk ? "Перевір контракт повним AI-аналізом або з юристом, якщо сума велика." : "Use full AI review or consult a lawyer if the project value is high.");
  }

  const score = Math.max(30, 100 - risks.length * 11);
  const level = score >= 80 ? (uk ? "Низький ризик" : "Low Risk") : score >= 60 ? (uk ? "Середній ризик" : "Medium Risk") : (uk ? "Високий ризик" : "High Risk");
  const summary = risks.length > 1
    ? (uk ? "У контракті є кілька типових ризиків для фрілансера. Перед підписанням перевір оплату, передачу прав і відповідальність." : "This contract contains several common freelancer risks. Review payment, rights transfer and liability before signing.")
    : (uk ? "У локальному demo-режимі знайдено мало очевидних ризиків, але повний AI-аналіз все одно рекомендований." : "This contract has limited obvious risks in local demo mode, but full AI review is recommended.");

  return { score, level, summary, risks, suggestions, saferClauses, nextSteps };
}

export function localFollowUp(question, language = "en") {
  const uk = language === "uk";
  if (uk) {
    return "Я б порадив відповісти клієнту спокійно: пояснити, що ти готовий працювати, але хочеш додати чітку оплату, ліміт правок і передачу прав тільки після повної оплати.";
  }
  return "A good reply would be polite but firm: say you are ready to work, but want to add clear payment terms, a revision limit, and IP transfer only after full payment.";
}
