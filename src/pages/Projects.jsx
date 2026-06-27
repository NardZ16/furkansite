import React, { useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { MediaRenderer } from '../components/MediaRenderer';
import { Footer } from '../components/Footer';

export function Projects() {
  const { data, loading } = useData();

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

      {/* Header/Navbar specifically for Projects Page */}
      <header className="fixed z-50 top-5 left-1/2 -translate-x-1/2 w-[90%] md:w-full max-w-6xl flex justify-between items-center bg-[#1a1a1a]/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/5 shadow-xl">
        <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Ana Sayfaya Dön</span>
        </Link>
        <span className="font-semibold text-lg tracking-tight">Tüm Projeler Galerisi</span>
        <div className="w-20 hidden md:block"></div> {/* spacer to center title */}
      </header>

      <main className="flex-1 pt-32 pb-20 px-4 md:px-10">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {projects.length === 0 && (
            <div className="text-center text-gray-500 py-20">
              Henüz bir proje eklenmemiş. Lütfen Admin panelinden proje ekleyin.
            </div>
          )}

          {projects.map((project, index) => (
            <motion.div 
              key={project.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-8"
            >
              {/* Project Info */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">{project.title}</h2>
                  <div className="h-px bg-white/10 flex-1 mt-2"></div>
                </div>
                {project.description && (
                  <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed">
                    {project.description}
                  </p>
                )}
              </div>

              {/* Media Grid */}
              {project.media && project.media.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {project.media.map((item, mIndex) => (
                    <motion.div 
                      key={mIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: mIndex * 0.1 }}
                      className={`
                        ${item.type === 'video' ? 'md:col-span-2 xl:col-span-2 aspect-video' : 'aspect-[4/3]'}
                      `}
                    >
                      <MediaRenderer media={item} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
