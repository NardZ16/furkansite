import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TextReveal } from './ui/TextReveal';
import { useData } from '../context/DataContext';

function ProjectCard({ project, index, scrollYProgress, isDesktop }) {
  // Orijinal yelpaze efekti (Yukarıdan ve sağdan gelme)
  const fanConfig = [
    { yOffset: "-100vh", xOffset: "200%", rot: "-12deg", scale: 1.1 },
    { yOffset: "-110vh", xOffset: "100%", rot: "2deg", scale: 1.15 },
    { yOffset: "-105vh", xOffset: "0%", rot: "16deg", scale: 1.2 },
  ];
  const config = fanConfig[index % 3];

  // Sadece masaüstünde animasyon çalışsın, mobilde her şey 0'da (sabit) kalsın.
  const y = useTransform(scrollYProgress, [0, 1], [isDesktop ? config.yOffset : "0vh", "0vh"]);
  const x = useTransform(scrollYProgress, [0, 1], [isDesktop ? config.xOffset : "0%", "0%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [isDesktop ? config.rot : "0deg", "0deg"]);
  const scale = useTransform(scrollYProgress, [0, 1], [isDesktop ? config.scale : 1, 1]);
  const zIndex = 30 - (index % 3) * 10;

  return (
    <div className="flex flex-col gap-3 xl:gap-4 2xl:gap-5 relative">
      <motion.div style={{ y, x, rotate, scale, zIndex }} className="aspect-4/3 rounded-3xl shadow-lg relative card p-2 xl:p-3 2xl:p-4 group will-change-transform origin-center">
        <div className="w-full h-full aspect-4/3 rounded-[1rem] overflow-hidden relative">
          <img alt={project.title} className="min-h-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={project.image} />
          {project.tag && (
            <span className="absolute bottom-2 left-2 xl:bottom-3 xl:left-3 2xl:bottom-4 2xl:left-4 px-3 py-1.5 text-xs font-medium text-primary-cta-text rounded-full backdrop-blur-xl bg-primary-cta-text/15 border border-primary-cta-text/20">
              {project.tag}
            </span>
          )}
        </div>
      </motion.div>
      <p className="text-base md:text-lg lg:text-xl leading-snug mt-2 relative z-40 drop-shadow-md">
        <span className="font-semibold text-foreground">{project.title} </span>
        <span className="text-foreground/50">{project.description}</span>
      </p>
    </div>
  );
}

export function Work() {
  const { data } = useData();
  const containerRef = useRef(null);
  
  // Yerel scroll yüzdesini hesaplar: 
  // Animasyon bileşenin üst kısmı ekrana girdiğinde başlar, ortası ekranın ortasına geldiğinde oturur.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
  const projects = data.work?.projects || [];

  return (
    <section id="work" data-section="work" className="py-20 md:pt-0" ref={containerRef}>
      <div className="flex flex-col gap-8 w-content-width mx-auto">
        <div className="flex flex-col items-center gap-2">
          <div className="px-3 py-1 mb-1 text-sm card rounded-full w-fit">
            <p>Seçme İşler</p>
          </div>
          <TextReveal as="h2" className="transition-all duration-700 md:max-w-8/10 text-5xl 2xl:text-6xl leading-[1.15] font-semibold text-center text-balance">
            Öne Çıkan Çalışmalar.
          </TextReveal>
          <TextReveal as="p" className="transition-all duration-700 md:max-w-[70%] text-base md:text-lg leading-snug text-center text-balance">
            Markanızın dijital varlığını güçlendiren, hedef kitleyle doğrudan bağ kuran özel prodüksiyon projeleri.
          </TextReveal>
        </div>
        
        <div className="grid md:grid-cols-3 gap-5 mt-10 z-20 relative">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index} 
              scrollYProgress={scrollYProgress}
              isDesktop={isDesktop}
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <Link to="/projects" className="group flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full secondary-button text-secondary-cta-text transition-all duration-300">
            <span>Tüm projelerimi incele</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
