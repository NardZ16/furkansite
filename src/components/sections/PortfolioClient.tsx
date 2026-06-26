"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, X } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

type Category = { id: string; name: string };
type Project = {
  id: string;
  title: string;
  description: string;
  coverImage: string | null;
  mediaUrl: string | null;
  mediaType: string;
  clientName: string | null;
  categoryId: string;
  category: Category;
};

export default function PortfolioClient({
  projects,
  categories,
}: {
  projects: Project[];
  categories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.categoryId === activeCategory);

  function getEmbedUrl(url: string | null) {
    if (!url) return "";
    
    // YouTube
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
    }
    
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }
    
    return url;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase block mb-4">Neler Yaptım</span>
        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-foreground">
          PORTFOLYO
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Şimdiye kadar hayata geçirdiğim projelerden seçkiler. Hava çekimlerinden, kurumsal videolara ve grafik tasarım işlerine kadar.
        </p>
      </motion.div>

      {/* Filter Categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 mb-16"
      >
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-6 py-2.5 rounded-full text-[13px] font-bold tracking-wider uppercase transition-all duration-300 ${
            activeCategory === "all"
              ? "bg-accent text-white shadow-md shadow-accent/20"
              : "bg-surface border border-muted/20 text-muted hover:border-accent hover:text-accent shadow-sm"
          }`}
        >
          Tümü
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-2.5 rounded-full text-[13px] font-bold tracking-wider uppercase transition-all duration-300 ${
              activeCategory === cat.id
                ? "bg-accent text-white shadow-md shadow-accent/20"
                : "bg-surface border border-muted/20 text-muted hover:border-accent hover:text-accent shadow-sm"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", duration: 0.6, delay: (index % 3) * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="h-full"
            >
              <TiltCard className="h-full cursor-pointer">
                <div className="group relative h-full flex flex-col bg-surface rounded-3xl overflow-hidden border border-muted/10 card-hover-light">
                  <div className="aspect-[4/3] relative overflow-hidden m-2 rounded-2xl">
                    {project.coverImage ? (
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted/10" />
                    )}
                    <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                       {project.mediaType === 'video' || project.mediaType === 'embed' ? (
                         <div className="bg-surface text-accent p-4 rounded-full shadow-xl transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                           <Play size={24} className="ml-1" fill="currentColor" />
                         </div>
                       ) : (
                         <div className="bg-surface text-accent px-5 py-3 rounded-full shadow-xl transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 font-bold uppercase tracking-wider text-xs">
                           İncele
                         </div>
                       )}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-accent text-[10px] font-bold tracking-[0.15em] uppercase mb-2 block">
                      {project.category.name}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-3 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-[14px] text-muted line-clamp-2">
                      {project.description}
                    </p>
                    {project.clientName && (
                      <div className="mt-4 text-[11px] text-muted font-bold tracking-wider uppercase bg-background inline-block px-3 py-1.5 rounded-lg border border-muted/10 w-max">
                        Müşteri: {project.clientName}
                      </div>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-muted font-medium">
          Bu kategoride henüz proje bulunmuyor.
        </div>
      )}

      {/* Video / Image Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8"
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-white hover:text-accent bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all backdrop-blur-sm"
            >
              <X size={24} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-surface border border-muted/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-muted/10 bg-background/50">
                <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-2 block">
                  {selectedProject.category.name}
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  {selectedProject.title}
                </h2>
                {selectedProject.clientName && (
                  <p className="text-muted text-[13px] font-bold tracking-wider uppercase mt-3">Müşteri: {selectedProject.clientName}</p>
                )}
              </div>

              {/* Media Content */}
              <div className="w-full bg-black relative aspect-video flex items-center justify-center border-b border-muted/10">
                {(selectedProject.mediaType === 'video' || selectedProject.mediaType === 'embed') && selectedProject.mediaUrl ? (
                  <iframe
                    src={getEmbedUrl(selectedProject.mediaUrl)}
                    className="w-full h-full absolute inset-0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="relative w-full h-full min-h-[300px]">
                    <Image
                      src={selectedProject.coverImage || "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=2070"}
                      alt={selectedProject.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              {selectedProject.description && (
                <div className="p-6 md:p-8 bg-surface text-foreground/80 leading-relaxed text-sm md:text-base">
                  {selectedProject.description}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
