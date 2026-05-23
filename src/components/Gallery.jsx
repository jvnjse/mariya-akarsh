import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages, outdoorImages, traditionalImages } from '../assets/images';

// Group images by shoot
const tabs = [
  { label: 'All',         images: galleryImages },
  { label: 'Outdoor',     images: outdoorImages },
  { label: 'Traditional', images: traditionalImages },
];

export default function Gallery() {
  const ref = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [lightbox, setLightbox] = useState(null); // { idx, images }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navigate = (dir) => {
    setLightbox(lb => {
      if (!lb) return lb;
      const next = (lb.idx + dir + lb.images.length) % lb.images.length;
      return { ...lb, idx: next };
    });
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft')  navigate(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const images = tabs[activeTab].images;

  return (
    <section
      id="gallery"
      ref={ref}
      style={{ background: 'linear-gradient(160deg,#f5ece0,#ede4d8)', padding: 'clamp(70px,10vw,120px) 20px' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <p className="section-reveal section-subtitle" style={{ marginBottom: '12px' }}>Memories</p>
          <h2 className="section-reveal section-title" style={{ transitionDelay: '0.1s' }}>Our Gallery</h2>
          <div className="section-reveal ornament" style={{ marginTop: '20px', transitionDelay: '0.2s' }}>
            <span style={{ color: '#c9a96e' }}>✦</span>
          </div>
        </div>

        {/* Tab filters */}
        <div
          className="section-reveal"
          style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '40px', transitionDelay: '0.25s' }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                padding: '10px 24px',
                background: activeTab === i ? 'linear-gradient(135deg,#c9a96e,#a07840)' : 'transparent',
                color: activeTab === i ? '#fff' : '#8a7060',
                border: '1px solid',
                borderColor: activeTab === i ? 'transparent' : 'rgba(201,169,110,0.35)',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {tab.label}
              <span style={{ marginLeft: '6px', opacity: 0.65, fontSize: '0.55rem' }}>
                ({tab.images.length})
              </span>
            </button>
          ))}
        </div>

        {/* ── Masonry columns ── */}
        <div
          className="section-reveal"
          style={{
            columns: 'clamp(2,3,3)',
            columnGap: '10px',
            transitionDelay: '0.3s',
          }}
        >
          {images.map((img, i) => (
            <div
              key={img.src + i}
              className="gallery-item"
              onClick={() => setLightbox({ idx: i, images })}
              style={{
                breakInside: 'avoid',
                marginBottom: '10px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{ width: '100%', display: 'block', transition: 'transform 0.6s ease' }}
              />
              {/* Hover overlay */}
              <div
                className="gallery-overlay"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(61,43,31,0)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.35s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(61,43,31,0.35)';
                  e.currentTarget.previousSibling.style.transform = 'scale(1.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(61,43,31,0)';
                  e.currentTarget.previousSibling.style.transform = 'scale(1)';
                }}
              >
                <span style={{
                  color: 'rgba(255,255,255,0)',
                  fontSize: '1.6rem',
                  transition: 'color 0.3s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
                >
                  ⊕
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: 2 columns override */}
        <style>{`
          @media (max-width: 640px) {
            section#gallery [style*="columns:"] { columns: 2 !important; }
          }
        `}</style>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.93)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', width: '44px', height: '44px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '50%',
            }}
          >
            <X size={20}/>
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            style={{
              position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', width: '48px', height: '48px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '50%',
            }}
          >
            <ChevronLeft size={22}/>
          </button>

          {/* Image */}
          <img
            src={lightbox.images[lightbox.idx].src}
            alt=""
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
            }}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            style={{
              position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', width: '48px', height: '48px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '50%',
            }}
          >
            <ChevronRight size={22}/>
          </button>

          {/* Counter */}
          <div style={{
            position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.6rem', letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.5)',
          }}>
            {lightbox.idx + 1} / {lightbox.images.length}
          </div>
        </div>
      )}
    </section>
  );
}
