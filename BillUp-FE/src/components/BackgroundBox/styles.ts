import { SxProps } from '@mui/material';
import { CSSProperties } from 'react';

export const BackgroundBoxStyle: SxProps = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1
};

export const BackgroundSvgCircle: CSSProperties = {
  position: 'absolute',
  bottom: 0,
  right: 0
};

export const BackgroundSvgWave: CSSProperties = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  height: '100%',
  width: 'auto'
};
