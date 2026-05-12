'use client';

import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Box, Card, Chip, IconButton, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

type Project = {
  name: string;
  type: string;
  desc: string;
  tags: string[];
  link: string;
};

const projects: Project[] = [
  {
    name: 'Saudisol',
    type: 'Real Estate Platform · React.js · GSAP · MUI',
    desc: 'Immersive real-estate platform with 3D property experiences and virtual tours.',
    tags: ['React.js', 'Vite', 'GSAP', 'MUI'],
    link: 'https://saudisol.vercel.app/',
  },
  {
    name: 'Bricksol',
    type: 'Corporate Web App · Next.js · Three.js · GSAP',
    desc: 'Full corporate site with customised 3D components and smooth GSAP animations.',
    tags: ['Next.js', 'Three.js', 'GSAP', 'MUI'],
    link: 'https://bricksol.net/',
  },
  {
    name: 'Royal Tayyabs',
    type: 'Banquet & Restaurant · Next.js · MUI · GSAP',
    desc: 'Responsive banquet hall & restaurant sites — clean UI, optimised performance.',
    tags: ['Next.js', 'MUI', 'GSAP', 'CSS3'],
    link: 'https://www.royaltayyabs.com/',
  },
  {
    name: 'Alawaly',
    type: 'Real Estate Website · Next.js · GSAP · MUI',
    desc: 'Modern business site with interactive service sections and smooth navigation.',
    tags: ['Next.js', 'MUI', 'GSAP', 'CSS3'],
    link: 'https://alawaly-web1.vercel.app/',
  },
];

export default function ProjectsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: '100%' }}
    >
      <Stack direction="row" alignItems="center" gap={1.2} sx={{ mb: 1.8 }}>
        {/* <span style={{ display: 'inline-block', width: 22, height: 1, background: 'rgba(245,240,232,0.5)' }} /> */}
        <Typography sx={{ textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(245,240,232,0.6)', fontSize: '0.7rem', fontWeight: 600 }}>
          Projects
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 1.4,
        }}
      >
        {projects.map((project, i) => (
          <Card
            key={project.name}
            component={motion.article}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
            whileHover={{ y: -4 }}
            sx={{
              p: 1.8,
              position: 'relative',
              minHeight: 178,
              border: '1px solid rgba(255,255,255,0.09)',
              transition: 'border-color 0.24s ease, box-shadow 0.24s ease',
              '&:hover': {
                borderColor: 'rgba(240,112,48,0.55)',
                boxShadow: '0 18px 38px rgba(0,0,0,0.32)',
              },
            }}
          >
            <IconButton
              data-interactive="true"
              component="a"
              href={project.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.name}`}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                width: 30,
                height: 30,
                backgroundColor: 'rgba(255,255,255,0.04)',
                '&:hover': { backgroundColor: 'rgba(240,112,48,0.16)', borderColor: 'rgba(240,112,48,0.5)' },
              }}
            >
              <OpenInNewRoundedIcon sx={{ fontSize: 15 }} />
            </IconButton>

            <Typography
              sx={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: '1.45rem',
                fontWeight: 500,
                color: '#fbf6ee',
                pr: 4,
                lineHeight: 1.1,
                mb: 0.4,
              }}
            >
              {project.name}
            </Typography>
            <Typography
              sx={{
                color: 'var(--mui-secondary)',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                mb: 1,
                fontWeight: 500,
              }}
            >
              {project.type}
            </Typography>
            <Typography sx={{ color: 'rgba(245,240,232,0.74)', fontSize: '0.82rem', lineHeight: 1.55, mb: 1.4 }}>
              {project.desc}
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={0.6}>
              {project.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" />
              ))}
            </Stack>
          </Card>
        ))}
      </Box>
    </motion.div>
  );
}
