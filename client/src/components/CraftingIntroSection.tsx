import React from 'react';
import { motion } from 'framer-motion';

export const CraftingIntroSection: React.FC = () => {
  return (
    <section
      id="crafting-intro"
      className="sticky top-0 h-screen min-h-[100dvh] w-full min-w-full bg-[#ECEBE6] text-[#111111] overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none z-10"
    >
      {/* Floating Mockup Cards (Scattered in background layer with subtle parallax/float) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Card 1: Top-Left Monitor preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-[12%] left-[4%] sm:left-[7%] w-[160px] sm:w-[240px] md:w-[320px] rounded-xl overflow-hidden shadow-2xl border border-black/10 rotate-[-4deg] opacity-90"
        >
          <img
            src="/ezgif-5e35e3495d2b5a33-jpg/ezgif-frame-001.jpg"
            alt="Workspace preview"
            className="w-full h-auto object-cover"
            style={{ clipPath: 'inset(13% 72% 60% 9%)' }}
          />
        </motion.div>

        {/* Card 2: Mid-Left Laptop & Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-[38%] left-[2%] sm:left-[5%] w-[140px] sm:w-[200px] md:w-[280px] rounded-xl overflow-hidden shadow-2xl border border-black/10 rotate-[2deg] opacity-90"
        >
          <img
            src="/ezgif-5e35e3495d2b5a33-jpg/ezgif-frame-001.jpg"
            alt="App preview"
            className="w-full h-auto object-cover"
            style={{ clipPath: 'inset(35% 80% 39% 3%)' }}
          />
        </motion.div>

        {/* Card 3: Mid-Right Dark Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute top-[42%] right-[18%] sm:right-[20%] w-[130px] sm:w-[180px] md:w-[220px] rounded-xl overflow-hidden shadow-2xl border border-black/10 rotate-[-2deg] opacity-85"
        >
          <img
            src="/ezgif-5e35e3495d2b5a33-jpg/ezgif-frame-001.jpg"
            alt="Terminal code"
            className="w-full h-auto object-cover"
            style={{ clipPath: 'inset(43% 19% 41% 69%)' }}
          />
        </motion.div>

        {/* Card 4: Bottom-Right Monitor preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute top-[45%] right-[2%] sm:right-[4%] w-[160px] sm:w-[240px] md:w-[320px] rounded-xl overflow-hidden shadow-2xl border border-black/10 rotate-[3deg] opacity-90"
        >
          <img
            src="/ezgif-5e35e3495d2b5a33-jpg/ezgif-frame-001.jpg"
            alt="Dashboard mockup"
            className="w-full h-auto object-cover"
            style={{ clipPath: 'inset(45% 2% 33% 82%)' }}
          />
        </motion.div>
      </div>

      {/* Main Massive Editorial Typography */}
      <div className="relative z-10 my-auto py-6 sm:py-8 flex flex-col justify-center items-center text-center">
        {/* Row 1: Crafting (Flowing Cursive Script) */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic font-normal tracking-wide leading-[1.0] text-[clamp(4.2rem,15vw,10.5rem)] text-[#111111] capitalize"
        >
          Crafting
        </motion.h1>

        {/* Row 2: DIGITAL * (Bold Grotesque Sans Kanit with Rotating Asterisk) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 sm:gap-6 font-sans font-black uppercase tracking-tight leading-[0.9] text-[clamp(3.2rem,12.5vw,9rem)] text-[#111111]"
        >
          <span>DIGITAL</span>
          <span className="inline-block animate-[spin_12s_linear_infinite] text-[clamp(2.5rem,8.5vw,6.5rem)]">
            *
          </span>
        </motion.div>

        {/* Row 3: EXPERIENCES ↓ (Bold Grotesque Sans with Downward Arrow) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 sm:gap-6 font-sans font-black uppercase tracking-tight leading-[0.9] text-[clamp(3.2rem,12.5vw,9rem)] text-[#111111]"
        >
          <span>EXPERIENCES</span>
          <span className="text-[clamp(2.5rem,8.5vw,6.5rem)] font-light leading-none">
            &darr;
          </span>
        </motion.div>
      </div>

      {/* Bottom Bar: Metadata & Scroll Cue */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-black/10 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-black/70 z-20">
        <div className="flex items-center gap-4">
          <span>&copy;2025</span>
          <span>SOFTWARE ENGINEER</span>
        </div>

        <div className="hidden md:block text-center text-black/60">
          * Thoughtful code &amp; design &mdash; built to last. &bull;
        </div>

        <div className="flex items-center gap-2">
          <span>SCROLL TO EXPLORE</span>
          <span className="animate-bounce">&darr;</span>
        </div>
      </div>
    </section>
  );
};

export default CraftingIntroSection;
