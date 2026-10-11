import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  index: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tags: string[];
  frameImg: string;
  link: string;
}

const projects: Project[] = [
  {
    index: '1/5',
    title: 'SCHEMAFLOW',
    subtitle: 'Enterprise Self-Healing SQL Agent',
    category: 'AI Agents & Database Orchestration',
    description: 'An AI-powered SQL workflow agent that connects natural language to production databases with self-healing query evaluation and automated schema mapping.',
    tags: ['React', 'Node.js', 'LLMs', 'PostgreSQL', 'MCP'],
    frameImg: '/ezgif-5e35e3495d2b5a33-jpg/ezgif-frame-135.jpg',
    link: 'https://github.com/hetpatel2004',
  },
  {
    index: '2/5',
    title: 'CARNET MMM',
    subtitle: 'Student Stationery E-Commerce Ecosystem',
    category: 'Mobile & Web Retail App',
    description: 'End-to-end shopping and stationery order fulfillment platform engineered for school students with fast cart checkout and real-time order tracking.',
    tags: ['React Native', 'Express', 'MongoDB', 'Tailwind CSS'],
    frameImg: '/ezgif-5e35e3495d2b5a33-jpg/ezgif-frame-150.jpg',
    link: 'https://github.com/hetpatel2004',
  },
  {
    index: '3/5',
    title: 'GARBAGO.',
    subtitle: 'Cultural Dance Festival & Ticketing Engine',
    category: 'High-Concurrency Event Ticketing',
    description: 'Premier Navratri festival ticketing platform handling thousands of concurrent pass reservations, venue admissions, and QR digital passes.',
    tags: ['MERN Stack', 'Redis', 'Razorpay', 'Framer Motion'],
    frameImg: '/ezgif-5e35e3495d2b5a33-jpg/ezgif-frame-162.jpg',
    link: 'https://github.com/hetpatel2004',
  },
  {
    index: '4/5',
    title: 'PRAGETX',
    subtitle: 'Automate. Accelerate. Scale.',
    category: 'AI Transformation & Enterprise Consulting',
    description: 'Corporate tech consulting platform showcasing cutting-edge AI integrations, agile software development services, and interactive client workflows.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Cloudflare'],
    frameImg: '/ezgif-5e35e3495d2b5a33-jpg/ezgif-frame-172.jpg',
    link: 'https://github.com/hetpatel2004',
  },
  {
    index: '5/5',
    title: 'SUBSHARE',
    subtitle: 'Share and Discover Subscriptions',
    category: 'Fintech & Shared Media Platform',
    description: 'A platform to manage, track, and split subscription costs across Netflix, Amazon Prime, Spotify, and premium developer tools.',
    tags: ['React', 'Node.js', 'Tailwind', 'REST APIs'],
    frameImg: '/ezgif-5e35e3495d2b5a33-jpg/ezgif-frame-182.jpg',
    link: 'https://github.com/hetpatel2004',
  },
];

export const FeaturedWorkShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeProj = projects[activeIndex];

  return (
    <section id="work" className="relative w-full bg-[#000000] text-white py-24 sm:py-32 px-6 sm:px-12 md:px-20 lg:px-28 select-none">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header: Featured WORK */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16 sm:mb-24 border-b border-white/10 pb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-white/50 block mb-3">
              03 / SHOWCASE
            </span>
            <div className="flex items-baseline gap-3 sm:gap-4 leading-none">
              <span className="font-serif italic font-normal text-5xl sm:text-7xl md:text-8xl text-white">
                Featured
              </span>
              <span className="font-sans font-black uppercase text-5xl sm:text-7xl md:text-8xl tracking-tight text-white">
                WORK
              </span>
            </div>
          </div>

          {/* Project Navigation Numbers (1/5, 2/5, 3/5, 4/5, 5/5) */}
          <div className="flex items-center gap-2">
            {projects.map((p, idx) => (
              <button
                key={p.index}
                onClick={() => setActiveIndex(idx)}
                className={`px-3 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all cursor-pointer ${
                  activeIndex === idx
                    ? 'bg-white text-black font-bold'
                    : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                }`}
              >
                {p.index}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Showcase Stage */}
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] bg-[#0A0A0E] border border-white/10 overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProj.title}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative w-full flex flex-col"
            >
              {/* Massive Title Overlay */}
              <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-between border-b border-white/10 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-sm tracking-widest text-[#B600A8] uppercase font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B600A8] animate-pulse" />
                    PROJECT {activeProj.index} &bull; {activeProj.category}
                  </span>

                  <a
                    href={activeProj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#E5EDF2] transition-colors"
                  >
                    <span>EXPLORE REPO</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <h3 className="font-sans font-black uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-none">
                  {activeProj.title}
                </h3>
                <p className="font-serif italic text-lg sm:text-2xl text-white/70 mt-3">
                  {activeProj.subtitle}
                </p>
              </div>

              {/* High-Resolution Frame Mockup Display */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={activeProj.frameImg}
                  alt={activeProj.title}
                  className="w-full h-full object-cover object-center filter brightness-95 hover:brightness-105 transition-all duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Bottom Info Strip */}
              <div className="p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-[#070709] border-t border-white/10">
                <p className="font-sans font-light text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
                  {activeProj.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {activeProj.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-white/10 text-white/80 font-mono text-xs border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Prev / Next Controls */}
        <div className="flex items-center justify-between mt-8 text-xs font-mono uppercase tracking-widest text-white/50">
          <button
            onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1))}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>&larr; PREVIOUS WORK</span>
          </button>

          <span>
            {activeIndex + 1} OF {projects.length}
          </span>

          <button
            onClick={() => setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0))}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>NEXT WORK &rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkShowcase;
