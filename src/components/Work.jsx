import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TextReveal } from './ui/TextReveal';
import { useData } from '../context/DataContext';

export function Work() {
  const { data } = useData();
  const containerRef = useRef(null);
  
  const { scrollY } = useScroll();

  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;

  // Animasyonların başlangıç noktalarını ana ekranın sağına yığılacak şekilde (yelpaze) ayarlıyoruz.
  const y1 = useTransform(scrollY, [0, 600], [isDesktop ? "-100vh" : "-50vh", "0vh"]);
  const x1 = useTransform(scrollY, [0, 600], [isDesktop ? "38vw" : "10vw", "0vw"]);
  const rotate1 = useTransform(scrollY, [0, 600], ["-12deg", "0deg"]);
  const scale1 = useTransform(scrollY, [0, 600], [1.1, 1]);

  const y2 = useTransform(scrollY, [0, 600], [isDesktop ? "-110vh" : "-60vh", "0vh"]);
  const x2 = useTransform(scrollY, [0, 600], [isDesktop ? "19vw" : "0vw", "0vw"]);
  const rotate2 = useTransform(scrollY, [0, 600], ["2deg", "0deg"]);
  const scale2 = useTransform(scrollY, [0, 600], [1.15, 1]);

  const y3 = useTransform(scrollY, [0, 600], [isDesktop ? "-105vh" : "-70vh", "0vh"]);
  const x3 = useTransform(scrollY, [0, 600], [isDesktop ? "0vw" : "-10vw", "0vw"]);
  const rotate3 = useTransform(scrollY, [0, 600], ["16deg", "0deg"]);
  const scale3 = useTransform(scrollY, [0, 600], [1.2, 1]);

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
          <div className="flex flex-col gap-3 xl:gap-4 2xl:gap-5">
            <motion.div style={{ y: y1, x: x1, rotate: rotate1, scale: scale1, zIndex: 30 }} className="aspect-4/3 rounded-3xl shadow-lg relative card p-2 xl:p-3 2xl:p-4 group will-change-transform origin-center">
              <div className="w-full h-full aspect-4/3 rounded-[1rem] overflow-hidden relative">
                <img alt={data.work?.projects?.[0]?.title} className="min-h-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={data.work?.projects?.[0]?.image} />
                <span className="absolute bottom-2 left-2 xl:bottom-3 xl:left-3 2xl:bottom-4 2xl:left-4 px-3 py-1.5 text-xs font-medium text-primary-cta-text rounded-full backdrop-blur-xl bg-primary-cta-text/15 border border-primary-cta-text/20">{data.work?.projects?.[0]?.tag}</span>
              </div>
            </motion.div>
            <p className="text-base md:text-lg lg:text-xl leading-snug">
              <span className="font-semibold text-foreground">{data.work?.projects?.[0]?.title} </span>
              <span className="text-foreground/50">{data.work?.projects?.[0]?.description}</span>
            </p>
          </div>
          
          <div className="flex flex-col gap-3 xl:gap-4 2xl:gap-5">
            <motion.div style={{ y: y2, x: x2, rotate: rotate2, scale: scale2, zIndex: 20 }} className="aspect-4/3 rounded-3xl shadow-lg relative card p-2 xl:p-3 2xl:p-4 group will-change-transform origin-center">
              <div className="w-full h-full aspect-4/3 rounded-[1rem] overflow-hidden relative">
                <img alt={data.work?.projects?.[1]?.title} className="min-h-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={data.work?.projects?.[1]?.image} />
                <span className="absolute bottom-2 left-2 xl:bottom-3 xl:left-3 2xl:bottom-4 2xl:left-4 px-3 py-1.5 text-xs font-medium text-primary-cta-text rounded-full backdrop-blur-xl bg-primary-cta-text/15 border border-primary-cta-text/20">{data.work?.projects?.[1]?.tag}</span>
              </div>
            </motion.div>
            <p className="text-base md:text-lg lg:text-xl leading-snug">
              <span className="font-semibold text-foreground">{data.work?.projects?.[1]?.title} </span>
              <span className="text-foreground/50">{data.work?.projects?.[1]?.description}</span>
            </p>
          </div>
          
          <div className="flex flex-col gap-3 xl:gap-4 2xl:gap-5">
            <motion.div style={{ y: y3, x: x3, rotate: rotate3, scale: scale3, zIndex: 10 }} className="aspect-4/3 rounded-3xl shadow-lg relative card p-2 xl:p-3 2xl:p-4 group will-change-transform origin-center">
              <div className="w-full h-full aspect-4/3 rounded-[1rem] overflow-hidden relative">
                <img alt={data.work?.projects?.[2]?.title} className="min-h-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={data.work?.projects?.[2]?.image} />
                <span className="absolute bottom-2 left-2 xl:bottom-3 xl:left-3 2xl:bottom-4 2xl:left-4 px-3 py-1.5 text-xs font-medium text-primary-cta-text rounded-full backdrop-blur-xl bg-primary-cta-text/15 border border-primary-cta-text/20">{data.work?.projects?.[2]?.tag}</span>
              </div>
            </motion.div>
            <p className="text-base md:text-lg lg:text-xl leading-snug">
              <span className="font-semibold text-foreground">{data.work?.projects?.[2]?.title} </span>
              <span className="text-foreground/50">{data.work?.projects?.[2]?.description}</span>
            </p>
          </div>
        </div>
        
        <div className="flex justify-center mt-10">
          <a href="#" className="group flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full secondary-button text-secondary-cta-text transition-all duration-300">
            <span>View all my projects</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
