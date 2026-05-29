# ContractGuard Deploy Guide

## Frontend on Vercel
1. Upload `client` to GitHub.
2. Import project in Vercel.
3. Framework: Vite.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Env:
`VITE_API_URL=https://your-backend-url`

## Backend on Railway
1. Upload `server` to GitHub.
2. New Project → Deploy from GitHub.
3. Variables:
`OPENAI_API_KEY=your_key`
`PORT=5000`
`ALLOWED_ORIGIN=https://your-vercel-url`
4. Start command:
`npm start`
