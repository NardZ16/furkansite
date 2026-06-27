import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Video } from 'lucide-react';
import { TextReveal } from './ui/TextReveal';
import { useData } from '../context/DataContext';

export function Contact() {
  const { data } = useData();
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <div id="contact" data-section="contact" ref={containerRef}>
      <section aria-label="Contact section" className="py-20">
        <div className="w-content-width mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div className="p-6 md:p-10 card rounded">
              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
                    <p>İletişim</p>
                  </div>
                  <TextReveal as="h2" className="transition-all duration-700 text-5xl 2xl:text-6xl leading-[1.15] font-semibold text-balance">
                    {data.contact?.headline}
                  </TextReveal>
                  <TextReveal as="p" className="transition-all duration-700 text-base md:text-lg leading-snug text-balance">
                    {data.contact?.description}
                  </TextReveal>
                  <div className="flex flex-col md:flex-row gap-3 md:gap-6 mt-2 text-sm md:text-base opacity-80">
                    <a href={`tel:${data.contact?.phone || '+905353050240'}`} className="hover:text-primary-cta transition-colors">
                      {data.contact?.phone || '+90 535 305 02 40'}
                    </a>
                    <a href={`mailto:${data.contact?.email || 'iletisim@furkanefekocabas.com'}`} className="hover:text-primary-cta transition-colors">
                      {data.contact?.email || 'iletisim@furkanefekocabas.com'}
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <input placeholder="Adınız Soyadınız" required aria-label="Adınız Soyadınız" className="w-full px-5 py-3 text-base bg-transparent placeholder:opacity-75 focus:outline-none card rounded focus:border-accent/50" type="text" />
                  <input placeholder="E-posta Adresiniz" required aria-label="E-posta Adresiniz" className="w-full px-5 py-3 text-base bg-transparent placeholder:opacity-75 focus:outline-none card rounded focus:border-accent/50" type="email" />
                  <textarea placeholder="Projenizden bahsedin..." required rows="5" aria-label="Projenizden bahsedin..." className="w-full px-5 py-3 text-base bg-transparent placeholder:opacity-75 focus:outline-none resize-none card rounded focus:border-accent/50"></textarea>
                  <button type="submit" className="flex items-center justify-center w-full h-10 px-6 text-sm rounded primary-button text-primary-cta-text font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all">
                    Mesaj Gönder
                  </button>
                </div>
              </form>
            </div>
            <div className="hidden md:block relative h-100 md:h-auto card rounded overflow-hidden group">
              <motion.div style={{ scale }} className="w-full h-full origin-center transition-transform duration-700 ease-out group-hover:scale-105">
                <img alt="Contact" className="min-h-0 rounded md:absolute md:inset-0 size-full object-cover" src="https://storage.googleapis.com/webild/default/templates/creative-portfolio/contact.webp" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
