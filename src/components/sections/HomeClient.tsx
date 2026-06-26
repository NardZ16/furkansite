"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Plane, CheckCircle, ArrowDown, Play } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

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

import TiltCard from "@/components/ui/TiltCard";

export default function HomeClient({ projects, experiences, skills, settings }: HomeClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  const s = {
    heroTitle: settings?.heroTitle || "BEN KİMİM?",
    heroSubtitle: settings?.heroSubtitle || "Videographer • Grafik Tasarım • Drone Pilotu",
    aboutText1: settings?.aboutText1 || "Çekimden kurguya kadar tüm süreci tek başına yürütebilen, yaratıcı ve teknik yetkinliklere sahip bir görüntü yönetmeniyim.",
    aboutText2: settings?.aboutText2 || "Konsept geliştirme, çekim, yönetmenlik ve post-prodüksiyon aşamalarını uçtan uca bizzat üstleniyorum.",
    licenseTitle: settings?.licenseTitle || "Ticari İHA-1 Pilot Lisansı",
    licenseDesc: settings?.licenseDesc || "Profesyonel Drone ve Hava Çekimi Yetkisi"
  };

  // Stagger animation configs
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.8 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  // Handwriting text animation
  const nameText = "Kocabaş";
  const nameVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: { opacity: 1, pathLength: 1, transition: { duration: 2, ease: "easeInOut" } }
  };

  return (
    <div className="w-full bg-background overflow-hidden relative">
      {/* Light Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-50 z-0 pointer-events-none" />

      {/* ══════════════════════════════════════════════
          HERO — Bright, Airy, Split Layout
         ══════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen w-full flex items-center pt-20 pb-12 z-10">
        
        {/* Floating Decorative Elements */}
        <motion.div className="absolute top-1/4 left-10 w-24 h-24 bg-accent/5 rounded-full blur-2xl animate-float pointer-events-none" />
        <motion.div className="absolute bottom-1/4 right-20 w-48 h-48 bg-accent-light/10 rounded-full blur-3xl animate-float-reverse pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Typography & Intro */}
          <motion.div style={{ opacity, y: y1 }} className="pt-10 lg:pt-0">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase">Freelance Müsait</span>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.1] tracking-tight text-foreground mb-2">
                FURKAN EFE
              </motion.h1>
              
              <motion.div variants={itemVariants} className="mb-6 relative">
                 {/* The Handwriting Font applied to the last name */}
                 <span className="font-handwriting text-[clamp(4rem,9vw,7rem)] leading-none text-accent drop-shadow-sm rotate-[-2deg] inline-block">
                   {nameText}
                 </span>
              </motion.div>
              
              <motion.p variants={itemVariants} className="text-[15px] md:text-[17px] text-muted font-medium mb-10 max-w-md leading-relaxed">
                {s.heroSubtitle}. {s.aboutText1.substring(0, 80)}...
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
                <Link
                  href="/portfolio"
                  className="px-8 py-4 bg-accent text-white text-[13px] font-bold tracking-[0.1em] uppercase rounded-xl shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-1 transition-all duration-300"
                >
                  Portfolyomu Gör
                </Link>
                <div className="flex items-center gap-4 ml-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface border border-muted/20 flex items-center justify-center text-foreground hover:text-accent hover:border-accent transition-colors shadow-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface border border-muted/20 flex items-center justify-center text-foreground hover:text-accent hover:border-accent transition-colors shadow-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Floating Hero Image */}
          <motion.div style={{ y: y2 }} className="relative h-[500px] lg:h-[650px] w-full hidden md:block">
            <TiltCard>
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-[8px] border-surface">
                <Image
                  src={settings?.heroImage || "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=2070&auto=format&fit=crop"}
                  alt="Furkan Efe Kocabaş"
                  fill
                  className="object-cover object-center"
                  priority
                />
                
                {/* Floating Badge on Image */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 1.5, bounce: 0.5 }}
                  className="absolute bottom-8 -left-8 md:-left-12 bg-surface p-4 rounded-2xl shadow-xl border border-muted/10 flex items-center gap-4 animate-float"
                >
                   <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                     <Plane size={24} />
                   </div>
                   <div>
                     <p className="text-[11px] text-muted font-bold tracking-wider uppercase">Lisanslı Pilot</p>
                     <p className="font-heading text-lg font-bold">İHA-1</p>
                   </div>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ABOUT — Stats & Bio (Light Version)
         ══════════════════════════════════════════════ */}
      <section className="relative py-32 z-10 bg-surface">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left — Bio Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase block mb-4 relative pl-8 before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-5 before:h-px before:bg-accent">
                Hakkımda
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-8 text-foreground">
                Görüntüleri <span className="text-accent font-handwriting text-5xl md:text-6xl px-2 font-normal">Hikayeye</span><br />Dönüştürüyorum
              </h2>
              <div className="space-y-5 text-muted text-[16px] leading-relaxed">
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
                    className="p-8 rounded-3xl bg-background border border-muted/10 card-hover-light text-center shadow-sm"
                  >
                    <div className="font-heading text-5xl md:text-6xl font-bold text-accent mb-2 drop-shadow-sm">
                      <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                    </div>
                    <p className="text-muted text-[12px] tracking-[0.1em] uppercase font-bold">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED PROJECTS — Float & Tilt Cards
         ══════════════════════════════════════════════ */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase block mb-4">Seçme İşler</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">ÖNE ÇIKAN ÇALIŞMALARIM</h2>
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
                    {/* Hover Overlay with Icon */}
                    <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                       <div className="bg-surface text-accent p-4 rounded-full shadow-xl transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                         <Play size={20} className="ml-1" />
                       </div>
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
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/portfolio" className="inline-flex items-center px-8 py-4 bg-surface border border-muted/20 text-[12px] font-bold tracking-[0.1em] uppercase text-foreground rounded-xl hover:border-accent hover:text-accent shadow-sm hover:shadow-md transition-all duration-300">
            Tüm Portfolyoyu İncele <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SKILLS / EXPERTISE — Bright Icons
         ══════════════════════════════════════════════ */}
      <section className="py-32 relative z-10 bg-surface border-t border-muted/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase block mb-4">Ne Yapıyorum</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-5 text-foreground">UZMANLIK ALANLARIM</h2>
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
                    <div className="p-8 rounded-3xl bg-background border border-muted/10 card-hover-light h-full flex flex-col items-center text-center group">
                      <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6 transform group-hover:-translate-y-2 group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                        <IconComponent size={28} strokeWidth={2} />
                      </div>
                      <h3 className="font-heading text-xl font-bold mb-3 tracking-wide text-foreground">{skill.title}</h3>
                      <p className="text-muted text-[14px] leading-relaxed">{skill.description}</p>
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
