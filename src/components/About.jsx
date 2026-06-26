import React, { useRef } from 'react';
import { Quote, Globe } from 'lucide-react';
import { TextReveal } from './ui/TextReveal';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useData } from '../context/DataContext';

export function About() {
  const { data } = useData();
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <div id="about" data-section="about" ref={containerRef}>
      <section aria-label="About section" className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mx-auto w-content-width">
          <div className="relative md:col-span-3 p-10 md:p-20 card rounded">
            <div className="absolute flex items-center justify-center -top-7 -left-7 md:-top-8 md:-left-8 size-14 md:size-16 primary-button rounded">
              <Quote className="h-5/10 text-primary-cta-text" />
            </div>
            <div className="relative flex flex-col justify-center gap-5 h-full">
              <div className="w-fit px-3 py-1 mb-1 text-sm card rounded">
                <p>Hakkımda</p>
              </div>
              <TextReveal as="h1" className="transition-all duration-700 text-3xl md:text-4xl leading-[1.15] font-semibold text-balance">
                {data.about?.headline}
              </TextReveal>
              <div className="flex items-center gap-2 min-w-0 mt-5">
                <span className="text-base font-medium truncate">{data.about?.name}</span>
                <span className="text-accent shrink-0">•</span>
                <span className="text-base font-medium truncate">{data.about?.title}</span>
              </div>
            </div>
          </div>
          <div className="p-px md:col-span-2 aspect-square md:aspect-auto md:h-full card rounded overflow-hidden relative group">
            <motion.div style={{ scale }} className="w-full h-full origin-center transition-transform duration-700 ease-out group-hover:scale-105">
              <img alt={data.about?.name} className="w-full h-full min-h-0 object-cover rounded" src={data.about?.avatar} />
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-center gap-3 p-6 xl:p-7 2xl:p-8">
              {data.about?.instagram && (
                <a href={data.about.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 h-9 px-3 text-sm rounded-full cursor-pointer backdrop-blur-xl bg-primary-cta-text/15 border border-primary-cta-text/20 text-primary-cta-text font-medium hover:bg-primary-cta-text/25 transition-all duration-300 ease-out">
                  <Globe className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              )}
              {data.about?.youtube && (
                <a href={data.about.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 h-9 px-3 text-sm rounded-full cursor-pointer backdrop-blur-xl bg-primary-cta-text/15 border border-primary-cta-text/20 text-primary-cta-text font-medium hover:bg-primary-cta-text/25 transition-all duration-300 ease-out">
                  <Globe className="w-4 h-4" />
                  <span>YouTube</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
