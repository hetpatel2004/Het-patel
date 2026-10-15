import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Sparkles,
  MessageCircle,
  Lock,
} from 'lucide-react';

interface EditorialFreelanceSectionProps {
  onOpenContact: (service?: string) => void;
  onOpenPrice?: () => void;
}

export const EditorialFreelanceSection: React.FC<EditorialFreelanceSectionProps> = ({
  onOpenContact,
  onOpenPrice: _onOpenPrice,
}) => {
  const freelanceServices = [
    {
      id: '01',
      badge: '2 - 4 Weeks Delivery',
      badgeColor: 'text-[#B600A8] bg-[#B600A8]/10 border-[#B600A8]/20',
      title: 'Full-Stack MVP & Startup Applications',
      subtitle: 'Zero to Production Ready for Founders',
      desc: 'Rapid end-to-end engineering for startups and ambitious founders who need to launch fast with zero technical debt and rock-solid scalability.',
      features: [
        'Complete MERN Stack architecture (React, Node, Express, MongoDB)',
        'Stateless JWT authentication, secure role permissions & password encryption',
        'Intuitive modern dashboards with responsive real-time data handling',
        'RESTful API endpoints with Postman documentation',
        'Continuous deployment on Vercel or Cloudflare with custom domain setup',
      ],
      turnaround: '2 – 3 Weeks',
      idealFor: 'Founders, early-stage MVPs, product validation & hackathons',
      ctaText: 'Start MVP Inquiry',
      serviceKey: 'MERN Stack Web Application',
    },
    {
      id: '02',
      badge: 'Enterprise SLA & Standards',
      badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
      title: 'Custom Production Web Platforms & Portals',
      subtitle: 'Industrial Machinery & Enterprise Portals',
      desc: 'Heavy-duty web applications engineered for established companies, like my deployments for Ambika Electric and Silver Oak University.',
      features: [
        'Complex diagnostic estimators, machinery catalogs & quotation engines',
        'Multi-tier role management (Super Admin, Manager, Client dashboards)',
        'Automated lead generation pipelines with instant WhatsApp & email dispatch',
        '100% Lighthouse responsive performance score & SEO optimization',
        '30-day post-launch support and full code handover',
      ],
      turnaround: '3 – 5 Weeks',
      idealFor: 'Industrial enterprises, colleges/universities, local businesses',
      ctaText: 'Request Platform Scope',
      serviceKey: 'Custom Web Platform',
    },
    {
      id: '03',
      badge: 'Sub-Second Smooth UI',
      badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
      title: 'High-Impact Frontend & UI/UX Engineering',
      subtitle: 'Pixel-Perfect Interactive Web Design',
      desc: 'Transforming complex Figma wireframes into fluid, responsive web applications with bespoke micro-animations and glassmorphism luxury aesthetic.',
      features: [
        'React.js with Tailwind CSS & Framer Motion smooth micro-animations',
        'Flawless cross-browser responsiveness across all phone, tablet & monitor sizes',
        'Modular, maintainable, clean component architecture',
        'Accessible, high-contrast, dark-mode luxury styling',
        'Sub-second first contentful paint (FCP) and zero layout shifts',
      ],
      turnaround: '1 – 2 Weeks',
      idealFor: 'Design agencies, SaaS platforms, redesigns & creative studios',
      ctaText: 'Hire for Frontend',
      serviceKey: 'Frontend Web App',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Discovery & Roadmap',
      desc: 'We clarify your product goals, define core user flows, finalize the technology stack, and agree on a transparent milestone timeline.',
    },
    {
      step: '02',
      title: 'Rapid Sprint Execution',
      desc: 'I engineer your platform in focused agile sprints, providing private staging links so you can interact with live progress every step of the way.',
    },
    {
      step: '03',
      title: 'Security & QA Audit',
      desc: 'Rigorous automated and manual cross-device testing, load testing, security validation, and Lighthouse performance optimization.',
    },
    {
      step: '04',
      title: 'Launch & 30-Day Support',
      desc: 'Zero-downtime production deployment, full GitHub repository ownership transfer, walkthrough documentation, and 30 days of post-launch warranty.',
    },
  ];

  const guarantees = [
    {
      icon: <Lock className="w-5 h-5 text-[#B600A8]" />,
      title: '100% Code Ownership',
      desc: 'Full intellectual property and clean GitHub repository transfer directly to you upon delivery.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      title: 'Direct Engineering',
      desc: 'You collaborate directly with Het Patel. Zero junior outsourcing, zero lost communication.',
    },
    {
      icon: <Clock className="w-5 h-5 text-amber-400" />,
      title: 'Fast Turnaround (< 12h)',
      desc: 'Prompt, transparent communication via WhatsApp, Slack, Google Meet, or Email.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
      title: 'Zero Downtime Architecture',
      desc: 'Built using verified production patterns, serverless scaling, and cloud best practices.',
    },
  ];

  return (
    <section
      id="freelance"
      className="relative z-20 w-full min-w-full bg-[#08080C] text-white pt-24 sm:pt-32 md:pt-36 pb-24 sm:pb-32 overflow-hidden select-none border-t border-white/15 shadow-[0_-35px_100px_rgba(0,0,0,0.95)]"
      style={{
        borderTopLeftRadius: 'clamp(36px, 6vw, 90px)',
        borderTopRightRadius: 'clamp(36px, 6vw, 90px)',
      }}
    >
      {/* Ambient Radial Backlight Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[85vw] h-[450px] pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #B600A8 0%, rgba(99, 102, 241, 0.25) 45%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24 relative z-10">
        {/* Section Header: Status Badge, Monumental Cursive Headline */}
        <div className="flex flex-col mb-16 sm:mb-20">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>AVAILABLE FOR FREELANCE &amp; CONTRACT WORK &bull; 2026</span>
            </span>

            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-white/60 hidden sm:inline">
              AHMEDABAD &bull; WORLDWIDE REMOTE
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-baseline gap-3 sm:gap-6 leading-[0.92]">
            <span className="font-sans font-black uppercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white">
              OPEN FOR
            </span>
            <span className="font-serif italic font-normal text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-[#B600A8] capitalize">
              Freelance.
            </span>
          </div>

          <p className="font-sans font-light text-base sm:text-xl text-white/75 max-w-3xl mt-6 leading-relaxed">
            I partner directly with ambitious founders, startups, enterprises, and design studios to transform complex requirements into clean, scalable, and high-performance digital products.
          </p>

          {/* Quick Metrics & Availability Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black font-sans text-white">2 – 4 Wks</div>
              <div className="text-xs font-mono uppercase tracking-wider text-white/50 mt-1">Average MVP Delivery</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black font-sans text-emerald-400">Immediate</div>
              <div className="text-xs font-mono uppercase tracking-wider text-white/50 mt-1">Accepting Q1/Q2 Projects</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black font-sans text-white">&lt; 12 Hours</div>
              <div className="text-xs font-mono uppercase tracking-wider text-white/50 mt-1">Direct Response Time</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black font-sans text-[#B600A8]">100% Direct</div>
              <div className="text-xs font-mono uppercase tracking-wider text-white/50 mt-1">Zero Middlemen</div>
            </div>
          </div>
        </div>

        {/* 3 Core Freelance Service Offerings (Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-28">
          {freelanceServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="p-7 sm:p-9 rounded-[28px] sm:rounded-[36px] bg-[#111116] border border-white/10 hover:border-white/30 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(182,0,168,0.15)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full border text-[11px] font-mono uppercase tracking-wider font-bold ${service.badgeColor}`}>
                    {service.badge}
                  </span>
                  <span className="font-mono text-xs text-white/40 font-bold">
                    #{service.id}
                  </span>
                </div>

                <h3 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight leading-snug group-hover:text-[#B600A8] transition-colors mb-1.5">
                  {service.title}
                </h3>

                <p className="font-caveat font-semibold text-lg text-white/70 mb-4 tracking-wide">
                  {service.subtitle}
                </p>

                <p className="font-sans font-light text-xs sm:text-sm text-white/75 leading-relaxed mb-6">
                  {service.desc}
                </p>

                {/* Features List */}
                <div className="space-y-2.5 mb-8 border-t border-white/10 pt-5">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-[#B600A8] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer with Turnaround & Action Button */}
              <div className="pt-5 border-t border-white/10 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-mono text-white/60">
                  <span>Turnaround:</span>
                  <span className="font-bold text-white">{service.turnaround}</span>
                </div>

                <button
                  onClick={() => onOpenContact(service.serviceKey)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-white/10 hover:bg-[#B600A8] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md group/btn"
                >
                  <span>{service.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4-Step Collaborative Workflow */}
        <div className="mb-20 sm:mb-28 p-8 sm:p-12 md:p-16 rounded-[32px] sm:rounded-[48px] bg-[#111116] border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#B600A8] block mb-2 font-bold">
                COLLABORATIVE PROCESS
              </span>
              <h3 className="font-sans font-black uppercase text-3xl sm:text-5xl text-white tracking-tight">
                How We Build Together.
              </h3>
            </div>
            <p className="font-sans font-light text-xs sm:text-sm text-white/60 max-w-md">
              A transparent, disciplined 4-step engineering roadmap so your platform launches on time without surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {workflowSteps.map((wf, wIdx) => (
              <div key={wIdx} className="flex flex-col justify-between p-6 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <span className="font-mono text-2xl font-black text-[#B600A8] block mb-3">
                    {wf.step}
                  </span>
                  <h4 className="font-sans font-bold text-lg text-white mb-2">
                    {wf.title}
                  </h4>
                  <p className="font-sans font-light text-xs sm:text-sm text-white/70 leading-relaxed">
                    {wf.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees & Why Work With Het Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16 sm:mb-20">
          {guarantees.map((g, gIdx) => (
            <div
              key={gIdx}
              className="p-6 rounded-2xl bg-[#111116] border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 rounded-xl bg-white/5 w-fit mb-4">
                  {g.icon}
                </div>
                <h5 className="font-sans font-bold text-base text-white mb-2">
                  {g.title}
                </h5>
                <p className="font-sans font-light text-xs sm:text-sm text-white/70 leading-relaxed">
                  {g.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Big Radiant Call to Action Banner */}
        <div className="p-8 sm:p-12 md:p-16 rounded-[32px] sm:rounded-[48px] bg-gradient-to-br from-[#161722] via-[#0E0F14] to-[#1A0B1A] border border-[#B600A8]/30 shadow-[0_25px_80px_rgba(182,0,168,0.25)] flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B600A8]/20 border border-[#B600A8]/40 text-xs font-mono uppercase tracking-wider text-white mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
              <span>READY TO KICK OFF YOUR PROJECT?</span>
            </span>
            <h3 className="font-sans font-black uppercase text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
              Let&apos;s Build Something Extraordinary.
            </h3>
            <p className="font-sans font-light text-sm sm:text-base text-white/75 mt-3 leading-relaxed">
              Have an MVP, web application, redesign, or industrial software in mind? Get in touch today for an honest scope breakdown and immediate delivery estimate.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-3.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onOpenContact('General Project Inquiry')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#B600A8] hover:bg-[#9a008e] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_10px_30px_rgba(182,0,168,0.5)] hover:scale-105 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>START A PROJECT INQUIRY</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/919727476950"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>CHAT ON WHATSAPP</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialFreelanceSection;
