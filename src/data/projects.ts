export type Project = {
  name: string;
  pitch: string;
  tags: string[];
  githubUrl: string;
  image: string;
  status?: string;
};

export const projects: Project[] = [
  {
    name: "Anyphone Web v2",
    pitch:
      "Responsive marketing site for a phone repair and accessories shop, rebuilt leaner with its own test suite.",
    tags: ["React", "Vite", "Tailwind CSS", "Motion", "Vitest"],
    githubUrl: "https://github.com/pham0342/Anyphone-web-v2",
    image: "/images/projects/anyphone-web-v2.jpg",
    status: "In progress",
  },
  {
    name: "Job Tracker API & Dashboard",
    pitch:
      "Full-stack application tracking job applications end to end, with a REST API and a dashboard for pipeline analytics.",
    tags: ["Node.js", "Express", "SQLite", "REST API"],
    githubUrl: "https://github.com/pham0342/job-tracker",
    image: "/images/projects/job-tracker.jpg",
  },
  {
    name: "Notify App",
    pitch:
      "Price-tracking tool estimating resale profit on cross-border supplement purchases, with scheduled exchange-rate alerts.",
    tags: ["Next.js", "TypeScript", "Supabase", "Vercel Cron"],
    githubUrl: "https://github.com/pham0342/notify-app",
    image: "/images/projects/notify-app.jpg",
  },
  {
    name: "Task Manager Web App",
    pitch:
      "Browser-based task manager with Pending, In Progress, and Completed states, timestamps, and localStorage persistence.",
    tags: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/pham0342/To-Do-List-App",
    image: "/images/projects/task-manager.jpg",
  },
];
