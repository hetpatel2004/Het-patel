import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight, Globe, Lock, ExternalLink } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export interface DeployedProject {
  index: string;
  num: string;
  title: string;
  subtitle: string;
  domain: string;
  category: string;
  description: string;
  tags: string[];
  landingImg: string;
  fullImg: string;
  liveUrl: string;
  githubUrl: string;
  accentColor: string;
  accentGlow: string;
}

const deployedProjects: DeployedProject[] = [
  {
    index: '1/3',
    num: '01',
    title: 'AMBIKA ELECTRIC',
    subtitle: 'Industrial Electrical Engineering & Motor Solutions',
    domain: 'ambikaelectric.vercel.app',
    category: 'Live Production Deployment • Kadadra, Gujarat',
    description: 'Production industrial web platform engineered and deployed for Ambika Electric in Kadadra, Gujarat. Features heavy industrial motor rewinding diagnostics (up to 500+ HP), custom electrical control panel fabrication (MCC, PCC, APFC), automated plant diagnostics, dynamic service inquiries, and ultra-fast responsive design.',
    tags: ['React.js', 'Tailwind CSS', 'Vercel Deployment', 'Industrial UI', 'SEO Engine', 'Lucide Icons'],
    landingImg: '/ambika-landing.png',
    fullImg: '/ambika-full.png',
    liveUrl: 'https://ambikaelectric.vercel.app/',
    githubUrl: 'https://github.com/hetpatel2004',
    accentColor: '#F59E0B',
    accentGlow: 'rgba(245, 158, 11, 0.4)',
  },
  {
    index: '2/3',
    num: '02',
    title: 'ONLINE EXAMINATION SYSTEM',
    subtitle: 'Full Stack MERN Assessment Engine with Live Online Code Editor',
    domain: 'online-examination-sou.pages.dev',
    category: 'Enterprise Academic Platform • Silver Oak University',
    description: 'Comprehensive academic assessment platform engineered and deployed for Silver Oak University. Features 3-tier JWT authentication (Super Admin, Faculty/Admin, Student), timed MCQ examination rooms, online code editor with live multi-language execution, automated AI evaluation engine, anti-cheat detection, and bulk student CSV enrollment.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'Code Editor', 'AI Evaluation', 'Cloudflare Pages'],
    landingImg: '/online-exam-landing.png',
    fullImg: '/online-exam-full.png',
    liveUrl: 'https://online-examination-sou.pages.dev/',
    githubUrl: 'https://github.com/hetpatel2004',
    accentColor: '#6366F1',
    accentGlow: 'rgba(99, 102, 241, 0.4)',
  },
  {
    index: '3/3',
    num: '03',
    title: 'AGRICOLD CONNECT (STORE YOUR HARVEST)',
    subtitle: 'Smart Cold Storage & Harvest Preservation Marketplace',
    domain: 'store-your-harvest-tq1j.vercel.app',
    category: 'Live AgriTech Web Application • Production Deployment',
    description: 'Smart agricultural storage marketplace ("Store Smarter. Sell Better. Save Your Harvest."). Connects farmers with certified cold storage facilities across Gujarat to eliminate post-harvest crop loss. Features storage availability discovery, temperature-zone filtering, crop shelf-life calculation, instant booking inquiries, and direct operator contact.',
    tags: ['React.js', 'Tailwind CSS', 'AgriTech', 'REST APIs', 'Vercel Deployed', 'Framer Motion', 'Modern Web'],
    landingImg: '/store-harvest-landing.png',
    fullImg: '/store-harvest-full.png',
    liveUrl: 'https://store-your-harvest-tq1j.vercel.app/',
    githubUrl: 'https://github.com/hetpatel2004',
    accentColor: '#10B981',
    accentGlow: 'rgba(16, 185, 129, 0.4)',
  },
];

export const FeaturedWorkShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState<number>(0);

  // Track scroll through the whole 3-project showcase container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track phase for indicator pills
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.40) {
      setActivePhase(0);
    } else if (latest < 0.73) {
      setActivePhase(1);
    } else {
      setActivePhase(2);
    }
  });

  // PROJECT 1 (AMBIKA ELECTRIC) EXIT ANIMATION:
  // Scales down slightly and dims smoothly as Project 2 rises
  const p1Scale = useTransform(scrollYProgress, [0.32, 0.46], [1, 0.94]);
  const p1Opacity = useTransform(scrollYProgress, [0.32, 0.46], [1, 0.35]);

  // PROJECT 2 (ONLINE EXAMINATION SYSTEM) ANIMATION:
  // Background image comes up from down (y: 100% -> 0%)
  const p2BgY = useTransform(scrollYProgress, [0.32, 0.46], ['100%', '0%']);
  // Details slide in from the RIGHT (x: 100% -> 0%)
  const p2DetailsX = useTransform(scrollYProgress, [0.35, 0.48], ['100%', '0%']);
  const p2DetailsOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  // Scales down slightly and dims as Project 3 rises
  const p2Scale = useTransform(scrollYProgress, [0.65, 0.79], [1, 0.94]);
  const p2Opacity = useTransform(scrollYProgress, [0.65, 0.79], [1, 0.35]);

  // PROJECT 3 (AGRICOLD CONNECT) ANIMATION:
  // Background image comes up from down (y: 100% -> 0%)
  const p3BgY = useTransform(scrollYProgress, [0.65, 0.79], ['100%', '0%']);
  // Details slide in from the RIGHT (x: 100% -> 0%)
  const p3DetailsX = useTransform(scrollYProgress, [0.68, 0.81], ['100%', '0%']);
  const p3DetailsOpacity = useTransform(scrollYProgress, [0.68, 0.78], [0, 1]);

  // Smooth scroll to project phase when clicking indicator
  const scrollToProject = (index: number) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const currentScroll = window.scrollY;
    const containerTop = currentScroll + containerRect.top;
    const totalHeight = containerRef.current.scrollHeight - window.innerHeight;

    const targetProgress = index === 0 ? 0.05 : index === 1 ? 0.55 : 0.88;
    const targetScroll = containerTop + totalHeight * targetProgress;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      id="work"
      className="relative z-20 w-full h-[520vh] bg-[#000000] select-none"
    >
      {/* STICKY FULLSCREEN VIEWPORT STAGE */}
      <div className="sticky top-0 h-screen min-h-[100dvh] w-full overflow-hidden bg-[#0A0A0E] text-white">

        {/* =========================================================================
            PROJECT 1: AMBIKA ELECTRIC (Base Layer - z-10)
            Stays sticky while Project 2's background comes from down.
            Given extensive scroll runway so user has plenty of reading time!
           ========================================================================= */}
        <motion.div
          style={{ scale: p1Scale, opacity: p1Opacity }}
          className="absolute inset-0 w-full h-full z-10 overflow-hidden"
        >
          {/* Project 1 Background Image */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img
              src={deployedProjects[0].landingImg}
              alt={deployedProjects[0].title}
              className="w-full h-full object-cover object-top filter brightness-[0.34] contrast-105 scale-105"
            />
            {/* Dark Vignettes & Radial Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/85 pointer-events-none" />
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background: `radial-gradient(circle at 75% 35%, ${deployedProjects[0].accentColor}, transparent 65%)`,
              }}
            />
          </div>

          {/* Project 1 Details in Front */}
          <ProjectDetailsContent
            project={deployedProjects[0]}
            activePhase={activePhase}
            onSelectProject={scrollToProject}
          />
        </motion.div>

        {/* =========================================================================
            PROJECT 2: ONLINE EXAMINATION SYSTEM (Middle Layer - z-20)
            Background comes from down (p2BgY: 100% -> 0%) covering Project 1
            Details slide in from the RIGHT (p2DetailsX: 100% -> 0%)
           ========================================================================= */}
        <motion.div
          style={{
            y: p2BgY,
            borderTopLeftRadius: 'clamp(28px, 5vw, 64px)',
            borderTopRightRadius: 'clamp(28px, 5vw, 64px)',
          }}
          className="absolute inset-0 w-full h-full z-20 overflow-hidden shadow-[0_-35px_100px_rgba(0,0,0,0.95)] border-t border-white/15"
        >
          <motion.div
            style={{ scale: p2Scale, opacity: p2Opacity }}
            className="w-full h-full relative"
          >
            {/* Project 2 Background Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={deployedProjects[1].landingImg}
                alt={deployedProjects[1].title}
                className="w-full h-full object-cover object-top filter brightness-[0.32] contrast-105 scale-105"
              />
              {/* Dark Vignettes & Radial Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/85 pointer-events-none" />
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  background: `radial-gradient(circle at 75% 35%, ${deployedProjects[1].accentColor}, transparent 65%)`,
                }}
              />
            </div>

            {/* Project 2 Details: SLIDES IN FROM RIGHT SIDE */}
            <motion.div
              style={{ x: p2DetailsX, opacity: p2DetailsOpacity }}
              className="relative z-10 w-full h-full"
            >
              <ProjectDetailsContent
                project={deployedProjects[1]}
                activePhase={activePhase}
                onSelectProject={scrollToProject}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* =========================================================================
            PROJECT 3: AGRICOLD CONNECT (Top Layer - z-30)
            Background comes from down (p3BgY: 100% -> 0%) covering Project 2
            Details slide in from the RIGHT (p3DetailsX: 100% -> 0%)
            Stays fully stationary with generous scroll runway to prevent bottom cutoff!
           ========================================================================= */}
        <motion.div
          style={{
            y: p3BgY,
            borderTopLeftRadius: 'clamp(28px, 5vw, 64px)',
            borderTopRightRadius: 'clamp(28px, 5vw, 64px)',
          }}
          className="absolute inset-0 w-full h-full z-30 overflow-hidden shadow-[0_-35px_100px_rgba(0,0,0,0.95)] border-t border-white/15"
        >
          {/* Project 3 Background Image */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img
              src={deployedProjects[2].landingImg}
              alt={deployedProjects[2].title}
              className="w-full h-full object-cover object-top filter brightness-[0.32] contrast-105 scale-105"
            />
            {/* Dark Vignettes & Radial Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/85 pointer-events-none" />
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background: `radial-gradient(circle at 75% 35%, ${deployedProjects[2].accentColor}, transparent 65%)`,
              }}
            />
          </div>

          {/* Project 3 Details: SLIDES IN FROM RIGHT SIDE */}
          <motion.div
            style={{ x: p3DetailsX, opacity: p3DetailsOpacity }}
            className="relative z-10 w-full h-full"
          >
            <ProjectDetailsContent
              project={deployedProjects[2]}
              activePhase={activePhase}
              onSelectProject={scrollToProject}
            />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

// =============================================================================
// REUSABLE PROJECT DETAILS IN FRONT OF BACKGROUND
// =============================================================================
interface ProjectDetailsProps {
  project: DeployedProject;
  activePhase: number;
  onSelectProject: (index: number) => void;
}

const ProjectDetailsContent: React.FC<ProjectDetailsProps> = ({
  project,
  activePhase,
  onSelectProject,
}) => {
  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-3 sm:py-4 md:py-6">
      {/* Top Header Row: Project Badge, Live Indicator, Clickable Live Domain Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 border-b border-white/10 pb-2 sm:pb-3 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] sm:text-xs font-mono tracking-wider text-white/90 flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: project.accentColor }}
            />
            <span>PROJECT {project.index}</span>
          </span>

          <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>LIVE PRODUCTION</span>
          </span>
        </div>

        {/* Clickable Live Domain Badge with SSL Lock */}
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-[11px] sm:text-xs font-mono text-white/80 hover:text-white transition-all group"
        >
          <Lock className="w-3 h-3 text-emerald-400" />
          <span>{project.domain}</span>
          <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-white transition-colors" />
        </a>
      </div>

      {/* Main Content Grid in Front of Background Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-center my-auto py-1 sm:py-2">
        {/* Left Column: Category, Massive Title, Subtitle, Description, Tech Tags, Buttons */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <span
            className="font-mono text-[11px] sm:text-xs uppercase tracking-widest font-bold mb-1 sm:mb-1.5 flex items-center gap-2"
            style={{ color: project.accentColor }}
          >
            <span>{project.category}</span>
          </span>

          <h3 className="font-sans font-black uppercase text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-white tracking-tight leading-[1.04] drop-shadow-lg mb-1 sm:mb-2">
            {project.title}
          </h3>

          <p className="font-serif italic text-sm sm:text-lg md:text-xl text-white/85 mb-2 leading-snug">
            {project.subtitle}
          </p>

          <p className="font-sans font-light text-xs sm:text-sm md:text-[15px] text-white/80 leading-relaxed mb-3 sm:mb-4 max-w-2xl drop-shadow-sm">
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3.5 sm:mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/15 text-white/90 font-mono text-[11px] sm:text-xs hover:border-white/40 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons: Live Deployment (Primary Glowing) & GitHub (Secondary) */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-black font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl cursor-pointer hover:scale-105"
              style={{
                backgroundColor: project.accentColor,
                boxShadow: `0 8px 24px ${project.accentGlow}`,
              }}
            >
              <Globe className="w-4 h-4" />
              <span>VISIT LIVE DEPLOYMENT</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GITHUB REPO</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Column: Simulated Interactive Browser Preview Mockup */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            title={`Open ${project.title} live in new tab`}
            className="w-full max-w-xs sm:max-w-sm lg:max-w-md rounded-2xl border border-white/25 bg-[#0E0F14]/90 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden group cursor-pointer transition-all duration-500 hover:border-white/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.9)] hover:scale-[1.02]"
          >
            {/* Simulated Browser Chrome Bar */}
            <div className="px-3.5 py-1.5 sm:py-2 bg-[#16171F] border-b border-white/15 flex items-center justify-between gap-3 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="flex-1 px-2 py-0.5 rounded-full bg-black/60 border border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-white/70 truncate">
                <span className="truncate">{project.liveUrl}</span>
                <ExternalLink className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-white/40 shrink-0 ml-1" />
              </div>
            </div>

            {/* Browser Viewport with Landing Screenshot */}
            <div className="relative aspect-[16/10] max-h-[220px] sm:max-h-[260px] w-full overflow-hidden bg-black">
              <img
                src={project.landingImg}
                alt={project.title}
                className="w-full h-full object-cover object-top filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 right-2.5">
                <span
                  className="px-2.5 py-1 rounded-full text-black font-mono font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-lg transition-transform group-hover:scale-105"
                  style={{ backgroundColor: project.accentColor }}
                >
                  <Globe className="w-3 h-3" />
                  <span>CLICK TO LAUNCH</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Bottom Bar: Quick Project Switcher Pills & Scroll Cue */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 sm:pt-3 border-t border-white/10 text-[11px] sm:text-xs font-mono uppercase tracking-wider shrink-0">
        <div className="flex items-center gap-2">
          {deployedProjects.map((p, idx) => (
            <button
              key={p.index}
              onClick={() => onSelectProject(idx)}
              className={`px-3 py-1 rounded-full font-mono text-[11px] sm:text-xs tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activePhase === idx
                  ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105'
                  : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: p.accentColor }}
              />
              <span>{p.index}</span>
              <span className="hidden sm:inline opacity-70">| {p.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-white/50 text-[11px] sm:text-xs">
          <span>SCROLL TO REVEAL NEXT PROJECT</span>
          <span className="animate-bounce">&darr;</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedWorkShowcase;
