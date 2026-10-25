'use client';

import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import {
  UploadCloud,
  FileText,
  X,
  Sparkles,
  ChevronDown,
  AlertCircle,
  FileCheck,
  CheckCircle2,
  Briefcase,
  Layers,
  FileCode,
} from 'lucide-react';
import { POPULAR_ROLES, EXPERIENCE_LEVELS, SAMPLE_RESUMES } from '@/data/sampleResumes';

interface ResumeUploaderProps {
  onAnalyze: (formData: FormData | { resumeText: string; targetRole: string; experienceLevel: string; jobDescription: string }) => void;
  isLoading: boolean;
  selectedSampleId?: string | null;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  onAnalyze,
  isLoading,
  selectedSampleId,
}) => {
  // Tabs: 'upload' | 'paste'
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const [targetRole, setTargetRole] = useState<string>(POPULAR_ROLES[0]);
  const [customRole, setCustomRole] = useState<string>('');
  const [experienceLevel, setExperienceLevel] = useState<string>(EXPERIENCE_LEVELS[2]);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [showJobDescription, setShowJobDescription] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // If a sample is selected externally or changed
  const handleLoadSample = (sampleId: string) => {
    const sample = SAMPLE_RESUMES.find((s) => s.id === sampleId);
    if (sample) {
      setActiveTab('paste');
      setFile(null);
      setResumeText(sample.content);
      setTargetRole(sample.targetRole);
      setExperienceLevel(sample.experienceLevel);
      if (sample.jobDescription) {
        setJobDescription(sample.jobDescription);
        setShowJobDescription(true);
      }
      setErrorMessage(null);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    validateAndSetFile(selected);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const validateAndSetFile = (selected?: File) => {
    setErrorMessage(null);
    if (!selected) return;

    // Check size (10MB)
    if (selected.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds 10MB limit. Please upload a smaller PDF or text file.');
      return;
    }

    const name = selected.name.toLowerCase();
    if (!name.endsWith('.pdf') && !name.endsWith('.txt')) {
      setErrorMessage('Please upload a PDF (.pdf) or text (.txt) document.');
      return;
    }

    setFile(selected);
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const effectiveRole = targetRole === 'Custom Role' ? customRole.trim() : targetRole;
    if (!effectiveRole) {
      setErrorMessage('Please specify your target job role.');
      return;
    }

    if (activeTab === 'upload') {
      if (!file) {
        setErrorMessage('Please upload a resume file (PDF or TXT) or switch to the Paste Text tab.');
        return;
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('targetRole', effectiveRole);
      formData.append('experienceLevel', experienceLevel);
      if (jobDescription.trim()) {
        formData.append('jobDescription', jobDescription.trim());
      }
      onAnalyze(formData);
    } else {
      if (!resumeText.trim() || resumeText.trim().length < 60) {
        setErrorMessage('Please paste at least 60 characters of resume content to evaluate.');
        return;
      }
      onAnalyze({
        resumeText: resumeText.trim(),
        targetRole: effectiveRole,
        experienceLevel,
        jobDescription: jobDescription.trim(),
      });
    }
  };

  return (
    <div
      id="analyzer"
      className="relative mx-auto max-w-4xl scroll-mt-24 rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#0D1527] to-[#0A0F1D] p-5 sm:p-8 lg:p-10 shadow-2xl shadow-purple-950/40 backdrop-blur-xl"
    >
      {/* Glow element */}
      <div className="pointer-events-none absolute -top-12 left-1/2 -z-10 h-32 w-80 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />

      {/* Header of Analyzer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-purple-500 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Resume Analyzer & ATS Benchmark
            </h2>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Upload your PDF or paste your resume to receive AI scoring and suggestions.
          </p>
        </div>

        {/* Sample Resume Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Quick Demo:</span>
          <div className="flex gap-1.5">
            {SAMPLE_RESUMES.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleLoadSample(sample.id)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  resumeText === sample.content
                    ? 'border border-purple-400 bg-purple-600/30 text-purple-200'
                    : 'border border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
                title={`Load ${sample.name}`}
              >
                {sample.id === 'fullstack-senior' ? '⚡ Full Stack' : '🤖 AI Engineer'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error alert if any */}
      {errorMessage && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-950/40 p-4 text-sm text-rose-200 animate-in fade-in duration-200">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
          <div className="flex-1">{errorMessage}</div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-rose-400 hover:text-rose-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Step 1: Input method tabs */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-900/60 text-purple-300 text-[11px] font-bold">
                1
              </span>
              Resume Content (PDF or Text)
            </label>
            <div className="flex rounded-lg border border-slate-800 bg-slate-950/60 p-0.5">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('upload');
                  setErrorMessage(null);
                }}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                  activeTab === 'upload'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Upload File (.pdf)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('paste');
                  setErrorMessage(null);
                }}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                  activeTab === 'paste'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Paste Text
              </button>
            </div>
          </div>

          {activeTab === 'upload' ? (
            /* PDF Upload Dropzone */
            <div>
              {!file ? (
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
                    dragActive
                      ? 'border-purple-400 bg-purple-950/30'
                      : 'border-slate-700/80 bg-slate-900/30 hover:border-purple-500/60 hover:bg-slate-900/60'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.txt,application/pdf,text/plain"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-950/60 border border-purple-500/30 text-purple-300 transition-transform group-hover:scale-105">
                    <UploadCloud className="h-7 w-7" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-white">
                    Drop your resume PDF here or <span className="text-purple-400 underline underline-offset-2">browse files</span>
                  </p>
                  <p className="mt-1.5 text-xs text-slate-400">
                    Supports PDF and TXT (Max 10MB) • Processed securely in-memory
                  </p>
                </div>
              ) : (
                /* File Selected Card */
                <div className="flex items-center justify-between rounded-2xl border border-purple-500/40 bg-purple-950/20 p-4">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300">
                      <FileCheck className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white truncate max-w-[240px] sm:max-w-md">
                        {file.name}
                      </h4>
                      <p className="text-xs text-purple-300/80">
                        {(file.size / 1024).toFixed(1)} KB • Ready for server-side extraction
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-950/50 hover:text-rose-300 transition-colors"
                      title="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.txt,application/pdf,text/plain"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          ) : (
            /* Direct Text Paste Area */
            <div>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your raw resume text here (contact info, work history, skills, education)..."
                rows={9}
                className="w-full rounded-2xl border border-slate-700/80 bg-slate-950/70 p-4 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 font-mono text-xs sm:text-sm"
              />
              <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>Tip: You can paste text or use the quick demo buttons above.</span>
                <span>{resumeText.trim().split(/\s+/).filter(Boolean).length} words</span>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Target Job Role & Experience Level */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Target Role Dropdown */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-900/60 text-purple-300 text-[11px] font-bold">
                2
              </span>
              Target Job Role
            </label>
            <div className="relative">
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-700/80 bg-slate-900/80 px-4 py-2.5 text-sm text-white outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              >
                {POPULAR_ROLES.map((role) => (
                  <option key={role} value={role} className="bg-slate-900 text-white">
                    {role}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-3 h-4 w-4 text-slate-400" />
            </div>

            {targetRole === 'Custom Role' && (
              <div className="mt-2.5">
                <input
                  type="text"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  placeholder="Enter specific title (e.g. Lead Kubernetes Architect)"
                  className="w-full rounded-xl border border-purple-500/50 bg-slate-950 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-purple-400"
                />
              </div>
            )}
          </div>

          {/* Experience Level Dropdown */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-900/60 text-purple-300 text-[11px] font-bold">
                3
              </span>
              Experience Level
            </label>
            <div className="relative">
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-700/80 bg-slate-900/80 px-4 py-2.5 text-sm text-white outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              >
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl} className="bg-slate-900 text-white">
                    {lvl}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-3 h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Optional Job Description Collapsible */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/30 p-3.5">
          <button
            type="button"
            onClick={() => setShowJobDescription(!showJobDescription)}
            className="flex w-full items-center justify-between text-xs font-medium text-slate-300 hover:text-white"
          >
            <div className="flex items-center gap-2">
              <FileCode className="h-4 w-4 text-purple-400" />
              <span>Target Job Description (Optional - For 1-to-1 ATS matching)</span>
            </div>
            <span className="text-[11px] text-purple-400 underline">
              {showJobDescription ? 'Hide' : '+ Add Job Description'}
            </span>
          </button>

          {showJobDescription && (
            <div className="mt-3">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job posting text or key bullet requirements here to compare exact keyword matching..."
                rows={4}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 p-3 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-purple-500"
              />
            </div>
          )}
        </div>

        {/* Submit Action Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 px-6 py-4 text-base font-semibold text-white shadow-xl shadow-purple-600/30 transition-all hover:shadow-2xl hover:shadow-purple-500/50 hover:brightness-110 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60"
          >
            <Sparkles className="h-5 w-5 text-purple-200 transition-transform group-hover:rotate-12" />
            <span>Generate Deep Resume Analysis</span>
          </button>
          <p className="mt-2 text-center text-xs text-slate-400">
            Encrypted in-flight • Zero permanent file storage • AI results generated in seconds
          </p>
        </div>
      </form>
    </div>
  );
};
