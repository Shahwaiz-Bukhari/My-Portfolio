'use client';

import { CssBaseline, GlobalStyles, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#f07030' },
    secondary: { main: '#e8628a' },
    background: { default: '#1c1c1e', paper: 'rgba(255,255,255,0.04)' },
    text: {
      primary: '#f5f0e8',
      secondary: 'rgba(245, 240, 232, 0.72)',
    },
  },
  typography: {
    fontFamily: 'var(--font-outfit), sans-serif',
    h1: {
      fontFamily: 'var(--font-cormorant), Georgia, serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1,
    },
    h2: {
      fontFamily: 'var(--font-cormorant), Georgia, serif',
      fontWeight: 300,
      fontStyle: 'italic',
      letterSpacing: '-0.01em',
      lineHeight: 1.1,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
      letterSpacing: '0.04em',
    },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'var(--portfolio-bg)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '100px',
          fontSize: '0.6rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          border: '1px solid rgba(255,255,255,0.18)',
          backgroundColor: 'rgba(255,255,255,0.06)',
          color: '#f8f4ed',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.18)',
          paddingInline: 20,
          paddingBlock: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 18,
          boxShadow: 'none',
          background: 'linear-gradient(170deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.16)',
          color: '#f4efe6',
        },
      },
    },
  },
});

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--mui-primary': theme.palette.primary.main,
            '--mui-secondary': theme.palette.secondary.main,
            '--mui-bg-default': theme.palette.background.default,
            '--mui-bg-paper': theme.palette.background.paper,
            '--mui-radius': `${theme.shape.borderRadius}px`,
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
}
