import { useEffect, useRef } from 'react';
import { galleryImages, outdoorImages } from '../assets/images';
import logoImg from '../assets/logo.png';

export default function Hero() {
  const ref = useRef(null);

  // Use the plain river-walk shot (index 0 of outdoor, no text overlay)
  const bgPhoto  = outdoorImages[0]?.src;
  // Portrait shot for the right panel
  const portrait = outdoorImages[2]?.src;

  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-reveal]') ?? [];
    els.forEach((el, i) => setTimeout(() => el.classList.add('visible'), 300 + i * 180));
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex' }}
    >
      {/* ── Full-bleed background photo ── */}
      <div
        className="hero-bg-image"
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: bgPhoto ? `url(${bgPhoto})` : 'none',
          backgroundSize: 'cover',
          transform: 'scale(1.05)',
          transition: 'transform 8s ease-out',
        }}
        ref={(el) => { if (el) setTimeout(() => { el.style.transform = 'scale(1)'; }, 100); }}
      />

      {/* ── Gradient overlays ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.6) 100%)',
      }}/>

      {/* ── Content ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(100px,14vw,160px) 24px clamp(80px,10vw,120px)',
        textAlign: 'center',
      }}>

        {/* Logo above names */}
        {/* <div data-reveal className="section-reveal" style={{ marginBottom: '24px' }}>
          <img
            src={logoImg}
            alt="A & M"
            style={{
              height: 'clamp(70px,10vw,110px)',
              width: 'auto',
              filter: 'brightness(0) invert(1)',
              opacity: 0.92,
            }}
          />
        </div> */}

        {/* Pre-title */}
        <div data-reveal className="section-reveal" style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '0.62rem',
          letterSpacing: '0.45em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.75)',
          marginBottom: '20px',
        }}>
          Together with their families
        </div>

        {/* Names */}
        <div data-reveal className="section-reveal">
          <h1 style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(5rem, 14vw, 10rem)',
            lineHeight: 1,
            color: '#fff',
            textShadow: '0 4px 30px rgba(0,0,0,0.35)',
            margin: 0,
          }}>
            Akarsh
          </h1>
        </div>

        <div data-reveal className="section-reveal" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.4rem, 4vw, 2.4rem)',
          color: '#c9a96e',
          fontStyle: 'italic',
          fontWeight: 300,
          letterSpacing: '0.4em',
          margin: '2px 0',
        }}>
          &amp;
        </div>

        <div data-reveal className="section-reveal">
          <h1 style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(5rem, 14vw, 10rem)',
            lineHeight: 1,
            color: '#fff',
            textShadow: '0 4px 30px rgba(0,0,0,0.35)',
            margin: 0,
          }}>
            Mariya
          </h1>
        </div>

        {/* Gold line ornament */}
        <div data-reveal className="section-reveal" style={{
          display: 'flex', alignItems: 'center', gap: '16px',
          margin: '28px 0 20px',
        }}>
          <div style={{ width: '60px', height: '1px', background: 'rgba(201,169,110,0.7)' }}/>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="#c9a96e">
            <path d="M7 0L8.3 5.2 14 7 8.3 8.8 7 14 5.7 8.8 0 7 5.7 5.2Z"/>
          </svg>
          <div style={{ width: '60px', height: '1px', background: 'rgba(201,169,110,0.7)' }}/>
        </div>

        {/* Date */}
        <div data-reveal className="section-reveal">
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.1rem, 3vw, 1.7rem)',
            letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 300,
            marginBottom: '6px',
          }}>
            Tuesday, the 27th of May, 2026
          </p>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: 'rgba(201,169,110,0.85)',
          }}>
            Celebrating Love · Joy · Forever
          </p>
        </div>

        {/* CTA */}
        {/* <div data-reveal className="section-reveal" style={{ marginTop: '44px' }}>
          <button
            className="btn-primary"
            style={{ borderRadius: '0', letterSpacing: '0.28em' }}
            onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
          >
            RSVP Now
          </button>
        </div> */}

        {/* Scroll cue */}
        <div data-reveal className="section-reveal" style={{ marginTop: '60px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <p style={{
              fontFamily: "'Montserrat',sans-serif", fontSize: '0.55rem',
              letterSpacing: '0.35em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase',
            }}>Scroll</p>
            <div style={{
              width: '1px', height: '44px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)',
            }}/>
          </div>
        </div>
      </div>
    </section>
  );
}
