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

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.categoryId === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
                     <div className="bg-accent text-black p-4 rounded-full transform scale-50 group-hover:scale-100 transition-transform duration-500 ease-out">
                       <Play size={24} fill="currentColor" />
                     </div>
                   ) : null}
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
    </div>
  );
}
