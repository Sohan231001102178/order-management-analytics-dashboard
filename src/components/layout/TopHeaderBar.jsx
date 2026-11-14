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
import InsightsIcon from '@mui/icons-material/Insights';
import SyncIcon from '@mui/icons-material/Sync';

export default function TopHeaderBar({
  filters,
  onResetFilters,
  onExportCsv,
  totalFilteredCount,
  totalRawCount
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
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 3,
        p: { xs: 2, sm: 2.5, md: 3 },
        mb: 3,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        gap: 2,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02)'
      }}
    >
      {/* Left: Brand & Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2.5,
            background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
            flexShrink: 0
          }}
        >
          <InsightsIcon sx={{ fontSize: 28 }} />
        </Box>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: '#0f172a',
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                letterSpacing: '-0.02em'
              }}
            >
              Order Management Analytics
            </Typography>
            <Chip
              label="v2.4 Enterprise"
              size="small"
              sx={{
                height: 22,
                fontSize: '0.7rem',
                fontWeight: 600,
                backgroundColor: '#eff6ff',
                color: '#1d4ed8',
                border: '1px solid #bfdbfe'
              }}
            />
          </Box>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mt: 0.5, flexWrap: 'wrap' }}
          >
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Reporting Period: <strong style={{ color: '#334155' }}>{getReportingPeriodLabel()}</strong>
            </Typography>
            <Typography variant="body2" sx={{ color: '#cbd5e1' }}>•</Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Showing <strong style={{ color: '#0f172a' }}>{totalFilteredCount}</strong> of {totalRawCount} orders
            </Typography>
          </Stack>
        </Box>
      </Box>

      {/* Right: Sync Indicator & Actions */}
      <Stack
        direction={{ xs: 'row' }}
        spacing={1.5}
        alignItems="center"
        sx={{
          width: { xs: '100%', md: 'auto' },
          justifyContent: { xs: 'space-between', md: 'flex-end' },
          flexWrap: 'wrap'
        }}
      >
        {/* Live Sync Status */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            py: 0.6,
            borderRadius: 2,
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            fontSize: '0.8rem',
            color: '#475569',
            fontWeight: 500
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)'
            }}
          />
          <Typography variant="caption" sx={{ fontWeight: 600, color: '#334155' }}>
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
              borderColor: '#e2e8f0',
              color: '#334155',
              backgroundColor: '#ffffff',
              '&:hover': {
                borderColor: '#cbd5e1',
                backgroundColor: '#f8fafc'
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
                ...(isFiltered
                  ? {
                      backgroundColor: '#2563eb',
                      '&:hover': { backgroundColor: '#1d4ed8' }
                    }
                  : {
                      borderColor: '#e2e8f0',
                      color: '#94a3b8'
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
