import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const isConfigured = Boolean(apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE' && apiKey.length > 10);

  return NextResponse.json({
    status: 'ok',
    geminiConfigured: isConfigured,
    model: 'gemini-2.5-flash',
    timestamp: new Date().toISOString(),
  });
}
