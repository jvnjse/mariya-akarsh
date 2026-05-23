// Vite glob — imports all jpegs from the images folder at build time
const modules = import.meta.glob('./images/*.jpeg', { eager: true, query: '?url', import: 'default' });

// Sorted by filename so the order is deterministic
const allImages = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, url]) => ({ src: url, alt: path.split('/').pop().replace('.jpeg', '') }));

// ── Batches by shoot date ─────────────────────────────────────────────────────
export const traditionalImages = allImages.filter(i => i.alt.includes('9.21') || i.alt.includes('9.48'));
export const outdoorImages     = allImages.filter(i => i.alt.includes('9.02'));

// Specific picks for hero / featured spots (by stable index within sorted list)
export const heroImage   = outdoorImages[0];   // river walk
export const coupleImages = [
  outdoorImages[1],  // holding hands meadow
  outdoorImages[2],  // by water
  outdoorImages[7],  // dancing
  outdoorImages[10], // hugging forest
];

export const galleryImages = allImages;
