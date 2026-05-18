import { useEffect, useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';

export default function GlobalVideoBackground() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    if (p <= 0.5) {
      // First half of scroll drives video 1
      const progress = p * 2; // 0 → 1
      if (v1.duration) v1.currentTime = progress * v1.duration;
      v1.style.opacity = '1';
      v2.style.opacity = '0';
    } else {
      // Second half drives video 2
      const progress = (p - 0.5) * 2; // 0 → 1
      if (v2.duration) v2.currentTime = progress * v2.duration;
      v1.style.opacity = '0';
      v2.style.opacity = '1';
    }
  });

  // Pause videos (we control time manually via scroll)
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (v1) { v1.pause(); v1.currentTime = 0; }
    if (v2) { v2.pause(); v2.currentTime = 0; }
  }, []);

  const videoStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1,
    pointerEvents: 'none',
    transition: 'opacity 0.3s ease',
  };

  return (
    <>
      <video
        ref={video1Ref}
        src="/videos/frame1.mp4"
        style={{ ...videoStyle, opacity: 1 }}
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={video2Ref}
        src="/videos/frame2.mp4"
        style={{ ...videoStyle, opacity: 0 }}
        muted
        playsInline
        preload="auto"
      />
    </>
  );
}
