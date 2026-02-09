import { motion } from "framer-motion";
import { MapPin, Github, Linkedin } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/Qadzilla", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/zaid-al-qadi-8a1a4826b/", label: "LinkedIn" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Boston, MA</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md bg-card border border-border flex items-center justify-center hover-elevate transition-colors"
                aria-label={`Visit ${link.label}`}
                data-testid={`link-footer-${link.label.toLowerCase()}`}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-foreground transition-colors"
              data-testid="link-footer-about"
            >
              About
            </button>
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-foreground transition-colors"
              data-testid="link-footer-projects"
            >
              Projects
            </button>
            <button
              onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-foreground transition-colors"
              data-testid="link-footer-skills"
            >
              Skills
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-foreground transition-colors"
              data-testid="link-footer-contact"
            >
              Contact
            </button>
          </nav>

          <div className="text-muted-foreground text-sm">
            © {currentYear} Zaid Al-Qadi
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
