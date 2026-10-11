import React, { useState } from 'react';
import { skillsData } from '../data/stackData';
import { motion } from 'framer-motion';

export const EditorialStackSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    { label: 'All', count: skillsData.length },
    { label: 'Frontend', count: skillsData.filter((s) => s.category === 'Frontend').length },
    { label: 'Backend', count: skillsData.filter((s) => s.category === 'Backend').length },
    { label: 'Tooling', count: skillsData.filter((s) => s.category === 'Tooling').length },
    { label: 'Database & Core', count: skillsData.filter((s) => s.category === 'Database & Core').length },
  ];

  const filteredSkills =
    activeCategory === 'All'
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory);

  return (
    <section id="stack" className="relative w-full bg-[#ECEBE6] text-[#111111] py-24 sm:py-32 px-6 sm:px-12 md:px-20 lg:px-28 select-none border-t border-black/10">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Label & Monogram */}
        <div className="flex items-center justify-between text-xs font-mono text-black/50 mb-12 sm:mb-16">
          <span className="uppercase tracking-widest font-semibold">04 / STACK</span>

          <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
          </div>

          <span className="uppercase tracking-widest">ARCHITECTURE</span>
        </div>

        {/* Section Title */}
        <div className="flex flex-col sm:flex-row items-baseline gap-3 sm:gap-5 mb-4 leading-none">
          <span className="font-sans font-black uppercase text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#111111]">
            THE TOOLS
          </span>
          <span className="font-serif italic font-normal text-5xl sm:text-7xl md:text-8xl text-[#111111]">
            I THINK IN.
          </span>
        </div>

        <p className="font-sans font-light text-base sm:text-lg text-black/70 max-w-xl mb-12 sm:mb-16">
          Every project starts with the right tools. These are mine &mdash; engineered for high performance, maintainability, and elegant architecture.
        </p>

        {/* Filter Pills from Frame 185 */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-12 sm:mb-16">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#000000] text-white shadow-md'
                    : 'bg-white/80 hover:bg-white text-black/80 border border-black/15 hover:border-black/40'
                }`}
              >
                <span>{cat.label === 'Database & Core' ? 'Database' : cat.label}</span>
                <span className={`text-[10px] ${isActive ? 'text-white/60' : 'text-black/50'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Clean Rounded Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
              className="p-5 rounded-2xl bg-white border border-black/10 hover:border-black/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[120px] group"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-black/40">
                <span>{skill.id}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-[#B600A8] transition-colors" />
              </div>

              <div>
                <h4 className="font-sans font-bold text-base text-[#111111] tracking-tight group-hover:text-black">
                  {skill.name}
                </h4>
                <span className="text-[10px] uppercase tracking-wider font-mono text-black/50 block mt-1">
                  {skill.category === 'Database & Core' ? 'Database' : skill.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditorialStackSection;
