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
  IconButton,
  Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CategoryIcon from '@mui/icons-material/Category';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/material/internal/svg-icons/RadioButtonUnchecked';

import { CATEGORIES, DATE_RANGES, STATUSES } from '../../data/mockOrders';
import { statusTokens } from '../../theme/dashboardTheme';

export default function FilterControlBar({ filters, onFilterChange }) {
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
      // Prevent unselecting all (keep at least one)
      if (current.length === 1) {
        return;
      }
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
        p: { xs: 2, sm: 2.5 },
        mb: 3,
        borderRadius: 3,
        backgroundColor: '#ffffff',
        borderColor: '#e2e8f0',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02)'
      }}
    >
      <Stack spacing={2}>
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
            placeholder="Search Order ID, Customer, Item..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            sx={{
              flex: { xs: 1, md: 1.5 },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f8fafc',
                '&:hover': {
                  backgroundColor: '#ffffff'
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff'
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
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
          <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 180 } }}>
            <InputLabel id="date-range-select-label" sx={{ fontSize: '0.875rem' }}>
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
                  <CalendarMonthIcon sx={{ color: '#64748b', fontSize: 18 }} />
                </InputAdornment>
              }
              sx={{ borderRadius: 2 }}
            >
              {DATE_RANGES.map((r) => (
                <MenuItem key={r.value} value={r.value} sx={{ fontSize: '0.875rem' }}>
                  {r.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Category Dropdown */}
          <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 190 } }}>
            <InputLabel id="category-select-label" sx={{ fontSize: '0.875rem' }}>
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
                  <CategoryIcon sx={{ color: '#64748b', fontSize: 18 }} />
                </InputAdornment>
              }
              sx={{ borderRadius: 2 }}
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
        <Box sx={{ borderBottom: '1px solid #f1f5f9' }} />

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
              <FilterAltIcon sx={{ color: '#64748b', fontSize: 18 }} />
              <Typography
                variant="subtitle2"
                sx={{
                  color: '#64748b',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em'
                }}
              >
                Order Status:
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 0.8 }}>
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
                          ml: 0.5
                        }}
                      />
                    }
                    sx={{
                      borderRadius: '9999px',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      height: 30,
                      px: 0.5,
                      transition: 'all 0.15s ease-in-out',
                      backgroundColor: isSelected ? meta.bg : '#f8fafc',
                      color: isSelected ? meta.text : '#64748b',
                      border: `1px solid ${isSelected ? meta.border : '#e2e8f0'}`,
                      '&:hover': {
                        backgroundColor: isSelected ? meta.bg : '#f1f5f9',
                        borderColor: isSelected ? meta.dot : '#cbd5e1'
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
                color: '#2563eb',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline',
                '&:hover': { color: '#1d4ed8' }
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
