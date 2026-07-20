import { motion, useReducedMotion } from "motion/react";
import { skillGroups } from "../data/skills";

export function Skills() {
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="border-t border-zinc-900 bg-zinc-950/90">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-50 mb-12">
          Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-zinc-800 pt-4"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
