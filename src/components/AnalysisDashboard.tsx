'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Printer,
  Copy,
  Check,
  TrendingUp,
  Award,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  ListChecks,
  Target,
  FileEdit,
  Sliders,
  Info,
} from 'lucide-react';
import { ResumeAnalysisResult } from '@/types';

interface AnalysisDashboardProps {
  result: ResumeAnalysisResult;
  onReset: () => void;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ result, onReset }) => {
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedBulletIndex, setCopiedBulletIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'rewrites' | 'actionPlan'>('overview');

  const {
    overallScore,
    atsCompatibility,
    roleMatch,
    scoreBreakdown,
    strengths,
    areasToImprove,
    skillsAnalysis,
    bulletRewrites,
    actionPlan,
    isMockData,
    extractedWordCount,
    analysisDate,
  } = result;

  // Copy Executive Summary
  const handleCopySummary = () => {
    const text = `AI Career Copilot Resume Report
Role: ${roleMatch.targetRole} (${roleMatch.experienceLevel})
Overall Score: ${overallScore}/100
ATS Scannability: ${atsCompatibility.score}/100 (${atsCompatibility.status})
Verdict: ${roleMatch.verdict}
Summary: ${roleMatch.summary}`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleCopyBullet = (bullet: string, idx: number) => {
    navigator.clipboard.writeText(bullet);
    setCopiedBulletIndex(idx);
    setTimeout(() => setCopiedBulletIndex(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Score color helper
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 stroke-emerald-500';
    if (score >= 65) return 'text-violet-400 stroke-violet-500';
    return 'text-amber-400 stroke-amber-500';
  };

  // Circular gauge calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Mock data notification banner if running offline */}
      {isMockData && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-950/40 p-4 text-xs sm:text-sm text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg no-print">
          <div className="flex items-center gap-2.5">
            <Info className="h-5 w-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-semibold text-amber-300">Running in Heuristic Demo Mode: </span>
              To enable live Google Gemini 2.5 AI evaluations, set your{' '}
              <code className="rounded bg-amber-900/60 px-1.5 py-0.5 font-mono text-amber-200">
                GEMINI_API_KEY
              </code>{' '}
              in your <code className="rounded bg-amber-900/60 px-1.5 py-0.5 font-mono text-amber-200">.env.local</code> file.
            </div>
          </div>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-amber-500/20 px-3 py-1.5 text-xs font-semibold text-amber-200 hover:bg-amber-500/30 border border-amber-500/40 shrink-0"
          >
            Get Free Gemini API Key →
          </a>
        </div>
      )}

      {/* Top Header Card */}
      <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#0D1527] to-[#0A0F1D] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="rounded-md border border-purple-500/40 bg-purple-500/10 px-2.5 py-0.5 text-xs font-semibold text-purple-300">
                Target: {roleMatch.targetRole}
              </span>
              <span className="rounded-md border border-slate-700 bg-slate-800/60 px-2.5 py-0.5 text-xs text-slate-300">
                {roleMatch.experienceLevel}
              </span>
              {analysisDate && (
                <span className="text-xs text-slate-400">Analyzed on {analysisDate}</span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Resume Analysis & Benchmark Report
            </h1>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              {roleMatch.verdict}. {roleMatch.summary}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 shrink-0 no-print">
            <button
              type="button"
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/80 px-3.5 py-2 text-xs font-medium text-slate-300 hover:border-purple-500/50 hover:text-white transition-all"
              title="Copy summary to clipboard"
            >
              {copiedSummary ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Report</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/80 px-3.5 py-2 text-xs font-medium text-slate-300 hover:border-purple-500/50 hover:text-white transition-all"
              title="Print or Save as PDF"
            >
              <Printer className="h-4 w-4" />
              <span>Export PDF</span>
            </button>

            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-purple-600/30 hover:brightness-110 active:scale-95 transition-all"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Analyze Another Resume</span>
            </button>
          </div>
        </div>

        {/* Score Banner with Circular Gauge */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Circular Score Gauge */}
          <div className="md:col-span-4 flex items-center gap-5 justify-center md:justify-start border-b md:border-b-0 md:border-r border-slate-800/80 pb-6 md:pb-0 md:pr-6">
            <div className="relative flex h-32 w-32 items-center justify-center shrink-0">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 128 128">
                {/* Background circle */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  className="stroke-slate-800"
                  strokeWidth="10"
                  fill="transparent"
                />
                {/* Foreground animated progress */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  className={`${getScoreColor(overallScore)} transition-all duration-1000 ease-out`}
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-white">{overallScore}</span>
                <span className="text-[11px] font-semibold text-slate-400">OUT OF 100</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                Overall Resume Score
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {overallScore >= 85
                  ? 'Interview Ready 🚀'
                  : overallScore >= 70
                  ? 'Competitive Profile ✨'
                  : 'Needs Optimization ⚠️'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {overallScore >= 80
                  ? 'Ranked in the top 15% of parsed candidate submissions.'
                  : 'Follow the action plan below to increase to 88+.'}
              </p>
            </div>
          </div>

          {/* Breakdown Cards */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5">
              <span className="text-xs text-slate-400 font-medium">ATS Scannability</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-bold text-white">{atsCompatibility.score}%</span>
                <span className="text-[10px] text-purple-400">{atsCompatibility.status}</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${atsCompatibility.score}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5">
              <span className="text-xs text-slate-400 font-medium">Role Match</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-bold text-white">{roleMatch.matchPercentage}%</span>
                <span className="text-[10px] text-emerald-400">Fit Index</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${roleMatch.matchPercentage}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5">
              <span className="text-xs text-slate-400 font-medium">Impact & Metrics</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-bold text-white">
                  {scoreBreakdown.impactAndMetrics}%
                </span>
                <span className="text-[10px] text-indigo-400">Google XYZ</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${scoreBreakdown.impactAndMetrics}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5">
              <span className="text-xs text-slate-400 font-medium">Tech Skills Match</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-bold text-white">
                  {scoreBreakdown.technicalAlignment}%
                </span>
                <span className="text-[10px] text-violet-400">Coverage</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-violet-500 rounded-full"
                  style={{ width: `${scoreBreakdown.technicalAlignment}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-2 no-print">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
            activeTab === 'overview'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span>ATS Audit & Strengths</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('skills')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
            activeTab === 'skills'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Target className="h-4 w-4" />
          <span>Skills Gap ({skillsAnalysis.missingSkills.length} missing)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rewrites')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
            activeTab === 'rewrites'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileEdit className="h-4 w-4" />
          <span>AI Bullet Rewrites ({bulletRewrites.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('actionPlan')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
            activeTab === 'actionPlan'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <ListChecks className="h-4 w-4" />
          <span>Action Roadmap ({actionPlan.length} steps)</span>
        </button>
      </div>

      {/* TAB CONTENT 1: OVERVIEW & ATS AUDIT */}
      {(activeTab === 'overview' || typeof window === 'undefined') && (
        <div className="space-y-6">
          {/* ATS Compatibility Checklist */}
          <div className="rounded-3xl border border-purple-500/20 bg-[#0D1527] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-purple-400" />
                  ATS Algorithmic Compliance Audit
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Automated checks verified against Workday, Greenhouse, Lever, and Taleo algorithms.
                </p>
              </div>
              <span className="rounded-full bg-purple-950/60 border border-purple-500/30 px-3 py-1 text-xs font-semibold text-purple-300">
                {atsCompatibility.summary}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {atsCompatibility.checklist.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 rounded-2xl border p-4 transition-all ${
                    item.passed
                      ? 'border-emerald-500/20 bg-emerald-950/10'
                      : 'border-amber-500/25 bg-amber-950/15'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {item.passed ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold text-white">{item.label}</h4>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          item.passed
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {item.passed ? 'PASSED' : 'CHECK'}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">{item.feedback}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Areas to Improve Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="rounded-3xl border border-emerald-500/20 bg-[#0D1527] p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Key Resume Strengths</h3>
              </div>
              <p className="text-xs text-slate-400 mb-5">
                Elements that strongly support your candidacy and stand out to technical hiring managers.
              </p>

              <div className="space-y-3.5">
                {strengths.map((s, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-emerald-500/15 bg-emerald-950/10 p-4"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-emerald-200">{s.title}</h4>
                      <span className="text-[10px] font-semibold text-emerald-400/90 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                        {s.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas to Improve */}
            <div className="rounded-3xl border border-amber-500/20 bg-[#0D1527] p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Priority Areas for Improvement</h3>
              </div>
              <p className="text-xs text-slate-400 mb-5">
                Fixing these items will yield the highest return on ATS ranking and recruiter conversion.
              </p>

              <div className="space-y-3.5">
                {areasToImprove.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-amber-500/15 bg-amber-950/10 p-4"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-amber-200">{item.area}</h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.priority === 'High'
                            ? 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {item.priority} Priority
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mb-1.5">{item.issue}</p>
                    <div className="rounded-lg bg-slate-900/80 p-2.5 text-xs text-purple-200 border border-purple-500/20">
                      <span className="font-semibold text-purple-300">Fix: </span>
                      {item.suggestion}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: SKILLS GAP ANALYSIS */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-purple-500/20 bg-[#0D1527] p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-400" />
              Target Role Skills & Keyword Gap Analysis
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Benchmarked against current job requisition standards for {roleMatch.targetRole}.
            </p>

            {/* Missing Skills Grid */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-300 mb-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                Missing High-Impact Competencies
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {skillsAnalysis.missingSkills.map((m, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-rose-500/20 bg-rose-950/10 p-4"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-sm font-bold text-white">{m.skill}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          m.importance === 'High'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {m.importance} Impact
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{m.reason}</p>
                    <span className="mt-2 inline-block text-[11px] font-medium text-slate-400">
                      Category: {m.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Matched Skills */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Identified Core Competencies in Resume
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillsAnalysis.matchedSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 px-3 py-1.5 text-xs font-medium text-emerald-200"
                  >
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended ATS Keywords */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-purple-500" />
                Recommended ATS Search Index Keywords to Add
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillsAnalysis.recommendedKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="rounded-xl border border-purple-500/30 bg-purple-950/30 px-3 py-1 text-xs font-medium text-purple-200"
                  >
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: AI BULLET REWRITES */}
      {activeTab === 'rewrites' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-purple-500/20 bg-[#0D1527] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileEdit className="h-5 w-5 text-purple-400" />
                  Google XYZ Formula Bullet Rewrites
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Transform passive task descriptions into quantified executive accomplishments.
                </p>
              </div>
              <span className="text-xs text-purple-300 font-semibold bg-purple-950/50 border border-purple-500/30 px-3 py-1 rounded-full">
                Formula: Accomplished [X] measured by [Y] by doing [Z]
              </span>
            </div>

            <div className="space-y-5">
              {bulletRewrites.map((rw, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-4"
                >
                  {/* Before */}
                  <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-3.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1 mb-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                      Original / Weak Bullet Point
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 font-mono italic">
                      &quot;{rw.originalBullet}&quot;
                    </p>
                  </div>

                  {/* After */}
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-4 relative">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
                        <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                        AI Enhanced High-Impact Version
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyBullet(rw.improvedBullet, idx)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-emerald-300 hover:text-white bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-lg transition-all"
                      >
                        {copiedBulletIndex === idx ? (
                          <>
                            <Check className="h-3 w-3" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy Bullet</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
                      {rw.improvedBullet}
                    </p>
                  </div>

                  {/* Why it works */}
                  <div className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="font-semibold text-purple-400 shrink-0">Why this scores higher:</span>
                    <span>{rw.impactExplanation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: ACTION ROADMAP */}
      {activeTab === 'actionPlan' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-purple-500/20 bg-[#0D1527] p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <ListChecks className="h-5 w-5 text-purple-400" />
              Your Personalized Optimization Roadmap
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Complete these step-by-step tasks to boost your score above 90+ and pass recruiter screens.
            </p>

            <div className="space-y-4">
              {actionPlan.map((step) => (
                <div
                  key={step.step}
                  className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-purple-500/30"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-sm font-bold text-white shadow-md shadow-purple-600/30">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-white">{step.title}</h4>
                      <span className="text-[11px] font-semibold text-purple-300 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded">
                        Est: {step.estimatedTime}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center no-print">
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-95 transition-all"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Re-Analyze Revised Resume</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security & Disclaimer Notice */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 text-[11px] text-slate-400 text-center leading-relaxed">
        <p>
          <strong className="text-slate-300">Disclaimer & Data Privacy:</strong> AI Career Copilot provides automated scoring and optimization suggestions based on algorithmic industry heuristics and Google Gemini AI. The ATS score is an analytical estimate and does not guarantee employer hiring or interview selection. Uploaded resumes are evaluated purely in volatile server memory and are never retained, sold, or persisted in any database.
        </p>
      </div>
    </div>
  );
};
