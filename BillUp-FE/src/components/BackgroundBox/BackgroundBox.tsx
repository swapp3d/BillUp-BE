import React from 'react';

import { Box } from '@mui/material';
import {
  BackgroundBoxStyle,
  BackgroundSvgCircle,
  BackgroundSvgWave
} from './styles';

export const BackgroundBox: React.FC = () => {
  return (
    <Box sx={BackgroundBoxStyle}>
      <svg
        width="1060"
        height="900"
        viewBox="0 0 1060 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={BackgroundSvgWave}
      >
        <path
          opacity="0.03"
          d="M560 693C1037.6 610.6 894.5 206 771.5 0H1062V900H0C14.6667 849 82.4 775.4 560 693Z"
          fill="#333333"
        />
        <defs>
          <linearGradient
            id="paint0_linear_24_791"
            x1="531"
            y1="0"
            x2="531"
            y2="900"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopOpacity="0" />
            <stop offset="1" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        width="438"
        height="557"
        viewBox="0 0 438 557"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={BackgroundSvgCircle}
      >
        <circle opacity="0.02" cx="370" cy="370" r="370" fill="black" />
      </svg>
    </Box>
  );
};
