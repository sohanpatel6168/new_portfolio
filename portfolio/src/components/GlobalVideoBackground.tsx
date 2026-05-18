import { useEffect, useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';

export default function GlobalVideoBackground() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const ready1 = useRef(false);
  const ready2 = useRef(false);
  const lastP = useRef(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    const markReady1 = () => {
      ready1.current = true;
      v1.pause();
    };
    const markReady2 = () => {
      ready2.current = true;
      v2.pause();
    };

    v1.addEventListener('canplaythrough', markReady1);
    v2.addEventListener('canplaythrough', markReady2);

    // Also handle seeked events to unstick
    const onSeeked1 = () => { /* no-op, just needed for browser compat */ };
    v1.addEventListener('seeked', onSeeked1);

    return () => {
      v1.removeEventListener('canplaythrough', markReady1);
      v2.removeEventListener('canplaythrough', markReady2);
      v1.removeEventListener('seeked', onSeeked1);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    lastP.current = p;
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    if (p <= 0.5) {
      v1.style.opacity = '1';
      v2.style.opacity = '0';
      if (ready1.current && v1.duration && isFinite(v1.duration)) {
        const t = (p / 0.5) * v1.duration;
        v1.currentTime = Math.min(t, v1.duration - 0.01);
      }
    } else {
      v1.style.opacity = '0';
      v2.style.opacity = '1';
      if (ready2.current && v2.duration && isFinite(v2.duration)) {
        const t = ((p - 0.5) / 0.5) * v2.duration;
        v2.currentTime = Math.min(t, v2.duration - 0.01);
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
    transition: 'opacity 0.15s ease',
  };

  return (
    <>
      {/* Video 1 - first half of scroll */}
      <video
        ref={video1Ref}
        style={{ ...baseStyle, opacity: 1 }}
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/frame1.mp4" type="video/mp4" />
      </video>
      {/* Video 2 - second half of scroll */}
      <video
        ref={video2Ref}
        style={{ ...baseStyle, opacity: 0 }}
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/frame2.mp4" type="video/mp4" />
      </video>
    </>
  );
}
