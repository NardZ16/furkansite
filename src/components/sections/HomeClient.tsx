"use client";

import { motion, useScroll, useTransform, AnimatePresence, LayoutGroup } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Plane, CheckCircle, ArrowDown, Play } from "lucide-react";
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

  // We track scrolling to animate cards down to the grid.
  // Instead of layoutId, which snaps suddenly, we use a single fixed/sticky container for the whole scroll.
  // We'll use useScroll on a tall wrapper to scrub the animation.
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  // Calculate transforms for the cards based on scroll
  // At scroll 0 -> Hero Fan layout
  // At scroll 1 -> Grid layout
  
  // Hero values
  const heroPositions = cards.map(c => ({ x: c.x, y: c.y, rotate: c.rotate, scale: 1 }));
  
  // Grid values (approximate offsets relative to center).
  // On desktop, card 0 is left, card 1 is center, card 2 is right.
  const gridPositionsDesktop = [
    { x: -350, y: 200, rotate: 0, scale: 1.2 }, // left
    { x: 0, y: 200, rotate: 0, scale: 1.2 },    // center
    { x: 350, y: 200, rotate: 0, scale: 1.2 }   // right
  ];
  const gridPositionsMobile = [
    { x: 0, y: -50, rotate: 0, scale: 1.1 }, // top
    { x: 0, y: 300, rotate: 0, scale: 1.1 },  // middle
    { x: 0, y: 650, rotate: 0, scale: 1.1 }   // bottom
  ];

  // Responsive grid positions
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const gridPos = isMobile ? gridPositionsMobile : gridPositionsDesktop;

  const card0X = useTransform(scrollYProgress, [0, 0.5, 1], [heroPositions[2].x, heroPositions[2].x, gridPos[0].x]);
  const card0Y = useTransform(scrollYProgress, [0, 0.5, 1], [heroPositions[2].y, heroPositions[2].y, gridPos[0].y]);
  const card0Rot = useTransform(scrollYProgress, [0, 0.5, 1], [heroPositions[2].rotate, heroPositions[2].rotate, gridPos[0].rotate]);
  const card0Scale = useTransform(scrollYProgress, [0, 0.5, 1], [heroPositions[2].scale, heroPositions[2].scale, gridPos[0].scale]);

  const card1X = useTransform(scrollYProgress, [0, 0.5, 1], [heroPositions[1].x, heroPositions[1].x, gridPos[1].x]);
  const card1Y = useTransform(scrollYProgress, [0, 0.5, 1], [heroPositions[1].y, heroPositions[1].y, gridPos[1].y]);
  const card1Rot = useTransform(scrollYProgress, [0, 0.5, 1], [heroPositions[1].rotate, heroPositions[1].rotate, gridPos[1].rotate]);
  const card1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [heroPositions[1].scale, heroPositions[1].scale, gridPos[1].scale]);

  const card2X = useTransform(scrollYProgress, [0, 0.5, 1], [heroPositions[0].x, heroPositions[0].x, gridPos[2].x]);
  const card2Y = useTransform(scrollYProgress, [0, 0.5, 1], [heroPositions[0].y, heroPositions[0].y, gridPos[2].y]);
  const card2Rot = useTransform(scrollYProgress, [0, 0.5, 1], [heroPositions[0].rotate, heroPositions[0].rotate, gridPos[2].rotate]);
  const card2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [heroPositions[0].scale, heroPositions[0].scale, gridPos[2].scale]);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  
  const projectsOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const projectsY = useTransform(scrollYProgress, [0.6, 1], [50, 0]);

  // Card wrapper z-index so it sits correctly during scroll
  const cardZIndex = useTransform(scrollYProgress, (v) => (v > 0.5 ? 50 : 20));

  return (
    <div className="w-full relative">
      
      {/* 
        ========================================================
        UNIFIED SCROLL SECTION (HERO + PROJECTS)
        This wrapper creates a 200vh tall scroll area where the cards 
        can transition seamlessly from the Hero to the Projects grid.
        ========================================================
      */}
      <div ref={scrollRef} className="relative h-[250vh] w-full">
        {/* STICKY CONTAINER: Stays on screen while we scroll through 200vh */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          
          {/* --- HERO CONTENT (Fades out) --- */}
          <motion.div 
            style={{ opacity: heroOpacity, y: heroY }} 
            className="absolute inset-0 flex items-center pointer-events-auto z-10"
          >
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center pt-24">
              {/* Left: Typography & Intro */}
              <motion.div className="max-w-lg z-20" variants={containerVariants} initial="hidden" animate="visible">
                {/* Availability Badge */}
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 mb-8 backdrop-blur-sm shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-[12px] font-medium tracking-wide text-foreground/80">Bu ay için 1 boşluk</span>
                </motion.div>
                
                <motion.h1 variants={itemVariants} className="font-sans text-[clamp(3.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-[#111827] mb-6">
                  {s.heroTitle.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </motion.h1>
                
                <motion.p variants={itemVariants} className="text-[16px] md:text-[18px] text-[#4B5563] font-medium mb-10 leading-relaxed max-w-md">
                  {s.heroSubtitle}
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
                  <Link href="/contact" className="group flex items-center gap-4 bg-[#2A2A2A] text-white rounded-full pr-7 pl-1.5 py-1.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/10 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#3A3A3A]">
                      <Image src="https://i.hizliresim.com/j122le7.jpg" alt="Avatar" width={40} height={40} className="object-cover w-full h-full" />
                    </div>
                    <span className="font-semibold text-[14px]">Benimle iletişime geç</span>
                  </Link>
                </motion.div>
              </motion.div>
              {/* Right spacer for hero text */}
              <div className="hidden lg:block"></div>
            </div>
          </motion.div>

          {/* --- PROJECTS CONTENT (Fades in) --- */}
          <motion.div 
            style={{ opacity: projectsOpacity, y: projectsY }}
            className="absolute inset-0 flex flex-col items-center pointer-events-none z-10 pt-[15vh]"
          >
            <div className="text-center">
              <span className="text-[#111827] text-[11px] font-bold tracking-[0.2em] uppercase block mb-4">Seçme İşler</span>
              <h2 className="font-sans text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">Öne Çıkan Çalışmalar.</h2>
            </div>
            {/* The cards will animate exactly below this text */}
          </motion.div>

          {/* --- THE ANIMATED CARDS --- */}
          <motion.div style={{ zIndex: cardZIndex }} className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[10vw] xl:pr-[15vw] pointer-events-none">
            <div className="relative w-full max-w-7xl mx-auto flex justify-center lg:justify-end">
              {/* Card 0 (Projects[0] - Front in hero, Left in grid) */}
              <motion.div
                style={{ x: card0X, y: card0Y, rotate: card0Rot, scale: card0Scale, zIndex: 30 }}
                className="absolute w-[260px] sm:w-[320px] lg:w-[380px] aspect-[4/3] rounded-3xl bg-white border-[8px] sm:border-[12px] border-white shadow-2xl overflow-hidden pointer-events-auto"
              >
                <Link href={`/portfolio`} className="block w-full h-full relative group">
                  <Image src={cards[2].img} alt="Project" fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
                  <div className="absolute inset-0 bg-black/5"></div>
                  
                  {/* Grid details (fade in only when scrolled) */}
                  <motion.div style={{ opacity: projectsOpacity }} className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase mb-1 block">{cards[2].project?.category?.name || "Kategori"}</span>
                    <h3 className="font-sans text-lg font-bold truncate">{cards[2].project?.title || "Proje 1"}</h3>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Card 1 (Projects[1] - Middle in hero, Center in grid) */}
              <motion.div
                style={{ x: card1X, y: card1Y, rotate: card1Rot, scale: card1Scale, zIndex: 20 }}
                className="absolute w-[260px] sm:w-[320px] lg:w-[380px] aspect-[4/3] rounded-3xl bg-white border-[8px] sm:border-[12px] border-white shadow-2xl overflow-hidden pointer-events-auto"
              >
                <Link href={`/portfolio`} className="block w-full h-full relative group">
                  <Image src={cards[1].img} alt="Project" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/5"></div>
                  
                  <motion.div style={{ opacity: projectsOpacity }} className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase mb-1 block">{cards[1].project?.category?.name || "Kategori"}</span>
                    <h3 className="font-sans text-lg font-bold truncate">{cards[1].project?.title || "Proje 2"}</h3>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Card 2 (Projects[2] - Back in hero, Right in grid) */}
              <motion.div
                style={{ x: card2X, y: card2Y, rotate: card2Rot, scale: card2Scale, zIndex: 10 }}
                className="absolute w-[260px] sm:w-[320px] lg:w-[380px] aspect-[4/3] rounded-3xl bg-white border-[8px] sm:border-[12px] border-white shadow-2xl overflow-hidden pointer-events-auto"
              >
                <Link href={`/portfolio`} className="block w-full h-full relative group">
                  <Image src={cards[0].img} alt="Project" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/5"></div>

                  <motion.div style={{ opacity: projectsOpacity }} className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase mb-1 block">{cards[0].project?.category?.name || "Kategori"}</span>
                    <h3 className="font-sans text-lg font-bold truncate">{cards[0].project?.title || "Proje 3"}</h3>
                  </motion.div>
                </Link>
              </motion.div>

            </div>
          </motion.div>

          {/* View All Projects Button - fades in with projects */}
          <motion.div 
            style={{ opacity: projectsOpacity, y: projectsY }}
            className="absolute bottom-10 left-0 right-0 flex justify-center z-10 pointer-events-auto"
          >
            <Link href="/portfolio" className="inline-flex items-center px-8 py-4 bg-white border border-gray-200 text-[13px] font-bold tracking-[0.05em] text-[#111827] rounded-full hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300">
              Tüm Portfolyoyu İncele <ArrowRight className="ml-2" size={16} />
            </Link>
          </motion.div>

        </div>
      </div>
      
      {/* 
        ========================================================
        ABOUT & EXPERTISE (Moved below Projects!)
        ========================================================
      */}

      {/* ══════════════════════════════════════════════
          ABOUT — Stats & Bio (Light Version)
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
