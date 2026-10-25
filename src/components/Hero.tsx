'use client';

import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  FileCheck2,
  TrendingUp,
  Cpu,
} from 'lucide-react';

interface HeroProps {
  onAnalyzeClick: () => void;
  onTrySample: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAnalyzeClick, onTrySample }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-20">
      {/* Decorative background glow gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[360px] w-[620px] rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="h-[280px] w-[450px] -translate-y-20 translate-x-32 rounded-full bg-indigo-600/15 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/50 px-4 py-1.5 text-xs font-medium text-purple-300 shadow-sm shadow-purple-900/30 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>Google Gemini AI Powered • Modern ATS Algorithms</span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-6 max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Turn Your Resume Into{' '}
            <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
              Guaranteed Interview Calls
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
            Over 75% of resumes are discarded by automated Applicant Tracking Systems before a recruiter even reads them. AI Career Copilot extracts, scores, and rewrites your resume using Google Gemini AI to help you pass the screening barrier.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5">
            <button
              type="button"
              onClick={onAnalyzeClick}
              className="group relative flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-xl shadow-purple-600/25 transition-all hover:shadow-purple-500/40 hover:brightness-110 active:scale-98"
            >
              <Sparkles className="h-5 w-5 text-purple-200 transition-transform group-hover:scale-110" />
              <span>Analyze My Resume</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={onTrySample}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm sm:text-base font-medium text-slate-200 backdrop-blur-md transition-all hover:bg-slate-800 hover:border-purple-500/40 hover:text-white"
            >
              <FileCheck2 className="h-4 w-4 text-purple-400" />
              <span>Try with Sample Resume</span>
            </button>
          </div>

          {/* Value proposition badges */}
          <div className="mt-12 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 text-left">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 backdrop-blur-sm transition-all hover:border-purple-500/30">
              <div className="flex items-center gap-2 text-purple-400">
                <TrendingUp className="h-5 w-5" />
                <span className="text-xl font-bold text-white">94%</span>
              </div>
              <p className="mt-1 text-xs font-medium text-slate-400">
                ATS Scannability Rate
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 backdrop-blur-sm transition-all hover:border-purple-500/30">
              <div className="flex items-center gap-2 text-indigo-400">
                <Cpu className="h-5 w-5" />
                <span className="text-xl font-bold text-white">Gemini 2.5</span>
              </div>
              <p className="mt-1 text-xs font-medium text-slate-400">
                Deep Recruiter Intelligence
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 backdrop-blur-sm transition-all hover:border-purple-500/30">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle className="h-5 w-5" />
                <span className="text-xl font-bold text-white">Google XYZ</span>
              </div>
              <p className="mt-1 text-xs font-medium text-slate-400">
                Metric-Driven Rewrites
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 backdrop-blur-sm transition-all hover:border-purple-500/30">
              <div className="flex items-center gap-2 text-violet-400">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-xl font-bold text-white">100% Private</span>
              </div>
              <p className="mt-1 text-xs font-medium text-slate-400">
                In-Memory Processing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
