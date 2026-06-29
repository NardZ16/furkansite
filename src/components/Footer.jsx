import React from 'react';
import { Globe, ArrowUpRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export function Footer({ hideName = false }) {
  const { data } = useData();
  return (
    <footer data-section="footer" aria-label="Site footer" className="relative w-full pb-10">
      <div className="flex flex-col w-content-width mx-auto px-6 md:px-10 pb-5 rounded-lg card">
        {!hideName && (
          <div className="w-full min-w-0 flex-1 py-6 md:py-10 lg:py-12 flex justify-center overflow-hidden">
            <h2 className="whitespace-nowrap transition-opacity duration-150 opacity-100 font-semibold text-[15vw] md:text-[205px] leading-[0.8]">
              {data.footer?.name || "Kocabaş"}
            </h2>
          </div>
        )}
        <div className="h-px w-full mb-5 bg-foreground/50"></div>
        <div className="flex flex-col gap-3 items-center justify-between md:flex-row bg-[#222] p-4 rounded-xl mt-4">
          <span className="text-sm md:text-base text-white font-medium">{data.footer?.copyright || "© 2026 Furkan Efe Kocabaş. Tüm hakları saklıdır."}</span>
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center size-10 rounded-full bg-white/10 text-white cursor-pointer hover:scale-105 hover:bg-white/20 transition-all">
              <Globe className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-center size-10 rounded-full bg-white/10 text-white cursor-pointer hover:scale-105 hover:bg-white/20 transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
