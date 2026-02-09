import { db } from "./storage";
import { projects, skills } from "@shared/schema";

const sampleProjects = [
  {
    title: "ScoreCast",
    description: "A full-stack soccer score prediction platform where users join private leagues via invite codes and submit exact-score picks for each gameweek.",
    category: "Full-Stack Web App",
    imageUrl: "/images/scorecast-preview.png",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Better Auth", "Vercel"],
    liveUrl: "https://scorecast.club",
    githubUrl: "https://github.com/Qadzilla/scorecast",
    featured: 1,
  },
];

const sampleSkills = [
  { name: "React", category: "Frontend", proficiency: 95 },
  { name: "TypeScript", category: "Frontend", proficiency: 90 },
  { name: "Tailwind CSS", category: "Frontend", proficiency: 92 },
  { name: "Vite", category: "Frontend", proficiency: 88 },
  { name: "Node.js", category: "Backend", proficiency: 90 },
  { name: "Express", category: "Backend", proficiency: 88 },
  { name: "PostgreSQL", category: "Backend", proficiency: 85 },
  { name: "REST APIs", category: "Backend", proficiency: 90 },
  { name: "Data Analysis", category: "Finance", proficiency: 85 },
  { name: "Excel/VBA", category: "Finance", proficiency: 88 },
  { name: "Financial Modeling", category: "Finance", proficiency: 80 },
  { name: "Investment Analysis", category: "Finance", proficiency: 78 },
  { name: "Git", category: "Tools", proficiency: 92 },
  { name: "Vitest", category: "Tools", proficiency: 85 },
  { name: "Vercel/Railway", category: "Tools", proficiency: 82 },
  { name: "Drizzle ORM", category: "Tools", proficiency: 85 },
];

export async function seedDatabase() {
  try {
    const existingProjects = await db.select().from(projects).limit(1);
    if (existingProjects.length > 0) {
      console.log("Database already seeded, skipping...");
      return;
    }

    console.log("Seeding database...");

    for (const project of sampleProjects) {
      await db.insert(projects).values(project);
    }
    console.log(`Inserted ${sampleProjects.length} projects`);

    for (const skill of sampleSkills) {
      await db.insert(skills).values(skill);
    }
    console.log(`Inserted ${sampleSkills.length} skills`);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
