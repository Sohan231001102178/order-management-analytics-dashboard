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

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <Paper
        elevation={4}
        sx={{
          px: 1.5,
          py: 1,
          borderRadius: 2,
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: data.payload.color
            }}
          />
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>
            {data.name}:
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              color: '#0f172a',
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

export default function OrderStatusPieChart({ data = [], totalOrders = 0, onToggleStatus }) {
  const hasOrders = totalOrders > 0;

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
      {/* Card Header */}
      <Box sx={{ mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PieChartIcon sx={{ color: '#2563eb', fontSize: 20 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#0f172a',
              fontSize: '1rem',
              letterSpacing: '-0.01em'
            }}
          >
            Fulfillment Status Breakdown
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{ color: '#64748b', fontSize: '0.8rem', mt: 0.2 }}
        >
          Proportional split of active transaction pipeline
        </Typography>
      </Box>

      {/* Donut Chart with Centered Total Overlay */}
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
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              No orders to display
            </Typography>
          </Box>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Tooltip content={<CustomPieTooltip />} />
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={105}
                  paddingAngle={4}
                  stroke="#ffffff"
                  strokeWidth={2}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      style={{ cursor: 'pointer', outline: 'none' }}
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
                pointerEvents: 'none'
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.75rem',
                  color: '#0f172a',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1
                }}
              >
                {totalOrders}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#64748b',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                Orders
              </Typography>
            </Box>
          </>
        )}
      </Box>

      {/* Interactive Bottom Legend */}
      <Box
        sx={{
          mt: 'auto',
          pt: 1.5,
          borderTop: '1px solid #f1f5f9'
        }}
      >
        <Stack spacing={0.75}>
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
                  px: 1,
                  py: 0.4,
                  borderRadius: 1.5,
                  cursor: onToggleStatus ? 'pointer' : 'default',
                  transition: 'background-color 0.15s ease',
                  '&:hover': {
                    backgroundColor: '#f8fafc'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: item.color,
                      flexShrink: 0
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: item.textColor || '#334155'
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: '#0f172a',
                      fontVariantNumeric: 'tabular-nums'
                    }}
                  >
                    {item.value}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#64748b',
                      fontSize: '0.725rem',
                      minWidth: 38,
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
