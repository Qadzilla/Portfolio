import { motion } from "framer-motion";
import { Code, Briefcase, GraduationCap, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

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

export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-secondary font-medium text-sm tracking-wider uppercase mb-4 block">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Building at the Intersection
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 h-full">
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
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
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            {highlights.map((item, index) => (
              <Card
                key={item.title}
                className="p-6 hover-elevate"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              </Card>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
