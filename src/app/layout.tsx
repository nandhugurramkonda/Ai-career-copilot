import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#060913',
};

export const metadata: Metadata = {
  title: 'AI Career Copilot – Resume Analyzer & ATS Optimizer',
  description:
    'Free AI-powered resume analyzer powered by Google Gemini. Get instantaneous ATS compatibility scoring, keyword gap analysis, Google XYZ bullet-point rewrites, and role matching.',
  keywords: [
    'AI resume analyzer',
    'ATS checker',
    'resume score',
    'Google Gemini AI',
    'career copilot',
    'job search',
    'ATS optimization',
    'resume builder',
  ],
  authors: [{ name: 'AI Career Copilot Team' }],
  openGraph: {
    title: 'AI Career Copilot – Resume Analyzer',
    description: 'Optimize your resume for modern ATS systems and score higher with Google Gemini 2.5 AI.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#060913] text-slate-100 antialiased selection:bg-purple-600 selection:text-white flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
