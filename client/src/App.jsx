
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Shield, Upload, AlertTriangle, CheckCircle, FileText, Copy, Download,
  Sparkles, Lock, Zap, Users, HelpCircle, Eye, Trash2, Globe, Send, Mail, Star,
  RefreshCw, MessageSquare
} from "lucide-react";
import "./style.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://contractguard-backend-be4p.onrender.com";

function App() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [saved, setSaved] = useState(false);
  const [feedbackSaved, setFeedbackSaved] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [followUp, setFollowUp] = useState("");
  const [followUpAnswer, setFollowUpAnswer] = useState("");
  const [followUpLoading, setFollowUpLoading] = useState(false);

  const sample = `Freelance Design Agreement

The client may delay payment until final approval.
All ownership and intellectual property rights transfer to the client immediately after delivery.
The freelancer accepts unlimited liability for any damages.
There is no specific payment deadline.
The client can request unlimited revisions without extra payment.
If the freelancer misses any deadline, the client may apply a penalty.`;

  async function analyze() {
    if (!privacyAccepted) {
      alert("Підтверди, що розумієш: це AI-аналіз, не юридична консультація.");
      return;
    }

    if (!text.trim() && !file) {
      alert("Встав текст контракту або вибери файл.");
      return;
    }

    setLoading(true);
    setReport(null);
    setFollowUpAnswer("");

    const form = new FormData();
    form.append("text", text);
    form.append("language", language);
    if (file) form.append("file", file);

    const res = await fetch(`${API_URL}/api/analyze`, { method: "POST", body: form });
    const data = await res.json();

    if (data.error) alert(data.error);
    else setReport(data);

    setLoading(false);
  }

  async function askFollowUp() {
    if (!followUp.trim()) {
      alert("Напиши питання.");
      return;
    }

    setFollowUpLoading(true);

    const res = await fetch(`${API_URL}/api/follow-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: followUp, report, language })
    });

    const data = await res.json();
    setFollowUpAnswer(data.answer || "No answer.");
    setFollowUpLoading(false);
  }

  async function joinWaitlist() {
    if (!email.includes("@")) {
      alert("Введи email.");
      return;
    }

    await fetch(`${API_URL}/api/waitlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, profession })
    });

    setSaved(true);
  }

  async function sendFeedback() {
    if (!feedback.trim() && !rating) {
      alert("Постав rating або напиши короткий feedback.");
      return;
    }

    await fetch(`${API_URL}/api/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback, rating, reportScore: report?.score || null })
    });

    setFeedbackSaved(true);
  }

  async function sendEarlyAccessRequest() {
    if (!email.includes("@")) {
      alert("Спочатку введи email в early access.");
      return;
    }

    await joinWaitlist();
    alert("Early access request saved.");
  }

  function clearAll() {
    setText("");
    setFile(null);
    setReport(null);
    setFeedback("");
    setFeedbackSaved(false);
    setRating(0);
    setFollowUp("");
    setFollowUpAnswer("");
  }

  function reportText() {
    if (!report) return "";
    return `ContractGuard Report

Score: ${report.score}/100
Level: ${report.level}

Summary:
${report.summary || "Contract risk analysis for freelancers."}

Risks:
${report.risks.map(r => `- ${r.title}: ${r.explanation}`).join("\n")}

Suggestions:
${report.suggestions.map(s => `- ${s.title}: ${s.text}`).join("\n")}

Safer Clauses:
${(report.saferClauses || []).map(c => `- ${c.title}: ${c.text}`).join("\n")}

Next Steps:
${(report.nextSteps || []).map(s => `- ${s}`).join("\n")}

Disclaimer:
This is AI-generated information, not legal advice. For serious issues, consult a qualified lawyer.
`;
  }

  function copyReport() {
    navigator.clipboard.writeText(reportText());
    alert("Report copied.");
  }

  function downloadReport() {
    const blob = new Blob([reportText()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contractguard-report.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  const riskCount = report?.risks?.length || 0;

  return (
    <main>
      <section className="hero">
        <div className="badge"><Shield size={16}/> ContractGuard MVP v10</div>
        <h1>Protect yourself from bad contracts.</h1>
        <p>Upload a freelance contract. AI finds payment, ownership, liability and scam risks in seconds.</p>

        <div className="heroActions">
          <button onClick={() => document.getElementById("analyzer").scrollIntoView({ behavior: "smooth" })}>
            Analyze Contract
          </button>
          <button className="secondary" onClick={() => setText(sample)}>
            Try sample
          </button>
        </div>

        <div className="heroCards">
          <div><Zap size={18}/> Risk score</div>
          <div><Sparkles size={18}/> Simple explanations</div>
          <div><Lock size={18}/> Safer clauses</div>
        </div>
      </section>

      <section className="trust">
        <div><Eye size={18}/> No account required</div>
        <div><Trash2 size={18}/> Text not stored by default</div>
        <div><Globe size={18}/> EN / UA output</div>
      </section>

      <section className="features">
        <div className="miniCard">
          <AlertTriangle size={22}/>
          <h3>Find hidden risks</h3>
          <p>Payment delays, ownership traps, unlimited liability and vague contract scope.</p>
        </div>
        <div className="miniCard">
          <CheckCircle size={22}/>
          <h3>Get fixes</h3>
          <p>ContractGuard explains what to change and gives safer wording examples.</p>
        </div>
        <div className="miniCard">
          <MessageSquare size={22}/>
          <h3>Ask follow-up</h3>
          <p>After report, ask what to change or how to answer the client.</p>
        </div>
      </section>

      <section className="panel" id="analyzer">
        <h2><Upload size={20}/> Analyze contract</h2>

        <textarea
          placeholder="Встав текст контракту або вибери TXT/PDF/DOCX файл..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="actions three">
          <button onClick={() => setText(sample)} className="secondary">Sample contract</button>
          <label className="fileLabel">
            <FileText size={17}/>
            {file ? file.name : "Choose file"}
            <input type="file" accept=".txt,.pdf,.docx" onChange={(e) => setFile(e.target.files[0])}/>
          </label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="uk">Українська</option>
          </select>
        </div>

        <label className="check">
          <input type="checkbox" checked={privacyAccepted} onChange={(e) => setPrivacyAccepted(e.target.checked)} />
          <span>Я розумію, що це AI-аналіз для інформації, не юридична консультація.</span>
        </label>

        <div className="analyzeRow">
          <button onClick={analyze} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Contract"}
          </button>
          <button className="secondary" onClick={clearAll}>Clear</button>
        </div>

        <p className="hint">
          Працює локальний demo-аналіз без API ключа. Якщо додати OpenAI ключ — backend переходить у реальний AI режим.
        </p>
      </section>

      {loading && (
        <section className="panel loading">
          <h2><RefreshCw size={20}/> AI перевіряє контракт...</h2>
          <p>Checking payment, IP, liability, revisions, penalties and scam signals...</p>
          <div className="bar"><span /></div>
        </section>
      )}

      {report && (
        <section className="results">
          <div className="panel score">
            <h2>Contract Safety Score</h2>
            <strong>{report.score}/100</strong>
            <p>{report.level}</p>

            <div className="metrics">
              <div><b>{riskCount}</b><span>risks found</span></div>
              <div><b>{report.suggestions?.length || 0}</b><span>fixes suggested</span></div>
              <div><b>{report.score >= 80 ? "Low" : report.score >= 60 ? "Med" : "High"}</b><span>risk level</span></div>
            </div>

            {report.summary && <p className="summary">{report.summary}</p>}
            <div className="reportActions">
              <button className="secondary" onClick={copyReport}><Copy size={16}/> Copy report</button>
              <button className="secondary" onClick={downloadReport}><Download size={16}/> Download report</button>
            </div>
          </div>

          <div className="grid">
            <div className="panel">
              <h2><AlertTriangle size={20}/> Risks</h2>
              {report.risks?.map((r, i) => (
                <div className="risk" key={i}>
                  <h3>{r.title}</h3>
                  <p>{r.explanation}</p>
                </div>
              ))}
            </div>

            <div className="panel">
              <h2><CheckCircle size={20}/> Suggestions</h2>
              {report.suggestions?.map((s, i) => (
                <div className="risk good" key={i}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          {report.saferClauses && report.saferClauses.length > 0 && (
            <div className="panel">
              <h2>Safer clause examples</h2>
              {report.saferClauses.map((c, i) => (
                <div className="risk good" key={i}>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
          )}

          {report.nextSteps && report.nextSteps.length > 0 && (
            <div className="panel">
              <h2>Next steps</h2>
              {report.nextSteps.map((s, i) => (
                <div className="step" key={i}>{i + 1}. {s}</div>
              ))}
            </div>
          )}

          <div className="panel">
            <h2><MessageSquare size={20}/> Ask follow-up</h2>
            <textarea className="feedbackBox" value={followUp} onChange={(e) => setFollowUp(e.target.value)} placeholder="Наприклад: як мені відповісти клієнту? Який пункт переписати?" />
            <button className="secondary" onClick={askFollowUp}>
              {followUpLoading ? "Thinking..." : "Ask"}
            </button>
            {followUpAnswer && <p className="summary">{followUpAnswer}</p>}
          </div>

          <div className="panel">
            <h2>Was this useful?</h2>
            <div className="stars">
              {[1,2,3,4,5].map(n => (
                <button key={n} className={rating >= n ? "star active" : "star"} onClick={() => setRating(n)}>
                  <Star size={18}/>
                </button>
              ))}
            </div>
            <textarea className="feedbackBox" value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Що було корисно? Що незрозуміло? Що покращити?" />
            <button className="secondary" onClick={sendFeedback}><Send size={16}/> Send feedback</button>
            {feedbackSaved && <p className="success">✅ Feedback saved.</p>}
          </div>

          <div className="panel">
            <h2><Mail size={20}/> Join early access</h2>
            <p className="hint">Збираємо перших тестерів ContractGuard.</p>
            <div className="emailRow">
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
              <input value={profession} onChange={(e) => setProfession(e.target.value)} placeholder="Profession, e.g. designer" />
              <button onClick={sendEarlyAccessRequest} className="secondary">Join Waitlist</button>
            </div>
            {saved && <p className="success">✅ Saved in waitlist.</p>}
          </div>
        </section>
      )}

      <section className="pricing panel">
        <h2>Future pricing idea</h2>
        <div className="priceGrid">
          <div className="priceCard">
            <h3>Free</h3>
            <p>1 contract analysis</p>
            <b>€0</b>
          </div>
          <div className="priceCard pro">
            <h3>Pro</h3>
            <p>Unlimited analysis + history</p>
            <b>€9–15/mo</b>
          </div>
          <div className="priceCard">
            <h3>Team</h3>
            <p>For small agencies</p>
            <b>Later</b>
          </div>
        </div>
      </section>

      <section className="faq panel">
        <h2><HelpCircle size={20}/> FAQ</h2>
        <details>
          <summary>Is this legal advice?</summary>
          <p>No. ContractGuard gives AI-generated information to help you understand risks. For serious cases, consult a qualified lawyer.</p>
        </details>
        <details>
          <summary>Do you store contracts?</summary>
          <p>In this MVP version, contract content is processed for analysis and not saved by default. Waitlist emails and feedback are saved separately.</p>
        </details>
        <details>
          <summary>Who is it for?</summary>
          <p>Freelancers, creators, designers, developers, editors and solo workers who review client contracts.</p>
        </details>
        <details>
          <summary>Why not just use ChatGPT?</summary>
          <p>ContractGuard gives a focused workflow: upload, score, risks, fixes and shareable report.</p>
        </details>
      </section>

      <footer>
        ContractGuard gives AI-generated information, not legal advice.
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
