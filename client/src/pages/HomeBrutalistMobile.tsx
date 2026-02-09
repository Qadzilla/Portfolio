import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { useView } from "@/components/ViewProvider";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Project } from "@shared/schema";
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
  SiAnthropic,
} from "react-icons/si";
import { TbApi, TbChartBar, TbCurrencyDollar, TbTable, TbBrain, TbCode } from "react-icons/tb";
import { ExternalLink, Github, Folder, Send, Loader2, GraduationCap, Code, Briefcase, Globe } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

type SectionId = "about" | "projects" | "skills" | "contact";

const sections: { id: SectionId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const highlights = [
  {
    icon: GraduationCap,
    title: "Northeastern University",
    description: "B.S. in Computer Science & Business Administration with Finance concentration.",
  },
  {
    icon: Code,
    title: "Full-Stack Developer",
    description: "Building production-ready web applications that solve real problems.",
  },
  {
    icon: Briefcase,
    title: "Industry Experience",
    description: "Internships spanning sports analytics, AI automation, and banking.",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description: "Work experience across the US, UK, South Africa, and Jordan.",
  },
];

const technologies = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Vite", icon: SiVite, color: "#646CFF" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss3, color: "#1572B6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express", icon: SiExpress, color: "#000000" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "REST APIs", icon: TbApi, color: "#FF6B6B" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#181717" },
  { name: "Vercel", icon: SiVercel, color: "#000000" },
  { name: "Railway", icon: SiRailway, color: "#0B0D0E" },
  { name: "Replit", icon: SiReplit, color: "#F26207" },
  { name: "Drizzle ORM", icon: SiDrizzle, color: "#C5F74F" },
  { name: "Vitest", icon: SiVitest, color: "#6E9F18" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];

const skills = [
  { name: "Data Analysis", icon: TbChartBar, color: "#8B5CF6" },
  { name: "Financial Modeling", icon: TbCurrencyDollar, color: "#10B981" },
  { name: "Excel/VBA", icon: TbTable, color: "#217346" },
  { name: "Claude Code", icon: SiAnthropic, color: "#D97757" },
  { name: "Replit Agent", icon: TbBrain, color: "#F26207" },
  { name: "AI Prompting", icon: TbCode, color: "#412991" },
];

const cardSlamVariants = {
  hidden: { opacity: 0, y: 60, rotate: -2 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15,
      delay: i * 0.08,
    },
  }),
};

const skillSlamVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15,
      delay: i * 0.03,
    },
  }),
};

const phoneScreenText: Record<SectionId, string> = {
  about: "> CS + Business @ NEU\n> Full-stack dev\n> Ships fast, learns always",
  projects: "> Real-world apps\n> React + Node + Postgres\n> Open source on GitHub",
  skills: "> 20+ technologies\n> Frontend to deployment\n> AI-augmented workflow",
  contact: "> Ready to collaborate\n> Send a message below\n> Let's build together",
};

function MobileTerminalScreen({ activeSection }: { activeSection: SectionId }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const fullText = phoneScreenText[activeSection];
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [activeSection]);

  return (
    <div className="brutalist-mobile-terminal">
      <span className="brutalist-phone-screen-text">
        {displayedText.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            {i < displayedText.split("\n").length - 1 && <br />}
          </span>
        ))}
      </span>
      <span className="brutalist-phone-cursor" />
    </div>
  );
}

function AboutSection() {
  return (
    <div style={{ width: "clamp(280px, 90vw, 500px)" }}>
      <h2 className="brutalist-heading brutalist-glitch" data-text="About Me">About Me</h2>
      <motion.div
        className="brutalist-card mb-4"
        variants={cardSlamVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "'Courier New', monospace" }}>My Journey</h3>
        <div className="space-y-2 leading-relaxed text-sm" style={{ fontFamily: "'Courier New', monospace" }}>
          <p>I believe in shipping fast, learning constantly, and building things that matter.</p>
          <p>I'm a Computer Science & Business Administration graduate from Northeastern University, bringing technical expertise and business understanding to every project I build.</p>
          <p>I enjoy working closely with clients to understand their goals, translate ideas into solutions, and deliver work that's both technically sound and easy to maintain.</p>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 gap-3">
        {highlights.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              className="brutalist-card brutalist-hoverable"
              variants={cardSlamVariants}
              initial="hidden"
              animate="visible"
              custom={i + 1}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 flex items-center justify-center shrink-0 border-2 border-black" style={{ borderRadius: "10px" }}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1" style={{ fontFamily: "'Courier New', monospace" }}>{item.title}</h4>
                  <p className="text-xs" style={{ fontFamily: "'Courier New', monospace" }}>{item.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ProjectsSection() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  return (
    <div style={{ width: "clamp(280px, 90vw, 500px)" }}>
      <h2 className="brutalist-heading brutalist-glitch" data-text="Featured Projects">Featured Projects</h2>
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="brutalist-card animate-pulse">
              <div className="h-32 bg-gray-200 mb-4" style={{ borderRadius: "8px" }} />
              <div className="h-5 bg-gray-200 w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 w-full" />
            </div>
          ))}
        </div>
      ) : projects && projects.length > 0 ? (
        <div className="space-y-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="brutalist-card brutalist-hoverable"
              variants={cardSlamVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              {project.imageUrl && (
                <div className="overflow-hidden border-2 border-black mb-3" style={{ borderRadius: "8px" }}>
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
              <h3 className="text-base font-bold mb-2" style={{ fontFamily: "'Courier New', monospace" }}>{project.title}</h3>
              <p className="text-xs mb-3" style={{ fontFamily: "'Courier New', monospace" }}>{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-1.5 py-0.5 border-2 border-black font-bold"
                    style={{ fontFamily: "'Courier New', monospace", borderRadius: "4px" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutalist-btn-sm"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" /> Live
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutalist-btn-sm"
                    style={{ backgroundColor: "#4CAF50" }}
                  >
                    <Github className="w-3 h-3 mr-1" /> Code
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="brutalist-card text-center py-8">
          <Folder className="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p style={{ fontFamily: "'Courier New', monospace" }}>No projects yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}

function SkillsSection() {
  return (
    <div style={{ width: "clamp(280px, 90vw, 500px)" }}>
      <h2 className="brutalist-heading brutalist-glitch" data-text="Skills & Technologies">Skills & Technologies</h2>
      <p className="text-center mb-6 text-sm" style={{ fontFamily: "'Courier New', monospace" }}>
        The technologies and tools I use to bring ideas to life.
      </p>
      <div className="grid grid-cols-3 gap-3">
        {[...technologies, ...skills].map((tech, i) => {
          const Icon = tech.icon;
          return (
            <motion.div
              key={tech.name}
              className="flex flex-col items-center gap-1.5 p-2 brutalist-card brutalist-hoverable"
              variants={skillSlamVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              <Icon className="w-6 h-6" style={{ color: tech.color }} />
              <span className="text-[10px] text-center font-bold" style={{ fontFamily: "'Courier New', monospace" }}>{tech.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ContactSection() {
  const { toast } = useToast();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const sendMessage = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    sendMessage.mutate(data);
  };

  const errors = form.formState.errors;

  return (
    <div style={{ width: "clamp(280px, 90vw, 500px)" }}>
      <h2 className="brutalist-heading brutalist-glitch" data-text="Let's Connect">Let's Connect</h2>
      <p className="text-center mb-4 text-sm" style={{ fontFamily: "'Courier New', monospace" }}>
        Have a question or want to work together? Drop me a message.
      </p>
      <motion.div
        className="brutalist-card"
        variants={cardSlamVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="brutalist-label">Name *</label>
            <input
              {...form.register("name")}
              placeholder="Your name"
              className="brutalist-input"
            />
            {errors.name && <p className="brutalist-error">{errors.name.message}</p>}
          </div>
          <div>
            <label className="brutalist-label">Email *</label>
            <input
              {...form.register("email")}
              type="email"
              placeholder="your@email.com"
              className="brutalist-input"
            />
            {errors.email && <p className="brutalist-error">{errors.email.message}</p>}
          </div>
          <div>
            <label className="brutalist-label">Phone</label>
            <input
              {...form.register("phone")}
              type="tel"
              placeholder="Your phone number"
              className="brutalist-input"
            />
          </div>
          <div>
            <label className="brutalist-label">Message *</label>
            <textarea
              {...form.register("message")}
              placeholder="Your message..."
              rows={4}
              className="brutalist-input brutalist-textarea"
            />
            {errors.message && <p className="brutalist-error">{errors.message.message}</p>}
          </div>
          <button
            type="submit"
            disabled={sendMessage.isPending}
            className="brutalist-btn"
          >
            {sendMessage.isPending ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin inline" /> Sending...</>
            ) : (
              <><Send className="w-4 h-4 mr-2 inline" /> Send Message</>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function HomeBrutalistMobile() {
  const [activeSection, setActiveSection] = useState<SectionId>("about");
  const [pendingSection, setPendingSection] = useState<SectionId | null>(null);
  const [phase, setPhase] = useState<"visible" | "exiting" | "resizing" | "entering">("visible");
  const contentRef = useRef<HTMLDivElement>(null);
  const { setView } = useView();

  const navContainerRef = useRef<HTMLDivElement>(null);
  const navBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const updateIndicator = useCallback((sectionId: SectionId) => {
    const btn = navBtnRefs.current[sectionId];
    const container = navContainerRef.current;
    if (btn && container) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setIndicatorStyle({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
      });
    }
  }, []);

  useLayoutEffect(() => {
    updateIndicator(pendingSection ?? activeSection);
  }, [activeSection, pendingSection, updateIndicator]);

  useEffect(() => {
    const handleResize = () => updateIndicator(pendingSection ?? activeSection);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSection, pendingSection, updateIndicator]);

  const handleTabClick = useCallback((id: SectionId) => {
    if (id === activeSection || phase !== "visible") return;
    setPendingSection(id);
    setPhase("exiting");
  }, [activeSection, phase]);

  const handlePhaseComplete = useCallback(() => {
    if (phase === "exiting" && pendingSection) {
      setActiveSection(pendingSection);
      setPendingSection(null);
      setPhase("resizing");
    } else if (phase === "entering") {
      setPhase("visible");
    }
  }, [phase, pendingSection]);

  const renderSection = () => {
    switch (activeSection) {
      case "about": return <AboutSection />;
      case "projects": return <ProjectsSection />;
      case "skills": return <SkillsSection />;
      case "contact": return <ContactSection />;
    }
  };

  return (
    <div className="brutalist-page">
      <style>{`
        /* ==================== */
        /* 1. SCANLINE + NOISE  */
        /* ==================== */
        .brutalist-scanlines {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.03) 2px,
            rgba(0, 0, 0, 0.03) 4px
          );
        }
        .brutalist-noise {
          position: fixed;
          inset: 0;
          z-index: 9998;
          pointer-events: none;
          opacity: 0.04;
        }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
        .brutalist-noise svg {
          width: 200%;
          height: 200%;
          animation: grain 0.8s steps(6) infinite;
        }

        /* ==================== */
        /* 2. GLITCH HEADINGS   */
        /* ==================== */
        @keyframes glitch {
          0% { text-shadow: 2px 0 #ff006e, -2px 0 #00f0ff; }
          20% { text-shadow: -2px 0 #ff006e, 2px 0 #00f0ff; }
          40% { text-shadow: 2px -1px #ff006e, -2px 1px #00f0ff; }
          60% { text-shadow: -1px 2px #ff006e, 1px -2px #00f0ff; }
          80% { text-shadow: 1px 0 #ff006e, -1px 0 #00f0ff; }
          100% { text-shadow: 0 0 transparent, 0 0 transparent; }
        }
        .brutalist-glitch {
          position: relative;
          animation: glitch 0.6s ease-out forwards;
        }
        .brutalist-glitch:hover {
          animation: glitch 0.4s ease-out forwards;
        }

        /* ==================== */
        /* MOBILE TERMINAL      */
        /* ==================== */
        .brutalist-mobile-terminal {
          width: 100%;
          max-width: 400px;
          margin: 0 auto 16px;
          min-height: 56px;
          background: #000;
          border: 2px solid #444;
          border-radius: 6px;
          padding: 8px 10px;
          font-family: 'Courier New', monospace;
          font-size: 11px;
          line-height: 1.5;
          color: #00ff41;
          position: relative;
          overflow: hidden;
        }
        .brutalist-phone-screen-text {
          white-space: pre-wrap;
        }
        .brutalist-phone-cursor {
          display: inline-block;
          width: 7px;
          height: 13px;
          background: #00ff41;
          animation: phone-blink 0.8s step-end infinite;
          vertical-align: text-bottom;
          margin-left: 1px;
        }
        @keyframes phone-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* ==================== */
        /* BASE STYLES          */
        /* ==================== */
        .brutalist-page {
          background-color: rgb(224, 224, 224);
          min-height: 100vh;
          font-family: 'Courier New', monospace;
          color: #000;
          display: flex;
          flex-direction: column;
        }
        .brutalist-header {
          padding: 10px 12px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 6px;
          position: relative;
          z-index: 50;
          flex-shrink: 0;
          flex-wrap: wrap;
        }
        .brutalist-view-btn {
          padding: 5px 10px;
          font-size: 12px;
          font-weight: 700;
          font-family: 'Courier New', monospace;
          cursor: pointer;
          border: 2px solid #000;
          background: #fff;
          color: #000;
          border-radius: 6px;
          transition: all 0.15s;
        }
        .brutalist-view-btn:hover {
          transform: translateY(2px);
          box-shadow: 0 0 0 #000;
        }
        .brutalist-view-btn:not(:hover) {
          box-shadow: 2px 2px 0px #000;
        }
        .brutalist-view-btn.active {
          background: rgb(255, 106, 0);
          color: #fff;
          box-shadow: 2px 2px 0px #000;
        }
        .brutalist-view-btn.active:hover {
          transform: translateY(2px);
          box-shadow: 0 0 0 #000;
        }

        /* Nav button wrapper for sliding indicator */
        .brutalist-nav-wrapper {
          position: relative;
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 12px;
        }
        .brutalist-nav-btn {
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 700;
          font-family: 'Courier New', monospace;
          cursor: pointer;
          border: 2px solid #000;
          background: transparent;
          color: #000;
          transition: color 0.2s;
          border-radius: 6px;
          position: relative;
          z-index: 1;
        }
        .brutalist-nav-btn.active {
          color: #fff;
        }
        .brutalist-nav-indicator {
          position: absolute;
          top: 0;
          height: 100%;
          background: rgb(255, 106, 0);
          border: 2px solid #000;
          border-radius: 6px;
          box-shadow: 2px 2px 0px #000;
          z-index: 0;
        }
        .brutalist-main {
          flex: 1;
          padding: 12px 8px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow-y: auto;
        }
        .brutalist-body-container {
          background: #fff;
          border: 3px solid #000;
          box-shadow: 4px 4px 0px #000;
          border-radius: 8px;
          padding: 16px;
          width: 100%;
          max-width: 500px;
        }
        .brutalist-heading {
          font-size: 22px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 16px;
          font-family: 'Courier New', monospace;
        }
        .brutalist-card {
          background: rgb(245, 245, 245);
          border: 2px solid #000;
          padding: 14px;
          box-shadow: 3px 3px 0px #000;
          border-radius: 8px;
        }

        /* ==================== */
        /* 5. AGGRESSIVE HOVERS */
        /* ==================== */
        @keyframes shake {
          0%, 100% { transform: translate(-2px, -2px) skewX(-1deg); }
          25% { transform: translate(-3px, -1px) skewX(-1deg); }
          50% { transform: translate(-1px, -3px) skewX(-1deg); }
          75% { transform: translate(-3px, -2px) skewX(-1deg); }
        }
        .brutalist-hoverable {
          transition: all 0.15s;
        }
        .brutalist-hoverable:hover {
          box-shadow: 8px 8px 0px #000;
          transform: translate(-2px, -2px) skewX(-1deg);
          animation: shake 0.3s ease-in-out;
        }
        .brutalist-label {
          display: block;
          font-weight: bold;
          margin-bottom: 4px;
          font-family: 'Courier New', monospace;
          font-size: 13px;
        }
        .brutalist-input {
          width: 100%;
          padding: 8px 12px;
          border: 2px solid #000;
          background: #fff;
          font-size: 13px;
          font-family: 'Courier New', monospace;
          outline: none;
          transition: all 0.2s;
          border-radius: 0;
        }
        .brutalist-input:focus {
          box-shadow: 3px 3px 0px #000;
        }
        .brutalist-textarea {
          resize: vertical;
          min-height: 80px;
        }
        .brutalist-error {
          color: red;
          font-size: 11px;
          margin-top: 4px;
          font-family: 'Courier New', monospace;
        }

        /* Buttons */
        .brutalist-btn {
          width: 100%;
          padding: 10px;
          background: rgb(255, 106, 0);
          color: #fff;
          border: 2px solid #000;
          font-size: 14px;
          font-weight: bold;
          font-family: 'Courier New', monospace;
          cursor: pointer;
          transition: all 0.1s;
          border-radius: 0;
          box-shadow: 3px 3px 0px #000;
          transform: translate(-1px, -1px);
        }
        .brutalist-btn:hover {
          box-shadow: 0 0 0 #000;
          transform: translate(0, 0);
        }
        .brutalist-btn:active {
          box-shadow: 0 0 0 #000;
          transform: translate(2px, 2px);
        }
        .brutalist-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .brutalist-btn-sm {
          display: inline-flex;
          align-items: center;
          padding: 5px 10px;
          background: rgb(255, 106, 0);
          color: #fff;
          border: 2px solid #000;
          font-size: 11px;
          font-weight: bold;
          font-family: 'Courier New', monospace;
          cursor: pointer;
          transition: all 0.1s;
          text-decoration: none;
          border-radius: 4px;
          box-shadow: 2px 2px 0px #000;
          transform: translate(-1px, -1px);
        }
        .brutalist-btn-sm:hover {
          box-shadow: 0 0 0 #000;
          transform: translate(0, 0);
        }
        .brutalist-btn-sm:active {
          transform: translate(1px, 1px);
        }
      `}</style>

      {/* === 1. Scanline + Noise Overlay === */}
      <div className="brutalist-scanlines" />
      <div className="brutalist-noise">
        <svg>
          <filter id="brutalist-noise-filter-mobile">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#brutalist-noise-filter-mobile)" />
        </svg>
      </div>

      {/* === 2. Header === */}
      <motion.header
        className="brutalist-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {["default", "artsy", "brutalist"].map((view, i) => (
          <motion.button
            key={view}
            className={`brutalist-view-btn ${view === "brutalist" ? "active" : ""}`}
            onClick={() => { setView(view as "default" | "artsy" | "brutalist"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            initial={{ y: -30, opacity: 0, rotate: -3 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 18,
              delay: 0.15 + i * 0.1,
            }}
          >
            {view === "default" ? "Basic" : view === "artsy" ? "Immersive" : "Brutalist"}
          </motion.button>
        ))}
      </motion.header>

      <main className="brutalist-main">
        {/* === Nav Tabs === */}
        <motion.div
          className="brutalist-nav-wrapper"
          ref={navContainerRef}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 22, delay: 0.3 }}
        >
          <motion.div
            className="brutalist-nav-indicator"
            animate={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          />
          {sections.map((section, i) => (
            <motion.button
              key={section.id}
              ref={(el) => { navBtnRefs.current[section.id] = el; }}
              className={`brutalist-nav-btn ${activeSection === section.id || pendingSection === section.id ? "active" : ""}`}
              onClick={() => handleTabClick(section.id)}
              initial={{ scale: 0.7, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 16,
                delay: 0.35 + i * 0.08,
              }}
            >
              {section.label}
            </motion.button>
          ))}
        </motion.div>

        {/* === Terminal Screen (replaces BlackBerry phone) === */}
        <MobileTerminalScreen activeSection={pendingSection ?? activeSection} />

        {/* === Content Container === */}
        <motion.div
          className="brutalist-body-container"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            y: { type: "spring", stiffness: 300, damping: 20, delay: 0.5 },
            opacity: { duration: 0.3, delay: 0.5 },
          }}
        >
          <div ref={contentRef}>
            <motion.div
              animate={
                phase === "visible" || phase === "entering"
                  ? { opacity: 1, x: 0 }
                  : phase === "exiting"
                  ? { opacity: 0, x: -20 }
                  : { opacity: 0, x: 20 }
              }
              transition={{ duration: phase === "exiting" ? 0.2 : 0.3 }}
              onAnimationComplete={() => {
                if (phase === "exiting" || phase === "entering") {
                  handlePhaseComplete();
                }
                if (phase === "resizing") {
                  setPhase("entering");
                }
              }}
            >
              {renderSection()}
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
