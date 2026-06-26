import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';

export function Admin() {
  const { data, updateData, loading } = useData();
  const [formData, setFormData] = useState(data);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (section, key, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    const success = await updateData(formData);
    setIsSaving(false);
    if (success) {
      setMessage('Değişiklikler başarıyla kaydedildi!');
    } else {
      setMessage('Hata: Kaydedilemedi!');
    }
  };

  if (loading) return <div className="p-10 text-white">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-[#111] text-white p-10 font-sans">
      <div className="max-w-4xl mx-auto bg-[#1a1a1a] rounded-2xl p-8 shadow-2xl border border-white/10">
        <div className="flex justify-between items-center mb-10 pb-5 border-b border-white/10">
          <h1 className="text-3xl font-semibold">Portfolyo Yönetim Paneli</h1>
          <a href="/" className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition text-sm">Siteye Dön</a>
        </div>

        {message && (
          <div className={`p-4 mb-6 rounded-lg ${message.includes('başarı') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
            {message}
          </div>
        )}

        <div className="space-y-12">
          {/* Navbar & Genel */}
          <section>
            <h2 className="text-xl font-medium mb-4 text-gray-300">Genel / Navbar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-gray-400">İsim</label>
                <input 
                  type="text" 
                  value={formData.navbar?.name || ''} 
                  onChange={(e) => handleChange('navbar', 'name', e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-400">Avatar URL</label>
                <input 
                  type="text" 
                  value={formData.navbar?.avatar || ''} 
                  onChange={(e) => handleChange('navbar', 'avatar', e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30"
                />
              </div>
            </div>
          </section>

          {/* Hero */}
          <section>
            <h2 className="text-xl font-medium mb-4 text-gray-300">Açılış (Hero)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-gray-400">Rozet Metni</label>
                <input 
                  type="text" 
                  value={formData.hero?.badge || ''} 
                  onChange={(e) => handleChange('hero', 'badge', e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-400">Başlık (İlk Kısım)</label>
                <input 
                  type="text" 
                  value={formData.hero?.headlinePrefix || ''} 
                  onChange={(e) => handleChange('hero', 'headlinePrefix', e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1 text-gray-400">Başlık (Vurgulu Kısım)</label>
                <input 
                  type="text" 
                  value={formData.hero?.headlineHighlight || ''} 
                  onChange={(e) => handleChange('hero', 'headlineHighlight', e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1 text-gray-400">Açıklama</label>
                <textarea 
                  rows="3"
                  value={formData.hero?.description || ''} 
                  onChange={(e) => handleChange('hero', 'description', e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30"
                />
              </div>
            </div>
          </section>
          
          {/* About */}
          <section>
            <h2 className="text-xl font-medium mb-4 text-gray-300">Hakkımda</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm mb-1 text-gray-400">Biyografi (Başlık)</label>
                <textarea 
                  rows="2"
                  value={formData.about?.headline || ''} 
                  onChange={(e) => handleChange('about', 'headline', e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-400">Unvan</label>
                <input 
                  type="text" 
                  value={formData.about?.title || ''} 
                  onChange={(e) => handleChange('about', 'title', e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-400">Fotoğraf URL</label>
                <input 
                  type="text" 
                  value={formData.about?.avatar || ''} 
                  onChange={(e) => handleChange('about', 'avatar', e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-400">Instagram Linki</label>
                <input 
                  type="text" 
                  value={formData.about?.instagram || ''} 
                  onChange={(e) => handleChange('about', 'instagram', e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-400">YouTube Linki</label>
                <input 
                  type="text" 
                  value={formData.about?.youtube || ''} 
                  onChange={(e) => handleChange('about', 'youtube', e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30"
                />
              </div>
            </div>
          </section>

        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition disabled:opacity-50"
          >
            {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </div>
    </div>
  );
}
