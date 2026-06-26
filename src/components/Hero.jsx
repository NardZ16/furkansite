import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { useData } from '../context/DataContext';

export function Hero() {
  const { data } = useData();
  return (
    <section id="hero" data-section="hero" className="relative h-fit md:h-svh pt-30 pb-20 md:py-0 flex items-center overflow-hidden md:overflow-visible">
      <div className="w-content-width mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full md:w-[46%] flex flex-col items-center md:items-start gap-3"
          >
            <div className="card backdrop-blur flex items-center gap-2 px-3 py-1 rounded">
              <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
              <p className="text-sm leading-snug font-medium text-foreground">{data.hero?.badge}</p>
            </div>
            <h1 className="text-5xl md:text-6xl 2xl:text-7xl font-medium leading-[1.05] tracking-tight text-center md:text-left">
              <span className="inline pb-[0.1em] -mb-[0.1em] bg-[linear-gradient(to_right,var(--foreground),var(--primary-cta))] bg-clip-text text-transparent">
                {data.hero?.headlinePrefix} <span className="font-bold">{data.hero?.headlineHighlight}</span>
              </span>
            </h1>
            <p className="text-sm md:text-base font-medium leading-snug text-center text-balance md:text-left max-w-[95%]">
              {data.hero?.description}
            </p>
            <a href="#contact" className="group flex items-center gap-3 mt-2 text-primary-cta-text rounded-full pl-3 pr-6 py-3 w-fit primary-button transition-all duration-300">
              <div className="flex items-center">
                <div className="card p-px rounded-full transition-transform duration-500 ease-out group-hover:-rotate-6">
                  <img className="w-9 h-9 rounded-full object-cover" alt="" src={data.navbar?.avatar} />
                </div>
                <div className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-all duration-500 ease-out">
                  <div className="overflow-hidden flex items-center">
                    <span className="text-primary-cta-text text-sm font-medium mx-2 transition-transform duration-500 ease-out -translate-x-3 group-hover:translate-x-0">+</span>
                    <div className="card p-px rounded-full shrink-0 transition-transform duration-500 ease-out -translate-x-5 group-hover:translate-x-0 group-hover:rotate-6">
                      <span className="w-9 h-9 rounded-full flex items-center justify-center bg-card">
                        <span className="text-foreground text-xs font-bold">Sen</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-base font-medium whitespace-nowrap">Benimle iletişime geç</span>
            </a>
          </motion.div>
          <div className="w-full md:w-[54%] relative h-80 md:h-96">
            <div className="absolute inset-0 card rounded-2xl md:hidden"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
