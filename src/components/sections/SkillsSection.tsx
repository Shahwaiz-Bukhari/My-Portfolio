'use client';

import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

type Skill = { name: string; value: number };

type Group = {
  title: string;
  accent: string;
  gradient: string;
  glow: string;
  skills: Skill[];
};

const groups: Group[] = [
  {
    title: 'Front-End',
    accent: '#ffb37a',
    gradient: 'linear-gradient(90deg, #f07030, #ff9f45)',
    glow: 'rgba(240,112,48,0.4)',
    skills: [
      { name: 'React.js', value: 88 },
      { name: 'Next.js', value: 92 },
      { name: 'GSAP', value: 85 },
      { name: 'MUI', value: 90 },
      { name: 'HTML5/CSS3', value: 96 },
      { name: 'JavaScript ES6', value: 85 },
    ],
  },
  {
    title: 'Back-End',
    accent: '#f7a8c3',
    gradient: 'linear-gradient(90deg, #e8628a, #f294b2)',
    glow: 'rgba(232,98,138,0.34)',
    skills: [
      { name: 'PHP', value: 70 },
      { name: 'MySQL', value: 75 },
      { name: 'REST APIs', value: 80 },
      { name: 'Node.js', value: 45 },
      { name: 'Python', value: 40 },
    ],
  },
  {
    title: 'Core & Tools',
    accent: '#e6c489',
    gradient: 'linear-gradient(90deg, #bf9553, #d7b173)',
    glow: 'rgba(191,149,83,0.32)',
    skills: [
      { name: 'OOP', value: 85 },
      { name: 'DSA', value: 80 },
      { name: 'Git', value: 88 },
      { name: 'Responsive Design', value: 95 },
    ],
  },
];

function SkillBar({ skill, gradient, glow }: { skill: Skill; gradient: string; glow: string }) {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.4 }}>
        <Typography sx={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.86)' }}>{skill.name}</Typography>
        <Typography sx={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.55)', letterSpacing: '0.04em' }}>
          {skill.value}%
        </Typography>
      </Stack>
      <Box sx={{ height: 5, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: '0%' }}
          whileInView={{ width: `${skill.value}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '100%',
            borderRadius: 999,
            background: gradient,
            boxShadow: `0 0 14px ${glow}`,
          }}
        />
      </Box>
    </Box>
  );
}

export default function SkillsSection() {
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
          Skills
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 1.6,
        }}
      >
        {groups.map((group) => (
          <Box
            key={group.title}
            sx={{
              gridColumn: group.title === 'Core & Tools' ? { xs: 'auto', sm: '1 / -1' } : 'auto',
              p: 1.8,
              borderRadius: 2.5,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1.4 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: group.accent, boxShadow: `0 0 10px ${group.glow}` }} />
              <Typography sx={{ color: group.accent, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 600 }}>
                {group.title}
              </Typography>
            </Stack>
            <Stack
              spacing={1}
              sx={
                group.title === 'Core & Tools'
                  ? { display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, columnGap: 2.4, rowGap: 1 }
                  : undefined
              }
            >
              {group.skills.map((skill) => (
                <SkillBar key={skill.name} skill={skill} gradient={group.gradient} glow={group.glow} />
              ))}
            </Stack>
          </Box>
        ))}
      </Box>
    </motion.div>
  );
}
