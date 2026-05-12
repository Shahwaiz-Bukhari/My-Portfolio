'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';

type SideDotsProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

const labels = ['Home', 'About', 'Projects', 'Skills'];

export default function SideDots({ activeIndex, onSelect }: SideDotsProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: { xs: 10, sm: 16 },
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 24,
        display: { xs: 'none', sm: 'grid' },
        gap: 1.2,
      }}
    >
      {labels.map((label, idx) => {
        const active = idx === activeIndex;
        return (
          <motion.button
            key={label}
            data-interactive="true"
            onClick={() => onSelect(idx)}
            whileTap={{ scale: 0.92 }}
            aria-label={`Go to ${label}`}
            style={{
              position: 'relative',
              border: 'none',
              padding: 0,
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              height: 12,
            }}
          >
            <motion.span
              animate={{
                width: active ? 22 : 8,
                backgroundColor: active ? '#f07030' : 'rgba(255,255,255,0.32)',
                boxShadow: active ? '0 0 14px rgba(240,112,48,0.55)' : '0 0 0 rgba(0,0,0,0)',
              }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              style={{
                display: 'block',
                height: 8,
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.22)',
              }}
            />
          </motion.button>
        );
      })}
    </Box>
  );
}
