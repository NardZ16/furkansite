import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

// Varsayılan (fallback) veriler
const defaultData = {
  navbar: {
    name: "Furkan Efe Kocabaş",
    avatar: "https://i.hizliresim.com/j122le7.jpg"
  },
  hero: {
    badge: "Bu ay için 1 boşluk",
    headlinePrefix: "Görüntüleri",
    headlineHighlight: "Hikayeye Dönüştürüyorum.",
    description: "Videographer, Video Yapımcısı & Grafik Tasarım Uzmanı. Sadece estetik değil, hikaye odaklı profesyonel görsel içerikler üretiyorum."
  },
  work: {
    projects: [
      {
        title: "Tulu Porselen.",
        description: "Marka bilinirliğini artırmaya yönelik kapsamlı stratejiler ve sosyal medya için kreatif video prodüksiyonu.",
        tag: "Video & Sosyal Medya",
        image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070"
      },
      {
        title: "Radyo Dumlupınar.",
        description: "Organize Gençler programı için profesyonel çekim, ışık kurulumu ve kurgu desteği.",
        tag: "Prodüksiyon",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070"
      },
      {
        title: "Freelance Projeler.",
        description: "Çeşitli markalar ve bireyler için serbest zamanlı video çekimi ve kurgu hizmetleri.",
        tag: "Çekim & Kurgu",
        image: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071"
      }
    ]
  },
  about: {
    headline: "Çekimden kurguya kadar tüm süreci tek başına yürütebilen; konsept geliştirme, çekim, yönetmenlik ve post-prodüksiyon uzmanı.",
    name: "Furkan Efe Kocabaş",
    title: "Videographer & Tasarımcı",
    avatar: "https://i.hizliresim.com/j122le7.jpg",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com"
  },
  services: {
    headline: "Uzmanlık Alanlarım",
    description: "Markanızın ihtiyaç duyduğu tüm görsel süreçleri, ilk fikirden son piksele kadar profesyonellikle yönetiyorum.",
    list: [
      {
        id: "1",
        title: "Fotoğraf Çekimi",
        description: "Ürün, mekân ve etkinlik fotoğrafçılığı. Markanızın ruhunu yansıtan etkileyici kareler.",
        image: "https://storage.googleapis.com/webild/default/templates/creative-portfolio/photography.webp",
        colSpan: 5
      },
      {
        id: "2",
        title: "Video Çekimi & Yönetmenlik",
        description: "Stüdyo, dış mekân ve hava (drone) çekimleri; ışık, kompozisyon ve set yönetimi.",
        image: "https://storage.googleapis.com/webild/default/templates/creative-portfolio/product-design.webp",
        colSpan: 7
      },
      {
        id: "3",
        title: "Video Kurgu & Post-Prodüksiyon",
        description: "Adobe Premiere Pro & After Effects ile montaj, renk düzenleme, ses ve hareketli grafik tasarımı.",
        image: "https://storage.googleapis.com/webild/default/templates/creative-portfolio/website.webp",
        colSpan: 7
      },
      {
        id: "4",
        title: "Adobe Photoshop",
        description: "Fotoğraf manipülasyonu, görsel rötuş ve mockup tasarımıyla görselleri kusursuzlaştırıyorum.",
        image: "https://storage.googleapis.com/webild/default/templates/creative-portfolio/videos.webp",
        colSpan: 5
      }
    ]
  },
  contact: {
    headline: "Birlikte Üretelim",
    description: "Aklınızda bir proje mi var? Bana mesaj gönderin, en kısa sürede dönüş yapayım.",
    phone: "+905353050240",
    buttonText: "Hızlı Görüşme Ayarla"
  },
  footer: {
    name: "Kocabaş",
    copyright: "© 2026 Furkan Efe Kocabaş. Tüm hakları saklıdır."
  }
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  // Veritabanından veriyi çek
  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content');
      if (response.ok) {
        const dbData = await response.json();
        // Eğer dbData boş değilse state'i güncelle
        if (Object.keys(dbData).length > 0) {
          setData(dbData);
        }
      }
    } catch (error) {
      console.error("Veri çekilirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const updateData = async (newData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-password': token || ''
        },
        body: JSON.stringify(newData)
      });
      if (response.ok) {
        const updated = await response.json();
        setData(updated);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Veri güncellenirken hata oluştu:", error);
      return false;
    }
  };

  return (
    <DataContext.Provider value={{ data, updateData, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
