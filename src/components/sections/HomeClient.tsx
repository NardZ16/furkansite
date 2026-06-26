"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Plane, CheckCircle, ArrowDown } from "lucide-react";
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

export default function HomeClient({ projects, experiences, skills, settings }: HomeClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  const s = {
    heroTitle: settings?.heroTitle || "BEN KİMİM?",
    heroSubtitle: settings?.heroSubtitle || "Videographer • Grafik Tasarım • Drone Pilotu",
    aboutText1: settings?.aboutText1 || "Çekimden kurguya kadar tüm süreci tek başına yürütebilen, yaratıcı ve teknik yetkinliklere sahip bir görüntü yönetmeniyim.",
    aboutText2: settings?.aboutText2 || "Konsept geliştirme, çekim, yönetmenlik ve post-prodüksiyon aşamalarını uçtan uca bizzat üstleniyorum.",
    licenseTitle: settings?.licenseTitle || "Ticari İHA-1 Pilot Lisansı",
    licenseDesc: settings?.licenseDesc || "Profesyonel Drone ve Hava Çekimi Yetkisi"
  };

  // Stagger animation config
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  return (
    <div className="w-full noise-overlay">
      {/* ══════════════════════════════════════════════
          HERO — Full-Screen Cinematic Intro
         ══════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-end -mt-20">
        {/* Background Image with Parallax */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroImageY }}>
          <Image
            src={settings?.heroImage || "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=2070&auto=format&fit=crop"}
            alt="Furkan Efe Kocabaş"
            fill
            className="object-cover object-center scale-110"
            priority
            quality={90}
          />
        </motion.div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-[1] hero-gradient" />

        {/* İHA-1 Badge — Top Right */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute top-28 right-6 md:right-12 z-10"
        >
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-accent/30 bg-black/40 backdrop-blur-md animate-pulse-glow">
            <Plane size={16} className="text-accent" />
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-accent">
              İHA-1 Lisanslı
            </span>
          </div>
        </motion.div>

        {/* Social Links — Left Side Vertical */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col gap-5"
        >
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-accent transition-colors duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-accent transition-colors duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-accent transition-colors duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <div className="w-px h-16 bg-white/10 mx-auto mt-2"></div>
        </motion.div>

        {/* Hero Content — Bottom Left */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20 md:pb-28"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Name — Giant Typography */}
            <motion.div variants={itemVariants} className="mb-2">
              <span className="text-accent text-[11px] md:text-[13px] font-semibold tracking-[0.3em] uppercase block mb-4">
                Portfolyo & CV
              </span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="font-heading text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tight text-white mb-6"
            >
              FURKAN<br />
              EFE<span className="text-accent text-glow"> .</span>
            </motion.h1>
            <motion.h1
              variants={itemVariants}
              className="font-heading text-[clamp(2rem,6vw,4.5rem)] font-light leading-[0.95] tracking-tight text-white/50 mb-8"
            >
              KOCABAŞ
            </motion.h1>
            
            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-[13px] md:text-[15px] tracking-[0.2em] uppercase text-white/50 font-light mb-10 max-w-xl"
            >
              {s.heroSubtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link
                href="/portfolio"
                className="group px-7 py-3.5 bg-accent text-background text-[12px] font-bold tracking-[0.15em] uppercase rounded-full hover:shadow-[0_0_30px_rgba(212,168,83,0.4)] transition-all duration-500 inline-flex items-center gap-2"
              >
                Portfolyomu İncele
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3.5 border border-white/15 text-white/70 text-[12px] font-medium tracking-[0.15em] uppercase rounded-full hover:border-accent/40 hover:text-accent transition-all duration-500"
              >
                Tanışalım
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-light">Keşfet</span>
          <div className="animate-scroll">
            <ArrowDown size={16} className="text-white/30" />
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          ABOUT — Stats & Bio
         ══════════════════════════════════════════════ */}
      <section className="relative py-32 bg-grid">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left — Bio Text */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase block mb-6">Hakkımda</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-8">
                Görüntüleri <span className="text-accent">Hikayeye</span><br />Dönüştürüyorum
              </h2>
              <div className="space-y-5 text-muted text-[15px] leading-relaxed">
                <p>{s.aboutText1}</p>
                <p>{s.aboutText2}</p>
              </div>
              
              {/* İHA-1 License Card */}
              <div className="mt-10 flex items-center gap-4 p-5 rounded-xl bg-accent/5 border border-accent/15 card-hover">
                <div className="bg-accent/15 text-accent p-3 rounded-lg flex-shrink-0">
                  <Plane size={22} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-[15px]">{s.licenseTitle}</h4>
                  <p className="text-[13px] text-accent/70">{s.licenseDesc}</p>
                </div>
              </div>
            </motion.div>

            {/* Right — Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
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
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * i }}
                    className="p-8 rounded-2xl bg-surface border border-white/5 card-hover text-center"
                  >
                    <div className="font-heading text-5xl md:text-6xl font-bold text-accent text-glow mb-2">
                      <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                    </div>
                    <p className="text-muted text-[13px] tracking-[0.08em] uppercase font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          EXPERIENCE TIMELINE
         ══════════════════════════════════════════════ */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/50 to-background"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <span className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase block mb-4">Kariyer</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold">İŞ DENEYİMİ</h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent animate-line-grow"></div>
            
            <div className="space-y-16">
              {experiences.length === 0 ? (
                <div className="text-center text-muted relative z-10 py-4">Deneyimler yakında eklenecektir.</div>
              ) : experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-[5px] md:-translate-x-1/2 w-[10px] h-[10px] bg-accent rounded-full mt-6 md:mt-0 animate-pulse-glow"></div>
                  
                  <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pl-14 text-left' : 'md:pr-14 md:text-right'}`}>
                    <div className="bg-surface/80 backdrop-blur-sm p-7 rounded-2xl border border-white/5 card-hover">
                      <span className="inline-flex items-center text-accent text-[12px] font-semibold tracking-[0.1em] uppercase mb-3">
                        {exp.date}
                      </span>
                      <h3 className="font-heading text-xl font-bold text-white mb-1">{exp.title}</h3>
                      <h4 className="text-muted font-medium mb-4 text-[14px]">{exp.company}</h4>
                      <p className="text-[13px] text-muted/80 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED PROJECTS — Cinematic Grid
         ══════════════════════════════════════════════ */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-16"
        >
          <div>
            <span className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase block mb-4">Seçme İşler</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold">ÖNE ÇIKAN<br/>ÇALIŞMALARIM</h2>
          </div>
          <Link href="/portfolio" className="hidden md:flex items-center text-accent text-[13px] tracking-[0.1em] uppercase font-medium hover:text-white transition-colors">
            Tümünü Gör <ArrowRight className="ml-2" size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative block overflow-hidden rounded-2xl bg-surface cursor-pointer card-hover"
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                {project.coverImage ? (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900 animate-shimmer" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-2 block">
                  {project.category.name}
                </span>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-[13px] text-white/50 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 md:hidden text-center">
          <Link href="/portfolio" className="inline-flex items-center text-accent text-[13px] tracking-[0.1em] uppercase font-medium hover:text-white transition-colors">
            Tümünü Gör <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SKILLS / EXPERTISE
         ══════════════════════════════════════════════ */}
      <section className="py-32 bg-grid relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase block mb-4">Ne Yapıyorum</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-5">UZMANLIK ALANLARIM</h2>
            <p className="text-muted text-[15px] max-w-2xl mx-auto">
              Projelerinizde sorumluluk alarak yaratıcı ve teknik süreçlerin tamamını yürütebilirim.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => {
              const IconComponent = (LucideIcons as any)[skill.iconName] || CheckCircle;
              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-surface/80 backdrop-blur-sm border border-white/5 card-hover group"
                >
                  <div className="text-accent mb-7 transform group-hover:scale-110 group-hover:text-glow transition-all duration-500 origin-left">
                    <IconComponent size={30} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-3 tracking-wide">{skill.title}</h3>
                  <p className="text-muted text-[13px] leading-relaxed">{skill.description}</p>
                </motion.div>
              );
            })}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/services" className="inline-flex items-center px-8 py-4 border border-white/10 text-[12px] font-semibold tracking-[0.15em] uppercase text-foreground rounded-full hover:border-accent/40 hover:text-accent card-hover transition-all duration-500">
              Uzmanlık Detaylarını İncele
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
