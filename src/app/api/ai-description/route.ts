import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// SECURITY: This API key is server-side only, never exposed to browser
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

interface ProjectContext {
  title: string;
  category: 'development' | 'design' | 'video';
  type?: string;
  technologies?: string[];
  year?: string;
}

function getPromptForCategory(context: ProjectContext): string {
  const { title, category, type, technologies, year } = context;
  
  const techList = technologies?.join(', ') || 'modern technologies';
  const projectYear = year || new Date().getFullYear().toString();
  
  const basePrompt = `Generate a professional, concise project description (2-3 sentences, max 150 words) for a portfolio website.

Project Details:
- Title: ${title}
- Type: ${type || category}
- Year: ${projectYear}
- Technologies: ${techList}

Requirements:
- Professional tone
- Highlight key features and technologies
- Focus on impact and value
- No generic phrases like "This project demonstrates..."
- Be specific and engaging`;

  return basePrompt;
}

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 503 }
      );
    }

    // Parse request body
    const body = await request.json();
    const context: ProjectContext = body.context;

    if (!context || !context.title || !context.category) {
      return NextResponse.json(
        { error: 'Missing required fields: title and category' },
        { status: 400 }
      );
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Generate description
    const prompt = getPromptForCategory(context);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const description = response.text().trim();

    return NextResponse.json({
      success: true,
      description,
    });

  } catch (error) {
    console.error('[AI API] Error generating description:', error);
    return NextResponse.json(
      { error: 'Failed to generate description' },
      { status: 500 }
    );
  }
}
