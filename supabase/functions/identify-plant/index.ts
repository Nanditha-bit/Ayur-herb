import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageData } = await req.json();
    
    if (!imageData) {
      return new Response(
        JSON.stringify({ error: 'Image data is required' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Analyzing plant image with Lovable AI...');

    // Call Lovable AI with vision capabilities
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an Ayurvedic plant identification expert. Analyze plant images and identify them based on their botanical features. 
Return ONLY a JSON object (no markdown, no code blocks) with this exact structure:
{
  "confidence": "high/medium/low",
  "sanskritName": "Sanskrit name",
  "botanicalName": "Botanical name",
  "commonName": "Common English name",
  "family": "Plant family",
  "keyFeatures": ["feature1", "feature2"],
  "possibleMatches": ["plant1", "plant2"]
}`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Identify this plant based on Ayurvedic and botanical knowledge. Provide the Sanskrit name, botanical name, family, and key identifying features.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        ],
        temperature: 0.3,
        max_tokens: 500
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), 
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }), 
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('AI Response:', data);
    
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI model');
    }

    // Parse the JSON response, handling potential markdown code blocks
    let identificationResult;
    try {
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      identificationResult = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Invalid AI response format');
    }

    console.log('Plant identified:', identificationResult);

    return new Response(
      JSON.stringify({ 
        success: true,
        identification: identificationResult 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in identify-plant function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
