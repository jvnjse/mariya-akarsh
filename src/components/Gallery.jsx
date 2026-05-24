import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages, outdoorImages, traditionalImages } from '../assets/images';
import { motion } from 'framer-motion';

// Group images by shoot
const tabs = [
  { label: 'All',         images: galleryImages },
  { label: 'Outdoor',     images: outdoorImages },
  { label: 'Traditional', images: traditionalImages },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } 
  }
};

export default function Gallery() {
  const [activeTab, setActiveTab] = useState(0);
  const [lightbox, setLightbox] = useState(null); // { idx, images }

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
      style={{ background: 'linear-gradient(160deg,#f5ece0,#ede4d8)', padding: 'clamp(70px,10vw,120px) 20px' }}
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ marginBottom: '12px' }}>Memories</motion.p>
          <motion.h2 variants={itemVariants} className="section-title">Our Gallery</motion.h2>
          <motion.div variants={itemVariants} className="ornament" style={{ marginTop: '20px' }}>
            <span style={{ color: '#c9a96e' }}>✦</span>
          </motion.div>
        </div>

        {/* Tab filters */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '40px' }}
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
        </motion.div>

        {/* ── Masonry columns ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeTab} // Re-animate when tab changes
          style={{
            columns: 'clamp(2,3,3)',
            columnGap: '10px',
          }}
        >
          {images.map((img, i) => (
            <motion.div
              key={img.src + i}
              variants={itemVariants}
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
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: 2 columns override */}
        <style>{`
          @media (max-width: 640px) {
            section#gallery [style*="columns:"] { columns: 2 !important; }
          }
        `}</style>
      </motion.div>

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
