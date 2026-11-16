import { createTheme } from '@mui/material/styles';

export const statusTokens = {
  Completed: {
    label: 'Completed',
    text: '#047857',
    bg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
    border: '#a7f3d0',
    dot: '#10b981',
    glow: 'rgba(16, 185, 129, 0.35)',
    chartColor: '#10b981',
    gradient: ['#10b981', '#059669']
  },
  Processing: {
    label: 'Processing',
    text: '#1d4ed8',
    bg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    border: '#bfdbfe',
    dot: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.35)',
    chartColor: '#3b82f6',
    gradient: ['#3b82f6', '#1d4ed8']
  },
  Pending: {
    label: 'Pending',
    text: '#b45309',
    bg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    border: '#fde68a',
    dot: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.35)',
    chartColor: '#f59e0b',
    gradient: ['#f59e0b', '#d97706']
  },
  Cancelled: {
    label: 'Cancelled',
    text: '#be123c',
    bg: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
    border: '#fecdd3',
    dot: '#f43f5e',
    glow: 'rgba(244, 63, 94, 0.35)',
    chartColor: '#f43f5e',
    gradient: ['#f43f5e', '#e11d48']
  }
};

export const getDashboardTheme = (mode = 'light') => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#4f46e5', // Indigo 600
        light: '#818cf8',
        dark: '#3730a3',
        contrastText: '#ffffff'
      },
      secondary: {
        main: '#06b6d4', // Cyan 500
        light: '#22d3ee',
        dark: '#0891b2',
        contrastText: '#ffffff'
      },
      background: {
        default: isDark ? '#0b0f19' : '#f8fafc',
        paper: isDark ? '#111827' : '#ffffff'
      },
      text: {
        primary: isDark ? '#f8fafc' : '#0f172a',
        secondary: isDark ? '#94a3b8' : '#64748b'
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
      status: statusTokens
    },
    shape: {
      borderRadius: 16 // Modern curved 16px
    },
    typography: {
      fontFamily: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'].join(','),
      h4: {
        fontWeight: 800,
        letterSpacing: '-0.03em'
      },
      h5: {
        fontWeight: 700,
        letterSpacing: '-0.02em'
      },
      h6: {
        fontWeight: 700,
        letterSpacing: '-0.01em'
      },
      subtitle1: {
        fontWeight: 500
      },
      subtitle2: {
        fontWeight: 700,
        fontSize: '0.75rem',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      },
      body1: {
        fontSize: '0.875rem'
      },
      body2: {
        fontSize: '0.8125rem'
      },
      button: {
        textTransform: 'none',
        fontWeight: 700
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? '#0b0f19' : '#f8fafc',
            backgroundImage: isDark
              ? 'radial-gradient(at 0% 0%, rgba(79, 70, 229, 0.15) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(6, 182, 212, 0.12) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(236, 72, 153, 0.08) 0px, transparent 50%)'
              : 'radial-gradient(at 0% 0%, rgba(79, 70, 229, 0.06) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(6, 182, 212, 0.06) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(244, 63, 94, 0.04) 0px, transparent 50%)',
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
            color: isDark ? '#f8fafc' : '#0f172a',
            margin: 0,
            padding: 0
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none'
          },
          outlined: {
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
            backgroundColor: isDark ? 'rgba(17, 24, 39, 0.85)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            boxShadow: isDark
              ? '0 4px 20px 0 rgba(0, 0, 0, 0.35)'
              : '0 4px 20px -2px rgba(0, 0, 0, 0.03), 0 2px 6px -1px rgba(0, 0, 0, 0.02)'
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            boxShadow: 'none',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-1px)'
            }
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            borderRadius: 8
          }
        }
      }
    }
  });
};

export const dashboardTheme = getDashboardTheme('light');
