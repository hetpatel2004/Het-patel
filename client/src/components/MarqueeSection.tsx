import React, { useEffect, useRef, useState } from 'react';
import { marqueeRow1, marqueeRow2 } from '../data/marqueeImages';

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const calcOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(calcOffset);
    };

    // Initialize position on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Triple each row for seamless scroll effect
  const tripledRow1 = [...marqueeRow1, ...marqueeRow1, ...marqueeRow1];
  const tripledRow2 = [...marqueeRow2, ...marqueeRow2, ...marqueeRow2];

  const row1Transform = `translateX(${offset - 200}px)`;
  const row2Transform = `translateX(-${offset - 200}px)`;

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden relative"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: Moves RIGHT on scroll */}
        <div
          style={{
            transform: row1Transform,
            willChange: 'transform',
          }}
          className="flex gap-3 w-max"
        >
          {tripledRow1.map((src, index) => (
            <div
              key={`row1-${index}`}
              className="w-[420px] h-[270px] min-w-[420px] rounded-2xl overflow-hidden bg-[#16171E] shrink-0"
            >
              <img
                src={src}
                alt={`3D showcase gif 1-${index % 11}`}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div
          style={{
            transform: row2Transform,
            willChange: 'transform',
          }}
          className="flex gap-3 w-max"
        >
          {tripledRow2.map((src, index) => (
            <div
              key={`row2-${index}`}
              className="w-[420px] h-[270px] min-w-[420px] rounded-2xl overflow-hidden bg-[#16171E] shrink-0"
            >
              <img
                src={src}
                alt={`3D showcase gif 2-${index % 10}`}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
