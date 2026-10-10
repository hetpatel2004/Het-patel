import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowUpRight, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { FadeIn } from './FadeIn';

interface FooterSectionProps {
  onOpenContact: (service?: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenContact }) => {
  const [istTime, setIstTime] = useState<string>('');

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
      setIstTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contactMarqueeSans = Array(8).fill('CONTACT –');
  const contactMarqueeSerif = Array(8).fill('CONTACT –');

  return (
    <footer id="contact" className="relative w-full bg-[#0C0C0C] border-t border-white/5 pt-20 pb-12 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] h-[400px] bg-gradient-to-t from-[#B600A8]/10 via-[#7621B0]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Dual repeating marquee banners (Large Looping Text Banners) */}
      <div className="w-full overflow-hidden select-none mb-16 sm:mb-24 opacity-85 group">
        {/* Row 1: Bold Sans LTR */}
        <div className="animate-marquee-ltr flex items-center whitespace-nowrap mb-2 group-hover:[animation-play-state:paused]">
          <div className="flex items-center">
            {contactMarqueeSans.map((text, idx) => (
              <span
                key={`footer-sans-1-${idx}`}
                className="font-sans font-black uppercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white/10 hover:text-white/30 transition-colors mr-8 cursor-default"
              >
                {text}
              </span>
            ))}
          </div>
          <div className="flex items-center" aria-hidden="true">
            {contactMarqueeSans.map((text, idx) => (
              <span
                key={`footer-sans-2-${idx}`}
                className="font-sans font-black uppercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white/10 hover:text-white/30 transition-colors mr-8 cursor-default"
              >
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: Italic Serif RTL */}
        <div className="animate-marquee-rtl flex items-center whitespace-nowrap group-hover:[animation-play-state:paused]">
          <div className="flex items-center">
            {contactMarqueeSerif.map((text, idx) => (
              <span
                key={`footer-serif-1-${idx}`}
                className="font-serif italic font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#BBCCD7]/15 hover:text-[#BBCCD7]/40 transition-colors mr-8 cursor-default"
              >
                {text}
              </span>
            ))}
          </div>
          <div className="flex items-center" aria-hidden="true">
            {contactMarqueeSerif.map((text, idx) => (
              <span
                key={`footer-serif-2-${idx}`}
                className="font-serif italic font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#BBCCD7]/15 hover:text-[#BBCCD7]/40 transition-colors mr-8 cursor-default"
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
        {/* Center CTA Callout */}
        <div className="flex flex-col items-center text-center mb-20 sm:mb-28">
          <FadeIn delay={0.1} y={20}>
            <span className="text-xs uppercase tracking-widest text-[#BBCCD7]/60 font-mono block mb-4">
              04 / GET IN TOUCH
            </span>
          </FadeIn>

          <FadeIn delay={0.15} y={30}>
            <h2 className="font-serif italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-3">
              Have an idea?
            </h2>
            <h3 className="font-sans font-black uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#D7E2EA] tracking-tight mb-8">
              LET&apos;S WORK TOGETHER.
            </h3>
          </FadeIn>

          <FadeIn delay={0.2} y={20}>
            <p className="text-sm sm:text-base font-light text-[#D7E2EA]/70 max-w-lg mb-10 leading-relaxed">
              Whether you need a full-stack web application, architecture consultation, or want to discuss a full-time engineering opportunity — my inbox is always open.
            </p>
          </FadeIn>

          {/* Interactive "Get in Touch" Button */}
          <FadeIn delay={0.25} y={20}>
            <button
              onClick={() => onOpenContact('General Project Inquiry')}
              className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-white text-[#0C0C0C] font-black text-sm sm:text-base uppercase tracking-wider hover:bg-[#E5EDF2] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_50px_rgba(255,255,255,0.45)] hover:scale-105 cursor-pointer"
            >
              <span>Get In Touch</span>
              <div className="w-8 h-8 rounded-full bg-[#0C0C0C] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </button>
          </FadeIn>
        </div>

        {/* Information Grid: Local Time Widget, Status Badge, Direct Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 sm:p-10 rounded-3xl bg-[#121319] border border-white/5 mb-16 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          {/* Column 1: Local Time Indicator Widget */}
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-[#BBCCD7]/50 font-mono flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#B600A8]" />
              Local Time
            </span>
            <span className="font-mono text-xl sm:text-2xl text-white font-semibold">
              {istTime || '12:00:00 PM'}
            </span>
            <span className="text-xs text-[#BBCCD7]/60 flex items-center gap-1.5 mt-1 font-mono">
              <MapPin className="w-3.5 h-3.5 text-[#BBCCD7]/50" />
              Ahmedabad, India (IST UTC+5:30)
            </span>
          </div>

          {/* Column 2: Status Badge ("Available for new projects") */}
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-[#BBCCD7]/50 font-mono">
              Status
            </span>
            <div className="flex items-center gap-2.5 mt-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="text-base sm:text-lg text-emerald-300 font-semibold tracking-tight">
                Available for new projects
              </span>
            </div>
            <span className="text-xs text-[#BBCCD7]/60 mt-1 font-mono">
              Open for full-time roles, contracts &amp; freelancing
            </span>
          </div>

          {/* Column 3: Direct Contact */}
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-[#BBCCD7]/50 font-mono">
              Direct Contact
            </span>
            <a
              href="mailto:het.patel.imscit21@gmail.com"
              className="text-sm text-white hover:text-[#BBCCD7] transition-colors flex items-center gap-2 mt-1"
            >
              <Mail className="w-4 h-4 text-[#B600A8]" />
              <span className="font-mono">het.patel.imscit21@gmail.com</span>
            </a>
            <a
              href="tel:+917383539915"
              className="text-sm text-white hover:text-[#BBCCD7] transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#B600A8]" />
              <span className="font-mono">+91 7383539915</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#BBCCD7]/60">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white">Het Patel</span>
            <span>&bull;</span>
            <span className="font-mono">Full Stack MERN Developer</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/hetpatel2004"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/het-patel"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors text-blue-400"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="uppercase tracking-widest font-mono text-[11px]">
              &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED
            </span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full border border-white/10 hover:border-white/40 text-white/70 hover:text-white transition-all cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
