"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { submitContact } from "@/actions/contact";
import { Send, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
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
          <div className="bg-surface border border-white/5 p-8 rounded-2xl mb-8">
            <h2 className="font-heading text-2xl font-bold mb-8">İletişim Bilgileri</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-accent/10 p-3 rounded-xl text-accent mr-4">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">E-posta</p>
                  <a href="mailto:f.efekocabas1@gmail.com" className="text-white hover:text-accent font-medium transition-colors text-lg">
                    f.efekocabas1@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent/10 p-3 rounded-xl text-accent mr-4">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Telefon</p>
                  <a href="tel:+905353050240" className="text-white hover:text-accent font-medium transition-colors text-lg">
                    +90 535 305 02 40
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent/10 p-3 rounded-xl text-accent mr-4">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Konum</p>
                  <p className="text-white font-medium text-lg">
                    Ümraniye, İstanbul
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form id="contactForm" action={handleSubmit} className="bg-surface border border-white/5 p-8 rounded-2xl space-y-6">
            <h2 className="font-heading text-2xl font-bold mb-6">Mesaj Gönder</h2>
            
            {isSuccess && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-center">
                <CheckCircle2 className="mr-3" /> Mesajınız başarıyla gönderildi! Size en kısa sürede dönüş yapacağım.
              </div>
            )}
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-muted">Ad Soyad</label>
                <input required type="text" id="name" name="name" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="Adınız Soyadınız" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-muted">E-posta</label>
                <input required type="email" id="email" name="email" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="ornek@email.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-muted">Telefon (Opsiyonel)</label>
                <input type="tel" id="phone" name="phone" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="+90 5XX XXX XX XX" />
              </div>
              <div className="space-y-2">
                <label htmlFor="projectType" className="text-sm font-medium text-muted">Proje Türü</label>
                <select id="projectType" name="projectType" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none">
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
              <label htmlFor="message" className="text-sm font-medium text-muted">Mesajınız</label>
              <textarea required id="message" name="message" rows={5} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Projenizden veya aklınızdaki fikirden bahsedin..."></textarea>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-accent text-black font-bold py-4 rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center disabled:opacity-50"
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
