'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, Cpu, CheckCircle2, FileSearch, ShieldCheck } from 'lucide-react';

interface LoadingScreenProps {
  targetRole: string;
}

const STEPS = [
  {
    title: 'Document Sanitization & Text Extraction',
    detail: 'Parsing PDF streams, stripping hidden artifacts, and checking structure...',
  },
  {
    title: 'ATS Algorithmic Scannability Check',
    detail: 'Evaluating section delimiters, font readability, and contact clarity...',
  },
  {
    title: 'Google Gemini 2.5 Recruiter Engine Analysis',
    detail: 'Auditing keyword density, seniority alignment, and technical relevance...',
  },
  {
    title: 'Formulating Actionable Roadmap & Rewrites',
    detail: 'Crafting Google XYZ bullet enhancements and personalized step-by-step guidance...',
  },
];

const RECRUITER_TIPS = [
  'Recruiters spend an average of only 6 to 7 seconds on initial resume review.',
  'Top tech companies (Google, Meta, Amazon) use the XYZ formula: Accomplished [X] measured by [Y] doing [Z].',
  'Complex multi-column tables and non-standard icons often confuse older ATS parsers.',
  'Matching at least 65% of required job keywords dramatically increases interview chances.',
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ targetRole }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(15);
  const [tipIndex, setTipIndex] = useState<number>(0);

  useEffect(() => {
    // Step advancement interval
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 2400);

    // Progress bar smooth ticker
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 94) return 94; // wait at 94% until done
        return prev + Math.floor(Math.random() * 8) + 3;
      });
    }, 400);

    // Tip rotation
    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % RECRUITER_TIPS.length);
    }, 3800);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearInterval(tipInterval);
    };
  }, []);

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-purple-500/30 bg-gradient-to-b from-[#0D1527] to-[#080D1A] p-8 sm:p-12 text-center shadow-2xl shadow-purple-950/50 backdrop-blur-xl">
      {/* Animated Glowing Orb */}
      <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-purple-600/30 blur-xl animate-pulse" />
        <div className="absolute inset-1 rounded-full border-2 border-dashed border-purple-400/60 animate-[spin_8s_linear_infinite]" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-violet-500 shadow-lg shadow-purple-600/50">
          <Sparkles className="h-8 w-8 text-white animate-bounce" />
        </div>
      </div>

      <h3 className="mt-6 text-2xl font-bold tracking-tight text-white">
        Analyzing Your Resume with Gemini AI
      </h3>
      <p className="mt-1 text-sm text-purple-300 font-medium">
        Benchmarking profile against <span className="text-white font-semibold">{targetRole}</span>
      </p>

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
          <span>AI Deep Analysis</span>
          <span className="text-purple-300">{progress}%</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-violet-400 transition-all duration-300 ease-out shadow-lg shadow-purple-500/40"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="mt-8 space-y-3 text-left">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={idx}
              className={`flex items-start gap-3 rounded-xl p-3 transition-all ${
                isCurrent
                  ? 'border border-purple-500/30 bg-purple-950/30'
                  : isDone
                  ? 'opacity-80'
                  : 'opacity-40'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : isCurrent ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600">
                    <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                  </div>
                ) : (
                  <div className="h-5 w-5 rounded-full border border-slate-700 bg-slate-900" />
                )}
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm font-semibold ${
                    isCurrent ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{step.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Recruiter Tip */}
      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-300 text-left">
        <span className="font-semibold text-purple-400">💡 ATS Pro-Tip: </span>
        <span className="italic">{RECRUITER_TIPS[tipIndex]}</span>
      </div>
    </div>
  );
};
