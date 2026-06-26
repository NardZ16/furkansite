"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, X, ArrowUpRight, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { name: "Portfolyo", href: "/portfolio", icon: ArrowUpRight },
    { name: "Hakkımda", href: "/#about", icon: ArrowRight },
    { name: "Uzmanlık", href: "/services", icon: ArrowUpRight },
    { name: "İletişim", href: "/contact", icon: ArrowUpRight },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto relative">
        <motion.div
          layout
          initial={{ borderRadius: 9999 }}
          animate={{
            borderRadius: isOpen ? 32 : 9999, // 32px for rounded-2xl, 9999 for pill
          }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
          className={`overflow-hidden bg-[#F9F9F9]/95 backdrop-blur-2xl border border-gray-200/50 flex flex-col ${
            scrolled && !isOpen ? "shadow-md bg-white/95" : "shadow-sm"
          } ${isOpen ? "w-[380px] sm:w-[420px] shadow-2xl" : "w-[360px] sm:w-[400px]"}`}
        >
          {/* Header Area (Always Visible) */}
          <motion.div layout="position" className="flex items-center justify-between p-2">
            <Link href="/" className="flex items-center gap-4 pl-1" onClick={() => setIsOpen(false)}>
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-black/5">
                <Image 
                  src="https://i.hizliresim.com/j122le7.jpg" 
                  alt="Furkan Efe" 
                  width={40} 
                  height={40} 
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="font-sans text-[16px] font-medium tracking-tight text-[#111827]">
                Furkan Efe Kocabaş
              </span>
            </Link>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#111827] text-white hover:bg-black transition-colors shadow-md flex-shrink-0"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                {isOpen ? <X size={20} strokeWidth={2} /> : <Plus size={20} strokeWidth={2} />}
              </motion.div>
            </button>
          </motion.div>

          {/* Collapsible Menu Area */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              >
                <div className="p-3 pt-0">
                  <div className="bg-[#F3F4F6]/50 rounded-[1.5rem] p-4 flex flex-col">
                    {links.map((link, index) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center justify-between py-4 group ${
                            index !== links.length - 1 ? "border-b border-gray-300/60" : ""
                          }`}
                        >
                          <span className="font-sans text-[18px] font-medium text-[#111827] group-hover:pl-2 transition-all duration-300">
                            {link.name}
                          </span>
                          <Icon size={20} className="text-[#111827] opacity-80 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-300" />
                        </Link>
                      );
                    })}
                  </div>

                  {/* Bottom Contact Button */}
                  <div className="mt-4 px-1 pb-1">
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center w-full py-4 bg-[#111827] text-white font-sans text-[15px] font-medium rounded-full hover:bg-black transition-colors shadow-lg"
                    >
                      İletişim
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
