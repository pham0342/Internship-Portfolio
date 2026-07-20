import { motion, useReducedMotion } from "motion/react";
import { certifications, education, strengths } from "../data/resume";

export function Education() {
  const reduce = useReducedMotion();

  return (
    <section id="education" className="border-t border-zinc-900 bg-zinc-950/90">
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-2"
        >
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-50 mb-8">
            Education
          </h2>
          <div className="flex flex-col gap-6">
            {education.map((entry) => (
              <div key={entry.program} className="border-l-2 border-accent pl-5">
                <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                  {entry.period}
                </p>
                <h3 className="text-lg font-semibold text-zinc-100 mt-1">
                  {entry.program}
                </h3>
                <p className="text-sm text-zinc-500">{entry.institution}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400 max-w-[55ch]">
                  {entry.detail}
                </p>
              </div>
            ))}
          </div>

          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mt-10 mb-4">
            Certifications
          </h3>
          <ul className="flex flex-col gap-2">
            {certifications.map((cert) => (
              <li key={cert} className="text-sm text-zinc-400">
                {cert}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">
            Core strengths
          </h3>
          <div className="flex flex-wrap gap-2">
            {strengths.map((s) => (
              <span
                key={s}
                className="rounded-md bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
