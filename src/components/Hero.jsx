import { useRef } from 'react';
import { motion } from 'framer-motion';
import { outdoorImages } from '../assets/images';
import logoImg from '../assets/logo.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 1, ease: [0.2, 0.8, 0.2, 1] } 
  }
};

export default function Hero() {
  const ref = useRef(null);

  // Use the plain river-walk shot (index 0 of outdoor, no text overlay)
  const bgPhoto  = outdoorImages[0]?.src;
  // Portrait shot for the right panel
  const portrait = outdoorImages[2]?.src;

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
          animation: 'kenBurns 25s ease-in-out infinite alternate',
        }}
      />

      {/* ── Gradient overlays ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.6) 100%)',
      }}/>

      {/* ── Content ── */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative', zIndex: 2,
          width: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(100px,14vw,160px) 24px clamp(80px,10vw,120px)',
          textAlign: 'center',
        }}
      >

        {/* Pre-title */}
        <motion.div variants={itemVariants} style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '0.62rem',
          letterSpacing: '0.45em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.75)',
          marginBottom: '20px',
        }}>
          Together with their families
        </motion.div>

        {/* Names */}
        <motion.div variants={itemVariants}>
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
        </motion.div>

        <motion.div variants={itemVariants} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.4rem, 4vw, 2.4rem)',
          color: '#c9a96e',
          fontStyle: 'italic',
          fontWeight: 300,
          letterSpacing: '0.4em',
          margin: '2px 0',
        }}>
          &amp;
        </motion.div>

        <motion.div variants={itemVariants}>
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
        </motion.div>

        {/* Gold line ornament */}
        <motion.div variants={itemVariants} style={{
          display: 'flex', alignItems: 'center', gap: '16px',
          margin: '28px 0 20px',
        }}>
          <div style={{ width: '60px', height: '1px', background: 'rgba(201,169,110,0.7)' }}/>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="#c9a96e">
            <path d="M7 0L8.3 5.2 14 7 8.3 8.8 7 14 5.7 8.8 0 7 5.7 5.2Z"/>
          </svg>
          <div style={{ width: '60px', height: '1px', background: 'rgba(201,169,110,0.7)' }}/>
        </motion.div>

        {/* Date */}
        <motion.div variants={itemVariants}>
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
        </motion.div>

        {/* Scroll cue */}
        <motion.div variants={itemVariants} style={{ marginTop: '60px' }}>
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
        </motion.div>
      </motion.div>
    </section>
  );
}
