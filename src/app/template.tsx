"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  // We use multiple "brush strokes" (divs) that wipe across the screen to reveal the page
  const strokes = 5;
  
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[100] flex flex-col justify-center">
        {Array.from({ length: strokes }).map((_, i) => (
          <motion.div
            key={i}
            className="w-full bg-accent flex-1 origin-left"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1], // Custom bezier for fluid paint-like motion
              delay: i * 0.1, // Stagger effect to look like brush strokes
            }}
            style={{
              // Give them slight overlaps and uneven heights to simulate a brush
              transform: `rotate(${i % 2 === 0 ? 1 : -1}deg) scaleY(1.2)`,
              borderRadius: "0 100px 100px 0",
              margin: "-5px 0"
            }}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
