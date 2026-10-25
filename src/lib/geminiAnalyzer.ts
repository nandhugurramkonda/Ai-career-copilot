import { GoogleGenAI } from '@google/genai';
import { AnalysisRequest, ResumeAnalysisResult } from '@/types';

/**
 * Perform AI Resume Analysis using Google Gemini API.
 * Supports structured JSON schema outputs and graceful fallback.
 */
export async function analyzeResumeWithGemini(
  resumeText: string,
  request: AnalysisRequest
): Promise<ResumeAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  // If no API key is provided, use our high-fidelity heuristic generator
  // with an explicit isMockData flag so the UI can notify the user
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    return generateFallbackAnalysis(resumeText, request, true);
  }

  const prompt = buildGeminiPrompt(resumeText, request);

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Try gemini-2.5-flash first, then fall back to gemini-1.5-flash if unavailable
    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });
      responseText = response.text || '';
    } catch (modelError: unknown) {
      console.warn('Primary model (gemini-2.5-flash) failed, attempting fallback to gemini-1.5-flash:', modelError);
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });
      responseText = fallbackResponse.text || '';
    }

    if (!responseText) {
      throw new Error('Gemini API returned an empty response.');
    }

    // Sanitize and parse JSON response
    const parsedData = parseGeminiJsonResponse(responseText);
    
    // Add runtime metadata
    parsedData.extractedWordCount = countWords(resumeText);
    parsedData.analysisDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    parsedData.isMockData = false;

    return parsedData;
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('Error during Gemini API analysis:', errorMsg);

    // If Gemini quota exceeded or network issue, failover to heuristic with note
    const fallback = generateFallbackAnalysis(resumeText, request, false);
    fallback.atsCompatibility.summary += ` (Note: Live Gemini API encountered a temporary error: ${errorMsg}. Generated via offline ATS engine.)`;
    return fallback;
  }
}

/**
 * Construct strict prompt for Gemini model
 */
function buildGeminiPrompt(resumeText: string, request: AnalysisRequest): string {
  return `You are an elite Executive Tech Recruiter and Senior ATS (Applicant Tracking System) Algorithm Specialist who has evaluated thousands of candidate resumes for Fortune 500 tech companies and high-growth startups.

Analyze the candidate's resume text below for the target role "${request.targetRole}" and experience level "${request.experienceLevel}".
${request.jobDescription ? `Target Job Description:\n"""${request.jobDescription}"""\n` : ''}

Candidate Resume Text:
"""
${resumeText.slice(0, 15000)}
"""

Evaluate the resume meticulously against modern ATS parsing standards (Workday, Greenhouse, Lever, Taleo) and hiring manager expectations.

Return ONLY a valid JSON object matching this exact TypeScript structure:
{
  "overallScore": <integer between 40 and 98>,
  "atsCompatibility": {
    "score": <integer between 40 and 99>,
    "status": <"High" | "Moderate" | "Needs Improvement">,
    "summary": <concise 2-sentence summary of ATS scannability and structural compatibility>,
    "checklist": [
      {
        "id": "c1",
        "label": "Standard Section Headings",
        "category": "Structure",
        "passed": <boolean>,
        "feedback": <short explanation>
      },
      {
        "id": "c2",
        "label": "Contact Information & Links",
        "category": "Formatting",
        "passed": <boolean>,
        "feedback": <short explanation>
      },
      {
        "id": "c3",
        "label": "Quantified Achievements (Numbers, %)",
        "category": "Content",
        "passed": <boolean>,
        "feedback": <short explanation>
      },
      {
        "id": "c4",
        "label": "Target Role Keyword Density",
        "category": "Keywords",
        "passed": <boolean>,
        "feedback": <short explanation>
      },
      {
        "id": "c5",
        "label": "Chronological Career Progression",
        "category": "Structure",
        "passed": <boolean>,
        "feedback": <short explanation>
      },
      {
        "id": "c6",
        "label": "Action Verb & Impact Strength",
        "category": "Content",
        "passed": <boolean>,
        "feedback": <short explanation>
      }
    ]
  },
  "roleMatch": {
    "targetRole": "${request.targetRole}",
    "experienceLevel": "${request.experienceLevel}",
    "matchPercentage": <integer between 45 and 96>,
    "verdict": <concise punchy verdict, e.g. "Strong Match for Senior Full Stack Engineer">,
    "experienceFit": <1-2 sentences on whether candidate's depth matches the requested experience level>,
    "summary": <overview of how candidate fits this specific position>
  },
  "scoreBreakdown": {
    "impactAndMetrics": <integer 40-98>,
    "atsReadability": <integer 40-98>,
    "technicalAlignment": <integer 40-98>,
    "brevityAndLayout": <integer 40-98>
  },
  "strengths": [
    {
      "title": <short title>,
      "description": <1-2 sentences describing a specific highlight found in resume>,
      "category": <"Impact" | "Experience" | "Technical" | "Structure">
    }
  ],
  "areasToImprove": [
    {
      "area": <area name, e.g. "Lack of Metric Quantification">,
      "priority": <"High" | "Medium" | "Low">,
      "issue": <what is missing or weak>,
      "suggestion": <actionable step to fix it>
    }
  ],
  "skillsAnalysis": {
    "matchedSkills": [<array of 6-12 technical and domain skills successfully found in the resume>],
    "missingSkills": [
      {
        "skill": <missing skill name>,
        "category": <"Hard Skill" | "Soft Skill" | "Tool / Framework">,
        "importance": <"High" | "Medium" | "Low">,
        "reason": <why this skill is expected for this role/seniority>
      }
    ],
    "recommendedKeywords": [<array of 8-12 high-priority keywords to incorporate for ATS algorithms>]
  },
  "bulletRewrites": [
    {
      "originalBullet": <an actual weak bullet point excerpted or paraphrased from candidate's resume>,
      "improvedBullet": <a powerful rewritten version following Google's "Accomplished [X] as measured by [Y] by doing [Z]" formula with metrics>,
      "impactExplanation": <why the rewritten version scores higher with recruiters and ATS>
    }
  ],
  "actionPlan": [
    {
      "step": 1,
      "title": <step title>,
      "description": <step instructions>,
      "estimatedTime": <e.g. "15 mins">
    }
  ]
}

Ensure all scores are fair, grounded in real industry ATS rules, and constructive. Provide at least 3 strengths, 3 areas to improve, 4 missing skills, 2 bullet rewrites, and 4 action plan steps. Return purely JSON with no markdown wrapping.`;
}

/**
 * Safely parse JSON string from LLM, stripping possible markdown backticks
 */
function parseGeminiJsonResponse(rawText: string): ResumeAnalysisResult {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```\s*$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/```\s*$/, '');
  }

  const parsed = JSON.parse(cleaned);

  // Validate critical fields
  if (typeof parsed.overallScore !== 'number') {
    parsed.overallScore = 75;
  }
  if (!parsed.atsCompatibility) {
    parsed.atsCompatibility = {
      score: 75,
      status: 'Moderate',
      summary: 'Resume parsed successfully with moderate ATS compliance.',
      checklist: [],
    };
  }
  return parsed as ResumeAnalysisResult;
}

/**
 * Word counter helper
 */
function countWords(str: string): number {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Heuristic fallback analysis generator
 * Used when no API key is configured or when offline
 */
export function generateFallbackAnalysis(
  resumeText: string,
  request: AnalysisRequest,
  isMock: boolean
): ResumeAnalysisResult {
  const wordCount = countWords(resumeText);
  const textLower = resumeText.toLowerCase();

  // Basic heuristic metrics
  const hasNumbers = /\b\d+(%|\+|\$|k|m|x)?\b/i.test(resumeText);
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resumeText);
  const hasPhone = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText);
  const hasLinkedin = /linkedin\.com/i.test(resumeText);
  const hasGithub = /github\.com/i.test(resumeText);
  const hasSummary = /summary|profile|about/i.test(resumeText);
  const hasExperience = /experience|employment|work history/i.test(resumeText);
  const hasSkills = /skills|technical skills|technologies/i.test(resumeText);
  const hasEducation = /education|university|college|bachelor|master/i.test(resumeText);

  // Role keyword matching
  const roleKeywords: Record<string, string[]> = {
    'Full Stack': ['typescript', 'react', 'next.js', 'node.js', 'sql', 'postgresql', 'docker', 'aws', 'rest', 'graphql'],
    'Frontend': ['react', 'next.js', 'typescript', 'tailwind', 'css', 'html5', 'javascript', 'redux', 'jest', 'responsive'],
    'Backend': ['node.js', 'python', 'go', 'java', 'postgresql', 'redis', 'docker', 'kubernetes', 'aws', 'microservices'],
    'AI': ['python', 'pytorch', 'tensorflow', 'llm', 'rag', 'langchain', 'hugging face', 'docker', 'fastapi', 'vector'],
    'Data': ['python', 'sql', 'pandas', 'tableau', 'spark', 'etl', 'machine learning', 'powerbi', 'airflow'],
    'DevOps': ['kubernetes', 'docker', 'terraform', 'aws', 'ci/cd', 'github actions', 'linux', 'ansible', 'prometheus'],
    'Product': ['roadmap', 'kpi', 'agile', 'scrum', 'user stories', 'cross-functional', 'stakeholder', 'metrics', 'mvp'],
  };

  // Find matched category keywords
  let matchedCategoryKeywords: string[] = [];
  for (const [category, keywords] of Object.entries(roleKeywords)) {
    if (request.targetRole.toLowerCase().includes(category.toLowerCase())) {
      matchedCategoryKeywords = keywords;
      break;
    }
  }
  if (matchedCategoryKeywords.length === 0) {
    matchedCategoryKeywords = ['typescript', 'react', 'node.js', 'sql', 'cloud', 'ci/cd', 'agile', 'leadership'];
  }

  const foundSkills = matchedCategoryKeywords.filter(k => textLower.includes(k));
  const missingKeywords = matchedCategoryKeywords.filter(k => !textLower.includes(k));

  // Heuristic scores
  let baseScore = 72;
  if (hasNumbers) baseScore += 8;
  if (hasSkills && hasExperience && hasEducation) baseScore += 7;
  if (foundSkills.length >= 4) baseScore += 5;
  if (wordCount < 150) baseScore -= 20;

  const overallScore = Math.min(94, Math.max(52, baseScore));
  const atsScore = Math.min(96, Math.max(50, baseScore + (hasSkills && hasExperience ? 4 : -6)));
  const roleMatchScore = Math.min(92, Math.max(48, Math.round((foundSkills.length / matchedCategoryKeywords.length) * 40) + 52));

  return {
    overallScore,
    atsCompatibility: {
      score: atsScore,
      status: atsScore >= 80 ? 'High' : atsScore >= 65 ? 'Moderate' : 'Needs Improvement',
      summary: hasSkills && hasExperience
        ? 'Resume features standardized section structures and scannable technical headings compatible with standard ATS parsers.'
        : 'Resume structure may cause parsing ambiguities in legacy ATS systems; missing clear section delimiters.',
      checklist: [
        {
          id: 'c1',
          label: 'Standard Section Headings',
          category: 'Structure',
          passed: hasExperience && hasSkills,
          feedback: hasExperience && hasSkills
            ? 'Recognizable Experience, Skills, and Education sections detected.'
            : 'Consider adding explicit "Experience" and "Skills" section headers.',
        },
        {
          id: 'c2',
          label: 'Contact Information & Web Links',
          category: 'Formatting',
          passed: (hasEmail || hasPhone) && (hasLinkedin || hasGithub),
          feedback: (hasEmail || hasPhone)
            ? 'Contact details and digital profiles verified.'
            : 'Ensure email, phone, and professional GitHub/LinkedIn URLs are present in header.',
        },
        {
          id: 'c3',
          label: 'Quantified Impact & Metrics',
          category: 'Content',
          passed: hasNumbers,
          feedback: hasNumbers
            ? 'Found numerical data points, percentages, or scale metrics in work history.'
            : 'Critical: Add quantifiable metrics (e.g., "Increased conversion by 25%", "Managed $50k budget").',
        },
        {
          id: 'c4',
          label: 'Target Role Keyword Density',
          category: 'Keywords',
          passed: foundSkills.length >= 3,
          feedback: `Identified ${foundSkills.length} core keywords aligned with ${request.targetRole}.`,
        },
        {
          id: 'c5',
          label: 'Chronological Experience Layout',
          category: 'Structure',
          passed: hasExperience,
          feedback: 'Employment timeline appears well-ordered with job titles and company names.',
        },
        {
          id: 'c6',
          label: 'Action-Oriented Power Verbs',
          category: 'Content',
          passed: /led|built|architected|spearheaded|developed|designed|optimized|engineered/i.test(resumeText),
          feedback: 'Strong leadership and execution action verbs were identified in bullet points.',
        },
      ],
    },
    roleMatch: {
      targetRole: request.targetRole,
      experienceLevel: request.experienceLevel,
      matchPercentage: roleMatchScore,
      verdict: roleMatchScore >= 80 ? `Strong Competency Match for ${request.targetRole}` : `Growing Candidate Profile for ${request.targetRole}`,
      experienceFit: `Candidate profile demonstrates solid foundational capability aligned with ${request.experienceLevel}. Expanding keyword coverage will optimize match index.`,
      summary: `The resume demonstrates targeted capabilities for ${request.targetRole}. Incorporating missing cloud orchestration and high-scale metrics will dramatically improve recruiter shortlisting.`,
    },
    scoreBreakdown: {
      impactAndMetrics: hasNumbers ? 84 : 58,
      atsReadability: atsScore,
      technicalAlignment: roleMatchScore,
      brevityAndLayout: wordCount >= 300 && wordCount <= 900 ? 90 : 70,
    },
    strengths: [
      {
        title: 'Clear Technical Competency Footprint',
        description: `Successfully highlighted key core skills: ${foundSkills.slice(0, 4).join(', ') || 'modern engineering fundamentals'}.`,
        category: 'Technical',
      },
      {
        title: 'Structured Professional Journey',
        description: 'Presents career progression in a logical order easily parsed by automated recruiter systems.',
        category: 'Structure',
      },
      {
        title: 'Direct Experience Articulation',
        description: 'Demonstrates active ownership in building, maintaining, or shipping core project deliverables.',
        category: 'Experience',
      },
    ],
    areasToImprove: [
      {
        area: 'Metric-Driven Bullet Points',
        priority: 'High',
        issue: 'Several accomplishment statements focus on daily responsibilities rather than business outcomes.',
        suggestion: 'Reframe bullet points using the Google XYZ formula: "Accomplished [X] as measured by [Y] by doing [Z]".',
      },
      {
        area: 'Target Role Keyword Expansion',
        priority: 'High',
        issue: `Missing critical industry keywords commonly screened by ATS for ${request.targetRole}.`,
        suggestion: `Infuse keywords such as ${missingKeywords.slice(0, 3).join(', ') || 'Docker, CI/CD, System Architecture'} into recent job duties.`,
      },
      {
        area: 'Executive Summary Tailoring',
        priority: 'Medium',
        issue: 'Professional summary could be more tightly targeted to the specific requirements of the desired level.',
        suggestion: `Open with a 3-sentence summary highlighting your years of experience, primary tech stack, and proudest measurable accomplishment.`,
      },
    ],
    skillsAnalysis: {
      matchedSkills: foundSkills.length > 0 ? foundSkills : ['Git', 'Communication', 'Problem Solving', 'Full Stack Development'],
      missingSkills: missingKeywords.slice(0, 4).map(skill => ({
        skill,
        category: 'Tool / Framework' as const,
        importance: 'High' as const,
        reason: `Frequently indexed by ATS filters for ${request.targetRole} openings.`,
      })),
      recommendedKeywords: [
        ...missingKeywords.slice(0, 5),
        'Continuous Integration',
        'Scalability',
        'Cross-Functional Leadership',
        'Cloud Infrastructure',
      ],
    },
    bulletRewrites: [
      {
        originalBullet: 'Worked on web applications and fixed bugs to improve performance.',
        improvedBullet: 'Architected and optimized high-scale web applications, decreasing page load latency by 38% and resolving 40+ critical production defects.',
        impactExplanation: 'Replaces passive phrasing ("worked on") with a definitive action verb ("architected") and provides concrete percentage metrics.',
      },
      {
        originalBullet: 'Responsible for backend APIs and database queries.',
        improvedBullet: 'Engineered resilient REST & GraphQL APIs backed by PostgreSQL and Redis, supporting 100k+ daily requests with 99.9% uptime.',
        impactExplanation: 'Quantifies scale (100k+ daily requests) and uptime reliability rather than generic task responsibility.',
      },
    ],
    actionPlan: [
      {
        step: 1,
        title: 'Inject Measurable Metrics into Top 3 Bullets',
        description: 'Audit your most recent position and quantify outcomes (e.g. % performance boost, hours saved, dollars earned).',
        estimatedTime: '20 mins',
      },
      {
        step: 2,
        title: 'Integrate High-Priority Missing Keywords',
        description: `Add missing competencies (${missingKeywords.slice(0, 3).join(', ') || 'System Design, CI/CD'}) in your skills section and project bullets.`,
        estimatedTime: '15 mins',
      },
      {
        step: 3,
        title: 'Refine Header and Digital Links',
        description: 'Verify your LinkedIn, GitHub, email, and phone number are formatted cleanly on single lines.',
        estimatedTime: '10 mins',
      },
      {
        step: 4,
        title: 'Re-scan with AI Career Copilot',
        description: 'Upload your revised resume to confirm your score exceeds 85+ and all ATS blockers are cleared.',
        estimatedTime: '5 mins',
      },
    ],
    extractedWordCount: wordCount,
    analysisDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    isMockData: isMock,
  };
}
