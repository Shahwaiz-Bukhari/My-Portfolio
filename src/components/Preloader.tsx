'use client';

import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

type PreloaderProps = {
  onComplete: () => void;
};

export default function Preloader({ onComplete }: PreloaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const dismiss = window.setTimeout(() => setVisible(false), 2700);
    return () => window.clearTimeout(dismiss);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 90,
            background:
              'radial-gradient(circle at 50% 45%, rgba(240,112,48,0.18), rgba(8,9,13,0.98) 62%)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Box sx={{ display: 'grid', placeItems: 'center', gap: 1.6, position: 'relative' }}>
            <motion.svg
              width="78"
              height="180"
              viewBox="0 0 72 170"
              fill="none"
              aria-hidden
              initial={{ y: -120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              style={{ filter: 'drop-shadow(0 12px 20px rgba(240,112,48,0.35))' }}
            >
              <defs>
                <linearGradient id="blade" x1="36" y1="14" x2="36" y2="136" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#eef2ff" />
                  <stop offset="0.55" stopColor="#c8d0ee" />
                  <stop offset="1" stopColor="#f07030" />
                </linearGradient>
              </defs>
              <path d="M36 8L46 134H26L36 8Z" fill="url(#blade)" />
              <rect x="20" y="133" width="32" height="8" rx="4" fill="#f07030" />
              <rect x="31" y="140" width="10" height="22" rx="5" fill="#ce6f44" />
            </motion.svg>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.75 }}
              style={{
                width: 160,
                height: 2,
                transformOrigin: 'center',
                background: 'linear-gradient(90deg, transparent, #f07030, #e8628a, transparent)',
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 1.2 }}
            >
              <Typography
                component="p"
                sx={{
                  fontFamily: 'var(--font-urdu), serif',
                  fontSize: { xs: '1.7rem', sm: '2.2rem' },
                  color: '#f07030',
                  textShadow: '0 0 22px rgba(240,112,48,0.55)',
                  lineHeight: 1.4,
                }}
              >
                شاویز
              </Typography>
            </motion.div>

            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 1.85 }}
              style={{
                width: 1,
                height: 52,
                transformOrigin: 'top',
                background: 'linear-gradient(to bottom, rgba(240,112,48,0.85), transparent)',
              }}
            />
          </Box>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
