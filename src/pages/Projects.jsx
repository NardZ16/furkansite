import React, { useEffect, useState } from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CarouselModal } from '../components/CarouselModal';
import { Footer } from '../components/Footer';

export function Projects() {
  const { data, loading } = useData();
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#111] text-white flex items-center justify-center">Yükleniyor...</div>;
  }

  const projects = data.allProjects || [];

  return (
    <div className="relative min-h-screen font-sans bg-[#111] text-white flex flex-col">
      {/* Background Radial */}
      <div 
        className="fixed inset-0 -z-10 pointer-events-none select-none" 
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(100% 100% at top right, rgba(255,255,255,0.02) 0%, transparent 70%),
            radial-gradient(100% 100% at bottom left, rgba(255,255,255,0.02) 0%, transparent 70%),
            #111
          `
        }}
      ></div>

      {/* Header/Navbar */}
      <header className="fixed z-50 top-5 left-1/2 -translate-x-1/2 w-[90%] md:w-full max-w-6xl flex justify-between items-center bg-[#1a1a1a]/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/5 shadow-xl">
        <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Ana Sayfaya Dön</span>
        </Link>
        <span className="font-semibold text-lg tracking-tight">Tüm Projeler</span>
        <div className="w-20 hidden md:block"></div> {/* spacer */}
      </header>

      <main className="flex-1 pt-32 pb-20 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          
          {projects.length === 0 && (
            <div className="text-center text-gray-500 py-20">
              Henüz bir proje eklenmemiş. Lütfen Admin panelinden proje ekleyin.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div 
                key={project.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer flex flex-col gap-4 w-full max-w-[320px] mx-auto sm:max-w-[380px] md:max-w-none"
              >
                {/* Cover Image */}
                <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden bg-[#1a1a1a] border border-white/5 relative shadow-lg">
                  {project.coverImage ? (
                    <img 
                      src={project.coverImage} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                      <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                      <span className="text-sm font-medium">Kapak Görseli Yok</span>
                    </div>
                  )}
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-6 py-3 bg-white text-black font-semibold rounded-full text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Galeriyi Görüntüle
                    </span>
                  </div>

                  {/* Media Count Badge */}
                  {project.media && project.media.length > 0 && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/10">
                      {project.media.length} İçerik
                    </div>
                  )}
                </div>

                {/* Info */}
                <div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-gray-300 transition-colors">
                    {project.title}
                  </h2>
                  {project.description && (
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </main>

      <Footer />

      {/* Carousel Modal */}
      {selectedProject && (
        <CarouselModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}
