'use client';

import { motion } from 'framer-motion';
import FadeIn from './FadeIn';

export default function ClosingCTA() {
  return (
    <section
      style={{
        position: 'relative',
        background: '#F2EAD9',
        padding: 'clamp(6rem, 14vw, 10rem) clamp(1.5rem, 6vw, 6rem)',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse, rgba(233,140,36,0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto' }}>
        <FadeIn>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '0.7rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#E98C24',
              marginBottom: '1.25rem',
            }}
          >
            Simhastha 2027
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
              color: '#12141C',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
            }}
          >
            Carry the Kumbh home.
            <br />
            <em style={{ fontStyle: 'italic' }}>Every piece, made to keep.</em>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '1.05rem',
              color: '#6B6259',
              maxWidth: '480px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            A cinematic first look at Kumbhkala — the full collection of hampers and printed
            keepsakes lives on its own page.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <motion.a
            href="/collection"
            style={{
              display: 'inline-block',
              background: '#E98C24',
              color: '#12141C',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '0.9rem 2.6rem',
              borderRadius: '2px',
            }}
            whileHover={{ scale: 1.03, backgroundColor: '#C4740F' }}
            whileTap={{ scale: 0.98 }}
          >
            Explore the Collection
          </motion.a>
        </FadeIn>
      </div>
    </section>
  );
}
