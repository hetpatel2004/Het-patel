import React, { useState } from 'react';
import { skillsData } from '../data/stackData';
import { FadeIn } from './FadeIn';

export const StackSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    { label: 'All', count: skillsData.length },
    { label: 'Frontend', count: skillsData.filter((s) => s.category.includes('Frontend')).length },
    { label: 'Backend', count: skillsData.filter((s) => s.category.includes('Backend')).length },
    { label: 'Databases', count: skillsData.filter((s) => s.category.includes('Database')).length },
    { label: 'Tools', count: skillsData.filter((s) => s.category.includes('Tool') || s.category.includes('DevOps')).length },
  ];

  const filteredSkills =
    activeCategory === 'All'
      ? skillsData
      : activeCategory === 'Frontend'
      ? skillsData.filter((skill) => skill.category.includes('Frontend'))
      : activeCategory === 'Backend'
      ? skillsData.filter((skill) => skill.category.includes('Backend'))
      : activeCategory === 'Databases'
      ? skillsData.filter((skill) => skill.category.includes('Database'))
      : skillsData.filter((skill) => skill.category.includes('Tool') || skill.category.includes('DevOps'));

  const tickerItems = [
    'REACT.JS',
    'NEXT.JS',
    'TYPESCRIPT',
    'NODE.JS',
    'EXPRESS',
    'MONGODB',
    'TAILWIND CSS',
    'FRAMER MOTION',
    'REST APIS',
    'MYSQL',
    'GIT & GITHUB',
    'POSTMAN',
    'FIGMA',
    'DOCKER',
  ];

  return (
    <section id="stack" className="relative w-full py-24 sm:py-32 md:py-40 bg-[#0C0C0C] border-t border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#B600A8]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
        {/* Header Label */}
        <FadeIn delay={0.1} y={20}>
          <span className="text-xs uppercase tracking-widest text-[#BBCCD7]/60 font-mono block mb-4">
            02 / STACK
          </span>
        </FadeIn>

        {/* Section Headline */}
        <FadeIn delay={0.15} y={30}>
          <div className="flex flex-col sm:flex-row items-baseline gap-2 sm:gap-4 mb-4">
            <span className="font-sans font-black uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight">
              THE TOOLS
            </span>
            <span className="font-serif italic font-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#BBCCD7]">
              I THINK IN.
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} y={20}>
          <p className="text-sm sm:text-base font-light text-[#D7E2EA]/70 max-w-xl mb-10 leading-relaxed">
            Every project starts with the right tools. These are mine — engineered for modern performance, maintainability, and elegant architecture.
          </p>
        </FadeIn>

        {/* Categorization Pills (All, Frontend, Backend, Database, Tooling) */}
        <FadeIn delay={0.25} y={20} className="mb-10 sm:mb-12">
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-[#0C0C0C] shadow-[0_0_25px_rgba(255,255,255,0.35)] scale-105'
                      : 'bg-[#121319] text-[#D7E2EA]/70 hover:text-white border border-white/10 hover:border-white/25 hover:bg-[#171922]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-black/15 text-black font-mono font-bold' : 'bg-white/10 text-[#BBCCD7] font-mono'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Skills Grid: Clean Rounded Cards with Hover Transitions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#121319] border border-white/5 hover:border-white/25 hover:bg-[#161822] transition-all duration-300 flex flex-col justify-between min-h-[114px] sm:min-h-[126px] group shadow-sm hover:shadow-[0_12px_28px_rgba(0,0,0,0.6)] transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#BBCCD7]/40 group-hover:text-white transition-colors">
                <span>{skill.id}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#B600A8] group-hover:shadow-[0_0_8px_#B600A8] transition-all" />
              </div>

              <div>
                <h4 className="font-sans font-bold text-sm sm:text-base text-white tracking-tight group-hover:text-white transition-colors">
                  {skill.name}
                </h4>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-mono text-[#BBCCD7]/50 block mt-1">
                  {skill.category === 'Database & Core' ? 'Database' : skill.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Scrolling Ticker Ribbon (Marquee Motion Effect) */}
      <div className="w-full mt-16 sm:mt-24 border-y border-white/10 py-5 bg-[#0E0F14] overflow-hidden group">
        <div className="animate-marquee-ltr flex items-center gap-8 whitespace-nowrap group-hover:[animation-play-state:paused]">
          {/* Track 1 */}
          <div className="flex items-center gap-8">
            {tickerItems.map((item, idx) => (
              <span key={`ticker-1-${idx}`} className="flex items-center gap-8 text-xs sm:text-sm uppercase tracking-widest font-mono text-[#BBCCD7]/70 font-semibold">
                <span>{item}</span>
                <span className="text-[#B600A8] font-bold">&bull;</span>
              </span>
            ))}
          </div>

          {/* Track 2 for seamless repeat */}
          <div className="flex items-center gap-8" aria-hidden="true">
            {tickerItems.map((item, idx) => (
              <span key={`ticker-2-${idx}`} className="flex items-center gap-8 text-xs sm:text-sm uppercase tracking-widest font-mono text-[#BBCCD7]/70 font-semibold">
                <span>{item}</span>
                <span className="text-[#B600A8] font-bold">&bull;</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
