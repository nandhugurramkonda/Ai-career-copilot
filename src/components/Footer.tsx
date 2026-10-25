'use client';

import { Sparkles, ShieldCheck, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="privacy" className="border-t border-slate-800/80 bg-[#04060D] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                AI Career Copilot
              </span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering ambitious professionals with algorithmic ATS scoring, Google XYZ bullet-point rewrites, and deep Gemini AI resume evaluations.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>100% In-Memory Processing • Zero Resume Storage</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#analyzer" className="hover:text-purple-300 transition-colors">
                  Resume Analyzer
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-purple-300 transition-colors">
                  Features & Metrics
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-purple-300 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#ats-guide" className="hover:text-purple-300 transition-colors">
                  ATS Screening Rules
                </a>
              </li>
            </ul>
          </div>

          {/* Technology & Security */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Engine & Stack
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Next.js 16 (App Router)</li>
              <li>Google Gemini 2.5 Flash API</li>
              <li>TypeScript & Tailwind CSS</li>
              <li>Server-Side PDF Stream Parser</li>
              <li>Encrypted Vercel Deployment</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 AI Career Copilot. All rights reserved. Not affiliated with Workday, Greenhouse, or Lever.
          </p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-purple-300 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
