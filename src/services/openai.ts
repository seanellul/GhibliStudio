import axios from 'axios';

const OPENAI_API_BASE = 'https://api.openai.com/v1/images';

export const generateImage = async (
  prompt: string,
  apiKey: string
): Promise<string> => {
  try {
    const response = await axios.post(
      `${OPENAI_API_BASE}/generations`,
      {
        model: 'dall-e-3',
        prompt,
        n: 1,
        size: '1024x1024',
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.data[0].url;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
    }
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image. Please check your API key and try again.');
  }
};

export const generateImageVariation = async (
  imageFile: File,
  apiKey: string
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('n', '1');

    console.log('Sending request with:', {
      fileSize: imageFile.size,
      fileType: imageFile.type,
      apiKeyLength: apiKey.length,
    });

    const response = await axios.post(
      `${OPENAI_API_BASE}/variations`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.data[0].url;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
        error: error.response?.data?.error?.message || 'Unknown error',
      });
    }
    console.error('Error generating image variation:', error);
    throw new Error('Failed to generate image variation. Please check your API key and try again.');
  }
}; 