import { Suspense, lazy } from "react";
import { motion, useReducedMotion } from "motion/react";
import { practices } from "../data/techStack";
import { TechStackKeysFallback } from "./TechStackKeysFallback";

const TechStackKeys = lazy(() =>
  import("./TechStackKeys").then((m) => ({ default: m.TechStackKeys }))
);

export function Skills() {
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="border-t border-zinc-900 bg-zinc-950/90">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-50 mb-2">
            Skills
          </h2>
          <p className="text-sm text-zinc-500 font-mono">Click a key to see it in action.</p>
        </motion.div>

        <div className="relative h-[340px] sm:h-[420px] mt-4">
          <Suspense fallback={<TechStackKeysFallback />}>
            <TechStackKeys />
          </Suspense>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6"
        >
          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">
            Practices
          </h3>
          <div className="flex flex-wrap gap-2">
            {practices.map((item) => (
              <span
                key={item}
                className="rounded-md bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
