import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function TextReveal({ children, as: Component = 'div', className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Handle strings or elements
  let words = [];
  if (typeof children === 'string') {
    words = children.split(' ');
  } else if (Array.isArray(children)) {
    // Basic extraction if it's an array of strings, we'll just handle strings for now
    words = children.join('').split(' ');
  }

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  if (typeof children === 'string') {
    return (
      <Component ref={ref} className={className}>
        <motion.span
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {words.map((word, index) => (
            <motion.span
              variants={child}
              style={{ display: 'inline-block', marginRight: '0.25em' }}
              key={index}
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </Component>
    );
  }

  return (
    <Component ref={ref} className={className}>
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </Component>
  );
}
