import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  ArrowUp,
  Copy,
  Check,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

interface EditorialContactFooterProps {
  onOpenContact: (service?: string) => void;
}

export const EditorialContactFooter: React.FC<EditorialContactFooterProps> = ({ onOpenContact }) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      setCurrentTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('het.patel.imscit21@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const marqueeWords = [
    "LET'S BUILD SOMETHING EXTRAORDINARY",
    '•',
    'FULL STACK MERN DEVELOPER',
    '•',
    'OPEN FOR HIGH-IMPACT ROLES',
    '•',
    'AHMEDABAD, GUJARAT, INDIA',
    '•',
    'AVAILABLE FOR WORLDWIDE WORK',
    '•',
  ];

  return (
    <footer
      id="contact"
      className="relative z-20 w-full min-w-full bg-[#08080C] text-white pt-4 sm:pt-8 pb-16 overflow-hidden select-none"
    >
      {/* Ambient Radial Backlight Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[350px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #B600A8 0%, rgba(66, 153, 225, 0.2) 45%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24 relative z-10">
        {/* Availability & Live Location Status Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-12 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <span className="text-xs sm:text-sm font-mono tracking-wider text-emerald-400 font-semibold uppercase">
              AVAILABLE FOR FULL-TIME ROLES &amp; CLIENT PROJECTS
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-white/70">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#B600A8]" />
              <span>AHMEDABAD, GUJARAT, INDIA</span>
            </div>
            <span className="text-white/30">&bull;</span>
            <div className="flex items-center gap-1.5 text-white/90 font-bold">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentTime || 'LIVE IST'}</span>
            </div>
          </div>
        </div>

        {/* Massive Callout Headline */}
        <div className="mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#B600A8] font-mono font-bold block mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B600A8]" />
            <span>START A PROJECT OR HIRE ME</span>
          </span>

          <div className="flex flex-col leading-[0.92] tracking-tight mb-8">
            <span className="font-sans font-black uppercase text-5xl sm:text-7xl md:text-8xl lg:text-[7vw] text-white">
              HAVE A PROJECT
            </span>
            <div className="flex items-baseline gap-4 mt-1 sm:mt-2">
              <span className="font-serif italic font-normal text-5xl sm:text-7xl md:text-8xl lg:text-[7vw] text-[#E0E7ED]">
                in mind?
              </span>
              <span className="font-black text-4xl sm:text-6xl md:text-7xl lg:text-[6vw] text-[#B600A8]">
                *
              </span>
            </div>
          </div>

          <p className="font-sans font-light text-base sm:text-xl text-white/80 max-w-2xl leading-relaxed mb-8">
            Whether you need a high-performance web platform, an enterprise full-stack web application, or a dedicated software engineer on your team &mdash; I&apos;m ready to build it.
          </p>

          {/* Glowing Primary CTA Button */}
          <button
            onClick={() => onOpenContact('General Project Inquiry')}
            className="group inline-flex items-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#B600A8] to-[#8E0083] hover:from-[#d100c2] hover:to-[#a8009b] text-white font-mono font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 shadow-[0_15px_45px_rgba(182,0,168,0.45)] hover:shadow-[0_20px_60px_rgba(182,0,168,0.7)] hover:scale-105 cursor-pointer"
          >
            <span>START A CONVERSATION</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>

        {/* 4 Interactive Contact & Social Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-16 sm:mb-20">
          {/* Card 1: Email */}
          <div className="p-6 rounded-2xl bg-[#12131C] border border-white/10 hover:border-[#B600A8]/50 hover:bg-[#181926] transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-[#B600A8]/20 transition-colors">
                  <Mail className="w-5 h-5 text-[#B600A8]" />
                </div>
                <button
                  onClick={handleCopyEmail}
                  title="Copy email address"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/20 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block mb-1">
                DIRECT INBOX
              </span>
              <a
                href="mailto:het.patel.imscit21@gmail.com"
                className="font-sans font-bold text-sm sm:text-base text-white hover:text-[#B600A8] transition-colors break-all"
              >
                het.patel.imscit21@gmail.com
              </a>
            </div>
            <a
              href="mailto:het.patel.imscit21@gmail.com"
              className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60 hover:text-white transition-colors"
            >
              <span>SEND EMAIL</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Phone / WhatsApp */}
          <div className="p-6 rounded-2xl bg-[#12131C] border border-white/10 hover:border-emerald-500/50 hover:bg-[#181926] transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-emerald-500/20 transition-colors">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">
                  ACTIVE
                </span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block mb-1">
                PHONE &amp; WHATSAPP
              </span>
              <a
                href="tel:+917383539915"
                className="font-sans font-bold text-base sm:text-lg text-white hover:text-emerald-400 transition-colors"
              >
                +91 7383539915
              </a>
            </div>
            <a
              href="tel:+917383539915"
              className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60 hover:text-white transition-colors"
            >
              <span>CALL NOW</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3: LinkedIn */}
          <div className="p-6 rounded-2xl bg-[#12131C] border border-white/10 hover:border-blue-500/50 hover:bg-[#181926] transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-blue-500/20 transition-colors">
                  <LinkedinIcon className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-white/60">
                  NETWORK
                </span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block mb-1">
                PROFESSIONAL PROFILE
              </span>
              <a
                href="https://www.linkedin.com/in/het-patel-b14a65363"
                target="_blank"
                rel="noreferrer"
                className="font-sans font-bold text-sm sm:text-base text-white hover:text-blue-400 transition-colors"
              >
                in/het-patel-b14a65363
              </a>
            </div>
            <a
              href="https://www.linkedin.com/in/het-patel-b14a65363"
              target="_blank"
              rel="noreferrer"
              className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60 hover:text-white transition-colors"
            >
              <span>CONNECT ON LINKEDIN</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 4: GitHub */}
          <div className="p-6 rounded-2xl bg-[#12131C] border border-white/10 hover:border-purple-500/50 hover:bg-[#181926] transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-purple-500/20 transition-colors">
                  <GithubIcon className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-white/60">
                  CODE
                </span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block mb-1">
                REPOSITORIES &amp; COMMITS
              </span>
              <a
                href="https://github.com/hetpatel2004"
                target="_blank"
                rel="noreferrer"
                className="font-sans font-bold text-base sm:text-lg text-white hover:text-purple-400 transition-colors"
              >
                github.com/hetpatel2004
              </a>
            </div>
            <a
              href="https://github.com/hetpatel2004"
              target="_blank"
              rel="noreferrer"
              className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60 hover:text-white transition-colors"
            >
              <span>VIEW SOURCE CODE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Credits & Smooth Back-To-Top Button */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <img src="/hp-logo.png" alt="HP" className="h-5 w-auto object-contain opacity-80" />
              <span>&copy; {new Date().getFullYear()} HET PATEL &bull; ALL RIGHTS RESERVED.</span>
            </div>
            <span className="hidden sm:inline text-white/30">&bull;</span>
            <span className="text-white/40">DESIGNED &amp; ENGINEERED WITH PASSION</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all cursor-pointer group shadow-sm"
          >
            <span className="font-bold tracking-wider uppercase text-[11px]">BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default EditorialContactFooter;
