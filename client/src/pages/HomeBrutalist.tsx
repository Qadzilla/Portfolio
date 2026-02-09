import { useState, useRef, useEffect, useCallback } from "react";
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

function AboutSection() {
  return (
    <div style={{ width: "clamp(320px, 85vw, 960px)" }}>
      <h2 className="brutalist-heading">About Me</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="brutalist-card">
          <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Courier New', monospace" }}>My Journey</h3>
          <div className="space-y-3 leading-relaxed" style={{ fontFamily: "'Courier New', monospace" }}>
            <p>I believe in shipping fast, learning constantly, and building things that matter.</p>
            <p>I'm a Computer Science & Business Administration graduate from Northeastern University, bringing technical expertise and business understanding to every project I build.</p>
            <p>I enjoy working closely with clients to understand their goals, translate ideas into solutions, and deliver work that's both technically sound and easy to maintain.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="brutalist-card brutalist-hoverable">
                <div className="w-10 h-10 flex items-center justify-center mb-3 border-2 border-black" style={{ borderRadius: "12px" }}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm mb-1" style={{ fontFamily: "'Courier New', monospace" }}>{item.title}</h4>
                <p className="text-xs" style={{ fontFamily: "'Courier New', monospace" }}>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  return (
    <div style={{ width: "clamp(320px, 85vw, 960px)" }}>
      <h2 className="brutalist-heading">Featured Projects</h2>
      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="brutalist-card animate-pulse">
              <div className="h-40 bg-gray-200 mb-4" style={{ borderRadius: "8px" }} />
              <div className="h-5 bg-gray-200 w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 w-full" />
            </div>
          ))}
        </div>
      ) : projects && projects.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="brutalist-card brutalist-hoverable" data-testid={`brutalist-card-project-${project.id}`}>
              {project.imageUrl && (
                <div className="overflow-hidden border-2 border-black mb-4" style={{ borderRadius: "8px" }}>
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-40 object-cover"
                  />
                </div>
              )}
              <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Courier New', monospace" }}>{project.title}</h3>
              <p className="text-sm mb-3" style={{ fontFamily: "'Courier New', monospace" }}>{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 border-2 border-black font-bold"
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
                    data-testid={`brutalist-link-project-live-${project.id}`}
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
                    data-testid={`brutalist-link-project-github-${project.id}`}
                  >
                    <Github className="w-3 h-3 mr-1" /> Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="brutalist-card text-center py-12">
          <Folder className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p style={{ fontFamily: "'Courier New', monospace" }}>No projects yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}

function SkillsSection() {
  return (
    <div style={{ width: "clamp(320px, 85vw, 960px)" }}>
      <h2 className="brutalist-heading">Skills & Technologies</h2>
      <p className="text-center mb-8" style={{ fontFamily: "'Courier New', monospace" }}>
        The technologies and tools I use to bring ideas to life.
      </p>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {[...technologies, ...skills].map((tech) => {
          const Icon = tech.icon;
          return (
            <div
              key={tech.name}
              className="flex flex-col items-center gap-2 p-3 brutalist-card brutalist-hoverable"
            >
              <Icon className="w-8 h-8" style={{ color: tech.color }} />
              <span className="text-xs text-center font-bold" style={{ fontFamily: "'Courier New', monospace" }}>{tech.name}</span>
            </div>
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
    <div style={{ width: "clamp(320px, 80vw, 620px)" }}>
      <h2 className="brutalist-heading">Let's Connect</h2>
      <p className="text-center mb-4" style={{ fontFamily: "'Courier New', monospace" }}>
        Have a question or want to work together? Drop me a message.
      </p>
      <div>
        <div className="brutalist-card">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="brutalist-label">Name *</label>
                <input
                  {...form.register("name")}
                  placeholder="Your name"
                  className="brutalist-input"
                  data-testid="brutalist-input-name"
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
                  data-testid="brutalist-input-email"
                />
                {errors.email && <p className="brutalist-error">{errors.email.message}</p>}
              </div>
            </div>
            <div>
              <label className="brutalist-label">Phone</label>
              <input
                {...form.register("phone")}
                type="tel"
                placeholder="Your phone number"
                className="brutalist-input"
                data-testid="brutalist-input-phone"
              />
            </div>
            <div>
              <label className="brutalist-label">Message *</label>
              <textarea
                {...form.register("message")}
                placeholder="Your message..."
                rows={5}
                className="brutalist-input brutalist-textarea"
                data-testid="brutalist-textarea-message"
              />
              {errors.message && <p className="brutalist-error">{errors.message.message}</p>}
            </div>
            <button
              type="submit"
              disabled={sendMessage.isPending}
              className="brutalist-btn"
              data-testid="brutalist-button-submit"
            >
              {sendMessage.isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin inline" /> Sending...</>
              ) : (
                <><Send className="w-4 h-4 mr-2 inline" /> Send Message</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function HomeBrutalist() {
  const [activeSection, setActiveSection] = useState<SectionId>("about");
  const [pendingSection, setPendingSection] = useState<SectionId | null>(null);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
  const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);
  const [phase, setPhase] = useState<"visible" | "exiting" | "resizing" | "entering">("visible");
  const contentRef = useRef<HTMLDivElement>(null);
  const { setView } = useView();

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

  const measureDimensions = useCallback(() => {
    if (contentRef.current) {
      setContainerHeight(contentRef.current.offsetHeight);
      setContainerWidth(contentRef.current.scrollWidth);
    }
  }, []);

  useEffect(() => {
    measureDimensions();
    const timer = setTimeout(measureDimensions, 50);
    return () => clearTimeout(timer);
  }, [activeSection, measureDimensions]);

  useEffect(() => {
    const observer = new ResizeObserver(() => measureDimensions());
    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [measureDimensions]);

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
        .brutalist-page {
          background-color: rgb(224, 224, 224);
          min-height: 100vh;
          font-family: 'Courier New', monospace;
          color: #000;
          display: flex;
          flex-direction: column;
        }
        .brutalist-header {
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;
          position: relative;
          z-index: 50;
          flex-shrink: 0;
        }
        .brutalist-view-btn {
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 700;
          font-family: 'Courier New', monospace;
          cursor: pointer;
          border: 2px solid #000;
          background: #fff;
          color: #000;
          border-radius: 6px;
          transition: all 0.2s;
        }
        .brutalist-view-btn:hover {
          box-shadow: 3px 3px 0px #000;
          transform: translate(-1px, -1px);
        }
        .brutalist-view-btn.active {
          background: rgb(255, 106, 0);
          color: #fff;
          box-shadow: 3px 3px 0px #000;
        }
        .brutalist-nav-btn {
          padding: 10px 24px;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Courier New', monospace;
          cursor: pointer;
          border: 2px solid #000;
          background: #fff;
          color: #000;
          transition: all 0.2s;
          border-radius: 6px;
        }
        .brutalist-nav-btn:hover {
          box-shadow: 3px 3px 0px #000;
          transform: translate(-1px, -1px);
        }
        .brutalist-nav-btn.active {
          background: rgb(255, 106, 0);
          color: #fff;
          box-shadow: 3px 3px 0px #000;
        }
        .brutalist-main {
          flex: 1;
          padding: 16px 16px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow-y: auto;
        }
        .brutalist-nav-center {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 16px;
        }
        .brutalist-body-container {
          background: #fff;
          border: 3px solid #000;
          box-shadow: 8px 8px 0px #000;
          border-radius: 8px;
          padding: 24px;
        }
        .brutalist-heading {
          font-size: 28px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 24px;
          font-family: 'Courier New', monospace;
        }
        .brutalist-card {
          background: rgb(245, 245, 245);
          border: 2px solid #000;
          padding: 20px;
          box-shadow: 4px 4px 0px #000;
          border-radius: 8px;
        }
        .brutalist-hoverable {
          transition: all 0.2s;
        }
        .brutalist-hoverable:hover {
          box-shadow: 8px 8px 0px #000;
          transform: translate(-2px, -2px);
        }
        .brutalist-label {
          display: block;
          font-weight: bold;
          margin-bottom: 4px;
          font-family: 'Courier New', monospace;
          font-size: 14px;
        }
        .brutalist-input {
          width: 100%;
          padding: 10px 14px;
          border: 2px solid #000;
          background: #fff;
          font-size: 14px;
          font-family: 'Courier New', monospace;
          outline: none;
          transition: all 0.2s;
          border-radius: 0;
        }
        .brutalist-input:focus {
          box-shadow: 4px 4px 0px #000;
        }
        .brutalist-textarea {
          resize: vertical;
          min-height: 100px;
        }
        .brutalist-error {
          color: red;
          font-size: 12px;
          margin-top: 4px;
          font-family: 'Courier New', monospace;
        }
        .brutalist-btn {
          width: 100%;
          padding: 12px;
          background: rgb(255, 106, 0);
          color: #fff;
          border: 2px solid #000;
          font-size: 16px;
          font-weight: bold;
          font-family: 'Courier New', monospace;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 0;
        }
        .brutalist-btn:hover {
          box-shadow: 4px 4px 0px #000;
          transform: translate(-2px, -2px);
        }
        .brutalist-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .brutalist-btn-sm {
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          background: rgb(255, 106, 0);
          color: #fff;
          border: 2px solid #000;
          font-size: 12px;
          font-weight: bold;
          font-family: 'Courier New', monospace;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          border-radius: 4px;
        }
        .brutalist-btn-sm:hover {
          box-shadow: 3px 3px 0px #000;
          transform: translate(-1px, -1px);
        }
      `}</style>

      <motion.header
        className="brutalist-header"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {["default", "artsy", "brutalist"].map((view, i) => (
          <motion.button
            key={view}
            className={`brutalist-view-btn ${view === "brutalist" ? "active" : ""}`}
            onClick={() => { setView(view as "default" | "artsy" | "brutalist"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            data-testid={`brutalist-btn-view-${view === "default" ? "basic" : view === "artsy" ? "immersive" : "brutalist"}`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}
          >
            {view === "default" ? "Basic" : view === "artsy" ? "Immersive" : "Brutalist"}
          </motion.button>
        ))}
      </motion.header>

      <main className="brutalist-main">
        <motion.nav
          className="brutalist-nav-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {sections.map((section, i) => (
            <motion.button
              key={section.id}
              className={`brutalist-nav-btn ${activeSection === section.id || pendingSection === section.id ? "active" : ""}`}
              onClick={() => handleTabClick(section.id)}
              data-testid={`brutalist-nav-${section.id}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.35 + i * 0.06 }}
            >
              {section.label}
            </motion.button>
          ))}
        </motion.nav>
        <motion.div
          className="brutalist-body-container"
          initial={{ y: 30, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            height: containerHeight !== undefined ? containerHeight + 54 : "auto",
            width: containerWidth !== undefined ? containerWidth + 54 : "auto",
          }}
          transition={{
            y: { duration: 0.5, delay: 0.5 },
            opacity: { duration: 0.5, delay: 0.5 },
            height: { duration: 0.4, ease: "easeInOut" },
            width: { duration: 0.4, ease: "easeInOut" },
          }}
          style={{
            overflow: phase === "resizing" ? "hidden" : "visible",
            maxWidth: "100%",
          }}
          onAnimationComplete={() => {
            if (phase === "resizing") {
              setPhase("entering");
            }
          }}
        >
          <div ref={contentRef} style={{ width: "fit-content", minWidth: "320px" }}>
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
                measureDimensions();
                handlePhaseComplete();
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
