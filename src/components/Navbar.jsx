import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ArrowUpRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export function Navbar() {
  const { data } = useData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Çalışmalar', href: '#work' },
    { label: 'Hakkımda', href: '#about' },
    { label: 'Hizmetler', href: '#services' },
    { label: 'İletişim', href: '#contact' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className="fixed z-[1000] top-5 left-1/2 -translate-x-1/2 w-content-width flex justify-center"
    >
      <motion.nav 
        layout
        data-section="navbar" 
        className="w-full md:w-1/2 max-w-[450px]"
      >
        <motion.div 
          layout
          className={`overflow-hidden backdrop-blur-md transition-colors duration-300 ${
            isMenuOpen 
              ? "bg-[#f5f5f5] dark:bg-[#1a1a1a] rounded-[2rem] p-3 shadow-2xl border border-black/5 dark:border-white/5" 
              : "card rounded bg-black/5 dark:bg-white/10"
          }`}
        >
          {/* Header (Always Visible) */}
          <motion.div layout className={`relative z-10 flex items-center justify-between ${isMenuOpen ? "px-2 py-1" : "p-3 xl:p-4 2xl:p-5"}`}>
            <a href="/" className="flex items-center gap-2 md:gap-3" onClick={() => setIsMenuOpen(false)}>
              <img 
                alt={data.navbar?.name || "Furkan Efe Kocabaş"} 
                className={`rounded-full object-cover transition-all duration-300 ${isMenuOpen ? "h-10 w-10 shadow-sm" : "h-8 w-8"}`} 
                src={data.navbar?.avatar || "https://i.hizliresim.com/j122le7.jpg"} 
              />
              <span className={`font-medium transition-all duration-300 ${isMenuOpen ? "text-xl text-black dark:text-white" : "text-xl text-foreground"}`}>
                {data.navbar?.name || "Furkan Efe Kocabaş"}
              </span>
            </a>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center justify-center shrink-0 transition-all duration-300 ${
                isMenuOpen 
                  ? "size-10 rounded-full bg-[#18181b] dark:bg-white text-white dark:text-black hover:scale-105 shadow-md"
                  : "size-9 rounded primary-button text-primary-cta-text"
              }`}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Plus className="w-1/2 h-1/2 transition-transform duration-300 rotate-0 hover:rotate-90" />
              )}
            </button>
          </motion.div>

          {/* Expandable Menu Content */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-6 px-2 pb-2 pt-5">
                  {/* Menu Items */}
                  <div className="flex flex-col bg-white dark:bg-[#252525] rounded-[1.5rem] p-1 shadow-sm border border-black/5 dark:border-white/5">
                    {menuItems.map((item, index) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center justify-between px-4 py-4 text-[17px] font-medium text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors rounded-xl ${
                          index !== menuItems.length - 1 ? 'border-b border-black/10 dark:border-white/10 rounded-b-none' : ''
                        } ${index !== 0 ? 'rounded-t-none' : ''}`}
                      >
                        {item.label}
                        <ArrowUpRight className="w-5 h-5 opacity-50" />
                      </a>
                    ))}
                  </div>

                  {/* Contact Button */}
                  <a 
                    href="#contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full py-4 bg-[#18181b] dark:bg-white text-white dark:text-black text-center font-medium rounded-2xl hover:scale-[1.02] transition-transform shadow-md"
                  >
                    İletişime Geç
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.nav>
    </motion.div>
  );
}
