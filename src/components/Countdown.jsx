import { useEffect, useState, useRef } from 'react';

function useCountdown(targetDate) {
  const calc = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function Box({ value, label }) {
  return (
    <div
      className="countdown-box"
      style={{
        background: 'white',
        border: '1px solid rgba(201,169,110,0.25)',
        padding: 'clamp(20px,4vw,40px) clamp(16px,3vw,32px)',
        textAlign: 'center',
        minWidth: 'clamp(70px,15vw,120px)',
        borderRadius: '2px',
      }}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2.5rem,6vw,4.5rem)',
          fontWeight: 300,
          color: '#3d2b1f',
          lineHeight: 1,
          marginBottom: '8px',
        }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <div
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '0.58rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#c9a96e',
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function Countdown() {
  const time = useCountdown('2026-05-27T00:00:00');
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.section-reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 150);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: 'linear-gradient(135deg, #3d2b1f 0%, #5a3e30 100%)',
        padding: 'clamp(60px,8vw,100px) 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04 }}>
        <svg width="100%" height="100%">
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1.5" fill="#c9a96e"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#dots)"/>
        </svg>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
        <div className="section-reveal" style={{ marginBottom: '16px' }}>
          <p className="section-subtitle" style={{ color: 'rgba(201,169,110,0.7)' }}>The big day</p>
        </div>
        <div className="section-reveal" style={{ marginBottom: '48px' }}>
          <h2
            className="section-title"
            style={{ color: '#e8d5a3', fontSize: 'clamp(2.5rem,6vw,4rem)' }}
          >
            Counting Down
          </h2>
        </div>

        <div
          className="section-reveal"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(12px,3vw,24px)',
            flexWrap: 'wrap',
          }}
        >
          <Box value={time.days} label="Days" />
          <div style={{ display: 'flex', alignItems: 'center', color: 'rgba(201,169,110,0.5)', fontSize: '2rem', fontWeight: 300 }}>:</div>
          <Box value={time.hours} label="Hours" />
          <div style={{ display: 'flex', alignItems: 'center', color: 'rgba(201,169,110,0.5)', fontSize: '2rem', fontWeight: 300 }}>:</div>
          <Box value={time.minutes} label="Minutes" />
          <div style={{ display: 'flex', alignItems: 'center', color: 'rgba(201,169,110,0.5)', fontSize: '2rem', fontWeight: 300 }}>:</div>
          <Box value={time.seconds} label="Seconds" />
        </div>

        <div className="section-reveal" style={{ marginTop: '40px' }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1rem,2.5vw,1.3rem)',
              color: 'rgba(232,213,163,0.7)',
              fontWeight: 300,
            }}
          >
            "Two souls, one heart"
          </p>
        </div>
      </div>
    </section>
  );
}
