# ContractGuard MVP v10

v10 додає:
- nextSteps у report
- follow-up question feature
- `/api/follow-up`
- local follow-up fallback без OpenAI
- report export включає next steps
- MVP ближчий до реального AI copilot

## Backend

```bash
cd server
npm install
cp .env.example .env
node server.js
```

## Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

## Без API ключа

Працює local demo engine.

## З API ключем

Додай у `server/.env`:

```bash
OPENAI_API_KEY=...
```

## Data saved

- `server/data/waitlist.json`
- `server/data/feedback.json`
