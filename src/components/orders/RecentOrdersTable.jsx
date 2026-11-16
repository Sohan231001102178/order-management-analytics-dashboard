import React, { useState, useMemo } from 'react';
import {
  Paper,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
  Chip,
  Tooltip
} from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import OrderStatusBadge from './OrderStatusBadge';
import { formatCurrency, formatDate } from '../../utils/formatters';

const HEAD_CELLS = [
  { id: 'id', label: 'Order ID', numeric: false, sortable: true },
  { id: 'customerName', label: 'Customer', numeric: false, sortable: true },
  { id: 'category', label: 'Category', numeric: false, sortable: true },
  { id: 'date', label: 'Order Date', numeric: false, sortable: true },
  { id: 'status', label: 'Fulfillment Status', numeric: false, sortable: true },
  { id: 'amount', label: 'Amount (₹)', numeric: true, sortable: true }
];

export default function RecentOrdersTable({ orders = [], darkMode = false }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('date');
  const [orderDirection, setOrderDirection] = useState('desc');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedOrders = useMemo(() => {
    const comparator = (a, b) => {
      let valA = a[orderBy];
      let valB = b[orderBy];

      if (orderBy === 'date') {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      } else if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return orderDirection === 'asc' ? -1 : 1;
      if (valA > valB) return orderDirection === 'asc' ? 1 : -1;
      return 0;
    };

    return [...orders].sort(comparator);
  }, [orders, orderBy, orderDirection]);

  const paginatedOrders = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedOrders.slice(start, start + rowsPerPage);
  }, [sortedOrders, page, rowsPerPage]);

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Electronics':
        return {
          bg: darkMode ? 'rgba(59, 130, 246, 0.15)' : 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          text: darkMode ? '#60a5fa' : '#1d4ed8',
          border: darkMode ? 'rgba(59, 130, 246, 0.3)' : '#bfdbfe'
        };
      case 'Software':
        return {
          bg: darkMode ? 'rgba(168, 85, 247, 0.15)' : 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
          text: darkMode ? '#c084fc' : '#7e22ce',
          border: darkMode ? 'rgba(168, 85, 247, 0.3)' : '#e9d5ff'
        };
      case 'Apparel':
        return {
          bg: darkMode ? 'rgba(244, 63, 94, 0.15)' : 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
          text: darkMode ? '#fb7185' : '#be123c',
          border: darkMode ? 'rgba(244, 63, 94, 0.3)' : '#fecdd3'
        };
      case 'Home':
        return {
          bg: darkMode ? 'rgba(16, 185, 129, 0.15)' : 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
          text: darkMode ? '#34d399' : '#047857',
          border: darkMode ? 'rgba(16, 185, 129, 0.3)' : '#a7f3d0'
        };
      default:
        return {
          bg: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9',
          text: darkMode ? '#94a3b8' : '#475569',
          border: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1'
        };
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 4,
        borderColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
        backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.85)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        overflow: 'hidden',
        boxShadow: darkMode
          ? '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
          : '0 10px 30px -10px rgba(79, 70, 229, 0.06)'
      }}
    >
      {/* Table Header Masthead */}
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 1.5,
          borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0'
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #0d9488 0%, #3b82f6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 10px rgba(13, 148, 136, 0.3)'
              }}
            >
              <ReceiptLongIcon sx={{ fontSize: 18 }} />
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
              Order Ledger & Transaction Records
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '0.8rem', mt: 0.3 }}
          >
            Direct drill-down into normalized line items ({orders.length} matches)
          </Typography>
        </Box>
      </Box>

      {/* Table Container */}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="recent orders table">
          <TableHead>
            <TableRow>
              {HEAD_CELLS.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  sortDirection={orderBy === headCell.id ? orderDirection : false}
                  sx={{
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: darkMode ? '#94a3b8' : '#64748b',
                    backgroundColor: darkMode ? '#1e293b' : '#f8fafc',
                    borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    py: 1.8
                  }}
                >
                  {headCell.sortable ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? orderDirection : 'asc'}
                      onClick={() => handleRequestSort(headCell.id)}
                      sx={{
                        '&.Mui-active': {
                          color: '#4f46e5'
                        },
                        '& .MuiTableSortLabel-icon': {
                          color: '#4f46e5 !important'
                        }
                      }}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  ) : (
                    headCell.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={HEAD_CELLS.length} align="center" sx={{ py: 6 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: '50%',
                        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: darkMode ? '#64748b' : '#94a3b8'
                      }}
                    >
                      <SearchOffIcon sx={{ fontSize: 28 }} />
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: darkMode ? '#f8fafc' : '#334155' }}>
                      No matching orders found
                    </Typography>
                    <Typography variant="body2" sx={{ color: darkMode ? '#94a3b8' : '#64748b', maxWidth: 420 }}>
                      Try adjusting or clearing your active filters, search criteria, or date window.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order) => {
                const catStyle = getCategoryColor(order.category);

                return (
                  <TableRow
                    key={order.id}
                    hover
                    sx={{
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        backgroundColor: darkMode ? 'rgba(79, 70, 229, 0.08) !important' : 'rgba(79, 70, 229, 0.04) !important'
                      }
                    }}
                  >
                    {/* Order ID */}
                    <TableCell sx={{ fontWeight: 700, color: darkMode ? '#f8fafc' : '#0f172a' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            color: '#4f46e5'
                          }}
                        >
                          {order.id}
                        </Typography>
                        {order.items && (
                          <Tooltip title={`Items: ${order.items.join(', ')}`}>
                            <InfoOutlinedIcon sx={{ fontSize: 16, color: '#94a3b8', cursor: 'pointer', '&:hover': { color: '#4f46e5' } }} />
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>

                    {/* Customer */}
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: darkMode ? '#f8fafc' : '#0f172a' }}>
                          {order.customerName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                          {order.customerEmail}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Category */}
                    <TableCell>
                      <Chip
                        label={order.category}
                        size="small"
                        sx={{
                          height: 25,
                          fontSize: '0.725rem',
                          fontWeight: 700,
                          background: catStyle.bg,
                          color: catStyle.text,
                          border: `1px solid ${catStyle.border}`
                        }}
                      />
                    </TableCell>

                    {/* Order Date */}
                    <TableCell sx={{ color: darkMode ? '#cbd5e1' : '#475569', fontSize: '0.825rem', fontWeight: 500 }}>
                      {formatDate(order.date, 'medium')}
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell>
                      <OrderStatusBadge status={order.status} darkMode={darkMode} />
                    </TableCell>

                    {/* Amount */}
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 800,
                        color: order.status === 'Cancelled' ? '#94a3b8' : (darkMode ? '#f8fafc' : '#0f172a'),
                        textDecoration: order.status === 'Cancelled' ? 'line-through' : 'none',
                        fontVariantNumeric: 'tabular-nums',
                        fontSize: '0.925rem'
                      }}
                    >
                      {formatCurrency(order.amount)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Bar */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
          backgroundColor: darkMode ? '#111827' : '#ffffff',
          color: darkMode ? '#94a3b8' : '#64748b'
        }}
      />
    </Paper>
  );
}
