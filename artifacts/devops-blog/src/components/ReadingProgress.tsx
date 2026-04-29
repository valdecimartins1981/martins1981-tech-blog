import { useEffect, useState, type RefObject } from "react";

interface ReadingProgressProps {
  targetRef: RefObject<HTMLElement | null>;
}

export function ReadingProgress({ targetRef }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = targetRef.current;
      if (!el) {
        setProgress(0);
        return;
      }
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const total = el.offsetHeight - viewport;
      if (total <= 0) {
        setProgress(rect.bottom <= viewport ? 100 : 0);
        return;
      }
      const scrolled = -rect.top;
      const pct = Math.min(100, Math.max(0, (scrolled / total) * 100));
      setProgress(pct);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetRef]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none"
      data-testid="reading-progress"
    >
      <div
        className="h-full bg-primary transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
      <div className="absolute top-1 right-3 font-mono text-[10px] uppercase tracking-widest text-primary bg-background/70 px-1.5 py-0.5">
        {Math.round(progress)}%
      </div>
    </div>
  );
}
