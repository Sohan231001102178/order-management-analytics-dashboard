import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function KpiMetricCard({
  title,
  value,
  delta,
  icon: IconComponent,
  iconColor = '#2563eb',
  iconBg = '#eff6ff',
  subtext = 'vs. prior period'
}) {
  const isPositive = delta >= 0;
  const deltaColor = isPositive ? '#15803d' : '#b91c1c';
  const deltaBg = isPositive ? '#dcfce7' : '#fee2e2';
  const deltaBorder = isPositive ? '#bbf7d0' : '#fecaca';

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        borderRadius: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor: '#e2e8f0',
        backgroundColor: '#ffffff',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: '#cbd5e1',
          boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      {/* Top Header: Label & Trend Pill */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1.5
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: '#64748b',
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: '0.04em',
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
            px: 1,
            py: 0.3,
            borderRadius: '9999px',
            backgroundColor: deltaBg,
            border: `1px solid ${deltaBorder}`,
            color: deltaColor,
            fontSize: '0.725rem',
            fontWeight: 600,
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          {isPositive ? (
            <ArrowUpwardIcon sx={{ fontSize: 13 }} />
          ) : (
            <ArrowDownwardIcon sx={{ fontSize: 13 }} />
          )}
          {isPositive ? `+${delta}%` : `${delta}%`}
        </Box>
      </Box>

      {/* Middle: Big Metric Value in Tabular Numerals */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#0f172a',
            fontVariantNumeric: 'tabular-nums',
            fontSize: { xs: '1.65rem', sm: '1.85rem' },
            lineHeight: 1.2
          }}
        >
          {value}
        </Typography>
      </Box>

      {/* Bottom Footer: Icon & Subtext */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 'auto' }}>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: 2,
            backgroundColor: iconBg,
            color: iconColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <IconComponent sx={{ fontSize: 19 }} />
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: '#64748b',
            fontSize: '0.775rem'
          }}
        >
          {subtext}
        </Typography>
      </Box>
    </Paper>
  );
}
