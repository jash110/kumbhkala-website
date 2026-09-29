'use client';

import FadeIn from './FadeIn';

export default function StorySection() {
  return (
    <section
      id="story"
      style={{
        background: '#F2EAD9',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
      }}
    >
      <div
        className="story-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          gap: 'clamp(2rem, 5vw, 5rem)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
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
              Our Story
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
              }}
            >
              Once ToteYatra, now Kumbhkala.
            </h2>
          </FadeIn>
        </div>

        <div>
          <FadeIn delay={0.2}>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: '1.3rem',
                color: '#7A1F2B',
                lineHeight: 1.6,
                marginBottom: '1.5rem',
              }}
            >
              We began as ToteYatra, printing bags for travellers who wanted to carry something
              real. Rooting the brand in Nashik, ahead of Simhastha 2027, asked for a name that
              matched the intent — Kumbhkala, the art of the Kumbh.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '1.05rem',
                color: '#6B6259',
                lineHeight: 1.75,
              }}
            >
              The philosophy stays the same: honest print, real Devanagari, and craft that
              respects the pilgrimage it's made for. Every design starts in Nashik, is tested
              against the city's own light and stone, and is finished by hand before it ever
              leaves for the ghats.
            </p>
          </FadeIn>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .story-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
