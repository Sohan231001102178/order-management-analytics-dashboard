import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Stack
} from '@mui/material';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { formatCurrency, formatNumber } from '../../utils/formatters';

const CustomChartTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={6}
        sx={{
          p: 1.8,
          borderRadius: 3,
          backgroundColor: darkMode ? '#111827' : '#ffffff',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #e2e8f0',
          boxShadow: darkMode
            ? '0 12px 28px rgba(0, 0, 0, 0.6), 0 0 15px rgba(79, 70, 229, 0.2)'
            : '0 12px 28px -6px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(79, 70, 229, 0.08)',
          minWidth: 180
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 800,
            color: darkMode ? '#f8fafc' : '#0f172a',
            fontSize: '0.825rem',
            mb: 1.2,
            pb: 0.6,
            borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #f1f5f9'
          }}
        >
          {label}
        </Typography>

        <Stack spacing={1}>
          {payload.map((entry, index) => {
            const isRevenue = entry.dataKey === 'revenue';
            return (
              <Box
                key={`item-${index}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1.5
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <Box
                    sx={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      backgroundColor: entry.color,
                      boxShadow: `0 0 8px ${entry.color}`
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: darkMode ? '#94a3b8' : '#64748b', fontWeight: 600 }}
                  >
                    {entry.name}:
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 800,
                    color: darkMode ? '#f8fafc' : '#0f172a',
                    fontVariantNumeric: 'tabular-nums'
                  }}
                >
                  {isRevenue ? formatCurrency(entry.value) : `${formatNumber(entry.value)} units`}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Paper>
    );
  }
  return null;
};

export default function RevenueSalesChart({ data = [], darkMode = false }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2.2, sm: 2.8 },
        borderRadius: 4,
        borderColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
        backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.85)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        boxShadow: darkMode
          ? '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
          : '0 10px 30px -10px rgba(79, 70, 229, 0.06)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Chart Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 1.5,
          mb: 2.5
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)'
              }}
            >
              <ShowChartIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: darkMode ? '#f8fafc' : '#0f172a',
                fontSize: '1.05rem',
                letterSpacing: '-0.02em'
              }}
            >
              Revenue & Sales Volume Trend
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '0.8rem', mt: 0.3 }}
          >
            Chronological aggregation across active filter constraints
          </Typography>
        </Box>

        {/* Custom Legend Badges */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.8,
              px: 1.2,
              py: 0.5,
              borderRadius: 2,
              backgroundColor: darkMode ? 'rgba(79, 70, 229, 0.15)' : '#eff6ff',
              border: darkMode ? '1px solid rgba(79, 70, 229, 0.3)' : '1px solid #c7d2fe'
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 4,
                borderRadius: 1,
                background: 'linear-gradient(90deg, #4f46e5, #818cf8)'
              }}
            />
            <Typography variant="caption" sx={{ color: darkMode ? '#a5b4fc' : '#4338ca', fontWeight: 700 }}>
              Revenue ($)
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.8,
              px: 1.2,
              py: 0.5,
              borderRadius: 2,
              backgroundColor: darkMode ? 'rgba(6, 182, 212, 0.15)' : '#ecfeff',
              border: darkMode ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid #a5f3fc'
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 4,
                borderRadius: 1,
                background: 'linear-gradient(90deg, #0d9488, #2dd4bf)'
              }}
            />
            <Typography variant="caption" sx={{ color: darkMode ? '#67e8f9' : '#0e7490', fontWeight: 700 }}>
              Sales (Units)
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Chart Canvas */}
      <Box sx={{ width: '100%', height: 320, mt: 'auto' }}>
        {data.length === 0 ? (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.02)' : '#f8fafc',
              borderRadius: 3,
              border: darkMode ? '1px dashed rgba(255, 255, 255, 0.1)' : '1px dashed #cbd5e1',
              p: 3
            }}
          >
            <Typography variant="body2" sx={{ color: darkMode ? '#94a3b8' : '#64748b', fontWeight: 600 }}>
              No transactional data available for the current filter criteria.
            </Typography>
            <Typography variant="caption" sx={{ color: darkMode ? '#64748b' : '#94a3b8', mt: 0.5 }}>
              Try loosening your date window or category selection.
            </Typography>
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity={darkMode ? 0.45 : 0.25} />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={darkMode ? 0.35 : 0.18} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={darkMode ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9'}
              />
              <XAxis
                dataKey="date"
                stroke={darkMode ? '#64748b' : '#94a3b8'}
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0' }}
                dy={6}
              />
              {/* Left Y-Axis: Revenue in $k */}
              <YAxis
                yAxisId="left"
                stroke={darkMode ? '#64748b' : '#94a3b8'}
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => formatCurrency(val, true)}
                width={50}
              />
              {/* Right Y-Axis: Sales volume in units */}
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke={darkMode ? '#64748b' : '#94a3b8'}
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${val}u`}
                width={40}
              />
              <Tooltip content={<CustomChartTooltip darkMode={darkMode} />} />
              
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#4f46e5"
                strokeWidth={3}
                fill="url(#revenueGrad)"
                dot={{ r: 3.5, fill: '#4f46e5', strokeWidth: 2, stroke: '#ffffff' }}
                activeDot={{ r: 7, fill: '#4f46e5', stroke: '#ffffff', strokeWidth: 2.5 }}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="sales"
                name="Sales Volume"
                stroke="#06b6d4"
                strokeWidth={2.5}
                fill="url(#salesGrad)"
                strokeDasharray="4 2"
                dot={{ r: 3, fill: '#06b6d4', strokeWidth: 2, stroke: '#ffffff' }}
                activeDot={{ r: 6, fill: '#06b6d4', stroke: '#ffffff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Paper>
  );
}
