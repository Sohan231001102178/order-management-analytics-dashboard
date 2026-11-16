import React from 'react';
import { Box, Typography } from '@mui/material';
import { statusTokens } from '../../theme/dashboardTheme';

export default function OrderStatusBadge({ status, darkMode = false }) {
  const meta = statusTokens[status] || {
    label: status || 'Unknown',
    text: '#64748b',
    bg: '#f1f5f9',
    border: '#cbd5e1',
    dot: '#94a3b8',
    glow: 'rgba(148, 163, 184, 0.2)'
  };

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.9,
        px: 1.4,
        py: 0.45,
        borderRadius: '9999px',
        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.04)' : undefined,
        background: !darkMode ? meta.bg : undefined,
        border: `1px solid ${meta.border}`,
        color: darkMode ? meta.dot : meta.text,
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.02em',
        userSelect: 'none',
        lineHeight: 1.3,
        boxShadow: `0 2px 6px ${meta.glow}`
      }}
    >
      <Box
        component="span"
        sx={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          backgroundColor: meta.dot,
          boxShadow: `0 0 8px ${meta.glow}`,
          flexShrink: 0
        }}
      />
      <Typography
        component="span"
        sx={{
          fontSize: 'inherit',
          fontWeight: 'inherit',
          color: 'inherit',
          lineHeight: 'inherit'
        }}
      >
        {meta.label}
      </Typography>
    </Box>
  );
}
