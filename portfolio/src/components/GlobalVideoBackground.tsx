import { useEffect, useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';

export default function GlobalVideoBackground() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const ready1 = useRef(false);
  const ready2 = useRef(false);
  const { scrollYProgress } = useScroll();

  // Mark videos as seekable once they're ready
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    const onReady1 = () => { ready1.current = true; v1.pause(); };
    const onReady2 = () => { ready2.current = true; v2.pause(); };

    v1.addEventListener('canplay', onReady1);
    v2.addEventListener('canplay', onReady2);

    // Trigger load
    v1.load();
    v2.load();

    return () => {
      v1.removeEventListener('canplay', onReady1);
      v2.removeEventListener('canplay', onReady2);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    if (p <= 0.5) {
      const progress = (p / 0.5); // 0 → 1
      v1.style.opacity = '1';
      v2.style.opacity = '0';
      if (ready1.current && v1.duration) {
        v1.currentTime = progress * v1.duration;
      }
    } else {
      const progress = ((p - 0.5) / 0.5); // 0 → 1
      v1.style.opacity = '0';
      v2.style.opacity = '1';
      if (ready2.current && v2.duration) {
        v2.currentTime = progress * v2.duration;
      }
    }
  });

  const baseStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1,
    pointerEvents: 'none',
    transition: 'opacity 0.2s ease',
  };

  return (
    <>
      <video
        ref={video1Ref}
        src="/videos/frame1.mp4"
        style={{ ...baseStyle, opacity: 1 }}
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={video2Ref}
        src="/videos/frame2.mp4"
        style={{ ...baseStyle, opacity: 0 }}
        muted
        playsInline
        preload="auto"
      />
    </>
  );
}
