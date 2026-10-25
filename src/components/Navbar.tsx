'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, FileText, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface NavbarProps {
  onSelectSample?: (sampleId: string) => void;
  onScrollToAnalyzer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectSample, onScrollToAnalyzer }) => {
  const [geminiActive, setGeminiActive] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setGeminiActive(Boolean(data.geminiConfigured)))
      .catch(() => setGeminiActive(false));
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-900/20 bg-[#060913]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div
          onClick={onScrollToAnalyzer}
          className="flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-violet-400 shadow-lg shadow-purple-500/20">
            <Sparkles className="h-5 w-5 text-white" />
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-white sm:text-lg">
                AI Career Copilot
              </span>
              <span className="rounded-md border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-[11px] font-semibold text-purple-300">
                Resume Analyzer
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Powered by Google Gemini AI
            </p>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden items-center gap-7 md:flex text-sm font-medium text-slate-300">
          <a
            href="#features"
            className="transition-colors hover:text-white hover:text-purple-300"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="transition-colors hover:text-white hover:text-purple-300"
          >
            How It Works
          </a>
          <a
            href="#ats-guide"
            className="transition-colors hover:text-white hover:text-purple-300"
          >
            ATS Benchmarks
          </a>
          <a
            href="#privacy"
            className="flex items-center gap-1.5 transition-colors hover:text-white hover:text-purple-300"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Privacy
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Engine indicator */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
            <Zap className="h-3.5 w-3.5 text-purple-400" />
            <span>
              {geminiActive === null
                ? 'Connecting...'
                : geminiActive
                ? 'Gemini 2.5 Active'
                : 'Offline Engine'}
            </span>
            <span
              className={`h-2 w-2 rounded-full ${
                geminiActive ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
          </div>

          {/* Quick Demo Button */}
          {onSelectSample && (
            <button
              type="button"
              onClick={() => onSelectSample('fullstack-senior')}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-950/40 px-3.5 py-1.5 text-xs font-medium text-purple-200 transition-all hover:bg-purple-900/50 hover:border-purple-400"
              title="Load instant pre-filled sample resume"
            >
              <FileText className="h-3.5 w-3.5 text-purple-400" />
              Sample Demo
            </button>
          )}

          {/* Main Analyze CTA */}
          <button
            type="button"
            onClick={onScrollToAnalyzer}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-purple-600/30 transition-all hover:shadow-lg hover:shadow-purple-500/50 hover:brightness-110 active:scale-95"
          >
            <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
            <span>Analyze Resume</span>
          </button>
        </div>
      </div>
    </header>
  );
};
