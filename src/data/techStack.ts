export type TechKey = {
  name: string;
  level: 1 | 2 | 3;
};

export const techStack: TechKey[] = [
  { name: "Java", level: 2 },
  { name: "JavaScript", level: 3 },
  { name: "TypeScript", level: 2 },
  { name: "HTML5", level: 3 },
  { name: "CSS3", level: 3 },
  { name: "React", level: 3 },
  { name: "Node.js", level: 2 },
  { name: "Express", level: 2 },
  { name: "REST API", level: 2 },
  { name: "SQLite", level: 2 },
  { name: "SQL", level: 2 },
  { name: "Git", level: 3 },
  { name: "GitHub", level: 3 },
  { name: "Vite", level: 2 },
  { name: "Tailwind", level: 2 },
  { name: "Figma", level: 1 },
];

export const practices = [
  "Responsive design",
  "Version control workflows",
  "Requirements thinking",
  "Usability evaluation",
  "Team collaboration",
];
