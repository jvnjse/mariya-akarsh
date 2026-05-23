import { useEffect, useRef } from 'react';
import { MapPin, Clock, Calendar } from 'lucide-react';

const events = [
  {
    type: 'Ceremony',
    icon: '💍',
    date: 'May 27, 2025',
    time: '11:00 AM',
    venue: 'St. Mary\'s Cathedral',
    address: '123 Church Lane, The City',
    description: 'The ceremony where two become one. Join us as we exchange our vows before God and our loved ones in an intimate and sacred setting.',
    dress: 'Formal Attire',
    color: '#c9a96e',
  },
  {
    type: 'Reception',
    icon: '🥂',
    date: 'May 27, 2025',
    time: '7:00 PM',
    venue: 'The Grand Ballroom',
    address: '456 Elegance Avenue, The City',
    description: 'Celebrate with us over an evening of fine dining, dancing, and joyful memories. A night filled with love, laughter, and cherished moments.',
    dress: 'Black Tie Optional',
    color: '#8a5a2a',
  },
];

export default function Events() {
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
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="events"
      ref={ref}
      style={{
        background: 'linear-gradient(160deg, #f5ece0 0%, #ede4d8 100%)',
        padding: 'clamp(70px,10vw,120px) 20px',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <p className="section-reveal section-subtitle" style={{ marginBottom: '12px' }}>Mark your calendar</p>
          <h2 className="section-reveal section-title" style={{ transitionDelay: '0.1s' }}>The Events</h2>
          <div className="section-reveal ornament" style={{ marginTop: '20px', transitionDelay: '0.2s' }}>
            <span style={{ color: '#c9a96e' }}>✦</span>
          </div>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
          }}
        >
          {events.map((event, i) => (
            <div
              key={i}
              className="section-reveal event-card"
              style={{
                transitionDelay: `${i * 0.2}s`,
                overflow: 'hidden',
              }}
            >
              {/* Top accent bar */}
              <div
                style={{
                  height: '4px',
                  background: `linear-gradient(90deg, ${event.color}, transparent)`,
                }}
              />

              <div style={{ padding: '40px 36px' }}>
                {/* Icon + Type */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '1.8rem' }}>{event.icon}</span>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '0.6rem',
                        letterSpacing: '0.35em',
                        textTransform: 'uppercase',
                        color: event.color,
                      }}
                    >
                      {event.type}
                    </p>
                  </div>
                </div>

                {/* Info rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                  <InfoRow icon={<Calendar size={14} color={event.color}/>} text={event.date} />
                  <InfoRow icon={<Clock size={14} color={event.color}/>} text={event.time} />
                  <InfoRow
                    icon={<MapPin size={14} color={event.color}/>}
                    text={
                      <span>
                        <strong>{event.venue}</strong><br />
                        <span style={{ color: '#8a7060', fontWeight: 300 }}>{event.address}</span>
                      </span>
                    }
                  />
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'rgba(201,169,110,0.2)', margin: '24px 0' }} />

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic',
                    fontSize: '1.05rem',
                    lineHeight: 1.8,
                    color: '#5a3e30',
                    fontWeight: 300,
                    marginBottom: '20px',
                  }}
                >
                  {event.description}
                </p>

                {/* Dress code */}
                <div
                  style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    border: `1px solid ${event.color}40`,
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: event.color,
                  }}
                >
                  {event.dress}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div
          className="section-reveal"
          style={{
            textAlign: 'center',
            marginTop: '60px',
            transitionDelay: '0.4s',
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: '#8a7060',
              fontWeight: 300,
            }}
          >
            We look forward to celebrating this special day with you.
          </p>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
      <div style={{ marginTop: '2px', flexShrink: 0 }}>{icon}</div>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1rem',
          color: '#3d2b1f',
          lineHeight: 1.5,
        }}
      >
        {text}
      </p>
    </div>
  );
}
