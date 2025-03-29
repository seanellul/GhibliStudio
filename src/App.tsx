import React, { useState, useEffect } from 'react';
import { Box, TextField, Alert, Snackbar, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageUploader } from './components/ImageUploader';
import { ModeSelector } from './components/ModeSelector';
import { MainContainer, ContentContainer, Title, Subtitle, StyledButton } from './components/styles';
import { ImageGenerationMode, GeneratedImage } from './types';
import { generateImageWithGemini } from './services/gemini';
import { imageGenerationModes } from './config/modes';

function App() {
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_GEMINI_API_KEY || '');
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);

  useEffect(() => {
    if (!process.env.REACT_APP_GEMINI_API_KEY) {
      setError('Gemini API key not found in environment variables. Please check your .env file.');
    }
  }, []);

  const handleImageUpload = (file: File) => {
    setCurrentImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleModeSelect = (mode: ImageGenerationMode) => {
    setSelectedMode(mode.id);
  };

  const handleGenerate = async () => {
    if (!apiKey) {
      setError('Please enter your Gemini API key');
      return;
    }

    if (!currentImage) {
      setError('Please upload an image first');
      return;
    }

    if (!selectedMode) {
      setError('Please select a mode');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const mode = imageGenerationModes.find(m => m.id === selectedMode);
      if (!mode) throw new Error('Invalid mode selected');

      const imageUrl = await generateImageWithGemini(mode.promptTemplate, currentImage, apiKey);
      
      const newImage: GeneratedImage = {
        url: imageUrl,
        prompt: mode.promptTemplate,
        mode: mode.name,
        timestamp: new Date(),
      };

      setGeneratedImages(prev => [newImage, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <MainContainer>
      <ContentContainer>
        <Title>AI Image Transformer</Title>
        <Subtitle>Transform your images into stunning artistic styles</Subtitle>

        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label="Gemini API Key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            disabled={!!process.env.REACT_APP_GEMINI_API_KEY}
            helperText={
              <Box component="span">
                {process.env.REACT_APP_GEMINI_API_KEY ? (
                  'Using API key from environment variables'
                ) : (
                  <>
                    Get your API key from{' '}
                    <a 
                      href="https://makersuite.google.com/app/apikey" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#FF6B6B', textDecoration: 'none' }}
                    >
                      Google AI Studio
                    </a>
                    . Keep your key secure and never share it.
                  </>
                )}
              </Box>
            }
            error={!apiKey}
            sx={{ 
              mb: 2,
              '& .MuiInputBase-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              '& .MuiInputBase-input': {
                color: '#ffffff',
              },
              '& .MuiFormHelperText-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
          />
          {apiKey && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: '#4CAF50',
              mt: 1
            }}>
              <span>✓</span>
              <Typography variant="body2">
                {process.env.REACT_APP_GEMINI_API_KEY 
                  ? 'Using API key from environment variables'
                  : 'API key is set'}
              </Typography>
            </Box>
          )}
        </Box>

        <ImageUploader
          onImageUpload={handleImageUpload}
          imagePreview={imagePreview}
        />

        <Box sx={{ my: 4 }}>
          <ModeSelector
            selectedMode={selectedMode}
            onModeSelect={handleModeSelect}
          />
        </Box>

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <StyledButton
            onClick={handleGenerate}
            disabled={isGenerating || !currentImage || !selectedMode}
          >
            {isGenerating ? 'Generating...' : 'Generate Image'}
          </StyledButton>
        </Box>

        <AnimatePresence>
          {generatedImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Title>Generated Images</Title>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
                {generatedImages.map((image, index) => (
                  <Box key={index} sx={{ position: 'relative' }}>
                    <img
                      src={image.url}
                      alt={`Generated ${image.mode}`}
                      style={{ width: '100%', borderRadius: '8px' }}
                    />
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="subtitle2">{image.mode}</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {new Date(image.timestamp).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </ContentContainer>
    </MainContainer>
  );
}

export default App; 