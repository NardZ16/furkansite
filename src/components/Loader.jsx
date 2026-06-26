import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Loader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + 2; // Simulate loading
      });
    }, 20);
    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] text-primary-cta-text"
    >
      <div className="absolute inset-0 w-full h-full bg-[#111]">
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-2 bg-primary-cta-text" 
          style={{ transformOrigin: "0% 50%" }}
          animate={{ scaleX: progress / 100 }}
          transition={{ ease: "linear", duration: 0.1 }}
        />
      </div>
      <div className="relative z-2 flex flex-col justify-center items-center w-full h-full gap-4 md:gap-5">
        <div className="card p-px rounded-full">
          <img 
            alt="FURKAN EFE KOCABAŞ" 
            className="size-12 md:size-16 rounded-full object-cover" 
            src="https://i.hizliresim.com/j122le7.jpg" 
          />
        </div>
        <div className="relative flex justify-center items-center">
          <span className="absolute text-center text-2xl md:text-4xl font-medium tracking-tight opacity-20">
            FURKAN EFE KOCABAŞ
          </span>
          <motion.span 
            className="text-2xl md:text-4xl font-medium tracking-tight" 
            style={{ clipPath: `inset(0% ${100 - progress}% 0% 0%)` }}
          >
            FURKAN EFE KOCABAŞ
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
