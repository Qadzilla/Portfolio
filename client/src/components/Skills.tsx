import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  SiReact, 
  SiTypescript, 
  SiTailwindcss, 
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiGit,
  SiVercel,
  SiDrizzle,
  SiVitest,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiPython,
  SiGithub,
  SiRailway,
  SiFigma,
  SiReplit,
  SiAnthropic
} from "react-icons/si";
import { TbApi, TbChartBar, TbCurrencyDollar, TbTable, TbBrain, TbCode } from "react-icons/tb";

const technologies = [
  { name: "React", icon: SiReact, color: "#61DAFB", proficiency: 95 },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", proficiency: 90 },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", proficiency: 92 },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", proficiency: 88 },
  { name: "Vite", icon: SiVite, color: "#646CFF", proficiency: 85 },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26", proficiency: 95 },
  { name: "CSS3", icon: SiCss3, color: "#1572B6", proficiency: 90 },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", proficiency: 88 },
  { name: "Express", icon: SiExpress, color: "#000000", proficiency: 85 },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", proficiency: 82 },
  { name: "REST APIs", icon: TbApi, color: "#FF6B6B", proficiency: 90 },
  { name: "Python", icon: SiPython, color: "#3776AB", proficiency: 80 },
  { name: "Git", icon: SiGit, color: "#F05032", proficiency: 92 },
  { name: "GitHub", icon: SiGithub, color: "#181717", proficiency: 90 },
  { name: "Vercel", icon: SiVercel, color: "#000000", proficiency: 85 },
  { name: "Railway", icon: SiRailway, color: "#0B0D0E", proficiency: 80 },
  { name: "Replit", icon: SiReplit, color: "#F26207", proficiency: 88 },
  { name: "Drizzle ORM", icon: SiDrizzle, color: "#C5F74F", proficiency: 85 },
  { name: "Vitest", icon: SiVitest, color: "#6E9F18", proficiency: 82 },
  { name: "Figma", icon: SiFigma, color: "#F24E1E", proficiency: 75 },
];

const skills = [
  { name: "Data Analysis", icon: TbChartBar, color: "#8B5CF6", proficiency: 85 },
  { name: "Financial Modeling", icon: TbCurrencyDollar, color: "#10B981", proficiency: 80 },
  { name: "Excel/VBA", icon: TbTable, color: "#217346", proficiency: 88 },
  { name: "Claude Code", icon: SiAnthropic, color: "#D97757", proficiency: 90 },
  { name: "Replit Agent", icon: TbBrain, color: "#F26207", proficiency: 92 },
  { name: "AI Prompting", icon: TbCode, color: "#412991", proficiency: 95 },
];

function TechIcon({ tech, index }: { tech: typeof technologies[0]; index: number }) {
  const Icon = tech.icon;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      className="group flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
      transition={{ duration: 0.4, delay: index * 0.03, type: "spring", stiffness: 200 }}
    >
      <motion.div
        className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center cursor-default"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Icon 
          className="w-8 h-8 md:w-10 md:h-10 transition-colors duration-300" 
          style={{ color: tech.color }}
        />
      </motion.div>
      <span className="text-xs md:text-sm text-muted-foreground text-center font-medium group-hover:text-foreground transition-colors">
        {tech.name}
      </span>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-secondary font-medium text-sm tracking-wider uppercase mb-4 block">
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-6 md:gap-8">
            {[...technologies, ...skills].map((tech, index) => (
              <TechIcon key={tech.name} tech={tech} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
