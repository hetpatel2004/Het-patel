import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, MapPin, Calendar, Languages, CheckCircle2 } from 'lucide-react';

export const CurvedAboutSection: React.FC = () => {
  const education = [
    {
      degree: 'Master of Science (M.Sc.) in Information Technology',
      institution: 'Silver Oak University, Ahmedabad, Gujarat',
      period: '2025 – Pursuing',
      badge: 'Current Degree',
    },
    {
      degree: 'Bachelor of Science (B.Sc.) in Information Technology',
      institution: 'GLS University, Ahmedabad, Gujarat',
      period: '2021 – 2024',
      badge: 'Completed',
    },
    {
      degree: 'Full Stack Programming Certification',
      institution: 'Frameboxx Animation & Visual Effects',
      period: 'Professional Training',
      badge: 'MERN Specialist',
    },
    {
      degree: 'Higher Secondary & Secondary Education (10th & 12th)',
      institution: 'Xavier High School, Ahmedabad, Gujarat',
      period: 'Gujarat Board',
      badge: 'High School',
    },
  ];

  const softSkills = [
    'Leadership & Team Collaboration',
    'Problem-Solving & Analytical Thinking',
    'Time Management & Ownership',
    'Communication & Stakeholder Management',
    'Adaptability & Continuous Learning',
  ];

  return (
    <section id="about" className="relative z-20 w-full min-w-full min-h-screen min-h-[100dvh] bg-transparent select-none">
      {/* Curved Convex Black Sheet that slides up over Section 2 */}
      <div
        className="w-full min-w-full min-h-screen min-h-[100dvh] bg-[#000000] text-white shadow-[0_-35px_100px_rgba(0,0,0,0.95)] border-t border-white/10"
        style={{
          borderTopLeftRadius: 'clamp(40px, 8vw, 120px)',
          borderTopRightRadius: 'clamp(40px, 8vw, 120px)',
        }}
      >
        {/* =========================================================================
            STAGE 1: 100% FULL-SCREEN COVER VIEWPORT (100VW x 100VH)
            Covers Section 2 completely as one grand full-screen editorial spread
           ========================================================================= */}
        <div className="w-full min-w-full h-screen min-h-[100dvh] flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-24 pt-8 sm:pt-12 md:pt-14 pb-8 sm:pb-12">
          {/* Top Header Row: Section Badge, Live Indicator & Location */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-white/90 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B600A8] animate-pulse" />
                <span>02 / ABOUT THE ARCHITECT</span>
              </span>

              <span className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>AVAILABLE FOR PRODUCTION ROLES</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-white/60">
              <MapPin className="w-3.5 h-3.5 text-[#B600A8]" />
              <span>AHMEDABAD, GUJARAT, INDIA</span>
            </div>
          </div>

          {/* Center: Massive Grand Typography Spanning One Full Screen */}
          <div className="flex flex-col leading-[1.05] sm:leading-[1.0] my-auto py-4 sm:py-6 max-w-7xl mx-auto w-full">
            <span className="font-serif italic font-normal text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] text-white tracking-wide">
              I build things
            </span>
            <span className="font-serif italic font-normal text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] text-white tracking-wide mt-1 sm:mt-2">
              that live
            </span>
            <div className="flex items-baseline gap-4 sm:gap-8 mt-2 sm:mt-4">
              <span className="font-sans font-black uppercase text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] tracking-tight text-white">
                ON THE WEB
              </span>
              <span className="font-black text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] text-[#B600A8]">
                *
              </span>
            </div>
          </div>

          {/* Bottom Bar: Metadata & Scroll Cue */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs font-mono shrink-0">
            <div className="flex items-center gap-3 text-white/70">
              <span className="text-[#B600A8] font-bold">HET PATEL</span>
              <span>•</span>
              <span>FULL STACK MERN ARCHITECT</span>
            </div>

            <div className="flex items-center gap-2 text-white/50 uppercase tracking-wider">
              <span>SCROLL TO EXPLORE ARCHITECT DOSSIER</span>
              <span className="animate-bounce">&darr;</span>
            </div>
          </div>
        </div>

        {/* 100% WIDTH & 100% SCREEN HEIGHT (100VH) PORTRAIT SHOWCASE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full min-w-full h-screen min-h-[100dvh] overflow-hidden bg-[#0A0A0E] border-y border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] my-6 sm:my-10 group"
        >
          {/* Ambient blurred backdrop for seamless edge-to-edge aesthetic */}
          <img
            src="/het-portrait-banner.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover filter blur-3xl opacity-35 scale-125 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-transparent to-black/85 pointer-events-none z-10" />

          {/* Center High-Resolution Portrait */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-4 sm:p-8">
            <img
              src="/het-portrait-banner.png"
              alt="Het Patel - Full Stack Developer"
              className="h-full w-full max-h-[92vh] object-cover sm:object-contain object-center drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] transition-transform duration-700 ease-out group-hover:scale-[1.02] filter brightness-95 group-hover:brightness-100"
            />
          </div>

          {/* Floating Top Editorial Overlay */}
          <div className="absolute top-6 left-6 right-6 sm:left-12 sm:right-12 flex items-center justify-between z-20 pointer-events-none">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono text-white/90">
              <span className="w-2 h-2 rounded-full bg-[#B600A8] animate-pulse" />
              <span>02 / ABOUT THE ARCHITECT</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>OPEN FOR OPPORTUNITIES</span>
            </div>
          </div>

          {/* Floating Bottom Metadata Badge */}
          <div className="absolute bottom-6 sm:bottom-8 left-6 right-6 sm:left-12 sm:right-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 z-20">
            <div>
              <span className="px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono text-[#D7E2EA] uppercase tracking-wider block w-fit mb-2">
                HET PATEL &bull; FULL STACK MERN DEVELOPER
              </span>
              <h3 className="font-sans font-black uppercase text-2xl sm:text-4xl md:text-5xl text-white tracking-tight drop-shadow-md">
                Crafting Fast, Scalable &amp; Striking Experiences
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-white/90">
                <MapPin className="w-3.5 h-3.5 text-[#B600A8]" />
                <span>Ahmedabad, Gujarat, India</span>
              </div>
              <a
                href="https://www.linkedin.com/in/het-patel-b14a65363"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#B600A8] hover:bg-[#9a008e] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg pointer-events-auto"
              >
                <span>LINKEDIN PROFILE</span>
                <span>&#8599;</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bio, Education, Soft Skills & Stats Container */}
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 lg:px-24">
          {/* Bio & Profile Summary from CV */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start mb-16 sm:mb-24">
            <div className="md:col-span-4">
              <span className="text-xs uppercase tracking-widest text-[#B600A8] font-mono font-bold block mb-2">
                PROFILE SUMMARY
              </span>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-white/50 leading-relaxed">
                * Motivated and detail-oriented Full Stack Developer with deep knowledge of MERN stack technologies.
              </p>

              {/* Personal Details Snapshot */}
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-2.5 text-xs font-mono text-white/70">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#B600A8]" />
                  <span>DOB: 1st April 2004</span>
                </div>
                <div className="flex items-center gap-2">
                  <Languages className="w-3.5 h-3.5 text-[#B600A8]" />
                  <span>Languages: English, Hindi, Gujarati</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#B600A8]" />
                  <span>Location: Ahmedabad, Gujarat</span>
                </div>
                <div className="pt-2.5 mt-1 border-t border-white/10 flex flex-col gap-1.5">
                  <a
                    href="https://www.linkedin.com/in/het-patel-b14a65363"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#D7E2EA] hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span>LinkedIn: het-patel-b14a65363</span>
                    <span className="text-[#B600A8] group-hover:translate-x-0.5 transition-transform">&#8599;</span>
                  </a>
                  <a
                    href="https://github.com/hetpatel2004"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#D7E2EA] hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span>GitHub: hetpatel2004</span>
                    <span className="text-[#B600A8] group-hover:translate-x-0.5 transition-transform">&#8599;</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="md:col-span-8">
              <p className="font-sans font-light text-xl sm:text-2xl md:text-3xl text-white/95 leading-relaxed mb-6">
                I am a Full Stack Developer with a strong interest in modern web architectures. Currently pursuing my Master&apos;s degree in Information Technology at Silver Oak University after completing my Bachelor&apos;s from GLS University.
              </p>
              <p className="font-sans font-light text-base sm:text-lg text-white/70 leading-relaxed">
                To reinforce real-world execution, I completed specialized Full Stack Programming training at Frameboxx. I enjoy crafting responsive, accessible, and high-performance applications across React.js, Node.js, Express.js, and MongoDB with clean code and robust architecture.
              </p>
            </div>
          </div>

          {/* Education Timeline Grid from CV */}
          <div className="mb-16 sm:mb-24">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-[#B600A8]" />
                <h4 className="font-sans font-bold text-lg sm:text-xl uppercase tracking-wider text-white">
                  Education &amp; Credentials
                </h4>
              </div>
              <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                ACADEMIC JOURNEY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-[#0D0E13] border border-white/10 hover:border-[#B600A8]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-white/80">
                        {edu.badge}
                      </span>
                      <span className="text-xs font-mono text-[#B600A8]">
                        {edu.period}
                      </span>
                    </div>
                    <h5 className="font-sans font-bold text-base sm:text-lg text-white tracking-tight mb-2">
                      {edu.degree}
                    </h5>
                  </div>
                  <p className="text-xs sm:text-sm text-white/60 font-sans mt-3">
                    {edu.institution}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Soft Skills & Professional Qualities */}
          <div className="mb-16 sm:mb-24 p-6 sm:p-8 rounded-3xl bg-[#0D0E13] border border-white/10">
            <div className="flex items-center gap-2.5 mb-6 text-sm font-mono uppercase tracking-widest text-white/70">
              <Award className="w-4 h-4 text-[#B600A8]" />
              <span>Core Strengths &amp; Soft Skills</span>
            </div>

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {softSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-white/90 font-sans"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B600A8]" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurvedAboutSection;
