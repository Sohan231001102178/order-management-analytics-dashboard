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
  Tooltip,
  IconButton
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
  { id: 'amount', label: 'Amount ($)', numeric: true, sortable: true }
];

export default function RecentOrdersTable({ orders = [] }) {
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

  // Sort comparator
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

  // Paginated slice
  const paginatedOrders = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedOrders.slice(start, start + rowsPerPage);
  }, [sortedOrders, page, rowsPerPage]);

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Electronics': return { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' };
      case 'Software': return { bg: '#faf5ff', text: '#6b21a8', border: '#e9d5ff' };
      case 'Apparel': return { bg: '#fdf2f8', text: '#9d174d', border: '#fbcfe8' };
      case 'Home': return { bg: '#ecfdf5', text: '#065f46', border: '#a7f3d0' };
      default: return { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' };
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        borderColor: '#e2e8f0',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02)'
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
          gap: 1,
          borderBottom: '1px solid #e2e8f0'
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ReceiptLongIcon sx={{ color: '#2563eb', fontSize: 20 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#0f172a',
                fontSize: '1rem',
                letterSpacing: '-0.01em'
              }}
            >
              Order Ledger & Transaction Records
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: '#64748b', fontSize: '0.8rem', mt: 0.2 }}
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
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#64748b',
                    backgroundColor: '#f8fafc',
                    py: 1.5
                  }}
                >
                  {headCell.sortable ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? orderDirection : 'asc'}
                      onClick={() => handleRequestSort(headCell.id)}
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
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        backgroundColor: '#f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#94a3b8'
                      }}
                    >
                      <SearchOffIcon sx={{ fontSize: 26 }} />
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#334155' }}>
                      No matching orders found
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', maxWidth: 400 }}>
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
                      '&:hover': {
                        backgroundColor: '#f8fafc'
                      },
                      transition: 'background-color 0.15s ease'
                    }}
                  >
                    {/* Order ID */}
                    <TableCell sx={{ fontWeight: 600, color: '#0f172a' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: '#2563eb'
                          }}
                        >
                          {order.id}
                        </Typography>
                        {order.items && (
                          <Tooltip title={`Items: ${order.items.join(', ')}`}>
                            <InfoOutlinedIcon sx={{ fontSize: 15, color: '#94a3b8', cursor: 'pointer' }} />
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>

                    {/* Customer */}
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                          {order.customerName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
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
                          height: 24,
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          backgroundColor: catStyle.bg,
                          color: catStyle.text,
                          border: `1px solid ${catStyle.border}`
                        }}
                      />
                    </TableCell>

                    {/* Order Date */}
                    <TableCell sx={{ color: '#475569', fontSize: '0.825rem' }}>
                      {formatDate(order.date, 'medium')}
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell>
                      <OrderStatusBadge status={order.status} />
                    </TableCell>

                    {/* Amount */}
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 700,
                        color: order.status === 'Cancelled' ? '#94a3b8' : '#0f172a',
                        textDecoration: order.status === 'Cancelled' ? 'line-through' : 'none',
                        fontVariantNumeric: 'tabular-nums',
                        fontSize: '0.9rem'
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
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#ffffff'
        }}
      />
    </Paper>
  );
}
