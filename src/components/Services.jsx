import React from 'react';
import { motion } from 'framer-motion';
import { TextReveal } from './ui/TextReveal';

export function Services() {
  return (
    <div id="services" data-section="services">
      <section aria-label="Features section" className="py-20">
        <div className="flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col items-center gap-2 w-content-width mx-auto">
            <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
              <p>Hizmetlerim</p>
            </div>
            <TextReveal as="h2" className="transition-all duration-700 md:max-w-8/10 text-5xl 2xl:text-6xl leading-[1.15] font-semibold text-center text-balance">
              Uzmanlık Alanlarım
            </TextReveal>
            <TextReveal as="p" className="transition-all duration-700 md:max-w-[70%] text-base md:text-lg leading-snug text-center text-balance">
              Markanızın ihtiyaç duyduğu tüm görsel süreçleri, ilk fikirden son piksele kadar profesyonellikle yönetiyorum.
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
                    <img className="w-9 h-9 rounded-full object-cover" alt="" src="https://storage.googleapis.com/webild/default/templates/creative-portfolio/avatar.webp" />
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
              <div className="md:col-span-5 flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 card rounded hover:-translate-y-1 transition-transform duration-300">
                <div className="h-60 xl:h-72 2xl:h-80 rounded overflow-hidden bg-foreground/5 shadow shadow-foreground/5">
                  <img alt="Photography" className="w-full h-full min-h-0 object-cover rounded hover:scale-105 transition-transform duration-500" src="https://storage.googleapis.com/webild/default/templates/creative-portfolio/photography.webp" />
                </div>
                <div className="flex flex-col gap-1 p-3 xl:p-3.5 2xl:p-4">
                  <h3 className="text-xl md:text-2xl font-semibold leading-snug text-balance">Fotoğraf Çekimi</h3>
                  <p className="text-sm md:text-base leading-snug text-balance">Ürün, mekân ve etkinlik fotoğrafçılığı. Markanızın ruhunu yansıtan etkileyici kareler.</p>
                </div>
              </div>
              <div className="md:col-span-7 flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 card rounded hover:-translate-y-1 transition-transform duration-300">
                <div className="h-60 xl:h-72 2xl:h-80 rounded overflow-hidden bg-foreground/5 shadow shadow-foreground/5">
                  <img alt="Product Design" className="w-full h-full min-h-0 object-cover rounded hover:scale-105 transition-transform duration-500" src="https://storage.googleapis.com/webild/default/templates/creative-portfolio/product-design.webp" />
                </div>
                <div className="flex flex-col gap-1 p-3 xl:p-3.5 2xl:p-4">
                  <h3 className="text-xl md:text-2xl font-semibold leading-snug text-balance">Video Çekimi & Yönetmenlik</h3>
                  <p className="text-sm md:text-base leading-snug text-balance">Stüdyo, dış mekân ve hava (drone) çekimleri; ışık, kompozisyon ve set yönetimi.</p>
                </div>
              </div>
              <div className="md:col-span-7 flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 card rounded hover:-translate-y-1 transition-transform duration-300">
                <div className="h-60 xl:h-72 2xl:h-80 rounded overflow-hidden bg-foreground/5 shadow shadow-foreground/5">
                  <img alt="Website" className="w-full h-full min-h-0 object-cover rounded hover:scale-105 transition-transform duration-500" src="https://storage.googleapis.com/webild/default/templates/creative-portfolio/website.webp" />
                </div>
                <div className="flex flex-col gap-1 p-3 xl:p-3.5 2xl:p-4">
                  <h3 className="text-xl md:text-2xl font-semibold leading-snug text-balance">Video Kurgu & Post-Prodüksiyon</h3>
                  <p className="text-sm md:text-base leading-snug text-balance">Adobe Premiere Pro & After Effects ile montaj, renk düzenleme, ses ve hareketli grafik tasarımı.</p>
                </div>
              </div>
              <div className="md:col-span-5 flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 card rounded hover:-translate-y-1 transition-transform duration-300">
                <div className="h-60 xl:h-72 2xl:h-80 rounded overflow-hidden bg-foreground/5 shadow shadow-foreground/5">
                  <img alt="Videos" className="w-full h-full min-h-0 object-cover rounded hover:scale-105 transition-transform duration-500" src="https://storage.googleapis.com/webild/default/templates/creative-portfolio/videos.webp" />
                </div>
                <div className="flex flex-col gap-1 p-3 xl:p-3.5 2xl:p-4">
                  <h3 className="text-xl md:text-2xl font-semibold leading-snug text-balance">Adobe Photoshop</h3>
                  <p className="text-sm md:text-base leading-snug text-balance">Fotoğraf manipülasyonu, görsel rötuş ve mockup tasarımıyla görselleri kusursuzlaştırıyorum.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
