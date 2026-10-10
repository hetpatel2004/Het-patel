import React from 'react';
import { projectsData, type ProjectItem } from '../data/projects';
import { FadeIn } from './FadeIn';
import { ArrowUpRight, Play } from 'lucide-react';

interface ProjectsSectionProps {
  onOpenLiveProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenLiveProject }) => {
  return (
    <section
      id="projects"
      className="relative w-full py-24 sm:py-32 md:py-40 bg-[#0C0C0C] border-t border-white/5 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[350px] bg-gradient-to-b from-[#B600A8]/8 via-[#7621B0]/4 to-transparent blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-16 sm:mb-24 relative z-10">
        <FadeIn delay={0.1} y={20}>
          <span className="text-xs uppercase tracking-widest text-[#BBCCD7]/60 font-mono block mb-4">
            01 / WORK
          </span>
        </FadeIn>

        <FadeIn delay={0.15} y={30}>
          <div className="flex flex-col sm:flex-row items-baseline gap-2 sm:gap-4 leading-none mb-4">
            <span className="font-serif italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white">
              Featured
            </span>
            <span className="font-sans font-black uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#D7E2EA]">
              WORK
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} y={20}>
          <p className="text-sm sm:text-base font-light text-[#D7E2EA]/70 max-w-xl">
            A selection of production-grade full stack applications, custom architectures, and digital systems built with performance in mind.
          </p>
        </FadeIn>
      </div>

      {/* Sleek Cinematic Project Cards */}
      <div className="max-w-6xl mx-auto flex flex-col gap-12 sm:gap-16 md:gap-20 relative z-10">
        {projectsData.map((project, index) => (
          <FadeIn key={project.id} delay={0.15 + index * 0.1} y={40}>
            <div
              onClick={() => onOpenLiveProject(project)}
              className="group relative w-full min-h-[480px] sm:min-h-[560px] md:min-h-[620px] rounded-[32px] sm:rounded-[44px] md:rounded-[48px] overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_60px_-10px_rgba(182,0,168,0.25)] flex flex-col justify-end p-6 sm:p-10 md:p-14"
            >
              {/* Background Media (Image / Video preview with Hover Zoom) */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-[#101116]">
                {project.videoUrl ? (
                  <video
                    src={project.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-75 group-hover:brightness-90"
                  />
                ) : (
                  <img
                    src={project.bgImage}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-75 group-hover:brightness-90"
                  />
                )}

                {/* Multi-stage dark gradient overlays for pristine readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/70 to-transparent" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              </div>

              {/* Card Foreground Content */}
              <div className="relative z-10 flex flex-col w-full">
                {/* Counter & Category Pill */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <span className="font-mono text-xs sm:text-sm text-[#BBCCD7]/70 uppercase tracking-widest font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8]" />
                    {project.number} &thinsp;/&thinsp; {`0${projectsData.length}`}
                  </span>
                  <span className="text-[11px] sm:text-xs uppercase tracking-widest px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white font-medium">
                    {project.category} &bull; {project.year}
                  </span>
                </div>

                {/* Impactful Title with Animated Underline */}
                <div className="relative mb-4">
                  <h3 className="font-sans font-black uppercase text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                    {project.title}
                  </h3>
                  <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-white via-[#BBCCD7] to-transparent transition-all duration-500 mt-2" />
                </div>

                {/* Description Snippet */}
                <p className="text-xs sm:text-sm md:text-base font-light text-[#D7E2EA]/80 max-w-2xl leading-relaxed mb-6 sm:mb-8 line-clamp-2">
                  {project.description}
                </p>

                {/* Bottom Row: Tech Stack Badges & Interactive "VIEW PROJECT" Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-white/15">
                  {/* Badges: React.js, Node.js, Express, MongoDB, etc. */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] sm:text-xs font-mono text-[#D7E2EA] px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 group-hover:border-white/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="text-[11px] sm:text-xs font-mono text-[#BBCCD7]/60 self-center px-1">
                        +{project.techStack.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* Interactive "VIEW PROJECT" Button */}
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0C0C0C] font-black uppercase tracking-wider text-xs group-hover:bg-[#E5EDF2] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all transform group-hover:scale-105 shrink-0 shadow-lg">
                    <span>VIEW PROJECT</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
