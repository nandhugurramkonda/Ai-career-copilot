'use client';

import React from 'react';
import { UploadCloud, Cpu, Award, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: UploadCloud,
    title: 'Upload or Paste Your Resume',
    description:
      'Upload your PDF resume or paste raw text. Choose your desired target role and seniority level to anchor the analysis.',
  },
  {
    step: '02',
    icon: Cpu,
    title: 'Gemini 2.5 Recruiter Audit',
    description:
      'Our server-side pipeline extracts structured content and submits it to Google Gemini with elite recruiting rubrics.',
  },
  {
    step: '03',
    icon: Award,
    title: 'Implement Targeted Rewrites',
    description:
      'Review your 0-100 score, copy Google XYZ bullet rewrites, integrate missing keywords, and export a clean report.',
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 border-t border-purple-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-3.5 py-1 text-xs font-semibold text-purple-300">
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            From Upload to Interview Ready in Seconds
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            Designed for busy job seekers looking for actionable, recruiter-verified feedback.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl border border-slate-800 bg-slate-900/40 p-8 text-left transition-all hover:border-purple-500/40"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-600/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-3xl font-black text-slate-700">{s.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
