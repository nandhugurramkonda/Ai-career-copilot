# 🚀 AI Career Copilot – Resume Analyzer & ATS Optimizer

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

A modern, production-grade SaaS web application that benchmarks candidate resumes against corporate **Applicant Tracking Systems (ATS)** algorithms (Workday, Greenhouse, Lever, Taleo) and leverages **Google Gemini 2.5 AI** to deliver executive recruiter evaluations, skills gap analysis, and Google XYZ bullet-point rewrites.

---

## ✨ Features & Capabilities

- **📄 Server-Side PDF Stream Extraction:** Safely extracts text, sections, and metadata without exposing client files or storing documents.
- **⚡ Google Gemini 2.5 AI Engine:** Evaluates candidate resumes against real-world recruiting standards, seniority rubrics, and industry keywords.
- **📊 0–100 Overall Resume Score:** Includes an animated radial gauge and breakdowns for ATS Readability, Role Match, Impact & Metrics, and Tech Alignment.
- **🔍 Algorithmic ATS Compliance Audit:** Checks standard section headings, scannability, contact hyperlinks, chronology, and density.
- **🎯 Role Match & Seniority Calibrator:** Tailored for 12+ tech & product disciplines (Software Engineer, Full Stack, AI/ML, DevOps, PM, etc.) and seniority levels from Junior to Executive.
- **💡 Skills Gap & Keyword Tag Cloud:** Identifies both detected competencies and missing high-priority keywords needed to pass automated screening.
- **✍️ Google XYZ Formula Bullet Rewrites:** Replaces weak, task-based descriptions with quantified accomplishments: *"Accomplished [X] as measured by [Y] by doing [Z]"*.
- **🗺️ Actionable Optimization Roadmap:** Chronological checklist with estimated times to boost your resume score into the top 10%.
- **🚀 One-Click Sample Demos:** Instantly load pre-configured senior engineering resumes to test the platform in seconds.
- **🔒 Zero Storage Privacy Guarantee:** All resumes are processed strictly in volatile server RAM and immediately discarded. Never stored in a database or disk.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) (Custom Dark Navy `#060913` & Purple Palette) |
| **AI Engine** | [Google Gemini 2.5 Flash SDK](https://github.com/google-gemini/generative-ai-js) (`@google/genai`) |
| **PDF Extraction** | `pdf-parse` (Server-side binary stream parser with fallback sanitizer) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 📋 Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18.18 or higher (v20+ recommended). You can verify with `node -v`.
- **npm** (or yarn / pnpm / bun).

---

## ⚡ Quick Start: Running Locally

### 1. Clone or Navigate to the Project Directory
```bash
cd "d:\Ai career copilot"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Your Environment Variables
Copy the `.env.example` file to `.env.local`:
```bash
# On Windows PowerShell:
Copy-Item .env.example .env.local

# On macOS/Linux:
cp .env.example .env.local
```

Open `.env.local` in your editor and add your Google Gemini API Key:
```env
GEMINI_API_KEY=AIzaSy...YourGeminiApiKeyHere
```

> **Note:** The application includes a smart **Offline Heuristic Mode**. If you do not have a Gemini API key immediately available, the application will still run smoothly and generate comprehensive evaluations using our built-in recruiting heuristics!

### 4. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is occupied) in your browser.

---

## 🔑 How to Get a Free Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Sign in with your Google Account.
3. Click **"Create API key"**.
4. Copy the generated key.
5. Paste it into your `.env.local` file:
   ```env
   GEMINI_API_KEY=your_copied_api_key
   ```
6. Restart your development server (`npm run dev`) to load the new environment variable.

---

## 📂 Project Directory Structure

```
d:\Ai career copilot/
├── public/                 # Static assets
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analyze/    # POST /api/analyze - Server-side PDF extraction & Gemini processing
│   │   │   └── health/     # GET /api/health - Engine configuration check
│   │   ├── globals.css     # Dark navy theme variables, shimmer & glow animations
│   │   ├── layout.tsx      # Root metadata, SEO tags, responsive viewport
│   │   └── page.tsx        # Single-page application orchestrator
│   ├── components/
│   │   ├── Navbar.tsx      # Navigation header with live engine status & demo trigger
│   │   ├── Hero.tsx        # Value proposition hero, trust stats, primary CTAs
│   │   ├── ResumeUploader.tsx # Drag-and-drop PDF dropzone, text paste tab, role selector
│   │   ├── LoadingScreen.tsx  # Dynamic multi-stage progress animation with recruiter tips
│   │   ├── AnalysisDashboard.tsx # 0-100 radial score gauge, ATS audit, rewrites, roadmap
│   │   ├── FeaturesSection.tsx# Feature grid
│   │   ├── HowItWorksSection.tsx # 3-step walkthrough
│   │   ├── ATSGuideSection.tsx# Recruiter dos and don'ts
│   │   └── Footer.tsx      # Privacy disclaimer, platform links, back-to-top
│   ├── data/
│   │   └── sampleResumes.ts# Pre-loaded Full Stack & AI Engineer sample resumes
│   ├── lib/
│   │   ├── geminiAnalyzer.ts# Google Gemini 2.5 prompt engine & heuristic fallback
│   │   └── pdfExtractor.ts  # Server-side PDF binary stream parsing & text sanitization
│   └── types/
│       └── index.ts        # TypeScript interfaces for API requests and analysis results
├── .env.example            # Environment template
├── .env.local              # Local environment file (git-ignored)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔒 Security & Privacy Guarantees

- **No Hardcoded Keys:** `GEMINI_API_KEY` is loaded exclusively via `process.env.GEMINI_API_KEY` on the server and is never sent to the browser.
- **Git Ignored:** `.env*.local` is explicitly listed in `.gitignore` to prevent accidental credential commits.
- **In-Memory Volatile Processing:** Resumes are parsed directly from memory buffers and evaluated in real-time. No files or PII are saved to disk or persistent databases.
- **Ethical Disclaimer:** ATS scores are analytical estimates based on heuristics and do not guarantee employment selection.

---

## 🚢 Uploading to GitHub

To push this codebase to your GitHub account:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Stage all project files (.env.local is automatically ignored)
git add .

# 3. Commit the codebase
git commit -m "feat: complete AI Career Copilot Resume Analyzer application"

# 4. Set main branch
git branch -M main

# 5. Link to your remote GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/ai-career-copilot.git

# 6. Push code to GitHub
git push -u origin main
```

---

## 🌐 Deploying to Vercel

The fastest way to deploy your Next.js application to production:

### Option A: Via Vercel Web Dashboard (Recommended)
1. Push your project to GitHub (see steps above).
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Click **"Import Project"** and select your `ai-career-copilot` repository.
4. Under **"Environment Variables"**, add:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Your Google Gemini API Key
5. Click **"Deploy"**. Vercel will build and launch your live application with SSL in under 60 seconds!

### Option B: Via Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy directly
vercel

# Add your production environment variable
vercel env add GEMINI_API_KEY
```

---

## 📄 License
MIT License. Free for personal and commercial career development use.
