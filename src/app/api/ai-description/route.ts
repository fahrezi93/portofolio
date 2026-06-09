import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// SECURITY: This API key is server-side only, never exposed to browser
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Using gemini-3.1-flash-lite: 500 RPD on free tier
const MODEL_ID = 'gemini-3.1-flash-lite';
const MODEL_NAME = 'Gemini 3.1 Flash Lite';

interface ProjectContext {
  title: string;
  category: 'development' | 'design' | 'video';
  type?: string;
  technologies?: string[];
  year?: string;
  imageUrl?: string; // optional: if provided, AI will analyze the image
}

async function fetchImageAsBase64(url: string): Promise<{ data: string; mimeType: string } | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const mimeType = contentType.split(';')[0].trim();
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    return { data: base64, mimeType };
  } catch {
    return null;
  }
}

function buildTextPrompt(context: ProjectContext, hasImage: boolean): string {
  const { title, category, type, technologies, year } = context;
  const techList = technologies?.join(', ') || 'modern technologies';
  const projectYear = year || new Date().getFullYear().toString();

  const imageInstruction = hasImage
    ? `You are given an image of the project. Analyze it carefully and use what you see to write a more specific and accurate description.`
    : '';

  return `Generate a very brief, punchy project description (1-2 short sentences, max 30 words) for a portfolio website. Do NOT make it overly detailed.
${imageInstruction}

Project Details:
- Title: ${title}
- Category: ${category}
- Type: ${type || category}
- Year: ${projectYear}
- Technologies: ${techList}

Requirements:
- Short and straight to the point.
- Keep it simple, e.g. "Desain [type] untuk [title] dengan gaya modern..."
- Do NOT write a long paragraph or be overly descriptive.
- If an image is provided, just mention one key visual vibe briefly.
- Do NOT start with "This project"`;
}

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured. Please check your GEMINI_API_KEY environment variable.' },
        { status: 503 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { action, context } = body as { action?: string; context: ProjectContext };

    // Validate context
    if (!context || !context.title || !context.category) {
      return NextResponse.json(
        { error: 'Missing required fields: title and category' },
        { status: 400 }
      );
    }

    // Initialize Gemini with the high-RPD lite model
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_ID });

    // Try to fetch image if imageUrl is provided
    let imageData: { data: string; mimeType: string } | null = null;
    if (context.imageUrl) {
      imageData = await fetchImageAsBase64(context.imageUrl);
    }

    const textPrompt = buildTextPrompt(context, !!imageData);

    // Build request parts — include image if available
    let result;
    if (imageData) {
      result = await model.generateContent([
        {
          inlineData: {
            data: imageData.data,
            mimeType: imageData.mimeType,
          },
        },
        { text: textPrompt },
      ]);
    } else {
      result = await model.generateContent(textPrompt);
    }

    const response = await result.response;
    const description = response.text().trim();

    return NextResponse.json({
      success: true,
      description,
      model: MODEL_NAME,
      usedImage: !!imageData,
      ...(action === 'test' && { tested: true }),
    });

  } catch (error) {
    console.error('[AI API] Error generating description:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate description';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
