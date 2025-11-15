import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Call OpenAI Vision API to analyze skin
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an expert dermatologist and skincare specialist. Analyze facial skin images and provide detailed, professional assessments. Focus on visible skin conditions, texture, tone, hydration levels, and any concerns. Be constructive and helpful.',
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this facial image and provide a comprehensive skin analysis. Return your response as a JSON object with the following structure:
{
  "goodPoints": ["array of positive observations about the skin"],
  "concerns": ["array of areas that need improvement or attention"],
  "overallAssessment": "a brief overall summary of the skin condition",
  "recommendations": ["array of specific skincare recommendations and tips"]
}

Be specific, professional, and constructive. Focus on visible characteristics like:
- Skin texture and smoothness
- Tone and evenness
- Hydration levels
- Visible concerns (acne, dark spots, fine lines, etc.)
- Overall skin health

Provide 3-5 items for each category.`,
              },
              {
                type: 'image_url',
                image_url: {
                  url: image,
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    const analysisText = data.choices[0]?.message?.content;

    if (!analysisText) {
      throw new Error('No analysis returned from API');
    }

    // Parse the JSON response
    const analysis = JSON.parse(analysisText);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Skin analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze skin. Please try again.' },
      { status: 500 }
    );
  }
}
