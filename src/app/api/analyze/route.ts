import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPdf } from '@/lib/pdfExtractor';
import { analyzeResumeWithGemini } from '@/lib/geminiAnalyzer';
import { AnalyzeApiResponse } from '@/types';

// Max file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(req: NextRequest): Promise<NextResponse<AnalyzeApiResponse>> {
  try {
    const contentType = req.headers.get('content-type') || '';
    let resumeText = '';
    let targetRole = 'Software Engineer';
    let experienceLevel = 'Mid-Level Professional (3-5 years)';
    let jobDescription = '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      const textParam = formData.get('resumeText') as string | null;
      targetRole = (formData.get('targetRole') as string) || targetRole;
      experienceLevel = (formData.get('experienceLevel') as string) || experienceLevel;
      jobDescription = (formData.get('jobDescription') as string) || '';

      if (file && file.size > 0) {
        if (file.size > MAX_FILE_SIZE) {
          return NextResponse.json(
            { success: false, error: 'File size exceeds 10MB limit. Please upload a smaller resume file.' },
            { status: 400 }
          );
        }

        const fileName = file.name.toLowerCase();
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        if (fileName.endsWith('.pdf') || file.type === 'application/pdf') {
          const extracted = await extractTextFromPdf(buffer);
          resumeText = extracted.text;
        } else if (fileName.endsWith('.txt') || file.type.startsWith('text/')) {
          resumeText = buffer.toString('utf-8');
        } else {
          return NextResponse.json(
            { success: false, error: 'Unsupported file format. Please upload a PDF (.pdf) or Plain Text (.txt) file.' },
            { status: 400 }
          );
        }
      } else if (textParam) {
        resumeText = textParam;
      }
    } else {
      // JSON body
      const body = await req.json();
      resumeText = body.resumeText || '';
      targetRole = body.targetRole || targetRole;
      experienceLevel = body.experienceLevel || experienceLevel;
      jobDescription = body.jobDescription || '';
    }

    // Sanitize and check length
    resumeText = resumeText.trim();
    if (!resumeText || resumeText.length < 60) {
      return NextResponse.json(
        {
          success: false,
          error: 'Resume text is too short or empty (minimum 60 characters required). Please ensure your PDF contains searchable selectable text.',
        },
        { status: 400 }
      );
    }

    // Analyze securely via Gemini server-side
    const analysis = await analyzeResumeWithGemini(resumeText, {
      targetRole,
      experienceLevel,
      jobDescription,
    });

    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'An unexpected error occurred while analyzing the resume.';
    console.error('API Error in /api/analyze:', error);

    return NextResponse.json(
      {
        success: false,
        error: errorMsg,
      },
      { status: 500 }
    );
  }
}
