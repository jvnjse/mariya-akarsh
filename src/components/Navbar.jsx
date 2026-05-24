import { useState, useEffect } from 'react';
import logoImg from '../assets/logo.png';

const links = ['Home', 'Our Story', 'Events', 'Gallery'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase().replace(/\s+/g, '-'));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(250,247,244,0.97)' : 'transparent',
        boxShadow: scrolled ? '0 1px 30px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <img
            src={logoImg}
            alt="Akarsh & Mariya"
            style={{
              height: scrolled ? '52px' : '64px',
              width: 'auto',
              transition: 'height 0.4s ease',
              // filter: scrolled ? 'none' : 'brightness(0) invert(1)',
            }}
          />
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10 list-none">
          {links.map((link) => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link)}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.62rem',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: scrolled ? '#3d2b1f' : '#fff',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 0',
                  position: 'relative',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#c9a96e')}
                onMouseLeave={(e) => (e.target.style.color = scrolled ? '#3d2b1f' : '#fff')}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                background: scrolled ? '#3d2b1f' : '#fff',
                marginBottom: i < 2 ? '5px' : 0,
                transition: 'all 0.3s',
                opacity: menuOpen && i === 1 ? 0 : 1,
                transform:
                  menuOpen && i === 0 ? 'translateY(6.5px) rotate(45deg)' :
                  menuOpen && i === 2 ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        style={{
          background: 'rgba(250,247,244,0.98)',
          borderTop: '1px solid rgba(201,169,110,0.2)',
          overflow: 'hidden',
          maxHeight: menuOpen ? '300px' : '0',
          transition: 'max-height 0.4s ease',
        }}
      >
        {links.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'center',
              padding: '14px',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#3d2b1f',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {link}
          </button>
        ))}
      </div>
    </nav>
  );
}
