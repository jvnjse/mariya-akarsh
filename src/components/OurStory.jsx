import { useEffect, useRef } from 'react';

const story = [
  {
    year: '2021',
    title: 'First Meeting',
    desc: 'Our eyes met across a crowded room at a mutual friend\'s gathering. A simple introduction turned into hours of conversation that neither of us wanted to end.',
    icon: '✦',
  },
  {
    year: '2022',
    title: 'First Date',
    desc: 'A quiet evening at a little restaurant in the city. We talked until they asked us to leave, then continued our walk under the stars.',
    icon: '✦',
  },
  {
    year: '2023',
    title: 'Fell in Love',
    desc: 'Through every season, every journey, every ordinary and extraordinary moment — we realized we were exactly where we were meant to be.',
    icon: '✦',
  },
  {
    year: '2024',
    title: 'The Proposal',
    desc: 'At sunset, with flowers and a heart full of promise, Akarsh asked the question that would change everything. And Mariya said yes.',
    icon: '♥',
  },
  {
    year: '2025',
    title: 'Forever Begins',
    desc: 'On May 27th, surrounded by the people we love most, we begin our greatest adventure yet.',
    icon: '✦',
  },
];

export default function OurStory() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    const els = ref.current?.querySelectorAll('.section-reveal') || [];
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="our-story"
      ref={ref}
      style={{
        background: '#faf7f4',
        padding: 'clamp(70px,10vw,120px) 20px',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <p className="section-reveal section-subtitle" style={{ marginBottom: '12px' }}>How it all began</p>
          <h2 className="section-reveal section-title" style={{ transitionDelay: '0.1s' }}>Our Story</h2>
          <div className="section-reveal ornament" style={{ marginTop: '20px', transitionDelay: '0.2s' }}>
            <span style={{ color: '#c9a96e', fontSize: '1rem' }}>✦</span>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Center line (desktop) */}
          <div
            className="hidden md:block timeline-line"
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, #c9a96e 10%, #c9a96e 90%, transparent)',
              transform: 'translateX(-50%)',
            }}
          />

          {story.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                className="section-reveal"
                style={{
                  transitionDelay: `${i * 0.15}s`,
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  marginBottom: '48px',
                  position: 'relative',
                }}
              >
                {/* Mobile: full width; Desktop: half width */}
                <div
                  style={{
                    width: '100%',
                    maxWidth: '380px',
                    background: 'white',
                    border: '1px solid rgba(201,169,110,0.2)',
                    padding: '32px',
                    position: 'relative',
                    borderRadius: '2px',
                  }}
                >
                  {/* Year badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '24px',
                      [isLeft ? 'right' : 'left']: '-60px',
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #c9a96e, #a07840)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '0.6rem',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                    }}
                    className="hidden md:flex"
                  >
                    {item.year}
                  </div>

                  {/* Mobile year */}
                  <div
                    className="md:hidden"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '0.6rem',
                      letterSpacing: '0.3em',
                      color: '#c9a96e',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.year}
                  </div>

                  {/* Icon */}
                  <div style={{ color: '#c9a96e', fontSize: '1rem', marginBottom: '12px' }}>{item.icon}</div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.5rem',
                      fontWeight: 500,
                      color: '#3d2b1f',
                      marginBottom: '12px',
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.05rem',
                      lineHeight: 1.8,
                      color: '#6b5040',
                      fontStyle: 'italic',
                      fontWeight: 300,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
