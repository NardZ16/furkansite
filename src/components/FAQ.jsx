import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { TextReveal } from './ui/TextReveal';

const faqs = [
  { category: 'Genel', question: "Ne tür projelerle ilgileniyorsunuz?" },
  { category: 'Genel', question: "Drone çekimleri için gerekli izinler alınıyor mu?" },
  { category: 'Genel', question: "Şehir dışı veya yurtdışı projeler kabul ediyor musunuz?" },
  { category: 'Fiyatlandırma', question: "Proje bütçesi neye göre belirleniyor?" },
  { category: 'Fiyatlandırma', question: "Saatlik mi yoksa proje bazlı mı çalışıyorsunuz?" },
  { category: 'Süreç', question: "Çekim ve kurgu süreci nasıl ilerliyor?" },
  { category: 'Sonuçlar', question: "İçeriklerin teslim süresi ortalama nedir?" },
];

export function FAQ() {
  const [activeTab, setActiveTab] = useState('Genel');

  const tabs = ['Genel', 'Fiyatlandırma', 'Süreç', 'Sonuçlar'];
  
  const filteredFaqs = faqs.filter(f => f.category === activeTab);

  return (
    <section aria-label="FAQ section" className="py-20">
      <div className="w-content-width mx-auto">
        <div className="card rounded flex flex-col gap-6 md:gap-10 p-6 md:p-10">
          <div className="flex flex-col items-center gap-2">
            <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
              <p>SSS</p>
            </div>
            <TextReveal as="h2" className="transition-all duration-700 md:max-w-8/10 text-5xl 2xl:text-6xl leading-[1.15] font-semibold text-center text-balance">
              Sıkça Sorulan Sorular
            </TextReveal>
            <TextReveal as="p" className="transition-all duration-700 md:max-w-[70%] text-base md:text-lg leading-snug text-center text-balance">
              Birlikte çalışmaya başlamadan önce merak edebileceğiniz tüm detaylar.
            </TextReveal>
            
            <div className="relative inline-flex gap-1 p-1 card rounded-full mt-2 md:mt-3">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative z-1 px-5 py-2 text-sm font-medium rounded-full cursor-pointer transition-colors duration-300 ${
                    activeTab === tab ? 'text-primary-cta-text' : 'text-foreground hover:text-foreground/80'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full primary-button pointer-events-none -z-1"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 overflow-hidden">
              <AnimatePresence mode="popLayout">
                {filteredFaqs.map((faq, i) => (
                  <motion.div 
                    key={faq.question}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="p-3 xl:p-3.5 2xl:p-4 rounded card cursor-pointer select-none group"
                  >
                    <div className="flex items-center justify-between gap-3 xl:gap-3.5 2xl:gap-4">
                      <h3 className="text-base md:text-lg font-medium leading-snug">{faq.question}</h3>
                      <div className="flex shrink-0 items-center justify-center size-8 md:size-9 rounded primary-button">
                        <Plus className="size-3.5 md:size-4 text-primary-cta-text transition-transform duration-300 group-hover:rotate-90" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
          
          <div className="w-full h-px bg-foreground/5"></div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
            <div className="flex items-center gap-3">
              <img alt="Furkan Efe Kocabaş" className="min-h-0 size-10 md:size-11 2xl:size-12 rounded-full object-cover" src="https://i.hizliresim.com/j122le7.jpg" />
              <div className="flex flex-col min-w-0">
                <span className="text-sm md:text-base text-foreground font-semibold leading-snug truncate">Başka sorularınız mı var? Ulaşın.</span>
                <span className="text-sm md:text-base text-foreground/75 leading-snug truncate">f.efekocabas1@gmail.com</span>
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <a href="#contact" className="group flex items-center justify-center h-10 px-6 text-sm rounded cursor-pointer primary-button text-primary-cta-text font-medium">
                Benimle iletişime geç
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
