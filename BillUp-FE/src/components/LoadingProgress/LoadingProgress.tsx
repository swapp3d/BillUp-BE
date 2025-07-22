import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { LoadingProgressProps } from './types';
import { LoadingContainerStyle, LoadingProgressTextStyle } from './styles';

export const LoadingProgress: React.FC<LoadingProgressProps> = ({
  text,
  size = '40px',
  spinnerColor = '#000000',
  fontSize = '16px'
}) => {
  return (
    <Box sx={LoadingContainerStyle}>
      <CircularProgress
        size="sm"
        sx={{
          color: spinnerColor,
          width: size,
          height: size
        }}
      />
      {text && (
        <Typography
          sx={{
            ...LoadingProgressTextStyle,
            fontSize
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingProgress;
