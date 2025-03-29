import axios from 'axios';

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent';

export interface GeminiImageGenerationConfig {
  temperature?: number;
  topP?: number;
  topK?: number;
  maxOutputTokens?: number;
}

interface GeminiPart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

interface GeminiContent {
  parts: GeminiPart[];
}

interface GeminiCandidate {
  content: GeminiContent;
  finishReason: string;
  index: number;
}

interface GeminiResponse {
  candidates: GeminiCandidate[];
  usageMetadata: {
    promptTokenCount: number;
    promptTokensDetails: Array<{
      modality: string;
      tokenCount: number;
    }>;
    totalTokenCount: number;
  };
  modelVersion: string;
}

export const generateImageWithGemini = async (
  prompt: string,
  imageFile: File,
  apiKey: string,
  config: GeminiImageGenerationConfig = {}
): Promise<string> => {
  try {
    // Convert image file to base64 using browser-native methods
    const base64Image = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });

    // Enhanced prompt for better facial accuracy
    const enhancedPrompt = `${prompt} CRITICAL: Maintain photorealistic facial features, ethnic features, and skin tone from the original photo. Do not alter or stylize faces.`;

    const requestBody = {
      contents: [{
        role: 'user',
        parts: [
          { text: enhancedPrompt },
          {
            inline_data: {
              mime_type: imageFile.type,
              data: base64Image
            }
          }
        ]
      }],
      safetySettings: [
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' }
      ],
      generationConfig: {
        temperature: config.temperature ?? 0.6, // Lower temperature for more consistent faces
        topP: config.topP ?? 0.99, // Keep high top_p for style variation
        topK: config.topK ?? 40, // Keep high top_k for style variation
        maxOutputTokens: config.maxOutputTokens ?? 8192,
        responseMimeType: 'text/plain',
        responseModalities: ['image', 'text']
      }
    };

    const response = await axios.post<GeminiResponse>(
      `${GEMINI_API_BASE}?key=${apiKey}`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Log the response structure for debugging
    console.log('Gemini API Response:', JSON.stringify(response.data, null, 2));

    // Extract the generated image from the response
    const candidates = response.data.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error('No candidates returned from Gemini API');
    }

    const candidate = candidates[0];
    console.log('First candidate:', JSON.stringify(candidate, null, 2));
    console.log('Candidate content:', JSON.stringify(candidate.content, null, 2));
    console.log('Candidate parts:', JSON.stringify(candidate.content?.parts, null, 2));

    if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
      throw new Error('No content parts returned from Gemini API');
    }

    // Look for the generated image in the parts array
    const imagePart = candidate.content.parts.find((part: GeminiPart) => part.inlineData);
    if (!imagePart || !imagePart.inlineData || !imagePart.inlineData.data) {
      throw new Error('No image data found in the API response');
    }

    // Convert the base64 data to a data URL
    return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
    }
    console.error('Error generating image with Gemini:', error);
    throw new Error('Failed to generate image with Gemini. Please check your API key and try again.');
  }
}; 