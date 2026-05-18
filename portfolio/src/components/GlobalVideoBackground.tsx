import { useEffect, useRef, useState } from 'react';
import { useScroll } from 'motion/react';

export default function GlobalVideoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [images2, setImages2] = useState<HTMLImageElement[]>([]);
  const FRAME_COUNT_1 = 121;
  const FRAME_COUNT_2 = 120; // Extracted 120 frames from video 2

  // Load images
  useEffect(() => {
    // Preload frames for sequence 1
    const loadedImages1: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT_1; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `/frames/frame_${paddedIndex}_delay-0.066s.png`;
      loadedImages1.push(img);
    }
    setImages(loadedImages1);

    // Preload frames for sequence 2
    const loadedImages2: HTMLImageElement[] = [];
    // The extracted frames start at 001
    for (let i = 1; i <= FRAME_COUNT_2; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `/frames2/frame_${paddedIndex}.png`;
      loadedImages2.push(img);
    }
    setImages2(loadedImages2);
  }, []);

  // Handle Resize and drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0 || images2.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    const drawCover = (source: CanvasImageSource, sourceWidth: number, sourceHeight: number) => {
      if (!sourceWidth || !sourceHeight) return;
      const sourceRatio = sourceWidth / sourceHeight;
      const windowRatio = width / height;
      
      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (windowRatio > sourceRatio) {
        drawHeight = width / sourceRatio;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawWidth = height * sourceRatio;
        offsetX = (width - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(source, offsetX, offsetY, drawWidth, drawHeight);
    };

    const render = () => {
      const p = scrollYProgress.get();
      
      if (p <= 0.5) {
        // Map 0 - 0.5 to image sequence 1
        const imgProgress = p * 2; // 0 to 1
        const frameIndex = Math.min(
          FRAME_COUNT_1 - 1,
          Math.max(0, Math.floor(imgProgress * FRAME_COUNT_1))
        );
        const currentImg = images[frameIndex];
        
        if (currentImg && currentImg.complete) {
          drawCover(currentImg, currentImg.naturalWidth, currentImg.naturalHeight);
        }
      } else {
        // Map 0.5 - 1.0 to image sequence 2
        const imgProgress2 = (p - 0.5) * 2; // 0 to 1
        const frameIndex2 = Math.min(
          FRAME_COUNT_2 - 1,
          Math.max(0, Math.floor(imgProgress2 * FRAME_COUNT_2))
        );
        const currentImg2 = images2[frameIndex2];
        
        if (currentImg2 && currentImg2.complete) {
          drawCover(currentImg2, currentImg2.naturalWidth, currentImg2.naturalHeight);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [images, images2, scrollYProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none"
    />
  );
}
