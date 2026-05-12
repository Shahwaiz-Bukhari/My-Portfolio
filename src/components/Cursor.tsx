'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], [data-interactive="true"]';

export default function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });
  const [interactive, setInteractive] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const target = { x: -100, y: -100 };

    const onMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const onOver = (event: MouseEvent) => {
      const element = event.target as HTMLElement | null;
      setInteractive(Boolean(element?.closest(INTERACTIVE_SELECTOR)));
    };

    const animateRing = () => {
      setRingPosition((prev) => ({
        x: prev.x + (target.x - prev.x) * 0.13,
        y: prev.y + (target.y - prev.y) * 0.13,
      }));
      rafRef.current = window.requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    rafRef.current = window.requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 10,
          height: 10,
          borderRadius: '50%',
          zIndex: 60,
          pointerEvents: 'none',
          background: interactive ? '#e8628a' : '#f07030',
          x: position.x - 5,
          y: position.y - 5,
        }}
        animate={{ scale: interactive ? 1.8 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      />
      <motion.div
        aria-hidden
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 34,
          height: 34,
          borderRadius: '50%',
          zIndex: 55,
          pointerEvents: 'none',
          border: '1px solid rgba(240, 112, 48, 0.7)',
          x: ringPosition.x - 17,
          y: ringPosition.y - 17,
        }}
        animate={{ borderColor: interactive ? 'rgba(232,98,138,0.8)' : 'rgba(240,112,48,0.7)' }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
