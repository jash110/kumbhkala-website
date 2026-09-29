'use client';

import { useEffect, useRef } from 'react';
import NextImage from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const FRAME_COUNT = 241;
const EASE = [0.16, 1, 0.3, 1] as const;

function frameSrc(index: number) {
  return `/frames/frame_${String(index + 1).padStart(4, '0')}.jpg`;
}

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext('2d') ?? null;
    if (!canvas || !container || !ctx) return;

    const images: HTMLImageElement[] = [];
    const wantedIndexRef = { current: 0 };
    const currentFrameRef = { current: -1 };

    function drawFrame(index: number): boolean {
      const cw = canvas!.clientWidth;
      const ch = canvas!.clientHeight;
      ctx!.fillStyle = '#12141C';
      ctx!.fillRect(0, 0, cw, ch);

      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return false;

      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx!.drawImage(img, dx, dy, dw, dh);
      return true;
    }

    function attemptDraw(index: number) {
      if (wantedIndexRef.current !== index) return;
      if (drawFrame(index)) currentFrameRef.current = index;
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = canvas!.clientWidth * dpr;
      canvas!.height = canvas!.clientHeight * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrameRef.current);
    }

    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = () => attemptDraw(i);
      img.src = frameSrc(i);
      images[i] = img;
      if (img.complete) attemptDraw(i);
    }

    let rafId: number;
    function tick() {
      const rect = container!.getBoundingClientRect();
      const scrollableHeight = container!.offsetHeight - window.innerHeight;
      const progress =
        scrollableHeight > 0 ? Math.max(0, Math.min(1, -rect.top / scrollableHeight)) : 0;

      scrollProgress.set(progress);

      const target = Math.round(progress * (FRAME_COUNT - 1));
      wantedIndexRef.current = target;
      if (target !== currentFrameRef.current) {
        attemptDraw(target);
      }

      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const identityOpacity = useTransform(scrollProgress, [0, 0.14], [1, 0]);
  const identityY = useTransform(scrollProgress, [0, 0.14], [0, -40]);

  const rightOpacity = useTransform(scrollProgress, [0.18, 0.22, 0.46, 0.5], [0, 1, 1, 0]);
  const rightX = useTransform(scrollProgress, [0.18, 0.22, 0.46, 0.5], [40, 0, 0, 20]);
  const rightY = useTransform(scrollProgress, [0.46, 0.5], [0, -16]);

  const leftOpacity = useTransform(scrollProgress, [0.54, 0.58, 0.84, 0.88], [0, 1, 1, 0]);
  const leftX = useTransform(scrollProgress, [0.54, 0.58, 0.84, 0.88], [-40, 0, 0, -20]);
  const leftY = useTransform(scrollProgress, [0.84, 0.88], [0, -16]);

  const closingOpacity = useTransform(scrollProgress, [0.88, 0.96], [0, 1]);
  const closingY = useTransform(scrollProgress, [0.88, 0.96], [36, 0]);
  const closingBackdropOpacity = useTransform(scrollProgress, [0.86, 0.96], [0, 1]);

  return (
    <div ref={containerRef} style={{ height: '500vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          background: '#12141C',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />

        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {/* Identity block */}
          <motion.div
            className="hero-identity"
            style={{ opacity: identityOpacity, y: identityY }}
          >
            <motion.p
              className="hero-label"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.05, ease: EASE }}
            >
              <span style={{ fontFamily: 'var(--font-devanagari)', marginRight: '0.5em' }}>
                ॐ
              </span>
              Nashik · Simhastha 2027
            </motion.p>
            <motion.h1
              className="hero-h1"
              initial={{ opacity: 0, y: 56 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.2, ease: EASE }}
            >
              Kumbhkala
            </motion.h1>
            <motion.p
              className="hero-copy"
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
            >
              Souvenirs carried home from the sangam — designed and printed in Nashik for
              Simhastha 2027.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: EASE }}
            >
              <a href="#craft" className="hero-cta" style={{ pointerEvents: 'auto' }}>
                Discover Kumbhkala
              </a>
            </motion.div>
          </motion.div>

          {/* Beat 2: right-side paragraph */}
          <motion.div
            className="hero-side hero-side-right"
            style={{ opacity: rightOpacity, x: rightX, y: rightY }}
          >
            <p className="hero-atmospheric">
              Diyas drift on the Godavari as dusk settles over the ghats — the same water that
              has carried a thousand years of pilgrimage.
            </p>
          </motion.div>

          {/* Beat 3: left-side paragraph */}
          <motion.div
            className="hero-side hero-side-left"
            style={{ opacity: leftOpacity, x: leftX, y: leftY }}
          >
            <p className="hero-atmospheric">
              Each tote, each poster, each printed note — folded and finished by hand, ready to
              travel home with you.
            </p>
          </motion.div>

          {/* Beat 4: closing center title + CTA */}
          <motion.div
            className="hero-backdrop"
            style={{
              opacity: closingBackdropOpacity,
              background:
                'radial-gradient(ellipse at center, rgba(18,20,28,0.6) 0%, rgba(18,20,28,0.25) 50%, transparent 78%)',
            }}
          />
          <motion.div
            className="hero-closing"
            style={{ opacity: closingOpacity, y: closingY }}
          >
            <p className="hero-label" style={{ position: 'static' }}>
              Made for Simhastha 2027
            </p>
            <h2 className="hero-closing-title">Carry the Kumbh home.</h2>
            <motion.a
              href="/collection"
              className="hero-cta"
              style={{ pointerEvents: 'auto' }}
              whileHover={{ scale: 1.04, backgroundColor: '#F4A94A' }}
              whileTap={{ scale: 0.98 }}
            >
              See the Collection
            </motion.a>
          </motion.div>
        </div>

        {/* Persistent brand mark — always visible, independent of scroll progress */}
        <div className="hero-brand-mark">
          <div style={{ position: 'relative', width: '42px', height: '42px', flexShrink: 0 }}>
            <NextImage src="/designs/logo.png" alt="Kumbhkala logo" fill style={{ objectFit: 'contain' }} />
          </div>
          <span className="hero-brand-text">KUMBHKALA</span>
        </div>
      </div>

      <style jsx global>{`
        .hero-identity {
          position: absolute;
          left: 6%;
          bottom: 14%;
          max-width: 620px;
          padding: 0 1.25rem;
        }
        .hero-label {
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #e98c24;
          margin-bottom: 1rem;
        }
        .hero-h1 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2.8rem, 7vw, 6.5rem);
          color: #f8f2e8;
          line-height: 1.05;
          margin-bottom: 1.25rem;
        }
        .hero-copy {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 1.05rem;
          color: #f4efe7;
          max-width: 460px;
          line-height: 1.6;
          margin-bottom: 1.75rem;
        }
        .hero-cta {
          display: inline-block;
          background: #e98c24;
          color: #12141c;
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.9rem 2.6rem;
          border-radius: 2px;
        }
        .hero-side {
          position: absolute;
          top: 48%;
          max-width: 380px;
          transform: translateY(-50%);
          padding: 0 1.25rem;
        }
        .hero-side-right {
          right: 6%;
          text-align: right;
        }
        .hero-side-left {
          left: 6%;
          text-align: left;
        }
        .hero-atmospheric {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.3rem, 2.2vw, 1.8rem);
          color: #f8f2e8;
          line-height: 1.5;
        }
        .hero-backdrop {
          position: absolute;
          inset: 0;
        }
        .hero-closing {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 1.5rem;
        }
        .hero-closing .hero-label {
          margin-bottom: 1rem;
        }
        .hero-closing-title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2.4rem, 6vw, 5.2rem);
          color: #f8f2e8;
          max-width: 18ch;
          line-height: 1.1;
          margin-bottom: 2rem;
        }
        .hero-brand-mark {
          position: absolute;
          top: 28px;
          left: 32px;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(18, 20, 28, 0.35);
          border-radius: 8px;
          padding: 0.5rem 0.9rem;
          pointer-events: none;
        }
        .hero-brand-text {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1rem;
          letter-spacing: 0.1em;
          color: #f8f2e8;
        }

        @media (max-width: 768px) {
          .hero-identity {
            left: 5%;
            right: 5%;
            max-width: none;
            bottom: 18%;
          }
          .hero-side {
            left: 5%;
            right: 5%;
            max-width: none;
            top: auto;
            bottom: 30%;
            transform: none;
            text-align: left;
          }
          .hero-brand-mark {
            top: 16px;
            left: 16px;
            padding: 0.4rem 0.7rem;
          }
          .hero-brand-mark .hero-brand-text {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}
