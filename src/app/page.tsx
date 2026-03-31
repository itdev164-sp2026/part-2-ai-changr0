import {
  Code,
  Component,
  Database,
  FileJson,
  Palette,
  Wind,
  GitBranch,
} from "lucide-react";
import { SkillCard } from "@/components/skill-card";

const skills = [
  {
    name: "HTML",
    icon: FileJson,
    description: "Semantic markup and structure for web applications",
  },
  {
    name: "CSS",
    icon: Palette,
    description: "Styling and responsive design with modern techniques",
  },
  {
    name: "JavaScript",
    icon: Code,
    description: "Core programming language for interactive web experiences",
  },
  {
    name: "React",
    icon: Component,
    description: "Building reusable UI components and modern interfaces",
  },
  {
    name: "Tailwind CSS",
    icon: Wind,
    description: "Utility-first CSS framework for rapid UI development",
  },
  {
    name: "GraphQL",
    icon: Database,
    description: "Query language for efficient API data fetching",
  },
  {
    name: "GitHub",
    icon: GitBranch,
    description: "Version control and collaborative development workflows",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Profile Header */}
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Rickey Chang</h1>
          <p className="text-xl text-muted-foreground">Developer Profile</p>
        </div>
        <p className="max-w-2xl leading-relaxed text-muted-foreground">
          As a web development student I started out learning HTML, CSS, and
          JavaScript. Now in my later courses I am exposed to React, GraphQL,
          GitHub, and Tailwind CSS.
        </p>
      </section>

      {/* Skills Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Technologies and tools I work with
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              icon={skill.icon}
              description={skill.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
