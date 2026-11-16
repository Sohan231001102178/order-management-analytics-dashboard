import React from 'react';
import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Typography,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CategoryIcon from '@mui/icons-material/Category';
import FilterListIcon from '@mui/icons-material/FilterList';

import { CATEGORIES, DATE_RANGES, STATUSES } from '../../data/mockOrders';
import { statusTokens } from '../../theme/dashboardTheme';

export default function FilterControlBar({ filters, onFilterChange, darkMode = false }) {
  const handleDateRangeChange = (event) => {
    onFilterChange({ ...filters, dateRange: event.target.value });
  };

  const handleCategoryChange = (event) => {
    onFilterChange({ ...filters, category: event.target.value });
  };

  const handleSearchChange = (event) => {
    onFilterChange({ ...filters, searchQuery: event.target.value });
  };

  const handleClearSearch = () => {
    onFilterChange({ ...filters, searchQuery: '' });
  };

  const handleToggleStatus = (status) => {
    const current = filters.statuses || [];
    let updated;
    if (current.includes(status)) {
      if (current.length === 1) return; // Keep at least one
      updated = current.filter(s => s !== status);
    } else {
      updated = [...current, status];
    }
    onFilterChange({ ...filters, statuses: updated });
  };

  const handleSelectAllStatuses = () => {
    onFilterChange({ ...filters, statuses: [...STATUSES] });
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2.2, sm: 2.8 },
        mb: 3,
        borderRadius: 4,
        backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.85)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        borderColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
        boxShadow: darkMode
          ? '0 8px 24px -6px rgba(0, 0, 0, 0.4)'
          : '0 8px 24px -6px rgba(0, 0, 0, 0.04)'
      }}
    >
      <Stack spacing={2.2}>
        {/* Top Controls: Search, Date Range, Category */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            alignItems: { xs: 'stretch', md: 'center' }
          }}
        >
          {/* Search Query */}
          <TextField
            size="small"
            placeholder="Search Order ID, Customer Name, or Product Item..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            sx={{
              flex: { xs: 1, md: 1.5 },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2.5,
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.04)' : '#f8fafc',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : '#ffffff',
                  borderColor: '#818cf8'
                },
                '&.Mui-focused': {
                  backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.9)' : '#ffffff',
                  borderColor: '#4f46e5',
                  boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.15)'
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#818cf8', fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: filters.searchQuery ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClearSearch} edge="end">
                    <ClearIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </InputAdornment>
              ) : null
            }}
          />

          {/* Date Range Selector */}
          <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 185 } }}>
            <InputLabel id="date-range-select-label" sx={{ fontSize: '0.85rem' }}>
              Date Window
            </InputLabel>
            <Select
              labelId="date-range-select-label"
              id="date-range-select"
              value={filters.dateRange}
              label="Date Window"
              onChange={handleDateRangeChange}
              startAdornment={
                <InputAdornment position="start" sx={{ mr: 0.5 }}>
                  <CalendarMonthIcon sx={{ color: '#06b6d4', fontSize: 18 }} />
                </InputAdornment>
              }
              sx={{ borderRadius: 2.5 }}
            >
              {DATE_RANGES.map((r) => (
                <MenuItem key={r.value} value={r.value} sx={{ fontSize: '0.875rem' }}>
                  {r.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Category Dropdown */}
          <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 195 } }}>
            <InputLabel id="category-select-label" sx={{ fontSize: '0.85rem' }}>
              Product Category
            </InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={filters.category}
              label="Product Category"
              onChange={handleCategoryChange}
              startAdornment={
                <InputAdornment position="start" sx={{ mr: 0.5 }}>
                  <CategoryIcon sx={{ color: '#ec4899', fontSize: 18 }} />
                </InputAdornment>
              }
              sx={{ borderRadius: 2.5 }}
            >
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat} sx={{ fontSize: '0.875rem' }}>
                  {cat === 'ALL' ? 'All Categories' : cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Divider hairline */}
        <Box sx={{ borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #f1f5f9' }} />

        {/* Bottom Status Multi-select Chips */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 1.5
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <FilterListIcon sx={{ color: '#818cf8', fontSize: 18 }} />
              <Typography
                variant="subtitle2"
                sx={{
                  color: darkMode ? '#94a3b8' : '#64748b',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em'
                }}
              >
                ORDER STATUS:
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.2} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {STATUSES.map((status) => {
                const isSelected = filters.statuses.includes(status);
                const meta = statusTokens[status];

                return (
                  <Chip
                    key={status}
                    label={status}
                    clickable
                    onClick={() => handleToggleStatus(status)}
                    icon={
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: isSelected ? meta.dot : '#cbd5e1',
                          boxShadow: isSelected ? `0 0 8px ${meta.glow}` : 'none',
                          ml: 0.8
                        }}
                      />
                    }
                    sx={{
                      borderRadius: '9999px',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      height: 32,
                      px: 0.8,
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      background: isSelected
                        ? (darkMode ? `linear-gradient(135deg, ${meta.gradient[0]}22 0%, ${meta.gradient[1]}33 100%)` : meta.bg)
                        : (darkMode ? 'rgba(255, 255, 255, 0.04)' : '#f8fafc'),
                      color: isSelected
                        ? (darkMode ? meta.dot : meta.text)
                        : (darkMode ? '#64748b' : '#94a3b8'),
                      border: `1px solid ${isSelected ? meta.border : (darkMode ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0')}`,
                      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                      boxShadow: isSelected ? `0 4px 12px ${meta.glow}` : 'none',
                      '&:hover': {
                        transform: 'scale(1.04)',
                        borderColor: meta.dot
                      }
                    }}
                  />
                );
              })}
            </Stack>
          </Box>

          {/* Quick status reset */}
          {filters.statuses.length < STATUSES.length && (
            <Typography
              component="button"
              onClick={handleSelectAllStatuses}
              sx={{
                background: 'none',
                border: 'none',
                p: 0,
                fontSize: '0.75rem',
                color: '#4f46e5',
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'underline',
                '&:hover': { color: '#3730a3' }
              }}
            >
              Select All Statuses
            </Typography>
          )}
        </Box>
      </Stack>
    </Paper>
  );
}
