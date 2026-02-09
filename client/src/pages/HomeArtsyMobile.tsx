import { motion } from "framer-motion";
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
  SiAnthropic,
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

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

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
        <div className="flex items-center gap-1 bg-white/40 backdrop-blur-xl rounded-full p-1 border border-white/60 shadow-sm">
          <button
            className="px-3 py-1.5 text-sm font-semibold rounded cursor-pointer text-black/40 hover:text-black/70 transition-all"
            onClick={() => {
              setView("default");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Switch to Basic view"
          >
            Basic
          </button>
          <button
            className="px-3 py-1.5 text-sm font-semibold rounded-full cursor-pointer text-orange-500 bg-white/60 transition-all"
            onClick={() => {
              setView("artsy");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Switch to Immersive view"
          >
            Immersive
          </button>
          <button
            className="px-3 py-1.5 text-sm font-semibold rounded cursor-pointer text-black/40 hover:text-black/70 transition-all"
            onClick={() => {
              setView("brutalist");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Switch to Brutalist view"
          >
            Brutalist
          </button>
        </div>
      </nav>
    </motion.header>
  );
}

export default function HomeArtsyMobile() {
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

  return (
    <div className="bg-white text-black min-h-screen">
      <MinimalHeader />
      <style>{`
        .artsy-mobile-dot-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px);
          background-size: 18px 18px;
        }
        .glow-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(80px);
        }
        .glow-orb-1 {
          width: 60vw;
          height: 60vw;
          top: -5%;
          left: -15%;
          background: radial-gradient(circle, rgba(200,210,230,0.4) 0%, transparent 70%);
          opacity: 0.4;
        }
        .glow-orb-2 {
          width: 50vw;
          height: 50vw;
          top: 40%;
          right: -20%;
          background: radial-gradient(circle, rgba(220,200,240,0.3) 0%, transparent 70%);
          opacity: 0.35;
        }
        .glow-orb-3 {
          width: 45vw;
          height: 45vw;
          bottom: 10%;
          left: 20%;
          background: radial-gradient(circle, rgba(180,220,220,0.3) 0%, transparent 70%);
          opacity: 0.3;
        }
      `}</style>

      {/* Static background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="artsy-mobile-dot-grid" />
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        <div className="glow-orb glow-orb-3" />
      </div>

      <main className="relative z-10 pt-16">
        {/* Hero Section */}
        <section className="min-h-[70vh] flex items-center justify-center px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl font-bold mb-6 tracking-tight">
              <span className="block">
                Hello, I'm{" "}
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Zaid
                </span>
                .
              </span>
              <span className="block text-lg text-black/60 font-normal mt-3">
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
            </h1>
          </motion.div>
        </section>

        {/* About Section */}
        <motion.section
          className="px-4 py-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="text-center mb-8">
            <span className="text-orange-500 font-medium text-sm tracking-wider uppercase mb-3 block">
              About Me
            </span>
            <h2 className="text-3xl font-bold mb-4 text-black">
              Building at the Intersection
            </h2>
          </div>

          <Card className="p-5 mb-4 bg-white border-black/20">
            <h3 className="text-xl font-semibold mb-3 text-black">My Journey</h3>
            <div className="space-y-3 text-black/70 leading-relaxed text-sm">
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

          <div className="grid grid-cols-1 gap-3">
            {highlights.map((item) => (
              <Card
                key={item.title}
                className="p-4 bg-white border-black/20"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-orange-500/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1 text-black">{item.title}</h4>
                    <p className="text-xs text-black/60">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          className="px-4 py-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="text-center mb-8">
            <span className="text-orange-500 font-medium text-sm tracking-wider uppercase mb-3 block">
              Portfolio
            </span>
            <h2 className="text-3xl font-bold mb-4 text-black">
              Featured Projects
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {isLoading ? (
              <Card className="overflow-hidden bg-white border-black/20">
                <Skeleton className="aspect-video" />
                <div className="p-5">
                  <Skeleton className="h-5 w-20 mb-3" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </Card>
            ) : projects && projects.length > 0 ? (
              projects.map((project) => (
                <Card key={project.id} className="group overflow-hidden bg-white border-black/20">
                  <div className="relative aspect-video overflow-hidden rounded-t-md">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20" />
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2 text-black">{project.title}</h3>
                    <p className="text-black/70 text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded-md bg-black/5 text-black"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
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
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Folder className="w-12 h-12 mx-auto text-black/30 mb-4" />
                <p className="text-black/60">No projects yet. Check back soon!</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          className="px-4 py-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="text-center mb-8">
            <span className="text-orange-500 font-medium text-sm tracking-wider uppercase mb-3 block">
              Expertise
            </span>
            <h2 className="text-3xl font-bold mb-4 text-black">
              Skills & Technologies
            </h2>
            <p className="text-black/60 text-sm">
              The technologies and tools I use to bring ideas to life.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[...technologies, ...skills].map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-black/10 flex items-center justify-center">
                    <Icon
                      className="w-6 h-6"
                      style={{ color: tech.color }}
                    />
                  </div>
                  <span className="text-[10px] text-black/60 text-center font-medium">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="px-4 py-12 pb-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="text-center mb-8">
            <span className="text-orange-500 font-medium text-sm tracking-wider uppercase mb-3 block">
              Get in Touch
            </span>
            <h2 className="text-3xl font-bold mb-4 text-black">
              Let's Connect
            </h2>
            <p className="text-black/60 text-sm">
              Have a question or want to work together? Drop me a message.
            </p>
          </div>

          <Card className="p-4 bg-white border-black/20">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                          className={`min-h-[120px] resize-none bg-white border-black/20 text-black placeholder:text-black/40 ${fieldState.error ? "border-orange-500 focus-visible:ring-orange-500" : ""}`}
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
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
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
        </motion.section>
      </main>
    </div>
  );
}
