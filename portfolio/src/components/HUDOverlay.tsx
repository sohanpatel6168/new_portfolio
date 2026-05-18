import { useEffect, useState } from 'react';
import { useScroll } from 'motion/react';

export default function HUDOverlay() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setProgress(v);
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[50] flex flex-col justify-between p-6 opacity-30 font-mono text-xs uppercase tracking-widest text-zinc-200">
      <div className="flex justify-between items-start">
        <div>SYS.ARCH // S.P</div>
        <div className="text-right">
          LAT 43.6532° N<br />
          LON 79.3832° W<br />
          TORONTO, ON
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div>
          SEQ: {progress <= 0.5 ? '01' : '02'} <br />
          FRAME: {(progress * 100).toFixed(1)}%
        </div>
        <div className="text-right">
          STATUS: OPTIMAL
        </div>
      </div>
    </div>
  );
}
