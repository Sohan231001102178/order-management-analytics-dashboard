import { createTheme } from '@mui/material/styles';

export const statusTokens = {
  Completed: {
    label: 'Completed',
    text: '#15803d',
    bg: '#dcfce7',
    border: '#bbf7d0',
    dot: '#16a34a',
    chartColor: '#10b981'
  },
  Processing: {
    label: 'Processing',
    text: '#1d4ed8',
    bg: '#dbeafe',
    border: '#bfdbfe',
    dot: '#2563eb',
    chartColor: '#3b82f6'
  },
  Pending: {
    label: 'Pending',
    text: '#b45309',
    bg: '#fef3c7',
    border: '#fde68a',
    dot: '#d97706',
    chartColor: '#f59e0b'
  },
  Cancelled: {
    label: 'Cancelled',
    text: '#b91c1c',
    bg: '#fee2e2',
    border: '#fecaca',
    dot: '#dc2626',
    chartColor: '#ef4444'
  }
};

export const dashboardTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // Royal Indigo
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#0d9488', // Teal accent for Sales Volume
      light: '#2dd4bf',
      dark: '#0f766e',
      contrastText: '#ffffff'
    },
    background: {
      default: '#f8fafc', // Light slate neutral background
      paper: '#ffffff'    // Pure white card surfaces
    },
    text: {
      primary: '#0f172a',  // Slate 900
      secondary: '#64748b', // Slate 500
      disabled: '#94a3b8'
    },
    divider: '#e2e8f0', // Crisp hairline borders
    status: statusTokens
  },
  shape: {
    borderRadius: 12 // Modern 12px rounded borders
  },
  typography: {
    fontFamily: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'].join(','),
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: '#0f172a'
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#0f172a'
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#0f172a'
    },
    subtitle1: {
      fontWeight: 500,
      color: '#64748b'
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: '0.75rem',
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: '#64748b'
    },
    body1: {
      fontSize: '0.875rem',
      color: '#334155'
    },
    body2: {
      fontSize: '0.8125rem',
      color: '#64748b'
    },
    button: {
      textTransform: 'none',
      fontWeight: 600
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f8fafc',
          color: '#0f172a',
          margin: 0,
          padding: 0,
          fontFamily: 'Inter, sans-serif'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        },
        outlined: {
          borderColor: '#e2e8f0',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 6
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#f8fafc',
          fontWeight: 600,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#64748b',
          borderBottom: '1px solid #e2e8f0'
        },
        body: {
          fontSize: '0.875rem',
          borderBottom: '1px solid #f1f5f9'
        }
      }
    }
  }
});
