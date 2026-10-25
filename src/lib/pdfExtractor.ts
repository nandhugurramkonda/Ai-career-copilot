/**
 * Server-side PDF and text extractor for AI Career Copilot.
 * Safely parses PDF buffers and sanitizes text for LLM consumption.
 */

export async function extractTextFromPdf(buffer: Buffer): Promise<{ text: string; pageCount: number }> {
  try {
    const { PDFParse } = await import('pdf-parse');
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    
    // Safely cleanup parser resources
    try {
      await parser.destroy();
    } catch {
      // Ignore destroy failure if any
    }

    const rawText = result.text || '';
    const cleanedText = cleanExtractedText(rawText);
    const pageCount = result.pages?.length || 1;

    return {
      text: cleanedText,
      pageCount,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn('[PDF Extractor] Primary parser notice:', message);

    // Fallback: extract ASCII readable string sequences if structural parse threw an error
    const fallbackText = extractAsciiFallback(buffer);
    if (fallbackText.length > 80) {
      return {
        text: cleanExtractedText(fallbackText),
        pageCount: 1,
      };
    }

    throw new Error(`Unable to extract text from PDF (${message}). Please ensure the file is not password-protected or an unsearchable flattened image.`);
  }
}

/**
 * Clean and normalize extracted text to remove noisy artifacts, consecutive linebreaks, etc.
 */
export function cleanExtractedText(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/[ \u00A0]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Fallback regex-based string extraction for malformed PDF streams
 */
function extractAsciiFallback(buffer: Buffer): string {
  const str = buffer.toString('utf-8');
  // Match readable blocks of text
  const matches = str.match(/[\x20-\x7E\s]{4,}/g);
  if (!matches) return '';
  return matches
    .filter(m => !m.startsWith('/Font') && !m.startsWith('/Filter') && !m.startsWith('/MediaBox'))
    .join(' ');
}
