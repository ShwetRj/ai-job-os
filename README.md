# 🚀 AI Job OS – Intelligent Job Hunting Platform

> Automate your job search with AI: discover, score, apply, and track opportunities—all in one system.

---

## 🌐 Live System

* 🔗 **Main App**: https://jobhuntingaiagent.me
* ⚙️ **Automation (n8n)**: https://n8n.jobhuntingaiagent.me
* 📊 **Analytics Dashboard (Retool)**: https://aijobhuntingdashboard.retool.com

---

## 🧠 What This Does

AI Job OS is a **full-stack automation platform** that:

* 🔍 Scrapes jobs from multiple sources
* 🧠 Scores jobs using AI relevance logic
* ⚡ Enables quick/manual or automated application
* 📬 Automates recruiter outreach & follow-ups
* 📊 Tracks performance with analytics dashboards

👉 Built to eliminate manual job hunting and increase conversion rates.

---

## ✨ Key Features

### 🔍 Job Intelligence Engine

* Aggregates jobs from multiple platforms
* Filters irrelevant roles (non-BA, marketing, etc.)
* Scores jobs based on relevance (skills, role, experience)

---

### ⚡ Auto Apply System

* One-click apply from dashboard
* Tracks applied jobs in database
* Opens job links + updates status automatically

---

### 📬 Outreach Automation (n8n)

* Sends recruiter emails & LinkedIn messages
* Follow-up workflows
* Reply detection automation

---

### 📊 Analytics Dashboard

* Total jobs tracked
* Applications sent
* Conversion rate
* AI suggestions (top jobs to apply next)

---

### 🧠 AI Suggestions

* Highlights high-score jobs
* Recommends where to focus
* Improves decision-making

---

## 🏗️ Tech Stack

| Layer      | Technology                 |
| ---------- | -------------------------- |
| Frontend   | Next.js (App Router)       |
| Backend    | Node.js APIs               |
| Database   | Supabase                   |
| Automation | n8n                        |
| Dashboard  | Retool                     |
| Deployment | DigitalOcean + Nginx + PM2 |

---

## 📁 Project Structure

```
app/
  control/
    jobs/
    dashboard/
components/
lib/
middleware.ts
```

---

## ⚙️ Setup Locally

### 1. Clone Repo

```bash
git clone https://github.com/ShwetRj/ai-job-os.git
cd ai-job-os
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

---

### 4. Run App

```bash
npm run dev
```

---

## 🔐 Authentication

* Supabase email OTP login
* Protected routes using middleware
* Secure environment variables

---

## 🚀 Deployment

* Hosted on DigitalOcean VPS
* Nginx reverse proxy
* PM2 process manager
* SSL via Let’s Encrypt

---

## 📈 Impact

* ⚡ Reduced manual job search effort by ~70%
* 📊 Improved targeting using AI scoring
* 🚀 Built a fully automated job-hunting pipeline

---

## 🧩 Future Enhancements

* 🤖 GPT-powered resume optimization
* 📬 LinkedIn automation UI
* 📈 Advanced analytics (funnel tracking)
* 👥 Multi-user SaaS version

---

## 👤 Author

**Shwet Kumar**
Senior Technical Business Analyst | IAM | AI Systems

* 🔗 LinkedIn: https://linkedin.com/in/shwet-kumar-b8b4a112
* 📧 Email: [shwetraj67@gmail.com](mailto:shwetraj67@gmail.com)

---

## ⭐ If you found this useful

Give it a ⭐ and feel free to connect!

---
