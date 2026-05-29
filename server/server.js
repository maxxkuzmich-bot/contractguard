
import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { createRequire } from "module";
import mammoth from "mammoth";
import rateLimit from "express-rate-limit";
import { localDemoAnalysis, localFollowUp } from "./utils/localAnalysis.js";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || "*"
}));
app.use(express.json({ limit: "2mb" }));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20
});
app.use(limiter);

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

function saveJson(filename, item) {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const file = path.join(dir, filename);
  let list = [];

  if (fs.existsSync(file)) {
    list = JSON.parse(fs.readFileSync(file, "utf-8"));
  }

  list.push({ ...item, createdAt: new Date().toISOString() });
  fs.writeFileSync(file, JSON.stringify(list, null, 2));
}

async function extractText(req) {
  let contractText = req.body.text || "";

  if (req.file && !contractText) {
    const name = req.file.originalname.toLowerCase();

    if (req.file.mimetype === "text/plain" || name.endsWith(".txt")) {
      contractText = req.file.buffer.toString("utf-8");
    } else if (name.endsWith(".pdf")) {
      const parsed = await pdf(req.file.buffer);
      contractText = parsed.text;
    } else if (name.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ buffer: req.file.buffer });
      contractText = result.value;
    } else {
      contractText = `Uploaded file: ${req.file.originalname}. Unsupported format.`;
    }
  }

  return contractText;
}

app.post("/api/analyze", upload.single("file"), async (req, res) => {
  try {
    const contractText = await extractText(req);
    const language = req.body.language || "en";

    if (!contractText.trim()) {
      return res.status(400).json({ error: "No contract text provided" });
    }

    if (!openai) {
      return res.json(localDemoAnalysis(contractText, language));
    }

    const outputLanguage = language === "uk" ? "Ukrainian" : "English";

    const prompt = `
You are ContractGuard, an AI contract risk assistant for freelancers.
Output language: ${outputLanguage}.
Analyze the contract text and return ONLY valid JSON with this structure:
{
 "score": number from 0 to 100,
 "level": "Low Risk" | "Medium Risk" | "High Risk" translated if output language is Ukrainian,
 "summary": "one short paragraph",
 "risks": [{"title": "...", "explanation": "..."}],
 "suggestions": [{"title": "...", "text": "..."}],
 "saferClauses": [{"title": "...", "text": "..."}],
 "nextSteps": ["...", "..."]
}
Focus on payment risks, copyright/IP transfer, unlimited liability, penalties, vague scope, revision abuse, and scam signals.
Explain simply, like a smart friend. Do not claim to be a lawyer. If serious, suggest review by a qualified lawyer.
Add safer clause examples and practical next steps.
Contract:
${contractText.slice(0, 18000)}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Analysis failed" });
  }
});

app.post("/api/follow-up", async (req, res) => {
  try {
    const { question, report, language } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question required" });
    }

    if (!openai) {
      return res.json({ answer: localFollowUp(question, language) });
    }

    const outputLanguage = language === "uk" ? "Ukrainian" : "English";

    const prompt = `
You are ContractGuard, an AI assistant for freelancers.
Output language: ${outputLanguage}.
Answer the user's follow-up question based on this contract risk report.
Be practical, short and clear. Do not claim to be a lawyer.

Report:
${JSON.stringify(report).slice(0, 12000)}

Question:
${question}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({ answer: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Follow-up failed" });
  }
});

app.post("/api/waitlist", (req, res) => {
  const { email, profession } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email required" });
  }

  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const file = path.join(dir, "waitlist.json");
  let list = [];

  if (fs.existsSync(file)) {
    list = JSON.parse(fs.readFileSync(file, "utf-8"));
  }

  if (!list.find((item) => item.email === email)) {
    list.push({ email, profession: profession || "", createdAt: new Date().toISOString() });
    fs.writeFileSync(file, JSON.stringify(list, null, 2));
  }

  res.json({ ok: true });
});

app.post("/api/feedback", (req, res) => {
  const { feedback, rating, reportScore } = req.body;

  if ((!feedback || feedback.trim().length < 2) && !rating) {
    return res.status(400).json({ error: "Feedback or rating required" });
  }

  saveJson("feedback.json", {
    feedback: feedback ? feedback.trim() : "",
    rating: rating || null,
    reportScore: reportScore || null
  });

  res.json({ ok: true });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "ContractGuard", version: "v10" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`ContractGuard server running on port ${process.env.PORT || 5000}`);
});
