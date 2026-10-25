'use client';

import React, { useState, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ResumeUploader } from '@/components/ResumeUploader';
import { LoadingScreen } from '@/components/LoadingScreen';
import { AnalysisDashboard } from '@/components/AnalysisDashboard';
import { FeaturesSection } from '@/components/FeaturesSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { ATSGuideSection } from '@/components/ATSGuideSection';
import { Footer } from '@/components/Footer';
import { ResumeAnalysisResult, AnalyzeApiResponse } from '@/types';
import { SAMPLE_RESUMES } from '@/data/sampleResumes';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<string>('Software Engineer');
  const [apiError, setApiError] = useState<string | null>(null);
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);
  const analyzerRef = useRef<HTMLDivElement>(null);

  const scrollToAnalyzer = () => {
    const el = document.getElementById('analyzer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSample = (sampleId: string) => {
    setSelectedSampleId(sampleId);
    scrollToAnalyzer();
  };

  const handleTrySampleFromHero = () => {
    handleSelectSample('fullstack-senior');
  };

  const handleAnalyze = async (
    payload: FormData | { resumeText: string; targetRole: string; experienceLevel: string; jobDescription: string }
  ) => {
    setIsLoading(true);
    setApiError(null);

    // Determine target role for loading preview
    if (payload instanceof FormData) {
      setCurrentRole((payload.get('targetRole') as string) || 'Target Role');
    } else {
      setCurrentRole(payload.targetRole || 'Target Role');
    }

    // Scroll down to the loading screen
    setTimeout(() => {
      const el = document.getElementById('analyzer-viewport');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);

    try {
      let res: Response;
      if (payload instanceof FormData) {
        res = await fetch('/api/analyze', {
          method: 'POST',
          body: payload,
        });
      } else {
        res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const json: AnalyzeApiResponse = await res.json();

      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error || `Server responded with status ${res.status}`);
      }

      setAnalysisResult(json.data);

      // Scroll smoothly to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Analysis failed. Please try again.';
      setApiError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setApiError(null);
    setTimeout(() => {
      scrollToAnalyzer();
    }, 100);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#060913] text-slate-100 selection:bg-purple-600 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        onSelectSample={handleSelectSample}
        onScrollToAnalyzer={scrollToAnalyzer}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onAnalyzeClick={scrollToAnalyzer}
          onTrySample={handleTrySampleFromHero}
        />

        {/* Workspace / Analyzer Section */}
        <section
          id="analyzer-viewport"
          className="relative scroll-mt-20 px-4 py-8 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            {/* API Error Alert */}
            {apiError && (
              <div className="mx-auto mb-6 max-w-4xl rounded-2xl border border-rose-500/40 bg-rose-950/50 p-5 text-rose-200 shadow-xl backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white">Analysis Encountered an Issue</h4>
                    <p className="mt-1 text-xs text-rose-300 leading-relaxed">{apiError}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setApiError(null)}
                        className="rounded-lg bg-rose-600/30 border border-rose-500/40 px-3 py-1 text-xs font-semibold text-rose-200 hover:bg-rose-600/50 transition-colors"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* State 1: Loading state */}
            {isLoading ? (
              <LoadingScreen targetRole={currentRole} />
            ) : analysisResult ? (
              /* State 2: Analysis Results Dashboard */
              <div ref={resultsRef} id="results" className="scroll-mt-24">
                <AnalysisDashboard
                  result={analysisResult}
                  onReset={handleReset}
                />
              </div>
            ) : (
              /* State 3: Resume Uploader Form */
              <ResumeUploader
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
                selectedSampleId={selectedSampleId}
              />
            )}
          </div>
        </section>

        {/* Informational Sections */}
        <FeaturesSection />
        <HowItWorksSection />
        <ATSGuideSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
