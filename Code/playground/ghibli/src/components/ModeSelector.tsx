import React from 'react';
import { Typography, Box } from '@mui/material';
import { ModeCard } from './styles';
import { ImageGenerationMode } from '../types';
import { imageGenerationModes } from '../config/modes';

interface ModeSelectorProps {
  selectedMode: string | null;
  onModeSelect: (mode: ImageGenerationMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  selectedMode,
  onModeSelect,
}) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
      {imageGenerationModes.map((mode: ImageGenerationMode) => (
        <Box 
          key={mode.id}
          sx={{ 
            gridColumn: {
              xs: 'span 12',
              sm: 'span 6',
              md: 'span 3'
            }
          }}
        >
          <ModeCard
            onClick={() => onModeSelect(mode)}
            sx={{
              border: selectedMode === mode.id
                ? '2px solid #FF6B6B'
                : '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="h2" sx={{ mb: 1 }}>
                {mode.icon}
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {mode.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {mode.description}
              </Typography>
            </Box>
          </ModeCard>
        </Box>
      ))}
    </Box>
  );
}; 