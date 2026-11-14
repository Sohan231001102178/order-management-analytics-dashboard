import React from 'react';
import { Grid, Box } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PeopleIcon from '@mui/icons-material/People';

import KpiMetricCard from './KpiMetricCard';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export default function KpiSummaryRow({ metrics }) {
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
      iconColor: '#2563eb', // Royal Indigo
      iconBg: '#eff6ff',
      subtext: 'Net recognized income'
    },
    {
      id: 'sales',
      title: 'Total Sales Units',
      value: `${formatNumber(sales)} units`,
      delta: salesDelta,
      icon: TrendingUpIcon,
      iconColor: '#0d9488', // Teal
      iconBg: '#f0fdfa',
      subtext: 'Products ordered'
    },
    {
      id: 'orders',
      title: 'Total Orders',
      value: `${formatNumber(orders)}`,
      delta: ordersDelta,
      icon: ShoppingBagIcon,
      iconColor: '#7c3aed', // Purple
      iconBg: '#f5f3ff',
      subtext: 'Transactions processed'
    },
    {
      id: 'customers',
      title: 'Active Customers',
      value: `${formatNumber(customers)}`,
      delta: customersDelta,
      icon: PeopleIcon,
      iconColor: '#ea580c', // Orange
      iconBg: '#fff7ed',
      subtext: 'Unique purchaser accounts'
    }
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2.5}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.id}>
            <KpiMetricCard {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
