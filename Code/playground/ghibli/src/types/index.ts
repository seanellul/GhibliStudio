export interface ImageGenerationMode {
  id: string;
  name: string;
  description: string;
  promptTemplate: string;
  icon: string;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  mode: string;
  timestamp: Date;
}

export interface ImageGenerationState {
  isGenerating: boolean;
  error: string | null;
  currentImage: GeneratedImage | null;
  history: GeneratedImage[];
} 