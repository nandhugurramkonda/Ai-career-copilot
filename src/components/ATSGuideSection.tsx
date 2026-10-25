'use client';

import React from 'react';
import { Check, X, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

export const ATSGuideSection: React.FC = () => {
  return (
    <section id="ats-guide" className="py-16 sm:py-24 border-t border-purple-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-3.5 py-1 text-xs font-semibold text-purple-300">
            <BookOpen className="h-3.5 w-3.5 text-purple-400" />
            <span>Recruiter Playbook</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            The Definitive ATS Screening Rules
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            What passes through Workday, Greenhouse, and Lever, versus what triggers immediate algorithmic disqualification.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* What to DO */}
          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-950/10 p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-5 text-emerald-400">
              <Check className="h-6 w-6 rounded-full bg-emerald-500/20 p-1" />
              <h3 className="text-xl font-bold text-white">What Modern ATS Loves</h3>
            </div>
            <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Clean Single-Column Layout:</strong> Standard linear top-to-bottom reading path with recognizable headings (Experience, Education, Skills).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Google XYZ Metrics:</strong> Statements like &quot;Cut API latency by 45% across 120k users by implementing Redis caching.&quot;
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Explicit Role Keywords:</strong> Naturally distributing essential frameworks (e.g., Next.js, TypeScript, AWS, CI/CD) throughout bullet points.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Standard Reverse-Chronological:</strong> Company Name, Job Title, Month/Year start and end dates clearly visible.
                </span>
              </li>
            </ul>
          </div>

          {/* What to AVOID */}
          <div className="rounded-3xl border border-rose-500/20 bg-rose-950/10 p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-5 text-rose-400">
              <X className="h-6 w-6 rounded-full bg-rose-500/20 p-1" />
              <h3 className="text-xl font-bold text-white">What Breaks ATS Parsers</h3>
            </div>
            <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Tables and Complex Columns:</strong> Multi-column sidebars frequently scramble the parser stream, putting contact info in the middle of job dates.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Graphic Skill Rating Bars:</strong> &quot;Python: 4/5 stars&quot; or visual progress bars cannot be read by ATS scanners and waste valuable space.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Headers and Footers Contact Details:</strong> Many legacy parsers completely ignore header/footer margins, missing phone and email entirely.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Passive Duty Lists:</strong> &quot;Responsible for writing code and attending standup&quot; gives no indication of competence or business impact.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
