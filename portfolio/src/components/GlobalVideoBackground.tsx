import { useEffect, useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';

// ─── Sequence 1: public/frames/ ───────────────────────────────────────────────
// Files: frame_000_delay-0.066s.png … frame_120_delay-0.066s.png  (121 frames)
const SEQ1_COUNT = 121;
const SEQ1_FIRST = 0;
function seq1Url(i: number) {
  return `/frames/frame_${String(i).padStart(3, '0')}_delay-0.066s.png`;
}

// ─── Sequence 2: public/frames2/ ──────────────────────────────────────────────
// Files: frame_001.png … frame_120.png  (120 frames)
const SEQ2_COUNT = 120;
const SEQ2_FIRST = 1;
function seq2Url(i: number) {
  return `/frames2/frame_${String(i).padStart(3, '0')}.png`;
}

function preloadImages(urls: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(
    urls.map(
      (src) =>
        new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => resolve(img); // still resolve so we don't stall
          img.src = src;
        })
    )
  );
}

export default function GlobalVideoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames1 = useRef<HTMLImageElement[]>([]);
  const frames2 = useRef<HTMLImageElement[]>([]);
  const loaded1 = useRef(false);
  const loaded2 = useRef(false);
  const currentSeq = useRef<1 | 2>(1);
  const lastIndex = useRef(-1);

  const { scrollYProgress } = useScroll();

  // ── Draw helper ──────────────────────────────────────────────────────────────
  function drawFrame(img: HTMLImageElement | undefined) {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.naturalWidth) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Keep canvas resolution in sync with window
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // Cover-fit the image
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const dx = (cw - sw) / 2;
    const dy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, sw, sh);
  }

  // ── Preload sequences ────────────────────────────────────────────────────────
  useEffect(() => {
    const urls1 = Array.from({ length: SEQ1_COUNT }, (_, i) =>
      seq1Url(i + SEQ1_FIRST)
    );
    const urls2 = Array.from({ length: SEQ2_COUNT }, (_, i) =>
      seq2Url(i + SEQ2_FIRST)
    );

    // Draw first frame immediately so canvas isn't blank
    const firstImg = new Image();
    firstImg.onload = () => drawFrame(firstImg);
    firstImg.src = urls1[0];

    preloadImages(urls1).then((imgs) => {
      frames1.current = imgs;
      loaded1.current = true;
      // Re-draw at current scroll position once loaded
      drawFrame(imgs[lastIndex.current >= 0 ? lastIndex.current : 0]);
    });

    preloadImages(urls2).then((imgs) => {
      frames2.current = imgs;
      loaded2.current = true;
    });

    // Resize handler
    const onResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      // Re-draw after resize
      const seq = currentSeq.current;
      const idx = lastIndex.current;
      if (seq === 1 && loaded1.current) {
        drawFrame(frames1.current[idx >= 0 ? idx : 0]);
      } else if (seq === 2 && loaded2.current) {
        drawFrame(frames2.current[idx >= 0 ? idx : 0]);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Scroll → frame ───────────────────────────────────────────────────────────
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (p <= 0.5) {
      // Sequence 1
      currentSeq.current = 1;
      if (!loaded1.current) return;
      const idx = Math.min(
        Math.round((p / 0.5) * (SEQ1_COUNT - 1)),
        SEQ1_COUNT - 1
      );
      if (idx === lastIndex.current && currentSeq.current === 1) return;
      lastIndex.current = idx;
      drawFrame(frames1.current[idx]);
    } else {
      // Sequence 2
      currentSeq.current = 2;
      if (!loaded2.current) return;
      const idx = Math.min(
        Math.round(((p - 0.5) / 0.5) * (SEQ2_COUNT - 1)),
        SEQ2_COUNT - 1
      );
      if (idx === lastIndex.current && currentSeq.current === 2) return;
      lastIndex.current = idx;
      drawFrame(frames2.current[idx]);
    }
  });

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
