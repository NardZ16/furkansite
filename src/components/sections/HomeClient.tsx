"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, Play } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import TiltCard from "@/components/ui/TiltCard";

type Project = { id: string; title: string; description: string; coverImage: string | null; category: { name: string }; };
type Experience = { id: string; title: string; company: string; date: string; description: string; };
type Skill = { id: string; iconName: string; title: string; description: string; };
type SiteSettings = { heroTitle: string; heroSubtitle: string; aboutText1: string; aboutText2: string; licenseTitle: string; licenseDesc: string; heroImage: string; } | null;
type HomeClientProps = {
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  settings: SiteSettings;
};

// ─── Animated Counter Component ──────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return <div ref={ref}>{count}{suffix}</div>;
}

export default function HomeClient({ projects, experiences, skills, settings }: HomeClientProps) {
  const s = {
    heroTitle: "Dikkat çeken tasarımlar.",
    heroSubtitle: "Sadece estetik değil, performans odaklı tasarımlar. Markanızın dikkat çekmesi ve gelir elde etmesi için gereken her görsel dokunuşu özenle işliyorum.",
    aboutText1: settings?.aboutText1 || "Çekimden kurguya kadar tüm süreci tek başına yürütebilen, yaratıcı ve teknik yetkinliklere sahip bir görüntü yönetmeniyim.",
    aboutText2: settings?.aboutText2 || "Konsept geliştirme, çekim, yönetmenlik ve post-prodüksiyon aşamalarını uçtan uca bizzat üstleniyorum.",
    licenseTitle: settings?.licenseTitle || "Ticari İHA-1 Pilot Lisansı",
    licenseDesc: settings?.licenseDesc || "Profesyonel Drone ve Hava Çekimi Yetkisi"
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const cards = [
    { id: 2, rotate: 12, x: 40, y: -20, delay: 0.8, zIndex: 10, project: projects[2], img: projects[2]?.coverImage || "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=2070" },
    { id: 1, rotate: 4, x: 20, y: -10, delay: 1.0, zIndex: 20, project: projects[1], img: projects[1]?.coverImage || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070" },
    { id: 0, rotate: -4, x: 0, y: 0, delay: 1.2, zIndex: 30, project: projects[0], img: projects[0]?.coverImage || settings?.heroImage || "https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=2070" },
  ];

  return (
    <div className="w-full relative">
      
      {/* ══════════════════════════════════════════════
          HERO — Webild Replica (Normal Scroll)
         ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen w-full flex items-center pt-32 pb-12 z-10">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left: Typography & Intro */}
          <motion.div className="pt-10 lg:pt-0 max-w-lg z-20">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              
              {/* Availability Badge */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 mb-8 backdrop-blur-sm shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[12px] font-medium tracking-wide text-foreground/80">Bu ay için 1 boşluk</span>
              </motion.div>
              
              {/* Heading */}
              <motion.h1 variants={itemVariants} className="font-sans text-[clamp(3.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-[#111827] mb-6">
                {s.heroTitle.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p variants={itemVariants} className="text-[16px] md:text-[18px] text-[#4B5563] font-medium mb-10 leading-relaxed max-w-md">
                {s.heroSubtitle}
              </motion.p>

              {/* CTA Button */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
                <Link href="/contact" className="group flex items-center gap-4 bg-[#2A2A2A] text-white rounded-full pr-7 pl-1.5 py-1.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#3A3A3A]">
                    <Image 
                      src="https://i.hizliresim.com/j122le7.jpg" 
                      alt="Avatar" 
                      width={40} 
                      height={40} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="font-semibold text-[14px]">Benimle iletişime geç</span>
                </Link>
              </motion.div>

            </motion.div>
          </motion.div>

          {/* Right: Fanned Out Cards */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full mt-12 lg:mt-0 perspective-1000 z-10">
            <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[10vw]">
              
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: 100, y: card.y + 50, rotate: 0, scale: 0.8 }}
                  animate={{ opacity: 1, x: card.x, y: card.y, rotate: card.rotate, scale: 1 }}
                  transition={{ duration: 1.2, delay: card.delay, type: "spring", stiffness: 100, damping: 20 }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: card.rotate * 1.5,
                    y: card.y - 10,
                    transition: { duration: 0.4 } 
                  }}
                  style={{ zIndex: card.zIndex }}
                  className="absolute w-[260px] sm:w-[320px] lg:w-[380px] aspect-[4/3] rounded-3xl bg-white border-[8px] sm:border-[12px] border-white shadow-2xl overflow-hidden cursor-pointer"
                >
                  <Image
                    src={card.img}
                    alt={`Portfolio ${card.id}`}
                    fill
                    className="object-cover"
                    priority={index === 2}
                  />
                  <div className="absolute inset-0 bg-black/5 rounded-[1.2rem]"></div>
                </motion.div>
              ))}

            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED PROJECTS — Clean Cards
         ══════════════════════════════════════════════ */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10 border-t border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-[#111827] text-[11px] font-bold tracking-[0.2em] uppercase block mb-4">Seçme İşler</span>
          <h2 className="font-sans text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">Öne Çıkan Çalışmalar.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", duration: 0.8, delay: index * 0.15 }}
              className="h-full"
            >
              <TiltCard className="h-full">
                <div className="group relative h-full flex flex-col bg-white rounded-[2rem] overflow-hidden border border-gray-100 card-hover-light shadow-xl shadow-black/[0.04]">
                  <div className="aspect-[4/3] relative overflow-hidden m-3 rounded-2xl">
                    {project.coverImage ? (
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100" />
                    )}
                    {/* Hover Overlay with Icon */}
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                       <div className="bg-[#111827] text-white p-4 rounded-full shadow-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                         <Play size={20} className="ml-1" fill="currentColor" />
                       </div>
                    </div>
                  </div>
                  
                  <div className="p-7 flex-1 flex flex-col">
                    <span className="text-[#6B7280] text-[10px] font-bold tracking-[0.15em] uppercase mb-3 block">
                      {project.category.name}
                    </span>
                    <h3 className="font-sans text-xl font-bold text-[#111827] mb-3 line-clamp-1 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-[14px] text-[#4B5563] line-clamp-2 font-medium">
                      {project.description}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/portfolio" className="inline-flex items-center px-8 py-4 bg-white border border-gray-200 text-[13px] font-bold tracking-[0.05em] text-[#111827] rounded-full hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300">
            Tüm Portfolyoyu İncele <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ABOUT — Stats & Bio
         ══════════════════════════════════════════════ */}
      <section className="relative py-32 z-10 bg-transparent border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left — Bio Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#111827] text-[11px] font-bold tracking-[0.2em] uppercase block mb-4 relative pl-8 before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-5 before:h-px before:bg-[#111827]">
                Hakkımda
              </span>
              <h2 className="font-sans text-4xl md:text-5xl font-bold leading-tight mb-8 text-[#111827] tracking-tight">
                Görüntüleri <span className="text-[#6B7280]">Hikayeye</span><br />Dönüştürüyorum.
              </h2>
              <div className="space-y-5 text-[#4B5563] text-[16px] leading-relaxed font-medium">
                <p>{s.aboutText1}</p>
                <p>{s.aboutText2}</p>
              </div>
            </motion.div>

            {/* Right — Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: 5, suffix: "+", label: "Yıl Deneyim" },
                  { number: 50, suffix: "+", label: "Tamamlanan Proje" },
                  { number: 30, suffix: "+", label: "Mutlu Müşteri" },
                  { number: 1, suffix: "", label: "İHA-1 Lisans" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", duration: 0.6, delay: 0.1 * i }}
                    className="p-8 rounded-[2rem] bg-white/70 backdrop-blur-md border border-gray-100 card-hover-light text-center shadow-xl shadow-black/[0.02]"
                  >
                    <div className="font-sans text-5xl md:text-6xl font-bold text-[#111827] mb-2 tracking-tighter">
                      <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                    </div>
                    <p className="text-[#6B7280] text-[12px] tracking-[0.1em] uppercase font-bold">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SKILLS / EXPERTISE — Clean Icons
         ══════════════════════════════════════════════ */}
      <section className="py-32 relative z-10 bg-white/50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-[#111827] text-[11px] font-bold tracking-[0.2em] uppercase block mb-4">Ne Yapıyorum</span>
            <h2 className="font-sans text-4xl md:text-5xl font-bold mb-5 text-[#111827] tracking-tight">Uzmanlık Alanlarım.</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => {
              const IconComponent = (LucideIcons as any)[skill.iconName] || CheckCircle;
              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ type: "spring", duration: 0.8, delay: index * 0.1 }}
                >
                  <TiltCard>
                    <div className="p-8 rounded-[2rem] bg-white border border-gray-100 card-hover-light h-full flex flex-col items-center text-center group shadow-xl shadow-black/[0.02]">
                      <div className="w-16 h-16 rounded-2xl bg-gray-50 text-[#111827] flex items-center justify-center mb-6 transform group-hover:-translate-y-2 group-hover:bg-[#111827] group-hover:text-white transition-all duration-300 shadow-sm border border-gray-100">
                        <IconComponent size={28} strokeWidth={2} />
                      </div>
                      <h3 className="font-sans text-lg font-bold mb-3 tracking-tight text-[#111827]">{skill.title}</h3>
                      <p className="text-[#4B5563] text-[14px] leading-relaxed font-medium">{skill.description}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
