"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Plane, CheckCircle } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";

type Project = { id: string; title: string; description: string; coverImage: string | null; category: { name: string }; };
type Experience = { id: string; title: string; company: string; date: string; description: string; };
type Skill = { id: string; iconName: string; title: string; description: string; };
type SiteSettings = { heroTitle: string; heroSubtitle: string; aboutText1: string; aboutText2: string; licenseTitle: string; licenseDesc: string; } | null;

type HomeClientProps = {
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  settings: SiteSettings;
};

export default function HomeClient({ projects, experiences, skills, settings }: HomeClientProps) {
  
  // Default fallbacks in case DB is empty
  const s = {
    heroTitle: settings?.heroTitle || "BEN KİMİM?",
    heroSubtitle: settings?.heroSubtitle || "Videographer, Video Yapımcısı & Grafik Tasarım Uzmanı",
    aboutText1: settings?.aboutText1 || "Çekimden kurguya kadar tüm süreci tek başına yürütebilen...",
    aboutText2: settings?.aboutText2 || "Konsept geliştirme, çekim, yönetmenlik ve post-prodüksiyon (kurgu, renk, ses) aşamalarını uçtan uca bizzat üstleniyorum.",
    licenseTitle: settings?.licenseTitle || "Ticari İHA-1 Pilot Lisansı",
    licenseDesc: settings?.licenseDesc || "Profesyonel Drone ve Hava Çekimi Yetkisi"
  };

  return (
    <div className="w-full">
      {/* Intro Section - Merged from About */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={settings?.heroImage || "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=2070&auto=format&fit=crop"}
                alt="Furkan Efe Kocabaş"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
              {s.heroTitle}
            </h1>
            <h2 className="text-xl md:text-2xl text-white font-medium mb-8 border-l-4 border-accent pl-4 whitespace-pre-line">
              {s.heroSubtitle}
            </h2>
            <div className="space-y-6 text-muted text-lg leading-relaxed">
              <p>{s.aboutText1}</p>
              <p>{s.aboutText2}</p>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-accent/10 border border-accent/20 mt-8">
                <div className="bg-accent text-black p-3 rounded-full flex-shrink-0">
                  <Plane size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{s.licenseTitle}</h4>
                  <p className="text-sm text-accent">{s.licenseDesc}</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Link
                  href="/portfolio"
                  className="px-6 py-3 bg-accent text-background font-semibold rounded-full hover:bg-amber-400 transition-colors inline-flex items-center"
                >
                  Portfolyomu İncele
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-transparent border border-white/20 text-foreground font-semibold rounded-full hover:bg-white/5 transition-colors inline-flex items-center"
                >
                  Tanışalım
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-24 bg-surface border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold">İŞ DENEYİMİ</h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-white/10"></div>
            
            <div className="space-y-12">
              {experiences.length === 0 ? (
                <div className="text-center text-muted relative z-10 bg-surface py-4">Deneyimler yakında eklenecektir.</div>
              ) : experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-[4.5px] md:-translate-x-1/2 w-3 h-3 bg-accent rounded-full mt-6 md:mt-0 shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
                  
                  <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'}`}>
                    <div className="bg-background p-6 rounded-2xl border border-white/5 hover:border-accent/30 transition-colors">
                      <span className="inline-flex items-center text-accent text-sm font-semibold mb-2">
                        {exp.date}
                      </span>
                      <h3 className="font-heading text-xl font-bold text-white mb-1">{exp.title}</h3>
                      <h4 className="text-muted font-medium mb-4">{exp.company}</h4>
                      <p className="text-sm text-muted/80 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold">ÖNE ÇIKAN<br/>ÇALIŞMALARIM</h2>
          </div>
          <Link href="/portfolio" className="hidden md:flex items-center text-accent hover:text-amber-400 transition-colors">
            Tümünü Gör <ArrowRight className="ml-2" size={20} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative block overflow-hidden rounded-xl bg-surface cursor-pointer"
            >
              <div className="aspect-video relative overflow-hidden">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-2 block">
                  {project.category.name}
                </span>
                <h3 className="font-heading text-2xl font-bold text-white mb-1">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 md:hidden text-center">
          <Link href="/portfolio" className="inline-flex items-center text-accent hover:text-amber-400 transition-colors font-medium">
            Tümünü Gör <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </section>

      {/* Services/Skills Overview */}
      <section className="py-24 bg-surface border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">UZMANLIK ALANLARIM</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Projelerinizde sorumluluk alarak yaratıcı ve teknik süreçlerin tamamını yürütebilirim.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => {
              const IconComponent = (LucideIcons as any)[skill.iconName] || CheckCircle;
              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-white/5 hover:border-accent/30 transition-colors group"
                >
                  <div className="text-accent mb-6 transform group-hover:scale-110 transition-transform duration-300 origin-left">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3">{skill.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{skill.description}</p>
                </motion.div>
              );
            })}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/services" className="inline-flex items-center px-8 py-4 bg-transparent border border-white/20 text-foreground font-semibold rounded-full hover:bg-white/5 transition-colors">
              Uzmanlık Detaylarını İncele
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
