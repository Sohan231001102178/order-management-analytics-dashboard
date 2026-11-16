import React from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  Tooltip,
  IconButton
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DownloadIcon from '@mui/icons-material/Download';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

export default function TopHeaderBar({
  filters,
  onResetFilters,
  onExportCsv,
  totalFilteredCount,
  totalRawCount,
  darkMode,
  onToggleDarkMode
}) {
  const getReportingPeriodLabel = () => {
    switch (filters.dateRange) {
      case '7d': return 'Last 7 Days';
      case '30d': return 'Last 30 Days';
      case '90d': return 'Last 90 Days';
      case 'ytd': return 'Year to Date';
      case 'all': return 'All Time';
      default: return 'Custom Window';
    }
  };

  const isFiltered =
    filters.dateRange !== '30d' ||
    filters.category !== 'ALL' ||
    filters.statuses.length !== 4 ||
    filters.searchQuery.trim() !== '';

  return (
    <Box
      sx={{
        backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.85)' : 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(20px)',
        border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
        borderRadius: 4,
        p: { xs: 2.5, sm: 3 },
        mb: 3,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        gap: 2.5,
        boxShadow: darkMode
          ? '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(79, 70, 229, 0.15)'
          : '0 10px 30px -10px rgba(79, 70, 229, 0.08), 0 2px 10px rgba(0, 0, 0, 0.02)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top colorful gradient accent line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 35%, #ec4899 70%, #f59e0b 100%)'
        }}
      />

      {/* Left: Brand & Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.2 }}>
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 50%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
            flexShrink: 0,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.06) rotate(3deg)'
            }
          }}
        >
          <AutoGraphIcon sx={{ fontSize: 30 }} />
        </Box>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.35rem', sm: '1.65rem' },
                letterSpacing: '-0.03em',
                background: darkMode
                  ? 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)'
                  : 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Order Management Analytics
            </Typography>
            <Chip
              label="v2.4 Enterprise"
              size="small"
              sx={{
                height: 24,
                fontSize: '0.725rem',
                fontWeight: 700,
                background: darkMode
                  ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.25) 0%, rgba(6, 182, 212, 0.25) 100%)'
                  : 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
                color: darkMode ? '#818cf8' : '#4f46e5',
                border: darkMode ? '1px solid rgba(129, 140, 248, 0.3)' : '1px solid #c7d2fe'
              }}
            />
          </Box>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mt: 0.6, flexWrap: 'wrap' }}
          >
            <Typography variant="body2" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
              Period: <strong style={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>{getReportingPeriodLabel()}</strong>
            </Typography>
            <Typography variant="body2" sx={{ color: '#cbd5e1' }}>•</Typography>
            <Typography variant="body2" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
              Showing <strong style={{ color: '#4f46e5' }}>{totalFilteredCount}</strong> of {totalRawCount} orders
            </Typography>
          </Stack>
        </Box>
      </Box>

      {/* Right: Actions & Controls */}
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        sx={{
          width: { xs: '100%', md: 'auto' },
          justifyContent: { xs: 'space-between', md: 'flex-end' },
          flexWrap: 'wrap'
        }}
      >
        {/* Dark/Light Mode Toggle */}
        <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          <IconButton
            onClick={onToggleDarkMode}
            sx={{
              p: 1,
              borderRadius: 2.5,
              backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9',
              color: darkMode ? '#facc15' : '#475569',
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'scale(1.08)',
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.15)' : '#e2e8f0'
              }
            }}
          >
            {darkMode ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
          </IconButton>
        </Tooltip>

        {/* Live Sync Glow Badge */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.6,
            py: 0.75,
            borderRadius: 2.5,
            backgroundColor: darkMode ? 'rgba(16, 185, 129, 0.12)' : '#ecfdf5',
            border: darkMode ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid #a7f3d0'
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 10px 2px rgba(16, 185, 129, 0.6)',
              animation: 'pulseGlow 2s infinite ease-in-out'
            }}
          />
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: darkMode ? '#34d399' : '#047857',
              letterSpacing: '0.02em'
            }}
          >
            Live Sync
          </Typography>
        </Box>

        {/* Quick CSV Export */}
        <Tooltip title="Export current filtered view to CSV">
          <Button
            variant="outlined"
            size="small"
            startIcon={<DownloadIcon />}
            onClick={onExportCsv}
            sx={{
              py: 0.9,
              px: 2,
              borderRadius: 2.5,
              borderColor: darkMode ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1',
              color: darkMode ? '#f8fafc' : '#334155',
              backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.04)' : '#ffffff',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              '&:hover': {
                borderColor: '#4f46e5',
                color: '#4f46e5',
                backgroundColor: darkMode ? 'rgba(79, 70, 229, 0.1)' : '#f5f3ff'
              }
            }}
          >
            Export
          </Button>
        </Tooltip>

        {/* Reset Filters */}
        <Tooltip title="Reset all filters to default">
          <span>
            <Button
              variant={isFiltered ? 'contained' : 'outlined'}
              size="small"
              startIcon={<RestartAltIcon />}
              onClick={onResetFilters}
              disabled={!isFiltered}
              sx={{
                py: 0.9,
                px: 2,
                borderRadius: 2.5,
                fontWeight: 700,
                ...(isFiltered
                  ? {
                      background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
                      color: '#ffffff',
                      boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #4338ca 0%, #2563eb 100%)',
                        boxShadow: '0 6px 18px rgba(79, 70, 229, 0.5)'
                      }
                    }
                  : {
                      borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0',
                      color: darkMode ? '#64748b' : '#94a3b8'
                    })
              }}
            >
              Reset Filters
            </Button>
          </span>
        </Tooltip>
      </Stack>
    </Box>
  );
}
