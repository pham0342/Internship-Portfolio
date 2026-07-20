import { Suspense, lazy } from "react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "../data/resume";
import { DeskSceneFallback } from "./DeskSceneFallback";

const DeskScene = lazy(() =>
  import("./DeskScene").then((m) => ({ default: m.DeskScene }))
);

export function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="border-t border-zinc-900 bg-zinc-950/90">
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[65ch]"
        >
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-50 mb-6">
            About
          </h2>
          <p className="text-lg leading-relaxed text-zinc-300">{profile.summary}</p>
          <p className="mt-4 text-sm text-zinc-500 font-mono">{profile.location}</p>
        </motion.div>

        <div className="relative h-[280px] sm:h-[340px]">
          <Suspense fallback={<DeskSceneFallback />}>
            <DeskScene />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
