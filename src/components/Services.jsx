import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TextReveal } from './ui/TextReveal';
import { useData } from '../context/DataContext';

export function Services() {
  const { data } = useData();
  const servicesData = data.services || {};
  const list = servicesData.list || [];

  return (
    <div id="services" data-section="services">
      <section aria-label="Features section" className="py-20">
        <div className="flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col items-center gap-2 w-content-width mx-auto">
            <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
              <p>Hizmetlerim</p>
            </div>
            <TextReveal as="h2" className="transition-all duration-700 md:max-w-8/10 text-5xl 2xl:text-6xl leading-[1.15] font-semibold text-center text-balance">
              {servicesData.headline || "Uzmanlık Alanlarım"}
            </TextReveal>
            <TextReveal as="p" className="transition-all duration-700 md:max-w-[70%] text-base md:text-lg leading-snug text-center text-balance">
              {servicesData.description}
            </TextReveal>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a href="#contact" className="group flex items-center gap-3 mt-2 text-primary-cta-text rounded-full pl-3 pr-6 py-3 w-fit primary-button transition-all duration-300">
                <div className="flex items-center">
                  <div className="card p-px rounded-full transition-transform duration-500 ease-out group-hover:-rotate-6">
                    <img className="w-9 h-9 rounded-full object-cover" alt="" src={data.navbar?.avatar || "https://storage.googleapis.com/webild/default/templates/creative-portfolio/avatar.webp"} />
                  </div>
                  <div className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-all duration-500 ease-out">
                    <div className="overflow-hidden flex items-center">
                      <span className="text-primary-cta-text text-sm font-semibold mx-2 transition-transform duration-500 ease-out -translate-x-3 group-hover:translate-x-0">+</span>
                      <div className="card p-px rounded-full shrink-0 transition-transform duration-500 ease-out -translate-x-5 group-hover:translate-x-0 group-hover:rotate-6">
                        <span className="w-9 h-9 rounded-full flex items-center justify-center bg-card">
                          <span className="text-foreground text-xs font-bold">Sen</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-base font-semibold whitespace-nowrap">Benimle iletişime geç</span>
              </a>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-content-width mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {list.map((service, index) => {
                const colSpanClass = service.colSpan === 5 ? 'md:col-span-5' : service.colSpan === 7 ? 'md:col-span-7' : 'md:col-span-6';
                return (
                  <div key={index} className={`${colSpanClass} flex flex-col justify-center gap-2 p-6 md:p-8 card rounded hover:-translate-y-1 transition-transform duration-300`}>
                    <h3 className="text-xl md:text-2xl font-semibold leading-snug text-balance">{service.title}</h3>
                    <p className="text-sm md:text-base leading-relaxed text-balance opacity-80">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
