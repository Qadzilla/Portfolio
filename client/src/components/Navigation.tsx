import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useView } from "@/components/ViewProvider";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { currentView, setView } = useView();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Check if user is at the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }
      
      // Track active section - find section most visible in viewport
      const sections = navLinks.map(link => link.href.replace("#", ""));
      const viewportHeight = window.innerHeight;
      let bestSection = "";
      let bestVisibility = 0;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(viewportHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          
          if (visibleHeight > bestVisibility) {
            bestVisibility = visibleHeight;
            bestSection = section;
          }
        }
      }
      setActiveSection(bestSection);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border/50"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="px-4 py-2 flex items-center">
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1.5 text-sm font-semibold rounded-md cursor-pointer bg-primary text-primary-foreground"
              onClick={() => {
                setView("default");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Switch to Basic view"
              data-testid="button-view-basic"
            >
              Basic
            </button>

            <button
              className="px-3 py-1.5 text-sm font-semibold rounded-md cursor-pointer text-muted-foreground hover:text-foreground"
              onClick={() => {
                setView("artsy");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Switch to Immersive view"
              data-testid="button-view-immersive"
            >
              Immersive
            </button>

            <button
              className="px-3 py-1.5 text-sm font-semibold rounded-md cursor-pointer text-muted-foreground hover:text-foreground"
              onClick={() => {
                setView("brutalist");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Switch to Brutalist view"
              data-testid="button-view-brutalist"
            >
              Brutalist
            </button>
          </div>

          {/* Centered nav content */}
          <div className="flex-1 flex items-center justify-end">

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`px-4 py-2 text-lg font-medium transition-all rounded-md hover-elevate ${
                  activeSection === link.href.replace("#", "")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`link-nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              className="absolute top-20 left-6 right-6 bg-card border border-border rounded-md p-6 shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setView("artsy");
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-4 py-3 text-left font-medium rounded-md transition-all text-muted-foreground hover:text-foreground hover:bg-muted"
                  aria-label="Switch to Immersive view"
                  data-testid="button-mobile-view-immersive"
                >
                  Immersive View
                </button>
                <button
                  onClick={() => {
                    setView("brutalist");
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-4 py-3 text-left font-medium rounded-md transition-all text-muted-foreground hover:text-foreground hover:bg-muted"
                  aria-label="Switch to Brutalist view"
                  data-testid="button-mobile-view-brutalist"
                >
                  Brutalist View
                </button>
                <div className="border-b border-border/50 my-2" />
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className={`px-4 py-3 text-left font-medium rounded-md transition-all ${
                      activeSection === link.href.replace("#", "")
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    data-testid={`link-mobile-nav-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
