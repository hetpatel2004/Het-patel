import React, { useState, useEffect } from 'react';
import { technicalSkillsGroups, type SkillCategoryGroup } from '../data/stackData';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout,
  Server,
  Database,
  Code2,
  Terminal,
  Cpu,
  Palette,
  Sparkles,
  Globe,
  Layers,
} from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  '01': <Layout className="w-4 h-4 text-[#B600A8]" />,
  '02': <Server className="w-4 h-4 text-emerald-600" />,
  '03': <Database className="w-4 h-4 text-amber-600" />,
  '04': <Code2 className="w-4 h-4 text-blue-600" />,
  '05': <Terminal className="w-4 h-4 text-violet-600" />,
  '06': <Cpu className="w-4 h-4 text-cyan-600" />,
  '07': <Palette className="w-4 h-4 text-pink-600" />,
  '08': <Sparkles className="w-4 h-4 text-amber-500" />,
  '09': <Globe className="w-4 h-4 text-teal-600" />,
  '10': <Layers className="w-4 h-4 text-indigo-600" />,
};

import { apiGetSkills } from '../services/api';

export const EditorialStackSection: React.FC = () => {
  const [skillGroups, setSkillGroups] = useState<SkillCategoryGroup[]>(technicalSkillsGroups);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    apiGetSkills()
      .then((data) => {
        if (data && data.length > 0) {
          setSkillGroups(data);
        }
      })
      .catch(() => {});
  }, []);

  const categories = [
    { label: 'All', id: 'All', count: skillGroups.length },
    ...skillGroups.map((g) => ({
      label: g.shortLabel,
      id: g.id,
      count: g.skills.length,
    })),
  ];

  const displayedGroups: SkillCategoryGroup[] =
    activeCategory === 'All'
      ? skillGroups
      : skillGroups.filter((g) => g.id === activeCategory);

  const totalSkillsCount = skillGroups.reduce((acc, g) => acc + g.skills.length, 0);

  return (
    <section
      id="stack"
      className="relative z-20 w-full bg-[#ECEBE6] text-[#111111] py-20 sm:py-28 md:py-32 px-6 sm:px-12 md:px-16 lg:px-24 select-none border-t border-black/10"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-black/5 border border-black/15 text-[11px] font-mono uppercase tracking-wider font-bold text-black/70">
              TECHNICAL SKILLS
            </span>
            <span className="text-xs font-mono text-black/40">
              {technicalSkillsGroups.length} DISCIPLINES &bull; {totalSkillsCount} PRODUCTION TOOLS
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-baseline gap-3 sm:gap-5 leading-none">
            <span className="font-sans font-black uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#111111]">
              THE TOOLS
            </span>
            <span className="font-serif italic font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#111111] capitalize">
              I Think In.
            </span>
          </div>

          <p className="font-sans font-light text-sm sm:text-base md:text-lg text-black/70 max-w-2xl mt-4 leading-relaxed">
            Every project starts with the right tools. Cleanly structured across frontend engineering, backend architecture, databases, modern DevOps, and AI-accelerated workflows.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-10 sm:mb-14">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#000000] text-white shadow-md scale-105'
                    : 'bg-white/80 hover:bg-white text-black/75 border border-black/15 hover:border-black/40'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-black/5 text-black/50'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Categorized Technical Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {displayedGroups.map((group, idx) => (
              <motion.div
                key={group.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="rounded-2xl bg-white border border-black/10 hover:border-black/30 hover:shadow-xl transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between group"
              >
                {/* Card Header: Category Number, Icon, Title, and Tool Count */}
                <div>
                  <div className="flex items-center justify-between border-b border-black/8 pb-3.5 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs text-black/40 font-bold">
                        #{group.id}
                      </span>
                      <div className="p-1.5 rounded-lg bg-black/5 group-hover:scale-110 transition-transform">
                        {categoryIcons[group.id]}
                      </div>
                      <h3 className="font-sans font-bold text-sm sm:text-base text-[#111111] uppercase tracking-tight">
                        {group.category}
                      </h3>
                    </div>

                    <span className="font-mono text-[10px] uppercase tracking-wider text-black/50 px-2 py-0.5 rounded-full bg-black/5 font-semibold">
                      {group.skills.length} {group.skills.length === 1 ? 'TOOL' : 'TOOLS'}
                    </span>
                  </div>

                  {/* Skills Pills List */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-xl bg-[#F6F5F0] hover:bg-black hover:text-white border border-black/8 hover:border-black font-mono text-xs text-black/85 transition-all duration-200 cursor-default flex items-center gap-1.5 group/pill shadow-xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-black/25 group-hover/pill:bg-[#B600A8] transition-colors" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Subtle Bottom Bar */}
                <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-black/40">
                  <span>VERIFIED PROFICIENCY</span>
                  <span className="text-emerald-600 font-bold">&bull; PRODUCTION READY</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default EditorialStackSection;
