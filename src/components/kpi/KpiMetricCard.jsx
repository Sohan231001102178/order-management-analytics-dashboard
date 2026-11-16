import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function KpiMetricCard({
  title,
  value,
  delta,
  icon: IconComponent,
  iconGradient = 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
  accentColor = '#4f46e5',
  glowColor = 'rgba(79, 70, 229, 0.25)',
  subtext = 'vs. prior period',
  darkMode = false
}) {
  const isPositive = delta >= 0;
  const deltaColor = isPositive ? '#10b981' : '#f43f5e';
  const deltaBg = isPositive
    ? (darkMode ? 'rgba(16, 185, 129, 0.15)' : '#ecfdf5')
    : (darkMode ? 'rgba(244, 63, 94, 0.15)' : '#fff1f2');
  const deltaBorder = isPositive
    ? (darkMode ? 'rgba(16, 185, 129, 0.3)' : '#a7f3d0')
    : (darkMode ? 'rgba(244, 63, 94, 0.3)' : '#fecdd3');

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.8,
        borderRadius: 4,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
        backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.85)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          borderColor: accentColor,
          transform: 'translateY(-4px)',
          boxShadow: `0 14px 30px -8px ${glowColor}, 0 2px 10px rgba(0, 0, 0, 0.04)`
        }
      }}
    >
      {/* Top colorful gradient accent line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: iconGradient
        }}
      />

      {/* Top Header: Label & Trend Pill */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1.8
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: darkMode ? '#94a3b8' : '#64748b',
            fontWeight: 700,
            fontSize: '0.75rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase'
          }}
        >
          {title}
        </Typography>

        {/* Trend Pill */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.4,
            px: 1.1,
            py: 0.4,
            borderRadius: '9999px',
            backgroundColor: deltaBg,
            border: `1px solid ${deltaBorder}`,
            color: deltaColor,
            fontSize: '0.75rem',
            fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
            boxShadow: `0 2px 6px ${deltaBg}`
          }}
        >
          {isPositive ? (
            <ArrowUpwardIcon sx={{ fontSize: 13, strokeWidth: 1.5 }} />
          ) : (
            <ArrowDownwardIcon sx={{ fontSize: 13, strokeWidth: 1.5 }} />
          )}
          {isPositive ? `+${delta}%` : `${delta}%`}
        </Box>
      </Box>

      {/* Middle: Big Metric Value in Tabular Numerals */}
      <Box sx={{ mb: 2.2 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: darkMode ? '#f8fafc' : '#0f172a',
            fontVariantNumeric: 'tabular-nums',
            fontSize: { xs: '1.75rem', sm: '2rem' },
            letterSpacing: '-0.03em',
            lineHeight: 1.15
          }}
        >
          {value}
        </Typography>
      </Box>

      {/* Bottom Footer: Icon & Subtext */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 'auto' }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: 2.5,
            background: iconGradient,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: `0 4px 12px ${glowColor}`
          }}
        >
          <IconComponent sx={{ fontSize: 20 }} />
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: darkMode ? '#94a3b8' : '#64748b',
            fontSize: '0.785rem',
            fontWeight: 500
          }}
        >
          {subtext}
        </Typography>
      </Box>
    </Paper>
  );
}
