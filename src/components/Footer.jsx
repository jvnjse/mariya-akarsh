export default function Footer() {
  return (
    <footer
      style={{
        background: '#2a1e16',
        padding: 'clamp(50px,8vw,80px) 20px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top border */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)', marginBottom: '50px' }} />

      {/* Floral SVG */}
      <div style={{ marginBottom: '24px' }}>
        <svg viewBox="0 0 80 80" width="60" height="60" style={{ opacity: 0.4 }}>
          {[0,45,90,135,180,225,270,315].map((a, i) => (
            <ellipse key={i} cx="40" cy="22" rx="5" ry="14" fill="#c9a96e"
              transform={`rotate(${a} 40 40)`}/>
          ))}
          <circle cx="40" cy="40" r="10" fill="#c9a96e"/>
        </svg>
      </div>

      {/* Names */}
      <h2
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(3rem,8vw,5rem)',
          color: '#e8d5a3',
          marginBottom: '8px',
          lineHeight: 1.2,
        }}
      >
        Akarsh &amp; Mariya
      </h2>

      {/* Date */}
      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '0.65rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#c9a96e',
          marginBottom: '32px',
        }}
      >
        May 27, 2025
      </p>

      {/* Quote */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: '1.1rem',
          color: 'rgba(232,213,163,0.5)',
          fontWeight: 300,
          maxWidth: '480px',
          margin: '0 auto 40px',
          lineHeight: 1.8,
        }}
      >
        "Where you go, I will go; where you lodge, I will lodge."
        <br />
        <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>— Ruth 1:16</span>
      </p>

      {/* Nav links */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        {['Home', 'Our Story', 'Events', 'Gallery', 'RSVP'].map((link) => (
          <button
            key={link}
            onClick={() => {
              const el = document.getElementById(link.toLowerCase().replace(/\s+/g, '-'));
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(201,169,110,0.5)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#c9a96e')}
            onMouseLeave={(e) => (e.target.style.color = 'rgba(201,169,110,0.5)')}
          >
            {link}
          </button>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ height: '1px', background: 'rgba(201,169,110,0.1)', marginBottom: '24px' }} />
      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '0.55rem',
          letterSpacing: '0.2em',
          color: 'rgba(201,169,110,0.25)',
          textTransform: 'uppercase',
        }}
      >
        Made with ♥ for Akarsh &amp; Mariya · 2025
      </p>
    </footer>
  );
}
