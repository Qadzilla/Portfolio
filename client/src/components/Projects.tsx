import { motion } from "framer-motion";
import { ExternalLink, Github, Folder } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { Project } from "@shared/schema";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden" data-testid={`card-project-${project.id}`}>
          <div className="relative aspect-video overflow-hidden rounded-t-md">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
              {project.liveUrl && (
                <Button size="sm" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-project-live-${project.id}`}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button size="sm" variant="secondary" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-project-github-${project.id}`}>
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>
                </Button>
              )}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-md bg-muted/80 backdrop-blur-sm text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Card>
    </motion.div>
  );
}

function ProjectSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video" />
      <div className="p-6">
        <Skeleton className="h-5 w-20 mb-3" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </Card>
  );
}

export function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  return (
    <section id="projects" className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-secondary font-medium text-sm tracking-wider uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Featured Projects
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {isLoading ? (
            <>
              <div className="w-full max-w-md">
                <ProjectSkeleton />
              </div>
            </>
          ) : projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <div key={project.id} className="w-full max-w-md">
                <ProjectCard project={project} index={index} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <Folder className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No projects yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
