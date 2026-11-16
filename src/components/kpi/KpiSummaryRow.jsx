import React from 'react';
import { Grid, Box } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PeopleIcon from '@mui/icons-material/People';

import KpiMetricCard from './KpiMetricCard';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export default function KpiSummaryRow({ metrics, darkMode = false }) {
  const {
    revenue = 0,
    revenueDelta = 0,
    sales = 0,
    salesDelta = 0,
    orders = 0,
    ordersDelta = 0,
    customers = 0,
    customersDelta = 0
  } = metrics || {};

  const cards = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: formatCurrency(revenue),
      delta: revenueDelta,
      icon: AttachMoneyIcon,
      iconGradient: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
      accentColor: '#4f46e5',
      glowColor: 'rgba(79, 70, 229, 0.3)',
      subtext: 'Net recognized income'
    },
    {
      id: 'sales',
      title: 'Total Sales Units',
      value: `${formatNumber(sales)} units`,
      delta: salesDelta,
      icon: TrendingUpIcon,
      iconGradient: 'linear-gradient(135deg, #0d9488 0%, #10b981 100%)',
      accentColor: '#0d9488',
      glowColor: 'rgba(13, 148, 136, 0.3)',
      subtext: 'Products ordered'
    },
    {
      id: 'orders',
      title: 'Total Orders',
      value: `${formatNumber(orders)}`,
      delta: ordersDelta,
      icon: ShoppingBagIcon,
      iconGradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
      accentColor: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.3)',
      subtext: 'Transactions processed'
    },
    {
      id: 'customers',
      title: 'Active Customers',
      value: `${formatNumber(customers)}`,
      delta: customersDelta,
      icon: PeopleIcon,
      iconGradient: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
      accentColor: '#f97316',
      glowColor: 'rgba(249, 115, 22, 0.3)',
      subtext: 'Unique purchaser accounts'
    }
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2.5}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.id}>
            <KpiMetricCard {...card} darkMode={darkMode} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
