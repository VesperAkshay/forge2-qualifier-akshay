# Architecture

## Agent Roles

- **Hermes (brain)** — Runs in `#sprint-main`. Receives high-level goals, decomposes them into tasks, assigns to OpenClaw, reports status. Uses persistent memory + SKILL.md for status reports.
- **OpenClaw (hands)** — Runs in `#agent-coder`. Receives coding tasks, writes/executes code in `F:\forge2-qualifier-akshay`, reports results.

## Slack Channel Scheme

| Channel | Agent | Purpose |
|---------|-------|---------|
| `#sprint-main` | Hermes | Planning, decisions, human oversight |
| `#agent-coder` | OpenClaw | Coding tasks, execution, code review |
| `#agent-log` | Hermes | Cron / autonomous-run output, audit trail |

## The Loop

```
Human posts goal in #sprint-main
  → Hermes posts plan
    → Hermes assigns task to OpenClaw in #agent-coder
      → OpenClaw writes code, runs it, reports back
        → Human approves or corrects in #sprint-main
```

All activity is visible in channels. No agent works in private DMs.

## Model Routing

| Agent | Role | Model | Provider | Base URL |
|-------|------|-------|----------|----------|
| Hermes | Planning / orchestration | gemini-2.5-flash | Gemini | `https://generativelanguage.googleapis.com/v1beta/openai/` |
| OpenClaw | Coding / execution | llama-3.3-70b-versatile | Groq | `https://api.groq.com/openai/v1` |

**Fallback ladder:** Groq → Gemini → OpenRouter :free → Ollama local

## Tech Stack

- **Backend:** Laravel 11, PHP 8.4+, SQLite, REST API
- **Frontend:** React 18, Vite, Axios
- **Agents:** OpenClaw (hands), Hermes (brain)
- **Comms:** Slack (Socket Mode)
- **Models:** Groq free tier + Gemini free tier
- **Hosting:** Vercel (frontend) / Render (backend)

## Free Stack Verification

| Component | Tool | Cost |
|-----------|------|------|
| Coding agent | OpenClaw | Free / OSS |
| Orchestrator | Hermes Agent | Free / OSS |
| Comms | Slack free workspace | Free |
| Models | Groq free + Gemini free | Free tiers |
| Version control | GitHub public repo | Free |
| Hosting | Vercel / Netlify / Render | Free tiers |

No paid API keys, no subscriptions. ₹0 spent.
