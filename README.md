# Forge 2 Qualifier — Kanban Board

A tiny Trello-style Kanban board built by a two-agent AI system (Hermes + OpenClaw).

## What the App Does

- Create boards with lists (To-Do, Doing, Done)
- Add cards with title, description, tags, assigned member, and due date
- Move cards between lists
- Overdue cards are visually flagged

## Models Used & Why

| Agent | Model | Reason |
|-------|-------|--------|
| Hermes (brain) | Gemini gemini-2.5-flash | Strong reasoning for planning, memory, and orchestration |
| OpenClaw (hands) | Groq llama-3.3-70b-versatile | Fast inference, good at generating PHP/JS code |

Both are free-tier models. No paid APIs used.

## How to Run Locally

### Backend (Laravel + SQLite)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

API runs at `http://localhost:8000`

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

UI runs at `http://localhost:5173`

### Environment Variables

Copy `.env.example` to `.env` and fill in:
- `GROQ_API_KEY=` (for agent coding)
- `GEMINI_API_KEY=` (for agent planning)
- `SLACK_BOT_TOKEN=` (for agent chat)
- `SLACK_APP_TOKEN=` (for agent socket mode)

## Live URL

- Frontend: https://your-frontend.vercel.app
- Backend API: http://localhost:8000/api

## Video Walkthrough

Link to your 60-90s video (Loom / YouTube / Google Drive)

## Agent Setup

See `ARCHITECTURE.md` for the full two-agent system design.

## License

MIT
