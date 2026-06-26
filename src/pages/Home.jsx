import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Work } from '../components/Work';
import { Testimonials } from '../components/Testimonials';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { FAQ } from '../components/FAQ';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { useData } from '../context/DataContext';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { loading: dataLoading } = useData();

  useEffect(() => {
    // Lenis smooth scroll başlat
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Loader simulation (or wait for data)
    if (!dataLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000); // 2 saniyelik loader gösterimi
      return () => {
        clearTimeout(timer);
        lenis.destroy();
      };
    }
  }, [dataLoading]);

  return (
    <>
      <AnimatePresence>
        {(isLoading || dataLoading) && <Loader key="loader" />}
      </AnimatePresence>

      {!dataLoading && (
        <div className="relative min-h-screen font-sans overflow-hidden">
          <div 
        className="fixed inset-0 -z-10 pointer-events-none select-none" 
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(100% 100% at top right, var(--color-background-accent) 0%, transparent 70%),
            radial-gradient(100% 100% at bottom left, var(--color-background-accent) 0%, transparent 70%),
            var(--color-background)
          `
        }}
      ></div>
      <Navbar isLoading={isLoading} />
      <main>
        <Hero />
        <Work />
        <Testimonials />
        <About />
        <Services />
        <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
      )}
    </>
  );
}
