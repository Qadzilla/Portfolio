import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typewriter from "typewriter-effect";
import { useView } from "@/components/ViewProvider";
import { Code, Briefcase, GraduationCap, Globe, ExternalLink, Folder, Send, Loader2 } from "lucide-react";
import { Github } from "lucide-react";
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
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@shared/schema";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const technologies = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Vite", icon: SiVite, color: "#646CFF" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss3, color: "#1572B6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express", icon: SiExpress, color: "#666666" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "REST APIs", icon: TbApi, color: "#FF6B6B" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#333333" },
  { name: "Vercel", icon: SiVercel, color: "#333333" },
  { name: "Railway", icon: SiRailway, color: "#333333" },
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

gsap.registerPlugin(ScrollTrigger);

// Minimal header with orangutans for view switching
function MinimalHeader() {
  const { setView } = useView();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="px-4 py-3 flex items-center gap-2">
        <div className="flex items-center gap-1 bg-neutral-900/60 backdrop-blur-md rounded-md p-1">
          <button
            className="px-3 py-1.5 text-sm font-semibold rounded cursor-pointer text-black/70 hover:text-black transition-all"
            onClick={() => {
              setView("default");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Switch to Basic view"
            data-testid="button-view-basic-artsy"
          >
            Basic
          </button>

          <button
            className="px-3 py-1.5 text-sm font-semibold rounded cursor-pointer text-orange-500 transition-all"
            onClick={() => {
              setView("artsy");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Switch to Immersive view"
            data-testid="button-view-immersive-artsy"
          >
            Immersive
          </button>

          <button
            className="px-3 py-1.5 text-sm font-semibold rounded cursor-pointer text-black/70 hover:text-black transition-all"
            onClick={() => {
              setView("brutalist");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Switch to Brutalist view"
            data-testid="button-view-brutalist-artsy"
          >
            Brutalist
          </button>
        </div>
      </nav>
    </motion.header>
  );
}

// Component to render text as individual animated letters
function ScatterText({ text, className, gradient }: { text: string; className?: string; gradient?: boolean }) {
  if (gradient) {
    // For gradient text, apply gradient to each letter individually
    return (
      <span className={className}>
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="scatter-letter inline-block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char}
          </span>
        ))}
      </span>
    );
  }
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="scatter-letter inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export default function HomeArtsy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
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

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states - slightly further back for cleaner depth separation
      gsap.set(aboutSectionRef.current, { z: -5000, opacity: 0 });
      gsap.set(projectsSectionRef.current, { z: -5000, opacity: 0 });
      gsap.set(skillsSectionRef.current, { z: -5000, opacity: 0 });
      gsap.set(contactSectionRef.current, { z: -5000, opacity: 0 });

      // Single continuous timeline with spaced offsets
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "85% top",
          scrub: 1.2,
        }
      });

      // Hero out + About in (offset: 0)
      tl.to(heroContentRef.current, { z: 1800, duration: 1.2 }, 0)
        .to(aboutSectionRef.current, { z: 0, opacity: 1, duration: 1.2 }, 0.2)
        // About out + Projects in (offset: 1.5)
        .to(aboutSectionRef.current, { z: 1800, duration: 1.2 }, 1.5)
        .to(projectsSectionRef.current, { z: 0, opacity: 1, duration: 1.2 }, 1.7)
        // Projects out + Skills in (offset: 3)
        .to(projectsSectionRef.current, { z: 1800, duration: 1.2 }, 3)
        .to(skillsSectionRef.current, { z: 0, opacity: 1, duration: 1.2 }, 3.2)
        // Skills out + Contact in (offset: 4.5)
        .to(skillsSectionRef.current, { z: 1800, duration: 1.2 }, 4.5)
        .to(contactSectionRef.current, { z: 0, opacity: 1, duration: 1.2 }, 4.7);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white text-black">
      <style>{`
        html, body {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <MinimalHeader />

      {/* Scroll container - gives us room to scroll */}
      <div className="h-[1200vh]">
        {/* 3D Viewport */}
        <div
          className="h-screen sticky top-0 overflow-hidden"
          style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}
        >
          {/* Hero Section */}
          <div
            ref={heroContentRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="max-w-4xl mx-auto px-6 text-center">
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-10 tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="block">
                  <ScatterText text="Hello, I'm " />
                  <ScatterText text="Zaid" gradient />
                  <ScatterText text="." />
                </span>
                <span className="scatter-letter block text-xl md:text-2xl text-black/60 font-normal mt-4" style={{ wordSpacing: '0.25em' }}>
                  <Typewriter
                    options={{
                      strings: [
                        "Full-Stack Developer",
                        "Open for Freelance",
                        "Building Cool Stuff",
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 30,
                      delay: 50,
                    }}
                  />
                </span>
              </motion.h1>
            </div>
          </div>

          {/* About Section */}
          <div
            ref={aboutSectionRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="max-w-6xl mx-auto px-6 py-24">
              <div className="text-center mb-16">
                <span className="text-orange-500 font-medium text-sm tracking-wider uppercase mb-4 block">
                  About Me
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                  Building at the Intersection
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <Card className="p-8 h-full bg-white border-black/20">
                  <h3 className="text-2xl font-semibold mb-4 text-black">My Journey</h3>
                  <div className="space-y-4 text-black/70 leading-relaxed">
                    <p>
                      I believe in shipping fast, learning constantly, and building things that matter.
                    </p>
                    <p>
                      I'm a Computer Science & Business Administration graduate from Northeastern University, bringing technical expertise and business understanding to every project I build.
                    </p>
                    <p>
                      I enjoy working closely with clients to understand their goals, translate ideas into solutions, and deliver work that's both technically sound and easy to maintain.
                    </p>
                  </div>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  {highlights.map((item) => (
                    <Card
                      key={item.title}
                      className="p-6 bg-white border-black/20"
                    >
                      <div className="w-12 h-12 rounded-md bg-orange-500/10 flex items-center justify-center mb-4">
                        <item.icon className="w-6 h-6 text-orange-500" />
                      </div>
                      <h4 className="font-semibold mb-2 text-black">{item.title}</h4>
                      <p className="text-sm text-black/60">{item.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div
            ref={projectsSectionRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="max-w-7xl mx-auto px-8 py-24">
              <div className="text-center mb-16">
                <span className="text-orange-500 font-medium text-sm tracking-wider uppercase mb-4 block">
                  Portfolio
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                  Featured Projects
                </h2>
              </div>

              <div className="flex flex-wrap justify-center gap-8">
                {isLoading ? (
                  <div className="w-full max-w-md">
                    <Card className="overflow-hidden bg-white border-black/20">
                      <Skeleton className="aspect-video" />
                      <div className="p-6">
                        <Skeleton className="h-5 w-20 mb-3" />
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-4" />
                        <div className="flex gap-2">
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-6 w-16" />
                        </div>
                      </div>
                    </Card>
                  </div>
                ) : projects && projects.length > 0 ? (
                  projects.map((project) => (
                    <div key={project.id} className="w-full max-w-md">
                      <Card className="group overflow-hidden bg-white border-black/20">
                        <div className="relative aspect-video overflow-hidden rounded-t-md">
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20" />
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {project.liveUrl && (
                              <Button size="sm" className="bg-orange-500 hover:bg-orange-600" asChild>
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Live Demo
                                </a>
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button size="sm" variant="secondary" asChild>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="w-4 h-4 mr-2" />
                                  Code
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2 text-black">{project.title}</h3>
                          <p className="text-black/70 text-sm mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs px-2 py-1 rounded-md bg-black/5 text-black"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <Folder className="w-16 h-16 mx-auto text-black/30 mb-4" />
                    <p className="text-black/60">No projects yet. Check back soon!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div
            ref={skillsSectionRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="max-w-6xl mx-auto px-8 py-24">
              <div className="text-center mb-16">
                <span className="text-orange-500 font-medium text-sm tracking-wider uppercase mb-4 block">
                  Expertise
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                  Skills & Technologies
                </h2>
                <p className="text-black/60 text-lg max-w-2xl mx-auto">
                  The technologies and tools I use to bring ideas to life.
                </p>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-6 md:gap-8">
                {[...technologies, ...skills].map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className="group flex flex-col items-center gap-3"
                    >
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center">
                        <Icon
                          className="w-8 h-8 md:w-10 md:h-10"
                          style={{ color: tech.color }}
                        />
                      </div>
                      <span className="text-xs md:text-sm text-black/60 text-center font-medium group-hover:text-black transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div
            ref={contactSectionRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="max-w-2xl mx-auto px-8 py-24">
              <div className="text-center mb-12">
                <span className="text-orange-500 font-medium text-sm tracking-wider uppercase mb-4 block">
                  Get in Touch
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                  Let's Connect
                </h2>
                <p className="text-black/60 text-lg">
                  Have a question or want to work together? Drop me a message.
                </p>
              </div>

              <Card className="p-8 bg-white border-black/20">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel className="text-black">Name <span className="text-orange-500">*</span></FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                className={`bg-white border-black/20 text-black placeholder:text-black/40 ${fieldState.error ? "border-orange-500 focus-visible:ring-orange-500" : ""}`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel className="text-black">Email <span className="text-orange-500">*</span></FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                className={`bg-white border-black/20 text-black placeholder:text-black/40 ${fieldState.error ? "border-orange-500 focus-visible:ring-orange-500" : ""}`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">Phone</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Your phone number"
                              className="bg-white border-black/20 text-black placeholder:text-black/40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel className="text-black">Message <span className="text-orange-500">*</span></FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message..."
                              className={`min-h-[150px] resize-none bg-white border-black/20 text-black placeholder:text-black/40 ${fieldState.error ? "border-orange-500 focus-visible:ring-orange-500" : ""}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white"
                      disabled={sendMessage.isPending}
                    >
                      {sendMessage.isPending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      {sendMessage.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
