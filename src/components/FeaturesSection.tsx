'use client';

import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Search,
  CheckCircle,
  Cpu,
  BarChart2,
  FileCheck2,
  Zap,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Search,
    title: 'ATS Parser Simulation',
    description:
      'Replicates scanning algorithms used by enterprise applicant tracking systems like Workday, Greenhouse, and Lever.',
    tag: 'Screening Ready',
  },
  {
    icon: Sparkles,
    title: 'Google XYZ Bullet Rewrites',
    description:
      'Converts weak task lists into the world-standard Google XYZ formula: "Accomplished [X] measured by [Y] by doing [Z]".',
    tag: 'Proven Impact',
  },
  {
    icon: Cpu,
    title: 'Google Gemini 2.5 AI Engine',
    description:
      'Leverages state-of-the-art multimodal AI trained on high-caliber tech recruiting rubrics and job specifications.',
    tag: 'Latest LLM',
  },
  {
    icon: BarChart2,
    title: 'Target Role Fit & Seniority Index',
    description:
      'Compares your trajectory against expectations for Junior, Mid, Senior, Staff, and Lead engineering tiers.',
    tag: 'Calibrated',
  },
  {
    icon: Zap,
    title: 'Skills & Keyword Gap Analysis',
    description:
      'Detects missing core technologies, frameworks, and tools prioritized by automated resume filters.',
    tag: 'Keyword Match',
  },
  {
    icon: ShieldCheck,
    title: 'Zero Permanent Storage Guarantee',
    description:
      'Your resume is analyzed entirely in transient server memory and immediately discarded. Never stored in a database.',
    tag: '100% Private',
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-16 sm:py-24 border-t border-purple-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-3.5 py-1 text-xs font-semibold text-purple-300">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>Why AI Career Copilot</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Engineered to Beat the ATS Screening Filter
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            Most resumes fail not because candidates lack talent, but because automated parsers cannot extract their impact. We solve that.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl border border-slate-800/80 bg-gradient-to-b from-[#0D1527] to-[#0A0F1D] p-6 transition-all hover:border-purple-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-950/60 border border-purple-500/30 text-purple-400 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 bg-purple-950/80 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                    {f.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">{f.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
