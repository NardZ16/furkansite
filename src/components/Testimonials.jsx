import React from 'react';
import { Star } from 'lucide-react';
import { TextReveal } from './ui/TextReveal';
import { motion } from 'framer-motion';

export function Testimonials() {
  return (
    <section aria-label="Testimonials section" className="py-20">
      <div className="flex flex-col items-center gap-5 w-content-width mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex gap-1.5"
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-6 h-6 text-accent fill-accent" />
          ))}
        </motion.div>
        
        <TextReveal as="p" className="transition-all duration-700 md:max-w-8/10 text-4xl 2xl:text-5xl leading-[1.15] font-semibold text-center text-balance">
          Furkan Efe ile çalışmak, vizyonumuzu tam anlamıyla anlayan ve onu hayal ettiğimizden bile daha profesyonel bir görsel hikayeye dönüştüren deneyimli bir çözüm ortağına sahip olmak gibiydi.
        </TextReveal>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-4 mt-6"
        >
          <img 
            alt="Müşteri Avatarı" 
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-accent" 
            src="https://storage.googleapis.com/webild/default/templates/creative-portfolio/client-1.webp" 
          />
          <div className="flex flex-col items-center text-center">
            <span className="font-semibold text-xl">Tulu Porselen</span>
            <span className="text-foreground/70">Kurumsal Pazarlama Ekibi</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
