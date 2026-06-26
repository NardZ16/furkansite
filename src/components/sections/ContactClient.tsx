"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { submitContact } from "@/actions/contact";
import { Send, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

export default function ContactClient() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError(null);
    setIsSuccess(false);

    const result = await submitContact(formData);

    if (result.success) {
      setIsSuccess(true);
      (document.getElementById("contactForm") as HTMLFormElement).reset();
    } else {
      setError(result.error || "Bir hata oluştu.");
    }
    
    setIsPending(false);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase block mb-4">Ulaşın</span>
        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-foreground">
          İLETİŞİME GEÇİN
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Açık pozisyonlar, tam zamanlı iş fırsatları veya proje bazlı yetenek arayışlarınız için formu doldurabilirsiniz.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TiltCard>
            <div className="bg-surface border border-muted/10 p-8 rounded-3xl mb-8 card-hover-light shadow-sm h-full">
              <h2 className="font-heading text-3xl font-bold mb-8 text-foreground">İletişim Bilgileri</h2>
              
              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="bg-accent/10 p-4 rounded-2xl text-accent mr-5 group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold tracking-wider uppercase text-muted mb-1">E-posta</p>
                    <a href="mailto:f.efekocabas1@gmail.com" className="text-foreground hover:text-accent font-semibold transition-colors text-lg">
                      f.efekocabas1@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-accent/10 p-4 rounded-2xl text-accent mr-5 group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold tracking-wider uppercase text-muted mb-1">Telefon</p>
                    <a href="tel:+905353050240" className="text-foreground hover:text-accent font-semibold transition-colors text-lg">
                      +90 535 305 02 40
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-accent/10 p-4 rounded-2xl text-accent mr-5 group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-sm">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold tracking-wider uppercase text-muted mb-1">Konum</p>
                    <p className="text-foreground font-semibold text-lg">
                      Ümraniye, İstanbul
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form id="contactForm" action={handleSubmit} className="bg-surface border border-muted/10 p-8 rounded-3xl space-y-6 shadow-md">
            <h2 className="font-heading text-3xl font-bold mb-6 text-foreground">Mesaj Gönder</h2>
            
            {isSuccess && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-700 p-4 rounded-xl flex items-center">
                <CheckCircle2 className="mr-3" /> Mesajınız başarıyla gönderildi! Size en kısa sürede dönüş yapacağım.
              </div>
            )}
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-700 p-4 rounded-xl">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[13px] font-bold tracking-wider uppercase text-muted">Ad Soyad</label>
                <input required type="text" id="name" name="name" className="w-full bg-background border border-muted/20 rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" placeholder="Adınız Soyadınız" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-[13px] font-bold tracking-wider uppercase text-muted">E-posta</label>
                <input required type="email" id="email" name="email" className="w-full bg-background border border-muted/20 rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" placeholder="ornek@email.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-[13px] font-bold tracking-wider uppercase text-muted">Telefon (Opsiyonel)</label>
                <input type="tel" id="phone" name="phone" className="w-full bg-background border border-muted/20 rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" placeholder="+90 5XX XXX XX XX" />
              </div>
              <div className="space-y-2">
                <label htmlFor="projectType" className="text-[13px] font-bold tracking-wider uppercase text-muted">Proje Türü</label>
                <select id="projectType" name="projectType" className="w-full bg-background border border-muted/20 rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none">
                  <option value="">Seçiniz...</option>
                  <option value="Video Prodüksiyon">Video Prodüksiyon</option>
                  <option value="Drone Çekimi">Drone / Hava Çekimi</option>
                  <option value="Kurgu & Montaj">Kurgu & Montaj</option>
                  <option value="Grafik Tasarım">Grafik Tasarım</option>
                  <option value="Sosyal Medya">Sosyal Medya</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-[13px] font-bold tracking-wider uppercase text-muted">Mesajınız</label>
              <textarea required id="message" name="message" rows={5} className="w-full bg-background border border-muted/20 rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none" placeholder="Projenizden veya aklınızdaki fikirden bahsedin..."></textarea>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-accent text-white font-bold py-4 rounded-xl hover:bg-accent-light shadow-md shadow-accent/20 transition-all flex items-center justify-center disabled:opacity-50"
            >
              {isPending ? "Gönderiliyor..." : (
                <>Gönder <Send size={18} className="ml-2" /></>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
