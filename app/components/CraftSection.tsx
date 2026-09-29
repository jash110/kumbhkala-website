'use client';

import Image from 'next/image';
import FadeIn from './FadeIn';

export default function CraftSection() {
  return (
    <section
      id="craft"
      style={{
        background: '#F2EAD9',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 5vw, 5rem)',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
        className="craft-grid"
      >
        <div>
          <FadeIn>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '0.7rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#E98C24',
                marginBottom: '1rem',
              }}
            >
              The Craft
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: '#12141C',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              Printed, folded, and finished in Nashik.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '1.05rem',
                color: '#6B6259',
                lineHeight: 1.75,
                maxWidth: '480px',
                borderLeft: '1px solid rgba(18,20,28,0.12)',
                paddingLeft: '1.5rem',
              }}
            >
              Every Kumbhkala piece begins on the presses of Nashik — real Devanagari
              typography set alongside newspaper-style layouts of Kumbh headlines, hand-finished
              paper goods, and canvas cut and stitched for travel. Nothing is generic; each item
              is designed for pilgrims and travellers who want to carry something honest home
              from the sangam, not a souvenir stamped out for anyone.
            </p>
          </FadeIn>
        </div>
        <FadeIn delay={0.3}>
          <div
            style={{
              width: '100%',
              aspectRatio: '2 / 3',
              overflow: 'hidden',
              background: '#FBF6EA',
              border: '1px solid rgba(18,20,28,0.12)',
              padding: 'clamp(1rem, 3vw, 2rem)',
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src="/designs/newspaper-tote.png"
                alt="Kumbhkala newspaper-style tote bag print design"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </FadeIn>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .craft-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
