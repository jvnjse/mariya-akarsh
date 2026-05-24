import { outdoorImages, traditionalImages } from '../assets/images';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
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

export default function CouplePortrait() {
  // Pick 3 hero portrait images across different shoots
  const featured = [
    outdoorImages[4],   // intimate/leaning
    traditionalImages[0], // traditional attire church door
    outdoorImages[18],   // dancing by lake
  ].filter(Boolean);

  return (
    <section
      style={{
        background: '#faf7f4',
        padding: 'clamp(60px,8vw,100px) 0 0',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ textAlign: 'center', marginBottom: '52px', padding: '0 24px' }}
      >
        <motion.p variants={itemVariants} className="section-subtitle" style={{ marginBottom: '12px' }}>Akarsh &amp; Mariya</motion.p>
        <motion.h2 variants={itemVariants} className="section-title">
          We're Tying the Knot
        </motion.h2>
        <motion.div variants={itemVariants} className="ornament" style={{ marginTop: '20px' }}>
          <span style={{ color: '#c9a96e', fontSize: '1rem' }}>✦</span>
        </motion.div>
        <motion.p
          variants={itemVariants}
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
          }}
        >
          Two hearts, one beautiful journey. We are so excited to celebrate the
          beginning of forever with the people we love most.
        </motion.p>
      </motion.div>

      {/* 3-panel photo strip */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0,
        }}
      >
        {featured.map((img, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            style={{
              position: 'relative',
              overflow: 'hidden',
              height: 'clamp(320px, 50vw, 620px)',
            }}
          >
            <motion.img
              src={img.src}
              alt={img.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
              loading="lazy"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            {/* Thin divider between panels */}
            {i < 2 && (
              <div style={{
                position: 'absolute', right: 0, top: '15%', bottom: '15%',
                width: '1px', background: 'rgba(201,169,110,0.4)',
              }}/>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Quote strip below photos */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
        style={{
          background: 'linear-gradient(135deg, #3d2b1f, #5a3e30)',
          padding: 'clamp(24px,4vw,40px) 24px',
          textAlign: 'center',
        }}
      >
        <p style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(1.8rem,4vw,2.8rem)',
          color: '#e8d5a3',
          lineHeight: 1.3,
        }}>
          "From this moment, every moment is ours."
        </p>
      </motion.div>
    </section>
  );
}
