import { motion, useReducedMotion } from "motion/react";
import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const reduce = useReducedMotion();
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="border-t border-zinc-900 bg-zinc-950/90">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-50 mb-12">
          Projects
        </h2>

        <div className="grid grid-cols-1 gap-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectCard project={featured} index={0} featured />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {rest.map((project, i) => (
              <motion.div
                key={project.name}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} index={i + 1} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
