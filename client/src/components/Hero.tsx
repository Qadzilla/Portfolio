import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useMemo, useRef } from "react";
import Typewriter from "typewriter-effect";
import coolOrangutanImage from "@assets/ChatGPT_Image_Feb_2,_2026_at_03_05_01_AM_1770019534664.png";

function FloatingParticle({ delay, duration, startX, startY }: { delay: number; duration: number; startX: number; startY: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-primary/40"
      style={{ left: `${startX}%`, top: `${startY}%` }}
      animate={{
        y: [0, -100, 0],
        x: [0, Math.random() * 40 - 20, 0],
        opacity: [0, 0.6, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [orangutan, setOrangutan] = useState<{ id: number; x: number; y: number } | null>(null);
  const idRef = useRef(0);
  
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      startX: Math.random() * 100,
      startY: 50 + Math.random() * 50,
    }));
  }, []);

  const getRandomPosition = () => {
    if (!heroRef.current) return { x: 100, y: 100 };
    const rect = heroRef.current.getBoundingClientRect();
    const orangutanSize = 192;
    const margin = orangutanSize / 2;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const excludeWidth = 500;
    const excludeHeight = 350;
    
    let x: number, y: number;
    let attempts = 0;
    
    do {
      x = margin + Math.random() * (rect.width - margin * 2);
      y = margin + Math.random() * (rect.height - margin * 2);
      attempts++;
      
      const inExcludeZone = 
        x > centerX - excludeWidth / 2 && 
        x < centerX + excludeWidth / 2 && 
        y > centerY - excludeHeight / 2 && 
        y < centerY + excludeHeight / 2;
      
      if (!inExcludeZone) break;
    } while (attempts < 50);
    
    return { x, y };
  };

  const spawnOrangutan = () => {
    const pos = getRandomPosition();
    setOrangutan({ id: idRef.current++, x: pos.x, y: pos.y });
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHeroClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('[data-orangutan]')) {
      return;
    }
    if (!orangutan) {
      spawnOrangutan();
    }
  };

  const handleOrangutanClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    spawnOrangutan();
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-pointer"
      onClick={handleHeroClick}
    >
      <AnimatePresence>
        {orangutan && (
          <motion.img
            key={orangutan.id}
            data-orangutan
            src={coolOrangutanImage}
            alt="Cool orangutan with sunglasses"
            className="absolute z-50 w-32 h-32 md:w-48 md:h-48 object-contain cursor-pointer -translate-x-1/2 -translate-y-1/2"
            style={{ 
              left: orangutan.x, 
              top: orangutan.y,
            }}
            onClick={handleOrangutanClick}
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          />
        )}
      </AnimatePresence>
      {/* Solid background */}
      <div className="absolute inset-0 bg-background" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-10 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="block">
            Hello, I'm{" "}
            <span className="bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
              Zaid
            </span>
            .
          </span>
          <span className="block text-xl md:text-2xl text-muted-foreground font-normal mt-4" style={{ wordSpacing: '0.25em' }}>
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

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button 
            size="lg"
            variant="outline"
            className="border-2 hover:border-primary hover:scale-105 transition-all"
            onClick={scrollToProjects}
            data-testid="button-view-work"
          >
            View My Work
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 hover:border-primary hover:scale-105 transition-all"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="button-get-in-touch"
          >
            Get in Touch
          </Button>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="https://github.com/Qadzilla"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-card/80 backdrop-blur-sm border-2 border-border hover:border-primary hover:scale-110 transition-all hover-elevate"
            aria-label="View GitHub profile"
            data-testid="link-github"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/zaid-al-qadi-8a1a4826b/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-card/80 backdrop-blur-sm border-2 border-border hover:border-primary hover:scale-110 transition-all hover-elevate"
            aria-label="View LinkedIn profile"
            data-testid="link-linkedin"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ 
          opacity: { duration: 0.6, delay: 0.5 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
