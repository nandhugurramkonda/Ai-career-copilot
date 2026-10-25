export interface AnalysisRequest {
  resumeText?: string;
  targetRole: string;
  experienceLevel: string;
  jobDescription?: string;
}

export interface ATSCheckItem {
  id: string;
  label: string;
  category: 'Formatting' | 'Content' | 'Keywords' | 'Structure';
  passed: boolean;
  feedback: string;
}

export interface MissingSkill {
  skill: string;
  category: 'Hard Skill' | 'Soft Skill' | 'Tool / Framework';
  importance: 'High' | 'Medium' | 'Low';
  reason: string;
}

export interface ResumeStrength {
  title: string;
  description: string;
  category: 'Impact' | 'Experience' | 'Technical' | 'Structure';
}

export interface ImprovementArea {
  area: string;
  priority: 'High' | 'Medium' | 'Low';
  issue: string;
  suggestion: string;
}

export interface BulletRewrite {
  originalBullet: string;
  improvedBullet: string;
  impactExplanation: string;
}

export interface ActionPlanStep {
  step: number;
  title: string;
  description: string;
  estimatedTime: string;
}

export interface ResumeAnalysisResult {
  overallScore: number;
  atsCompatibility: {
    score: number;
    status: 'High' | 'Moderate' | 'Needs Improvement';
    summary: string;
    checklist: ATSCheckItem[];
  };
  roleMatch: {
    targetRole: string;
    experienceLevel: string;
    matchPercentage: number;
    verdict: string;
    experienceFit: string;
    summary: string;
  };
  scoreBreakdown: {
    impactAndMetrics: number; // 0-100
    atsReadability: number;   // 0-100
    technicalAlignment: number; // 0-100
    brevityAndLayout: number; // 0-100
  };
  strengths: ResumeStrength[];
  areasToImprove: ImprovementArea[];
  skillsAnalysis: {
    matchedSkills: string[];
    missingSkills: MissingSkill[];
    recommendedKeywords: string[];
  };
  bulletRewrites: BulletRewrite[];
  actionPlan: ActionPlanStep[];
  extractedWordCount?: number;
  analysisDate?: string;
  isMockData?: boolean;
}

export interface AnalyzeApiResponse {
  success: boolean;
  data?: ResumeAnalysisResult;
  error?: string;
  warning?: string;
}
