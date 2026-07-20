export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Programming",
    items: ["Java", "JavaScript", "TypeScript", "HTML5", "CSS3"],
  },
  {
    label: "Backend & APIs",
    items: ["Node.js", "Express.js", "REST APIs", "CRUD design", "Async integration"],
  },
  {
    label: "Databases",
    items: ["SQLite", "Relational schema design", "SQL", "Data validation", "Reporting"],
  },
  {
    label: "Tools & Platforms",
    items: ["Git", "GitHub", "VS Code", "GitHub Codespaces", "Figma"],
  },
  {
    label: "Practices",
    items: [
      "Responsive design",
      "Version control workflows",
      "Requirements thinking",
      "Usability evaluation",
      "Team collaboration",
    ],
  },
];
