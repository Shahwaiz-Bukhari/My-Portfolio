'use client';

import { Box, Divider, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const stats = [
  { value: '1+', label: 'Years Experience' },
  { value: '7+', label: 'Shipped Projects' },
  { value: 'BS', label: 'Computer Science, UOS' },
];

export default function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: '100%' }}
    >
      <Stack direction="row" alignItems="center" gap={1.2} sx={{ mb: 1.4 }}>
        {/* <span style={{ display: 'inline-block', width: 22, height: 1, background: 'rgba(245,240,232,0.5)' }} /> */}
        <Typography sx={{ textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(245,240,232,0.6)', fontSize: '0.7rem', fontWeight: 600 }}>
          About Me
        </Typography>
      </Stack>

      <Typography
        variant="h2"
        sx={{ fontSize: { xs: '1.95rem', sm: '2.6rem' }, color: '#fbf6ee', mb: 2.6, lineHeight: 1.08 }}
      >
        Engineer by training. <Box component="span" sx={{ color: 'var(--mui-primary)' }}>Designer</Box> by instinct.
      </Typography>

      <Typography sx={{ color: 'rgba(245,240,232,0.82)', lineHeight: 1.75, mb: 1.6, fontSize: '0.92rem' }}>
        I&apos;m Syed Shahwaiz Ali Bukhari — a Front-End Engineer at Bricksol, Lahore. I specialise in React.js and Next.js, building production-grade platforms for real estate, corporate, and hospitality clients.
      </Typography>
      <Typography sx={{ color: 'rgba(245,240,232,0.82)', lineHeight: 1.75, mb: 2.4, fontSize: '0.92rem' }}>
        From immersive 3D experiences with Three.js and GSAP to design systems with Material UI — I bring both halves of my brain to every project.
      </Typography>

      <Typography sx={{ color: 'rgba(245,240,232,0.55)', fontSize: '0.76rem', lineHeight: 1.8, mb: 2.4, letterSpacing: '0.01em' }}>
        shahwaiz.ali78@gmail.com · (+92) 321 1882557 · linkedin.com/in/syed-shahwaiz-ali-09a9ab264
      </Typography>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />

      <Stack direction={{ xs: 'column', sm: 'row' }} gap={{ xs: 1.6, sm: 4 }}>
        {stats.map((stat) => (
          <Box key={stat.label} sx={{ minWidth: 140 }}>
            <Typography
              sx={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: '1.9rem',
                fontWeight: 500,
                lineHeight: 1,
                background: 'linear-gradient(95deg, #f07030, #e8628a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 0.4,
              }}
            >
              {stat.value}
            </Typography>
            <Typography sx={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Stack>
    </motion.div>
  );
}
