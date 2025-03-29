import { ImageGenerationMode } from '../types';

export const imageGenerationModes: ImageGenerationMode[] = [
  {
    id: 'ghibli',
    name: 'Ghibli Mode',
    description: 'Transform your image into a Studio Ghibli masterpiece',
    promptTemplate: 'Create a Studio Ghibli style version while preserving photorealistic facial features. The faces must maintain exact ethnic features, skin tone, face shape, and facial structure from the original photo. Apply Ghibli\'s background art style, color palette, and lighting, but keep faces true to the original photograph with minimal stylization. Preserve exact facial proportions, eye shapes, and expressions.',
    icon: '🎨'
  },
  {
    id: 'disney',
    name: 'Disney Mode',
    description: 'Convert your image into a Disney animated style',
    promptTemplate: 'Create a Disney/Pixar style version while preserving photorealistic facial features. The faces must maintain exact ethnic features, skin tone, face shape, and facial structure from the original photo. Apply Disney\'s background art style, color palette, and lighting, but keep faces true to the original photograph with minimal stylization. Preserve exact facial proportions, eye shapes, and expressions.',
    icon: '✨'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Mode',
    description: 'Transform your image into a cyberpunk masterpiece',
    promptTemplate: 'Create a cyberpunk style version while preserving photorealistic facial features. The faces must maintain exact ethnic features, skin tone, face shape, and facial structure from the original photo. Apply cyberpunk effects to the background, lighting, and atmosphere, but keep faces true to the original photograph with minimal stylization. Preserve exact facial proportions, eye shapes, and expressions.',
    icon: '🤖'
  },
  {
    id: 'oil-painting',
    name: 'Oil Painting Mode',
    description: 'Convert your image into a classic oil painting',
    promptTemplate: 'Create an oil painting style version while preserving photorealistic facial features. The faces must maintain exact ethnic features, skin tone, face shape, and facial structure from the original photo. Apply oil painting techniques to the background and clothing, but keep faces true to the original photograph with minimal stylization. Preserve exact facial proportions, eye shapes, and expressions.',
    icon: '🖼️'
  }
]; 