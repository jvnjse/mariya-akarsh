import { useEffect, useRef } from 'react';
import { outdoorImages, traditionalImages } from '../assets/images';

export default function CouplePortrait() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Pick 3 hero portrait images across different shoots
  const featured = [
    outdoorImages[4],   // intimate/leaning
    traditionalImages[0], // traditional attire church door
    outdoorImages[18],   // dancing by lake
  ].filter(Boolean);

  return (
    <section
      ref={ref}
      style={{
        background: '#faf7f4',
        padding: 'clamp(60px,8vw,100px) 0 0',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '52px', padding: '0 24px' }}>
        <p className="section-reveal section-subtitle" style={{ marginBottom: '12px' }}>Akarsh &amp; Mariya</p>
        <h2 className="section-reveal section-title" style={{ transitionDelay: '0.1s' }}>
          We're Tying the Knot
        </h2>
        <div className="section-reveal ornament" style={{ marginTop: '20px', transitionDelay: '0.2s' }}>
          <span style={{ color: '#c9a96e', fontSize: '1rem' }}>✦</span>
        </div>
        <p
          className="section-reveal"
          style={{
            marginTop: '20px',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1rem,2.5vw,1.25rem)',
            color: '#6b5040',
            lineHeight: 1.9,
            maxWidth: '560px',
            margin: '20px auto 0',
            fontWeight: 300,
            transitionDelay: '0.3s',
          }}
        >
          Two hearts, one beautiful journey. We are so excited to celebrate the
          beginning of forever with the people we love most.
        </p>
      </div>

      {/* 3-panel photo strip */}
      <div
        className="section-reveal"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0,
          transitionDelay: '0.4s',
        }}
      >
        {featured.map((img, i) => (
          <div
            key={i}
            style={{
              position: 'relative',
              overflow: 'hidden',
              height: 'clamp(320px, 50vw, 620px)',
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                transition: 'transform 0.8s ease',
              }}
              loading="lazy"
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
            {/* Thin divider between panels */}
            {i < 2 && (
              <div style={{
                position: 'absolute', right: 0, top: '15%', bottom: '15%',
                width: '1px', background: 'rgba(201,169,110,0.4)',
              }}/>
            )}
          </div>
        ))}
      </div>

      {/* Quote strip below photos */}
      <div style={{
        background: 'linear-gradient(135deg, #3d2b1f, #5a3e30)',
        padding: 'clamp(24px,4vw,40px) 24px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(1.8rem,4vw,2.8rem)',
          color: '#e8d5a3',
          lineHeight: 1.3,
        }}>
          "From this moment, every moment is ours."
        </p>
      </div>
    </section>
  );
}
