import { ArrowUpRight } from "@phosphor-icons/react";
import type { Project } from "../data/projects";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden hover:border-zinc-600 transition-colors"
    >
      <div className={`relative overflow-hidden ${featured ? "h-56 sm:h-72" : "h-36 sm:h-44"}`}>
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/10 to-transparent" />
        {project.status && (
          <span className="absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-widest text-accent">
            {project.status}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3
            className={`font-semibold text-zinc-50 ${
              featured ? "text-xl" : "text-lg"
            }`}
          >
            {project.name}
          </h3>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-zinc-500 group-hover:text-accent transition-colors"
          />
        </div>

        <p className="text-sm leading-relaxed text-zinc-400">{project.pitch}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-zinc-900 border border-zinc-800 px-2.5 py-1 font-mono text-xs text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
