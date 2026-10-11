import React from 'react';
import { motion } from 'framer-motion';

export const CurvedAboutSection: React.FC = () => {
  const stats = [
    { value: '1+', label: 'YEARS EXPERIENCE' },
    { value: '12+', label: 'PROJECTS SHIPPED' },
    { value: '8+', label: 'HAPPY CLIENTS' },
    { value: '100%', label: 'ON-TIME DELIVERY' },
  ];

  return (
    <section className="relative w-full bg-[#ECEBE6] pt-12 sm:pt-20 select-none">
      {/* Curved Convex Black Sheet that slides up over the light background */}
      <div
        className="w-full bg-[#000000] text-white pt-20 sm:pt-28 md:pt-36 pb-28 md:pb-36 px-6 sm:px-12 md:px-20 lg:px-28"
        style={{
          borderTopLeftRadius: 'clamp(40px, 8vw, 120px)',
          borderTopRightRadius: 'clamp(40px, 8vw, 120px)',
        }}
      >
        <div className="max-w-6xl mx-auto w-full">
          {/* Top Row: Monogram & Minimal Dot */}
          <div className="flex items-center justify-between text-white/70 mb-16 sm:mb-20 font-mono text-xs">
            <div className="flex flex-col leading-none font-sans font-bold text-lg text-white">
              <span>D</span>
              <span>V</span>
            </div>

            {/* Glowing Center Dot in Circle indicator */}
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>

            <span className="uppercase tracking-widest text-[11px]">ABOUT</span>
          </div>

          {/* Massive Editorial Headline */}
          <div className="flex flex-col leading-[0.92] tracking-tight mb-16 sm:mb-24">
            <span className="font-serif italic font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white">
              I build things
            </span>
            <span className="font-serif italic font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white mt-2">
              that live
            </span>
            <div className="flex items-baseline gap-4 mt-2 sm:mt-3">
              <span className="font-sans font-black uppercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white">
                ON THE WEB
              </span>
              <span className="font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white">
                *
              </span>
            </div>
          </div>

          {/* The Signature Capsule Track from Frame 080 */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-4 mb-14 sm:mb-20">
            {Array.from({ length: 9 }).map((_, i) => {
              const isCenterActive = i === 3;
              return (
                <div
                  key={i}
                  className={`h-12 sm:h-16 rounded-full transition-all duration-300 shrink-0 ${
                    isCenterActive
                      ? 'w-24 sm:w-32 bg-white shadow-[0_0_30px_rgba(255,255,255,0.4)]'
                      : 'w-12 sm:w-16 bg-[#181818] border border-white/5'
                  }`}
                />
              );
            })}
          </div>

          {/* Subtext & Bio Block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start mb-20 sm:mb-28">
            <div className="md:col-span-4">
              <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-white/50">
                * Based in Ahmedabad, India &mdash; working with teams anywhere.
              </p>
            </div>

            <div className="md:col-span-8">
              <p className="font-sans font-light text-xl sm:text-2xl md:text-3xl text-white/90 leading-relaxed max-w-2xl">
                Software engineer with 1 year of professional experience crafting fast, accessible, and visually sharp web applications. I work across the full stack &mdash; from pixel-perfect UI to clean backend architecture.
              </p>
            </div>
          </div>

          {/* 4 Stats Grid Bar from Frame 100 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-12 border-t border-white/10 font-sans">
            {stats.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col"
              >
                <span className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-2">
                  {item.value}
                </span>
                <span className="font-mono text-xs sm:text-xs tracking-widest text-white/50 uppercase">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurvedAboutSection;
