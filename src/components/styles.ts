import { styled } from '@mui/material/styles';
import { Box, Paper, Button, Typography } from '@mui/material';

export const MainContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
  padding: theme.spacing(4),
  color: '#ffffff',
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: '0 auto',
  padding: theme.spacing(4),
}));

export const ModeCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    background: 'rgba(255, 255, 255, 0.15)',
  },
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 400,
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  background: 'rgba(0, 0, 0, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: theme.spacing(2),
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  '&:hover': {
    background: 'linear-gradient(45deg, #FF8E53 30%, #FF6B6B 90%)',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 700,
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  color: 'rgba(255, 255, 255, 0.8)',
})); 