import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function ParallaxSection({ children, offset = 50 }: { children: React.ReactNode; offset?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  
  return (
    <div ref={ref} className="relative">
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

export default function HomeDefault() {
  return (
    <div className="min-h-screen bg-background">
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
      <Navigation />
      <main>
        <Hero />
        <ParallaxSection offset={30}>
          <About />
        </ParallaxSection>
        <ParallaxSection offset={20}>
          <Projects />
        </ParallaxSection>
        <ParallaxSection offset={25}>
          <Skills />
        </ParallaxSection>
        <ParallaxSection offset={15}>
          <Contact />
        </ParallaxSection>
      </main>
      <Footer />
    </div>
  );
}
