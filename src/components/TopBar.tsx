'use client';

import { Box, IconButton, Typography } from '@mui/material';
import { motion } from 'framer-motion';

type TopBarProps = {
  menuOpen: boolean;
  onToggleMenu: () => void;
};

export default function TopBar({ menuOpen, onToggleMenu }: TopBarProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        px: { xs: 2.5, sm: 5 },
        py: { xs: 2, sm: 2.8 },
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        pointerEvents: 'none',
        '& > *': { pointerEvents: 'auto' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--mui-primary)',
            boxShadow: '0 0 12px rgba(240,112,48,0.7)',
          }}
        />
        <Typography
          sx={{
            fontSize: { xs: '0.7rem', sm: '0.78rem' },
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.85)',
            fontWeight: 500,
          }}
        >
          Syed Shahwaiz Ali Bukhari
        </Typography>
      </Box>

      <Typography
        sx={{
          fontFamily: 'var(--font-urdu), serif',
          fontSize: { xs: '1.4rem', sm: '1.7rem' },
          color: 'var(--mui-primary)',
          justifySelf: 'center',
          textShadow: '0 0 18px rgba(240,112,48,0.45)',
          lineHeight: 1,
        }}
      >
        شاویز
      </Typography>

      <IconButton
        data-interactive="true"
        onClick={onToggleMenu}
        aria-label="Toggle menu"
        sx={{
          justifySelf: 'end',
          width: 44,
          height: 44,
          p: 0,
          backgroundColor: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(14px)',
          borderColor: 'rgba(255,255,255,0.18)',
          '&:hover': { backgroundColor: 'rgba(240,112,48,0.16)', borderColor: 'rgba(240,112,48,0.5)' },
          transition: 'background-color 0.24s ease, border-color 0.24s ease',
        }}
      >
        <Box sx={{ width: 18, height: 12, position: 'relative' }}>
          {[0, 1, 2].map((line) => (
            <motion.span
              key={line}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: 1.5,
                borderRadius: 999,
                background: '#f5f0e8',
                top: line * 5,
              }}
              animate={
                menuOpen
                  ? {
                      top: 5,
                      rotate: line === 0 ? 45 : line === 2 ? -45 : 0,
                      opacity: line === 1 ? 0 : 1,
                    }
                  : { top: line * 5, rotate: 0, opacity: 1 }
              }
              transition={{ duration: 0.26, ease: 'easeInOut' }}
            />
          ))}
        </Box>
      </IconButton>
    </Box>
  );
}
