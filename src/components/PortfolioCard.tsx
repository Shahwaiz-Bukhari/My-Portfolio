'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { MotionValue, motion, useScroll, useTransform } from 'framer-motion';
import AboutSection from './sections/AboutSection';
import HomeSection from './sections/HomeSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import TopBar from './TopBar';
import FullMenu from './FullMenu';
import SideDots from './SideDots';
import Preloader from './Preloader';

const sectionColors = ['#f5f0e8', '#111827', '#120a10', '#080f0a'];

type OrbProps = {
  color: string;
  size: number;
  x: string;
  y: string;
  active: boolean;
};

function BackgroundOrb({ color, size, x, y, active }: OrbProps) {
  return (
    <motion.div
      aria-hidden
      animate={{ opacity: active ? 0.9 : 0, scale: active ? 1 : 0.7 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        left: x,
        top: y,
        background: color,
        filter: 'blur(70px)',
        pointerEvents: 'none',
      }}
    />
  );
}

export default function PortfolioCard() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll({ container: scrollerRef });
  const backgroundColor = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75], sectionColors);

  const scrollToSection = useCallback((index: number) => {
    const container = scrollerRef.current;
    if (!container) return;
    container.scrollTo({ top: index * container.clientHeight, behavior: 'smooth' });
    setActiveSection(index);
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const container = scrollerRef.current;
    if (!container) return;
    const onScroll = () => {
      const idx = Math.round(container.scrollTop / container.clientHeight);
      setActiveSection(Math.max(0, Math.min(3, idx)));
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        scrollToSection(Math.min(activeSection + 1, 3));
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        scrollToSection(Math.max(activeSection - 1, 0));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeSection, scrollToSection]);

  const sectionContainerSx = useMemo(
    () => ({
      minHeight: '100%',
      scrollSnapAlign: 'start',
      px: { xs: 3.2, sm: 5.6 },
      py: { xs: 5.5, sm: 6.5 },
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      color: '#f5f0e8',
    }),
    []
  );

  return (
    <>
      {loading ? <Preloader onComplete={() => setLoading(false)} /> : null}

      <TopBar menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((prev) => !prev)} />

      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'grid',
          placeItems: 'center',
          px: { xs: 2, sm: 4 },
          pt: { xs: 9, sm: 11 },
          pb: { xs: 3, sm: 5 },
          position: 'relative',
          zIndex: 4,
        }}
      >
        <motion.div
          style={{
            width: 'min(840px, 100%)',
            height: 'min(560px, calc(100dvh - 120px))',
            borderRadius: 28,
            overflow: 'hidden',
            position: 'relative',
            boxShadow: 'var(--portfolio-shadow)',
            border: '1px solid rgba(255,255,255,0.10)',
            backgroundColor: backgroundColor as MotionValue<string>,
          }}
          initial={{ opacity: 0, y: 18, scale: 0.985 }}
          animate={{ opacity: loading ? 0 : 1, y: loading ? 18 : 0, scale: loading ? 0.985 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <BackgroundOrb color="rgba(240,112,48,0.45)" size={260} x="-12%" y="-8%" active={activeSection === 0} />
          <BackgroundOrb color="rgba(232,98,138,0.32)" size={220} x="72%" y="62%" active={activeSection === 0} />

          <BackgroundOrb color="rgba(96,128,220,0.32)" size={240} x="74%" y="-6%" active={activeSection === 1} />
          <BackgroundOrb color="rgba(240,112,48,0.22)" size={220} x="-8%" y="62%" active={activeSection === 1} />

          <BackgroundOrb color="rgba(232,98,138,0.38)" size={260} x="64%" y="56%" active={activeSection === 2} />
          <BackgroundOrb color="rgba(240,112,48,0.22)" size={220} x="-10%" y="-6%" active={activeSection === 2} />

          <BackgroundOrb color="rgba(120,170,128,0.32)" size={240} x="8%" y="62%" active={activeSection === 3} />
          <BackgroundOrb color="rgba(240,112,48,0.22)" size={220} x="72%" y="-6%" active={activeSection === 3} />

          {/* subtle inner highlight border */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: '28px',
              pointerEvents: 'none',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 0 80px rgba(0,0,0,0.18)',
              zIndex: 5,
            }}
          />

          <SideDots activeIndex={activeSection} onSelect={scrollToSection} />

          <Box
            ref={scrollerRef}
            sx={{
              width: '100%',
              height: '100%',
              overflowY: 'auto',
              overflowX: 'hidden',
              scrollSnapType: 'y mandatory',
              scrollBehavior: 'smooth',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              position: 'relative',
              zIndex: 6,
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            <Box component="section" id="home" sx={sectionContainerSx}>
              <HomeSection />
            </Box>
            <Box component="section" id="about" sx={sectionContainerSx}>
              <AboutSection />
            </Box>
            <Box component="section" id="projects" sx={sectionContainerSx}>
              <ProjectsSection />
            </Box>
            <Box component="section" id="skills" sx={sectionContainerSx}>
              <SkillsSection />
            </Box>
          </Box>
        </motion.div>
      </Box>

      <FullMenu open={menuOpen} activeIndex={activeSection} onSelect={scrollToSection} />
    </>
  );
}
