import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Call OpenAI Vision API to check if image contains a face
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
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this image and determine if it contains a clear, visible human face. Respond with ONLY "YES" if a face is clearly visible and centered, or "NO" if no face is present, the face is unclear, or the image quality is poor. Be strict - the face should be the main subject of the image.',
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
        max_tokens: 10,
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    const result = data.choices[0]?.message?.content?.trim().toUpperCase();

    return NextResponse.json({
      isFace: result === 'YES',
    });
  } catch (error) {
    console.error('Face detection error:', error);
    return NextResponse.json(
      { error: 'Failed to check for face in image' },
      { status: 500 }
    );
  }
}
