"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Portfolyo", href: "/portfolio" },
    { name: "Uzmanlık", href: "/services" },
    { name: "İletişim", href: "/contact" },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto relative">
        <motion.div
          layout
          className={`flex items-center gap-3 bg-white/70 backdrop-blur-xl border border-gray-200/50 shadow-sm p-1.5 pr-4 rounded-full transition-shadow duration-300 ${
            scrolled ? "shadow-md bg-white/90" : ""
          }`}
        >
          {/* Avatar & Name */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <Image 
                src="https://i.hizliresim.com/j122le7.jpg" 
                alt="Furkan Efe" 
                width={36} 
                height={36} 
                className="object-cover w-full h-full"
              />
            </div>
            <span className="font-sans text-[14px] font-semibold tracking-tight text-[#111827]">
              Furkan Efe
            </span>
          </Link>

          {/* Divider */}
          <div className="w-px h-4 bg-gray-200 mx-1"></div>

          {/* Dropdown Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={18} strokeWidth={2.5} />
            </motion.div>
          </button>
        </motion.div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-3 w-48 mx-auto -ml-8 bg-white/90 backdrop-blur-2xl border border-gray-200/50 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-2 space-y-1">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2.5 text-[13px] font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
