# 🚀 Career OS: The AI-Powered Job Hunting Agent

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-blue?style=flat-square&logo=supabase)](https://supabase.com/)
[![n8n](https://img.shields.io/badge/n8n-Automation-orange?style=flat-square&logo=n8n)](https://n8n.io/)
[![Tailwind 4](https://img.shields.io/badge/Tailwind_4-Styling-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

Career OS is a professional-grade, **full-stack automation platform** designed to treat job hunting like a high-performance sales pipeline. Built by a Technical BA, it leverages AI to eliminate manual sourcing, prioritize high-value opportunities, and automate outreach.

---

## 🌐 Ecosystem Architecture

* 🔗 **Command Center**: [jobhuntingaiagent.me](https://jobhuntingaiagent.me) — *The unified glassmorphic UI for tracking and applying.*
* ⚙️ **Automation Engine**: [n8n Node](https://n8n.jobhuntingaiagent.me) — *The "Agent" that scrapes, scores, and emails.*
* 📊 **BI Dashboard**: [Retool BI](https://aijobhuntingdashboard.retool.com) — *Deep-dive conversion analytics and funnel tracking.*

---

## 🧠 Core Intelligence Modules

### 1. 🔍 Job Intelligence & Scoring Engine
Unlike generic scrapers, Career OS uses a custom-weighted algorithm (`lib/intelligence.ts`) combined with GPT-4o to analyze job descriptions against a master professional profile.
* **Match Scoring**: 0-100 score based on technical alignment (IAM, BA expertise).
* **Probability of Success**: Adjusts scores based on job freshness, recruiter availability, and historical behavior.

### 2. ⚡ Kanban Pipeline & CRM
A high-performance "Control" view featuring:
* **Optimistic UI Updates**: Instant drag-and-drop transitions for application stages.
* **Recruiter CRM**: Manage direct contacts at Adobe, Wells Fargo, Fidelity, etc.
* **One-Click Apply**: Triggers n8n webhooks to automate the initial application handshake.

### 3. 📬 Outreach Automation
* **Automated LinkedIn/Email**: n8n workflows handle personalized follow-ups.
* **Sentiment Detection**: AI identifies if a recruiter response is positive, negative, or a request for a meeting.

---

## 🏗️ Technical Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | Next.js 15 (App Router) | High-performance Glassmorphic UI |
| **Styling** | Tailwind CSS 4 + Framer Motion | Premium UX & Animations |
| **Database** | Supabase (PostgreSQL) | Real-time data sync & Auth |
| **Logic** | Node.js + OpenAI SDK | AI Match Analysis & Reasoning |
| **Automation** | n8n (Self-hosted) | Cron-based scraping & Outreach |
| **Infrastructure** | DigitalOcean + Nginx | Standalone Node.js deployment |

---

## 📂 Project Structure

```bash
├── app/
│   ├── api/             # AI Scoring & CRM Update endpoints
│   ├── control/         # Dashboard & Kanban logic (Protected)
│   ├── hire-me/         # Interactive BA Portfolio
│   └── login/           # OAuth (Google/GitHub) flows
├── components/          # Glassmorphic UI Library (Charts, Kanban, etc.)
├── lib/                 # Intelligence engine & Supabase clients
└── middleware.ts        # Edge-based session protection

⚙️ Setup & Installation
1. Clone & Install

Bash
git clone [https://github.com/ShwetRj/ai-job-os.git](https://github.com/ShwetRj/ai-job-os.git)
cd ai-job-os
npm install
2. Environment Configuration

Create a .env.local file with the following:

Code snippet
NEXT_PUBLIC_SUPABASE_URL=[https://your-project.supabase.co](https://your-project.supabase.co)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=server-only-secret
OPENAI_API_KEY=your-key
N8N_BASE_URL=[https://your-n8n-instance.com](https://your-n8n-instance.com)
3. Build for Production

Bash
npm run build
npm start
🚀 BA Strategic Impact
Efficiency: Reduced manual sourcing time by 70%.

Precision: Focused 90% of outreach on "High Fit" (Score > 85) roles.

Visibility: Real-time funnel tracking via the Analytics Dashboard.

👤 Author
Shwet Kumar
Senior Technical Business Analyst | IAM & Identity Governance Specialist

🔗 LinkedIn: Connect with me
📧 Email: shwetraj67@gmail.com

Built to transform the job hunt from a chore into a system. 🏹