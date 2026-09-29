'use client';

import Image from 'next/image';
import FadeIn from './FadeIn';

const TOTE_DESIGNS = [
  { name: 'Times of Kumbh', image: '/designs/newspaper-tote.png' },
  { name: 'Station of Kumbh', image: '/designs/stamp-badge.jpeg' },
  { name: 'Stamps of Kumbh', image: '/designs/stamp-collection.png' },
  { name: 'Notes of Kumbh', image: '/designs/commemorative-notes.png' },
  { name: 'Passport of Kumbh', image: '/designs/passport-design.png' },
];

const OTHER_ITEMS = [
  {
    name: 'Kumbh Comic Strip Zine',
    description: "A short illustrated story of a pilgrim's day at Simhastha.",
  },
  {
    name: 'Commemorative Note',
    description: 'A numbered, dated collectible note card.',
  },
];

export default function CollectionSection() {
  return (
    <section
      id="collection"
      style={{
        background: '#F2EAD9',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          maxWidth: '1200px',
          margin: '0 auto clamp(3rem, 7vw, 5rem)',
          padding: '1.5rem 0',
          borderTop: '1px solid rgba(18,20,28,0.12)',
          borderBottom: '1px solid rgba(18,20,28,0.12)',
        }}
      >
        <div style={{ position: 'relative', width: '60px', height: '60px', flexShrink: 0 }}>
          <Image src="/designs/logo.png" alt="Kumbhkala logo" fill style={{ objectFit: 'contain' }} />
        </div>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '1.6rem',
            letterSpacing: '0.12em',
            color: '#12141C',
          }}
        >
          KUMBHKALA
        </span>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
            What We Make
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#12141C',
              marginBottom: '3rem',
            }}
          >
            Every piece carries a story.
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div
            style={{
              border: '1px solid rgba(18,20,28,0.12)',
              padding: 'clamp(1.75rem, 3vw, 2.5rem)',
              marginBottom: '2.5rem',
              background: '#F2EAD9',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '1.6rem',
                color: '#12141C',
                marginBottom: '0.6rem',
              }}
            >
              The Kumbhkala Tote — Five Designs
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '0.95rem',
                color: '#6B6259',
                lineHeight: 1.6,
                marginBottom: '2rem',
                maxWidth: '620px',
              }}
            >
              One canvas tote, five illustrated prints pulled from Nashik&apos;s own Kumbh
              ephemera — pick the story you want to carry.
            </p>
            <div
              className="tote-gallery"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '1.25rem',
              }}
            >
              {TOTE_DESIGNS.map((design, i) => (
                <FadeIn key={design.name} delay={0.3 + i * 0.08}>
                  <div>
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '3 / 4',
                        background: '#FBF6EA',
                        border: '1px solid rgba(18,20,28,0.12)',
                        padding: '0.65rem',
                        marginBottom: '0.6rem',
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Image
                          src={design.image}
                          alt={`${design.name} tote design`}
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                        fontSize: '0.65rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#B98D42',
                        textAlign: 'center',
                      }}
                    >
                      {design.name}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>

        <div
          className="collection-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            background: 'rgba(18,20,28,0.12)',
            border: '1px solid rgba(18,20,28,0.12)',
          }}
        >
          {OTHER_ITEMS.map((item, i) => (
            <FadeIn key={item.name} delay={0.7 + i * 0.1}>
              <div
                className="collection-card"
                style={{
                  background: '#F2EAD9',
                  padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                  height: '100%',
                  transition: 'background 0.4s ease',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '1.4rem',
                    color: '#12141C',
                    marginBottom: '0.75rem',
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '0.95rem',
                    color: '#6B6259',
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.95}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '0.9rem',
              color: '#B98D42',
              marginTop: '1.5rem',
            }}
          >
            Curated hampers available separately.
          </p>
        </FadeIn>
      </div>

      <style jsx>{`
        .collection-card:hover {
          background: #ece1c9 !important;
        }
        @media (max-width: 900px) {
          .tote-gallery {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .tote-gallery {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .collection-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
