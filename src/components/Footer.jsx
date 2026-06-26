import React from 'react';
import { Globe, ArrowUpRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export function Footer() {
  const { data } = useData();
  return (
    <footer data-section="footer" aria-label="Site footer" className="relative w-full py-20">
      <div className="flex flex-col w-content-width mx-auto px-6 md:px-10 pb-5 rounded-lg card">
        <div className="w-full min-w-0 flex-1 py-10 md:py-16 lg:py-20 flex justify-center overflow-hidden">
          <h2 className="whitespace-nowrap transition-opacity duration-150 opacity-100 font-semibold text-[15vw] md:text-[205px] leading-[0.8]">
            {data.footer?.name || "Kocabaş"}
          </h2>
        </div>
        <div className="h-px w-full mb-5 bg-foreground/50"></div>
        <div className="flex flex-col gap-3 items-center justify-between md:flex-row">
          <span className="text-base opacity-75">{data.footer?.copyright || "© 2026 Furkan Efe Kocabaş. Tüm hakları saklıdır."}</span>
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center size-10 rounded-full primary-button text-primary-cta-text cursor-pointer hover:scale-105 transition-transform">
              <Globe className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-center size-10 rounded-full primary-button text-primary-cta-text cursor-pointer hover:scale-105 transition-transform">
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
