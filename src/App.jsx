import React, { useState, useMemo, useCallback } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Grid,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';

import { dashboardTheme } from './theme/dashboardTheme';
import { rawOrdersData, STATUSES } from './data/mockOrders';
import {
  filterOrders,
  computeKpiMetrics,
  groupRevenueByDate,
  groupOrdersByStatus
} from './utils/analyticsSelectors';

import TopHeaderBar from './components/layout/TopHeaderBar';
import FilterControlBar from './components/filters/FilterControlBar';
import KpiSummaryRow from './components/kpi/KpiSummaryRow';
import RevenueSalesChart from './components/charts/RevenueSalesChart';
import OrderStatusPieChart from './components/charts/OrderStatusPieChart';
import RecentOrdersTable from './components/orders/RecentOrdersTable';

const INITIAL_FILTERS = {
  dateRange: '30d',
  category: 'ALL',
  statuses: ['Completed', 'Processing', 'Pending', 'Cancelled'],
  searchQuery: ''
};

export default function App() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [toastMessage, setToastMessage] = useState(null);

  // Memoized Selector Pipeline (Unidirectional Data Flow)
  // Step 1: Predicate Filtering
  const filteredOrders = useMemo(() => {
    return filterOrders(rawOrdersData, filters);
  }, [filters]);

  // Step 2: KPI Aggregation & Deltas
  const kpiMetrics = useMemo(() => {
    return computeKpiMetrics(filteredOrders, rawOrdersData, filters);
  }, [filteredOrders, filters]);

  // Step 3: Time-Series Trend Grouping
  const timeSeriesData = useMemo(() => {
    return groupRevenueByDate(filteredOrders);
  }, [filteredOrders]);

  // Step 4: Status Distribution Tallies
  const statusDistribution = useMemo(() => {
    return groupOrdersByStatus(filteredOrders);
  }, [filteredOrders]);

  // Reset Filters handler
  const handleResetFilters = useCallback(() => {
    setFilters({ ...INITIAL_FILTERS });
    setToastMessage('Filters have been reset to default values.');
  }, []);

  // Filter change handler
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Toggle single status from Pie Chart interaction
  const handleToggleStatusFromPie = useCallback((statusName) => {
    setFilters((prev) => {
      const current = prev.statuses;
      if (current.includes(statusName)) {
        if (current.length === 1) return prev; // Keep at least one
        return { ...prev, statuses: current.filter((s) => s !== statusName) };
      } else {
        return { ...prev, statuses: [...current, statusName] };
      }
    });
  }, []);

  // Quick CSV Export Trigger
  const handleExportCsv = useCallback(() => {
    if (filteredOrders.length === 0) {
      setToastMessage('No order records to export.');
      return;
    }

    const headers = ['Order ID', 'Customer Name', 'Customer Email', 'Category', 'Order Date', 'Status', 'Amount ($)', 'Quantity', 'Items'];
    const rows = filteredOrders.map(order => [
      order.id,
      `"${order.customerName}"`,
      order.customerEmail,
      order.category,
      order.date,
      order.status,
      order.amount,
      order.quantity,
      `"${(order.items || []).join('; ')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `orders_export_${filters.dateRange}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage(`Exported ${filteredOrders.length} orders successfully to CSV.`);
  }, [filteredOrders, filters.dateRange]);

  return (
    <ThemeProvider theme={dashboardTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f8fafc',
          py: { xs: 2.5, sm: 3.5, md: 4 },
          px: { xs: 1.5, sm: 2, md: 3 }
        }}
      >
        <Container maxWidth="xl" disableGutters sx={{ maxWidth: '1440px !important' }}>
          {/* Tier 1: Masthead */}
          <TopHeaderBar
            filters={filters}
            onResetFilters={handleResetFilters}
            onExportCsv={handleExportCsv}
            totalFilteredCount={filteredOrders.length}
            totalRawCount={rawOrdersData.length}
          />

          {/* Tier 2: Controls */}
          <FilterControlBar
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* Tier 3: KPIs */}
          <KpiSummaryRow metrics={kpiMetrics} />

          {/* Tier 4: Analytics (Asymmetric 8:4 split) */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} lg={8}>
              <RevenueSalesChart data={timeSeriesData} />
            </Grid>
            <Grid item xs={12} lg={4}>
              <OrderStatusPieChart
                data={statusDistribution}
                totalOrders={filteredOrders.length}
                onToggleStatus={handleToggleStatusFromPie}
              />
            </Grid>
          </Grid>

          {/* Tier 5: Ledger */}
          <RecentOrdersTable orders={filteredOrders} />

          {/* Dashboard Footer info */}
          <Box
            sx={{
              mt: 4,
              pt: 2.5,
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1.5,
              color: '#94a3b8'
            }}
          >
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              Order Management Systems (OMS) Analytics Architecture • React 18 & MUI v5 / Recharts
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              Unidirectional Reactive Flow Pipeline • 60 FPS Single Source of Truth
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Notifications Snackbar */}
      <Snackbar
        open={Boolean(toastMessage)}
        autoHideDuration={3000}
        onClose={() => setToastMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setToastMessage(null)}
          severity="info"
          sx={{
            width: '100%',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            borderRadius: 2,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
            '& .MuiAlert-icon': {
              color: '#38bdf8'
            }
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
