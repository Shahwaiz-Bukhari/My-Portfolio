'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';

const links = [
  { id: '01', label: 'Home' },
  { id: '02', label: 'About' },
  { id: '03', label: 'Projects' },
  { id: '04', label: 'Skills' },
];

type FullMenuProps = {
  open: boolean;
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function FullMenu({ open, activeIndex, onSelect }: FullMenuProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            background:
              'radial-gradient(circle at 28% 18%, rgba(240,112,48,0.22), rgba(7,8,12,0.92) 58%)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Box sx={{ display: 'grid', gap: 1.4 }}>
            {links.map((item, index) => {
              const active = activeIndex === index;
              return (
                <motion.button
                  key={item.label}
                  data-interactive="true"
                  onClick={() => onSelect(index)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 * index, ease: 'easeOut' }}
                  style={{
                    border: 0,
                    padding: 0,
                    background: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: 'inherit',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.6 }}>
                    <Typography
                      component="span"
                      sx={{
                        fontFamily: 'var(--font-outfit), sans-serif',
                        fontSize: '0.7rem',
                        letterSpacing: '0.22em',
                        color: 'rgba(245,240,232,0.45)',
                      }}
                    >
                      {item.id}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontFamily: 'var(--font-cormorant), serif',
                        fontSize: { xs: '2.1rem', sm: '3rem' },
                        fontStyle: 'italic',
                        letterSpacing: '-0.01em',
                        color: active ? 'var(--mui-primary)' : 'rgba(245,240,232,0.88)',
                        transition: 'color 0.22s ease',
                        '&:hover': { color: 'var(--mui-secondary)' },
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                </motion.button>
              );
            })}
          </Box>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
