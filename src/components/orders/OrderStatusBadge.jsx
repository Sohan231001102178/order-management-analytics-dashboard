import React from 'react';
import { Box, Typography } from '@mui/material';
import { statusTokens } from '../../theme/dashboardTheme';

export default function OrderStatusBadge({ status }) {
  const meta = statusTokens[status] || {
    label: status || 'Unknown',
    text: '#64748b',
    bg: '#f1f5f9',
    border: '#cbd5e1',
    dot: '#94a3b8'
  };

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.8,
        px: 1.25,
        py: 0.4,
        borderRadius: '9999px',
        backgroundColor: meta.bg,
        border: `1px solid ${meta.border}`,
        color: meta.text,
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
        userSelect: 'none',
        lineHeight: 1.3
      }}
    >
      <Box
        component="span"
        sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: meta.dot,
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
