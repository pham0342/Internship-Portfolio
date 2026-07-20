export type TechKey = {
  name: string;
  level: 1 | 2 | 3;
  color: string;
};

export const techStack: TechKey[] = [
  { name: "Java", level: 2, color: "#f89820" },
  { name: "JavaScript", level: 3, color: "#f7df1e" },
  { name: "TypeScript", level: 2, color: "#3178c6" },
  { name: "HTML5", level: 3, color: "#e34f26" },
  { name: "CSS3", level: 3, color: "#1572b6" },
  { name: "React", level: 3, color: "#61dafb" },
  { name: "Node.js", level: 2, color: "#3c873a" },
  { name: "Express", level: 2, color: "#4b5563" },
  { name: "REST API", level: 2, color: "#6366f1" },
  { name: "SQLite", level: 2, color: "#0f5c82" },
  { name: "SQL", level: 2, color: "#2596be" },
  { name: "Git", level: 3, color: "#f05033" },
  { name: "GitHub", level: 3, color: "#f5f5f5" },
  { name: "Vite", level: 2, color: "#646cff" },
  { name: "Tailwind", level: 2, color: "#38bdf8" },
  { name: "Figma", level: 1, color: "#a259ff" },
];

export const practices = [
  "Responsive design",
  "Version control workflows",
  "Requirements thinking",
  "Usability evaluation",
  "Team collaboration",
];
