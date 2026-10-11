import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 300;
const FRAME_BASE_PATH = '/ezgif-5e35e3495d2b5a33-jpg/ezgif-frame-';

export const SmoothScrollSequence: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [currentDisplayFrame, setCurrentDisplayFrame] = useState<number>(1);
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  const targetProgressRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const renderedFrameRef = useRef<number>(-1);
  const animationFrameIdRef = useRef<number | null>(null);

  // Format frame filename with 3 digits padding: ezgif-frame-001.jpg
  const getFrameUrl = useCallback((index: number) => {
    const frameNumber = String(index + 1).padStart(3, '0');
    return `${FRAME_BASE_PATH}${frameNumber}.jpg`;
  }, []);

  // Draw image on canvas with high-DPI support and aspect-ratio preservation
  const drawImage = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    const imgWidth = img.naturalWidth || 1914;
    const imgHeight = img.naturalHeight || 868;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = cw / ch;

    let dw: number;
    let dh: number;
    let dx: number;
    let dy: number;

    if (canvasRatio > imgRatio) {
      // Screen is wider than image aspect ratio: fit height
      dh = ch;
      dw = dh * imgRatio;
      dx = (cw - dw) / 2;
      dy = 0;
    } else {
      // Screen is narrower/taller than image aspect ratio: fit width
      dw = cw;
      dh = dw / imgRatio;
      dx = 0;
      dy = (ch - dh) / 2;
    }

    // Smooth ambient background blur for edge bleed
    if (dx > 2 || dy > 2) {
      ctx.save();
      ctx.filter = 'blur(45px) brightness(0.65)';
      ctx.drawImage(img, -20, -20, cw + 40, ch + 40);
      ctx.restore();
    } else {
      ctx.fillStyle = '#0C0C0C';
      ctx.fillRect(0, 0, cw, ch);
    }

    // High quality crisp draw of the main frame
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // Render a specific frame index with closest-loaded fallback
  const renderFrame = useCallback((index: number) => {
    let img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame so the screen never flashes or blanks out
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = index - offset;
        if (prev >= 0 && imagesRef.current[prev]?.complete && imagesRef.current[prev]?.naturalWidth !== 0) {
          img = imagesRef.current[prev];
          break;
        }
        const next = index + offset;
        if (next < TOTAL_FRAMES && imagesRef.current[next]?.complete && imagesRef.current[next]?.naturalWidth !== 0) {
          img = imagesRef.current[next];
          break;
        }
      }
    }

    if (img && img.complete && img.naturalWidth !== 0) {
      drawImage(img);
    }
  }, [drawImage]);

  // Adjust canvas size to match device pixel ratio
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const currentFrame = Math.round(currentFrameRef.current);
    renderFrame(currentFrame);
  }, [renderFrame]);

  // Priority image preloading
  useEffect(() => {
    let isCancelled = false;
    let loaded = 0;

    const loadSingleImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        if (imagesRef.current[index]) {
          resolve(imagesRef.current[index]!);
          return;
        }
        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[index] = img;
            loaded++;
            setLoadedCount(loaded);
            if (loaded >= 15 && !isReady) {
              setIsReady(true);
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          if (!isCancelled) {
            loaded++;
            setLoadedCount(loaded);
          }
          resolve(img);
        };
      });
    };

    // 1. Immediately load frame 0 for instant display
    loadSingleImage(0).then((frame0) => {
      if (!isCancelled && frame0) {
        drawImage(frame0);
      }
    });

    // 2. Load key anchor frames first (every 10 frames)
    const anchorFrames: number[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i += 10) {
      anchorFrames.push(i);
    }

    // 3. Queue rest of the frames using managed concurrent workers
    const remainingFrames: number[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (i % 10 !== 0) {
        remainingFrames.push(i);
      }
    }

    const loadQueue = async () => {
      // Load anchor frames first with concurrency of 6
      const concurrency = 6;
      for (let i = 0; i < anchorFrames.length; i += concurrency) {
        if (isCancelled) break;
        const batch = anchorFrames.slice(i, i + concurrency);
        await Promise.all(batch.map((idx) => loadSingleImage(idx)));
      }

      // Load remaining frames with concurrency of 8
      for (let i = 0; i < remainingFrames.length; i += concurrency) {
        if (isCancelled) break;
        const batch = remainingFrames.slice(i, i + concurrency);
        await Promise.all(batch.map((idx) => loadSingleImage(idx)));
      }
    };

    loadQueue();

    return () => {
      isCancelled = true;
    };
  }, [getFrameUrl, drawImage, isReady]);

  // Window resize handler
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // Scroll listener tracking container progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      // Progress is 0 when container top is at viewport top,
      // and 1 when container bottom reaches viewport bottom.
      const rawProgress = -rect.top / totalScrollable;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      targetProgressRef.current = clampedProgress;
      setScrollPercentage(Math.round(clampedProgress * 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth lerp loop with requestAnimationFrame
  useEffect(() => {
    let isRunning = true;

    const loop = () => {
      if (!isRunning) return;

      const targetFrame = targetProgressRef.current * (TOTAL_FRAMES - 1);
      // Smooth linear interpolation (lerp factor 0.14 for ultra-smooth inertia)
      const diff = targetFrame - currentFrameRef.current;
      currentFrameRef.current += diff * 0.14;

      const rounded = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrameRef.current)));

      if (rounded !== renderedFrameRef.current) {
        renderFrame(rounded);
        renderedFrameRef.current = rounded;
        setCurrentDisplayFrame(rounded + 1);
      }

      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    animationFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [renderFrame]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[600vh] bg-[#0C0C0C] select-none"
      aria-label="Smooth Scroll Image Sequence"
    >
      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#0C0C0C]">
        {/* Canvas for ultra-smooth 60+ FPS frame scrubbing */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-contain"
        />

        {/* Ambient top/bottom transition gradient edges */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0C0C0C]/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0C0C0C]/80 to-transparent pointer-events-none" />

        {/* Minimalist interactive HUD pill */}
        <div className="absolute bottom-8 right-8 z-30 flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono tracking-wider text-[#D7E2EA]/80 shadow-2xl transition-opacity duration-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B600A8] animate-pulse" />
            <span className="font-semibold text-white">
              FRAME {String(currentDisplayFrame).padStart(3, '0')} / {TOTAL_FRAMES}
            </span>
          </div>

          <span className="text-white/30">|</span>

          {/* Mini progress bar */}
          <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#B600A8] to-[#4299E1] transition-all duration-75"
              style={{ width: `${scrollPercentage}%` }}
            />
          </div>

          <span className="text-white/70 min-w-[28px] text-right">{scrollPercentage}%</span>
        </div>

        {/* Sleek preloading indicator (shows only during initial background caching) */}
        {loadedCount < TOTAL_FRAMES && (
          <div className="absolute top-8 right-8 z-30 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#D7E2EA]/70">
            <div className="w-2.5 h-2.5 border-2 border-[#B600A8] border-t-transparent rounded-full animate-spin" />
            <span>Buffering sequence: {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%</span>
          </div>
        )}

        {/* Initial scroll hint when at the top of the sequence */}
        {scrollPercentage === 0 && (
          <div className="absolute bottom-8 left-8 z-30 hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-[#D7E2EA]/80 animate-bounce">
            <span>↓ Scroll to explore sequence</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default SmoothScrollSequence;
