import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaRenderer } from './MediaRenderer';

export function CarouselModal({ project, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mediaList = project?.media || [];

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentIndex, mediaList]);

  const handleNext = () => {
    if (mediaList.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % mediaList.length);
    }
  };

  const handlePrev = () => {
    if (mediaList.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
    }
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
          <div>
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            {mediaList.length > 0 && (
              <p className="text-gray-400 text-sm">{currentIndex + 1} / {mediaList.length}</p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="w-full h-full flex items-center justify-center p-4 md:p-10 relative mt-10 md:mt-0">
          {mediaList.length === 0 ? (
            <div className="text-gray-500">Bu projede henüz medya bulunmuyor.</div>
          ) : (
            <div className="w-full max-w-6xl h-[65vh] md:h-[85vh] relative bg-black rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <MediaRenderer media={mediaList[currentIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {mediaList.length > 1 && (
          <>
            <button 
              onClick={handlePrev}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50 backdrop-blur-md"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50 backdrop-blur-md"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
