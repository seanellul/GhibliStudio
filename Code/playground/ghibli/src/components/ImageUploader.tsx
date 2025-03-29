import React, { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { ImageContainer } from './styles';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imagePreview: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imagePreview }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  return (
    <ImageContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Uploaded preview"
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      ) : (
        <Box sx={{ textAlign: 'center', p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {isDragActive
              ? 'Drop the image here...'
              : 'Drag & drop an image here, or click to select'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Supports JPG, JPEG, and PNG
          </Typography>
        </Box>
      )}
    </ImageContainer>
  );
}; 