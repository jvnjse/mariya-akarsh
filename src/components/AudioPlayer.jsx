import { useState, useEffect, useRef } from 'react';
import { Music, Pause } from 'lucide-react';
import song from '../assets/song/2.m4a';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.log(err)
        // Autoplay prevented, waiting for interaction
      }
    };

    // Attempt to auto-play immediately
    playAudio();

    // Attempt again after 2 seconds
    const timeoutId = setTimeout(() => {
      
        playAudio();
    
    }, 5000);

    const handleInteraction = async () => {
      if (!hasInteracted) {
        try {
          await audio.play();
          setIsPlaying(true);
          setHasInteracted(true);
        } catch (err) {
          // Still failed, ignore
        }
      }
    };

    window.addEventListener('scroll', handleInteraction, { once: true });
    window.addEventListener('wheel', handleInteraction, { once: true });
    window.addEventListener('touchmove', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('wheel', handleInteraction);
      window.removeEventListener('touchmove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <audio ref={audioRef} src={song} loop />
      <button
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        className="bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-emerald-800 hover:bg-emerald-50 hover:scale-110 transition-all duration-300"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
{isPlaying ? (
  <Pause size={32} style={{ margin: '10px' }} />
) : (
  <Music size={32} style={{ margin: '10px' }} />
)}      </button>
    </div>
  );
}
