"use client";

import { motion } from "framer-motion";
import { Video, Plane, MonitorPlay, Camera, Edit3, Image as ImageIcon } from "lucide-react";

export default function ServicesClient() {
  const services = [
    {
      id: "video",
      icon: <Video size={40} />,
      title: "Video Prodüksiyon",
      desc: "Reklam filmleri, tanıtım videoları ve sosyal medya içerikleri için konsept geliştirmeden yayına kadar tüm video üretim süreçlerini yönetebilirim.",
      features: ["Senaryo & Konsept", "Yönetmenlik", "Set Yönetimi", "Profesyonel Çekim"]
    },
    {
      id: "drone",
      icon: <Plane size={40} />,
      title: "Drone & Hava Çekimi",
      desc: "Ticari İHA-1 Pilot Lisansım ile yasal ve profesyonel hava çekimleri gerçekleştirebiliyorum. Geniş açılı mekan ve dış mekan çekimlerine hakimim.",
      features: ["4K Sinematik Çekim", "İHA-1 Lisanslı Pilot", "Geniş Açı Mekan Çekimi", "Dış Mekan Prodüksiyon"]
    },
    {
      id: "post-production",
      icon: <MonitorPlay size={40} />,
      title: "Kurgu & Post-Prodüksiyon",
      desc: "Adobe Premiere Pro ve After Effects kullanarak dinamik kurgu, profesyonel renk düzenleme (Color Grading) ve ses tasarımı yapabiliyorum.",
      features: ["Dinamik Montaj", "Renk Düzenleme (Color Grading)", "Ses Tasarımı", "Hareketli Grafikler"]
    },
    {
      id: "social-media",
      icon: <Camera size={40} />,
      title: "Sosyal Medya Yönetimi",
      desc: "Instagram Reels, YouTube Shorts ve TikTok için trendlere uygun dikey formatta içerikler üretebiliyor, markanın sosyal medya dinamiklerini yönetebiliyorum.",
      features: ["İçerik Stratejisi", "Reels & Shorts Üretimi", "Kanal Yönetimi", "Trend Takibi"]
    },
    {
      id: "graphic-design",
      icon: <Edit3 size={40} />,
      title: "Grafik & Tasarım",
      desc: "Photoshop ve Illustrator programlarında ileri düzey bilgiye sahibim. Logo, kurumsal kimlik, sosyal medya şablonları ve basılı materyal tasarımları yapabilirim.",
      features: ["Logo Tasarımı", "Kurumsal Kimlik", "Sosyal Medya Görselleri", "Baskı Öncesi Hazırlık"]
    },
    {
      id: "photography",
      icon: <ImageIcon size={40} />,
      title: "Profesyonel Fotoğrafçılık",
      desc: "Ürün, mekan, etkinlik ve portre fotoğrafçılığında deneyimliyim. Çekim sonrası detaylı görsel manipülasyon ve retouch işlemlerini profesyonelce uygularım.",
      features: ["Mekan & Mimari Çekim", "Etkinlik Fotoğrafçılığı", "Ürün Çekimi", "Görsel Rötuş (Retouch)"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
          UZMANLIK ALANLARIM
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Medya prodüksiyonunun her aşamasında sahip olduğum teknik beceriler ve yaratıcı yetenekler. Fikirden son teslimata kadar projenin tüm sorumluluğunu üstlenebilirim.
        </p>
      </motion.div>

      <div className="space-y-32">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col lg:flex-row gap-12 items-center ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="w-full lg:w-1/2">
              <div className="aspect-video bg-surface rounded-2xl flex items-center justify-center border border-white/5 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className="text-accent/40 group-hover:text-accent transform group-hover:scale-110 transition-all duration-500">
                   {service.icon}
                 </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-accent/10 text-accent mb-2">
                {service.icon}
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">{service.title}</h2>
              <p className="text-lg text-muted leading-relaxed">
                {service.desc}
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-white/90">
                    <span className="w-2 h-2 rounded-full bg-accent mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
