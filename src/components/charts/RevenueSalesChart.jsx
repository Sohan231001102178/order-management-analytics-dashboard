import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Stack,
  useTheme
} from '@mui/material';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { formatCurrency, formatNumber } from '../../utils/formatters';

// Custom Styled Tooltip
const CustomChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={4}
        sx={{
          p: 1.5,
          borderRadius: 2,
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          minWidth: 170
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            color: '#0f172a',
            fontSize: '0.8rem',
            mb: 1,
            pb: 0.5,
            borderBottom: '1px solid #f1f5f9'
          }}
        >
          {label}
        </Typography>

        <Stack spacing={0.8}>
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
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: entry.color
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: '#64748b', fontWeight: 500 }}
                  >
                    {entry.name}:
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    color: '#0f172a',
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

export default function RevenueSalesChart({ data = [] }) {
  const theme = useTheme();

  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        borderColor: '#e2e8f0',
        backgroundColor: '#ffffff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Chart Card Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 1,
          mb: 2
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShowChartIcon sx={{ color: '#2563eb', fontSize: 20 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#0f172a',
                fontSize: '1rem',
                letterSpacing: '-0.01em'
              }}
            >
              Revenue & Sales Volume Trend
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: '#64748b', fontSize: '0.8rem', mt: 0.2 }}
          >
            Chronological aggregation across active filter constraints
          </Typography>
        </Box>

        {/* Custom Legend Badges */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box
              sx={{
                width: 10,
                height: 3,
                borderRadius: 1,
                backgroundColor: '#2563eb'
              }}
            />
            <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>
              Revenue ($)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box
              sx={{
                width: 10,
                height: 3,
                borderRadius: 1,
                backgroundColor: '#0d9488'
              }}
            />
            <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>
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
              backgroundColor: '#f8fafc',
              borderRadius: 2,
              border: '1px dashed #cbd5e1',
              p: 3
            }}
          >
            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
              No transactional data available for the current filter criteria.
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8', mt: 0.5 }}>
              Try loosening your date window or category selection.
            </Typography>
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="date"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                dy={6}
              />
              {/* Left Y-Axis: Revenue in $k */}
              <YAxis
                yAxisId="left"
                stroke="#94a3b8"
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
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${val}u`}
                width={40}
              />
              <Tooltip content={<CustomChartTooltip />} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#2563eb" // Indigo
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#2563eb', strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#1d4ed8', stroke: '#ffffff', strokeWidth: 2 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="sales"
                name="Sales Volume"
                stroke="#0d9488" // Teal
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#0d9488', strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#0f766e', stroke: '#ffffff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Paper>
  );
}
