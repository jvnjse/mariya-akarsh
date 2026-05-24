import { useEffect, useRef, useState } from 'react';

export default function RSVP() {
  const ref = useRef(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    guests: '1',
    attendance: 'yes',
    dietary: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="rsvp"
      ref={ref}
      style={{
        background: 'linear-gradient(160deg, #3d2b1f 0%, #5a3e30 60%, #3d2b1f 100%)',
        padding: 'clamp(70px,10vw,120px) 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative overlay */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03 }}>
        <svg width="100%" height="100%">
          <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M0,0 L60,0 L60,60 L0,60 Z" fill="none" stroke="#c9a96e" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      {/* Corner florals */}
      <svg viewBox="0 0 200 200" style={{ position: 'absolute', top: 20, right: 20, width: '150px', opacity: 0.07, pointerEvents: 'none' }}>
        {[0,60,120,180,240,300].map((a, i) => (
          <ellipse key={i} cx="100" cy="60" rx="12" ry="30" fill="#c9a96e"
            transform={`rotate(${a} 100 100)`}/>
        ))}
        <circle cx="100" cy="100" r="18" fill="#c9a96e"/>
      </svg>

      <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p className="section-reveal section-subtitle" style={{ color: 'rgba(201,169,110,0.6)', marginBottom: '12px' }}>
            Kindly reply by May 10, 2026
          </p>
          <h2
            className="section-reveal section-title"
            style={{ color: '#e8d5a3', transitionDelay: '0.1s' }}
          >
            RSVP
          </h2>
          <div className="section-reveal ornament" style={{ marginTop: '20px', transitionDelay: '0.2s' }}>
            <span style={{ color: '#c9a96e' }}>✦</span>
          </div>
        </div>

        {submitted ? (
          <div
            className="section-reveal visible"
            style={{
              textAlign: 'center',
              padding: '60px 40px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(201,169,110,0.2)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💌</div>
            <h3
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: '3rem',
                color: '#e8d5a3',
                marginBottom: '16px',
              }}
            >
              Thank You!
            </h3>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: '1.2rem',
                color: 'rgba(232,213,163,0.8)',
                lineHeight: 1.8,
              }}
            >
              We've received your RSVP and can't wait to celebrate with you.
              We'll be in touch with more details soon.
            </p>
            <p
              style={{
                marginTop: '24px',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.1rem',
                color: '#c9a96e',
              }}
            >
              — Akarsh &amp; Mariya
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="section-reveal"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(201,169,110,0.15)',
              padding: 'clamp(32px,6vw,56px)',
              transitionDelay: '0.3s',
            }}
          >
            {/* Attendance toggle */}
            <div style={{ marginBottom: '36px', textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.6rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,169,110,0.7)',
                  marginBottom: '16px',
                }}
              >
                Will you attend?
              </p>
              <div style={{ display: 'inline-flex', border: '1px solid rgba(201,169,110,0.3)' }}>
                {['yes', 'no'].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, attendance: v }))}
                    style={{
                      padding: '10px 32px',
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '0.65rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      background: form.attendance === v
                        ? 'linear-gradient(135deg, #c9a96e, #a07840)'
                        : 'transparent',
                      color: form.attendance === v ? 'white' : 'rgba(201,169,110,0.7)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                  >
                    {v === 'yes' ? 'Joyfully Accepts' : 'Regretfully Declines'}
                  </button>
                ))}
              </div>
            </div>

            {/* Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <Field label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
              <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />

              {form.attendance === 'yes' && (
                <>
                  <div>
                    <label style={labelStyle}>Number of Guests</label>
                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      style={{
                        ...inputStyle,
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M0 0l6 8 6-8z' fill='%23c9a96e'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 4px center',
                        cursor: 'pointer',
                      }}
                    >
                      {[1,2,3,4].map((n) => (
                        <option key={n} value={n} style={{ background: '#3d2b1f', color: 'white' }}>{n} Guest{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <Field label="Dietary Requirements" name="dietary" value={form.dietary} onChange={handleChange} placeholder="Vegetarian, vegan, allergies…" />
                </>
              )}

              <div>
                <label style={labelStyle}>Message for the Couple</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your heartfelt wishes…"
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
                />
              </div>

              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <button type="submit" className="btn-primary">
                  Send My RSVP
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

const labelStyle = {
  display: 'block',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '0.58rem',
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: 'rgba(201,169,110,0.7)',
  marginBottom: '10px',
};

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(201,169,110,0.3)',
  outline: 'none',
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: '1rem',
  color: '#e8d5a3',
  padding: '8px 0',
  fontStyle: 'italic',
};

function Field({ label, name, value, onChange, placeholder, type = 'text', required }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={inputStyle}
        onFocus={(e) => (e.target.style.borderBottomColor = '#c9a96e')}
        onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(201,169,110,0.3)')}
      />
    </div>
  );
}
