# Kratos Innovations X (kix) · Official Website

Official website for **Kratos Innovations X** (`kix`), built according to the **Hallmark** design specification (Console aesthetic, graphite ground, OKLCH tokenized palette, zero AI slop, accessible semantic HTML).

---

## 🎨 Design System & Theme

- **Default Aesthetic**: **Hallmark Light Paper** (`oklch(98.5% 0.005 250)`) with crisp high-contrast ink (`oklch(19% 0.024 255)`), clean card elevations, and razor-sharp 1px hairlines.
- **Hero Sandbox**: High-contrast graphite developer terminal with phosphor accents.
- **Interactive Light/Dark Mode Switcher**: A header toggle allows instant switching between Light Paper and Dark Graphite modes (persisted in `localStorage` with zero flash on reload).
- **Typography**: Paired Google Fonts — **Host Grotesk** (Display/Headings) and **Atkinson Hyperlegible Mono** (Code, commands, handles, and telemetry).

- **Studio Name**: Kratos Innovations X
- **Abbreviation**: KIX (`kix.`)
- **Focus**: Telegram & Discord Bots, Bespoke Software, Precision Modern Websites

### Team Roster
- **Rahul Pachpute** (`@TheDarkKratosX`) — **Founder & Lead Systems Architect**
  - Telegram: [https://t.me/TheDarkKratosX](https://t.me/TheDarkKratosX)
  - Focus: Core bot infrastructure, concurrency pipelines, systems architecture
- **Ansh** (`@TheDarkKratos`) — **Founding Member & Systems Engineer**
  - Telegram: [https://t.me/TheDarkKratos](https://t.me/TheDarkKratos)
  - Focus: Full-stack development, database optimization, backend automation
- **Abhishek** (`@Artixtcho`) — **Main UI & UX Designer**
  - Telegram: [https://t.me/Artixtcho](https://t.me/Artixtcho)
  - Focus: Visual design systems, user interaction, typography & aesthetics

---

## ⚡ What KIX Does

1. **Telegram & Discord Bots**:
   - Webhook architecture (< 20ms response times)
   - Slash commands, inline keyboards, deep-linking
   - Payment gating (Crypto & Stripe)
   - Multi-tenant bots with 99.9% target uptime
2. **Custom Software**:
   - Tailored business tools, scrapers, data pipelines
   - High-throughput asynchronous APIs (Python / FastAPI / Node.js)
   - Background daemons, Celery/BullMQ workers, Redis caching
3. **Modern Websites**:
   - 100/100 Lighthouse performance & accessibility
   - Responsive, bespoke design without generic templates
   - Edge-ready, maintainable architecture

---

## 🚀 Interactive Features

- **Live Sandbox Console in Hero**: Interactive terminal allowing visitors to inspect simulated Telegram, Discord, Software, and Web Stack runtimes and run live slash commands (`/start`, `/status`, `/team`, `/quote`).
- **Interactive Project Spec Builder**: Allows prospective clients to configure their project (type, architecture requirements, timeline) and compiles an instant brief with a 1-click button to dispatch it directly to Rahul, Ansh, or Abhishek on Telegram with pre-filled parameters.
- **1-Click Handle Copying**: Fast copy feedback for all team handles.

---

## 💻 Local Preview & Deployment

### Run Locally
You can double-click `index.html` to open directly in any browser, or run a lightweight local server:
```bash
# Python
python -m http.server 3000
```
Then visit `http://localhost:3000`.

### Deploy
- **Vercel / Netlify / Cloudflare Pages**: Simply push this folder to a GitHub repository and link it. No build step required (static HTML/CSS/JS).
- **GitHub Pages**: Go to Repo Settings -> Pages -> Deploy from branch -> `/root`.
