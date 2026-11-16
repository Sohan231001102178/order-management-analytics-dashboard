import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Stack
} from '@mui/material';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import PieChartIcon from '@mui/icons-material/PieChart';
import { formatNumber } from '../../utils/formatters';

const CustomPieTooltip = ({ active, payload, darkMode }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <Paper
        elevation={6}
        sx={{
          px: 1.8,
          py: 1.2,
          borderRadius: 2.5,
          backgroundColor: darkMode ? '#111827' : '#ffffff',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #e2e8f0',
          boxShadow: darkMode
            ? '0 10px 25px rgba(0, 0, 0, 0.5)'
            : '0 10px 25px -4px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: data.payload.color,
              boxShadow: `0 0 8px ${data.payload.color}`
            }}
          />
          <Typography variant="body2" sx={{ fontWeight: 700, color: darkMode ? '#f8fafc' : '#0f172a' }}>
            {data.name}:
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 800,
              color: darkMode ? '#f8fafc' : '#0f172a',
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            {formatNumber(data.value)} orders
          </Typography>
        </Box>
      </Paper>
    );
  }
  return null;
};

export default function OrderStatusPieChart({ data = [], totalOrders = 0, onToggleStatus, darkMode = false }) {
  const hasOrders = totalOrders > 0;

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
      {/* Card Header */}
      <Box sx={{ mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 10px rgba(236, 72, 153, 0.3)'
            }}
          >
            <PieChartIcon sx={{ fontSize: 18 }} />
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
            Fulfillment Breakdown
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '0.8rem', mt: 0.3 }}
        >
          Proportional split of active transaction pipeline
        </Typography>
      </Box>

      {/* Donut Chart with Centered Count */}
      <Box sx={{ position: 'relative', width: '100%', height: 230 }}>
        {!hasOrders ? (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant="body2" sx={{ color: darkMode ? '#64748b' : '#94a3b8', fontWeight: 600 }}>
              No orders to display
            </Typography>
          </Box>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Tooltip content={<CustomPieTooltip darkMode={darkMode} />} />
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={105}
                  paddingAngle={4}
                  stroke={darkMode ? '#111827' : '#ffffff'}
                  strokeWidth={3}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      style={{
                        cursor: 'pointer',
                        outline: 'none',
                        filter: `drop-shadow(0 2px 6px ${entry.color}40)`,
                        transition: 'all 0.2s'
                      }}
                      onClick={() => onToggleStatus && onToggleStatus(entry.name)}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Centered Total Order Count Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                pointerEvents: 'none',
                width: 100,
                height: 100,
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: darkMode
                  ? 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(79, 70, 229, 0.08) 0%, transparent 70%)'
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  fontSize: '1.9rem',
                  color: darkMode ? '#f8fafc' : '#0f172a',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1
                }}
              >
                {totalOrders}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: darkMode ? '#818cf8' : '#4f46e5',
                  fontSize: '0.725rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  mt: 0.3
                }}
              >
                Orders
              </Typography>
            </Box>
          </>
        )}
      </Box>

      {/* Interactive Bottom Legend with Progress Bars */}
      <Box
        sx={{
          mt: 'auto',
          pt: 1.8,
          borderTop: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #f1f5f9'
        }}
      >
        <Stack spacing={0.8}>
          {data.map((item) => {
            const percentage = hasOrders ? ((item.value / totalOrders) * 100).toFixed(1) : 0;
            return (
              <Box
                key={item.name}
                onClick={() => onToggleStatus && onToggleStatus(item.name)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 1.2,
                  py: 0.6,
                  borderRadius: 2,
                  cursor: onToggleStatus ? 'pointer' : 'default',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc',
                    transform: 'translateX(3px)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                  <Box
                    sx={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      backgroundColor: item.color,
                      boxShadow: `0 0 8px ${item.color}`,
                      flexShrink: 0
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.825rem',
                      fontWeight: 700,
                      color: darkMode ? '#e2e8f0' : (item.textColor || '#334155')
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 800,
                      color: darkMode ? '#f8fafc' : '#0f172a',
                      fontVariantNumeric: 'tabular-nums'
                    }}
                  >
                    {item.value}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: darkMode ? '#94a3b8' : '#64748b',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      minWidth: 42,
                      textAlign: 'right',
                      fontVariantNumeric: 'tabular-nums'
                    }}
                  >
                    {percentage}%
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Paper>
  );
}
