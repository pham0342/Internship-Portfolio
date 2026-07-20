import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, FileArrowDown } from "@phosphor-icons/react";
import { profile } from "../data/resume";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden">
      <div id="top-sentinel" className="absolute top-0 h-px w-full" aria-hidden />

      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-zinc-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 min-h-[100dvh] pt-24 pb-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <span className="w-fit rounded-full border border-accent/40 bg-accent-soft px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent">
            Available from September 2026
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-[1.05] text-zinc-50">
            Full-stack engineer building for your placement team.
          </h1>

          <p className="max-w-[46ch] text-base text-zinc-400 leading-relaxed">
            Software Engineering (Honours) student building full-stack web
            applications with React, Node.js, and SQL databases.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-accent/90 transition-colors"
            >
              View projects
              <ArrowRight size={16} weight="bold" />
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-200 hover:border-zinc-500 transition-colors"
            >
              Resume
              <FileArrowDown size={16} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="justify-self-center lg:justify-self-end"
        >
          <div className="relative w-64 sm:w-80 rounded-lg overflow-hidden border border-zinc-800 shadow-[0_0_60px_-18px_rgba(232,130,58,0.45)]">
            <img
              src="/images/phat-portrait.jpg"
              alt={profile.displayName}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950/80 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
