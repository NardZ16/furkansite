"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";

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
        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
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
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeCategory === "all"
              ? "bg-accent text-black"
              : "bg-surface border border-white/10 text-muted hover:border-accent hover:text-white"
          }`}
        >
          Tümü
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === cat.id
                ? "bg-accent text-black"
                : "bg-surface border border-white/10 text-muted hover:border-accent hover:text-white"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedProject(project)}
              className="group relative block overflow-hidden rounded-xl bg-surface cursor-pointer"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                {project.coverImage ? (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   {project.mediaType === 'video' || project.mediaType === 'embed' ? (
                     <div className="bg-accent text-black p-4 rounded-full transform scale-50 group-hover:scale-100 transition-transform duration-500 ease-out shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                       <Play size={24} fill="currentColor" />
                     </div>
                   ) : (
                     <div className="bg-white/10 backdrop-blur-md text-white p-3 rounded-full transform scale-50 group-hover:scale-100 transition-transform duration-500 ease-out border border-white/20">
                       <span className="text-sm font-semibold tracking-wider">İncele</span>
                     </div>
                   )}
                </div>
              </div>

              <div className="p-6 border-t border-white/5">
                <span className="text-accent text-xs font-bold tracking-wider uppercase mb-2 block">
                  {project.category.name}
                </span>
                <h3 className="font-heading text-xl font-bold text-white mb-2 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-sm text-muted line-clamp-2 mb-4">
                  {project.description}
                </p>
                {project.clientName && (
                  <div className="text-xs text-muted font-medium bg-white/5 inline-block px-3 py-1 rounded-full">
                    Müşteri: {project.clientName}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-muted">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-4 md:p-6 border-b border-white/10">
                <span className="text-accent text-xs font-bold tracking-wider uppercase mb-1 block">
                  {selectedProject.category.name}
                </span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
                  {selectedProject.title}
                </h2>
                {selectedProject.clientName && (
                  <p className="text-muted text-sm mt-2">Müşteri: {selectedProject.clientName}</p>
                )}
              </div>

              {/* Media Content */}
              <div className="w-full bg-black relative aspect-video flex items-center justify-center">
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
                <div className="p-6 bg-surface text-white/80 leading-relaxed text-sm md:text-base border-t border-white/5">
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
