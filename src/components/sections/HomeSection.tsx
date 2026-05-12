'use client';

import { Chip, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const chips = ['React.js', 'Next.js', 'MUI', 'GSAP', 'TypeScript'];

const INK = '#1a1622';
const INK_MUTED = 'rgba(26, 22, 34, 0.66)';
const INK_SOFT = 'rgba(26, 22, 34, 0.5)';

export default function HomeSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: '100%' }}
    >
      <Stack direction="row" alignItems="center" gap={1.2} sx={{ mb: 2 }}>
        {/* <span
          style={{
            display: 'inline-block',
            width: 22,
            height: 1,
            background: 'var(--mui-primary)',
          }}
        /> */}
        <Typography
          sx={{
            color: 'var(--mui-primary)',
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          ✦ Front-End Engineer
        </Typography>
      </Stack>

      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2.1rem', sm: '3.1rem' },
          lineHeight: 1.04,
          color: INK,
          mb: 1.5,
          fontWeight: 600,
        }}
      >
        Crafting{' '}
        <Typography
          component="span"
          sx={{
            fontStyle: 'italic',
            fontFamily: 'var(--font-cormorant), serif',
            background: 'linear-gradient(95deg, #f07030, #e8628a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 500,
          }}
        >
          digital
        </Typography>{' '}
        experiences.
      </Typography>

      <Typography
        sx={{
          fontFamily: 'var(--font-urdu), serif',
          fontSize: { xs: '1.5rem', sm: '1.8rem' },
          color: 'var(--mui-primary)',
          lineHeight: 1.5,
          mb: 1.8,
        }}
      >
        شاویز
      </Typography>

      <Typography
        sx={{
          color: INK_MUTED,
          maxWidth: 520,
          lineHeight: 1.7,
          fontSize: '0.92rem',
          mb: 2.8,
        }}
      >
        React specialist building responsive, animated, client-centric web apps — where clean architecture meets immersive UI.
      </Typography>

      <Stack direction="row" flexWrap="wrap" gap={0.9}>
        {chips.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            sx={{
              backgroundColor: 'rgba(26,22,34,0.06)',
              border: '1px solid rgba(26,22,34,0.16)',
              color: INK,
              fontWeight: 500,
            }}
          />
        ))}
      </Stack>

      <Typography
        sx={{
          position: 'absolute',
          right: { xs: 22, sm: 40 },
          bottom: { xs: 18, sm: 26 },
          color: INK_SOFT,
          fontSize: '0.7rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: 0.8,
        }}
      >
        Scroll <span className="scroll-hint-arrow">↓</span>
      </Typography>
    </motion.div>
  );
}
