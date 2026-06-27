import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash, LogOut, Save, Image as ImageIcon, Video, Home, User, Briefcase, MessageSquare, Layout } from 'lucide-react';

export function Admin() {
  const { data, updateData, loading } = useData();
  const [formData, setFormData] = useState(data);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState('navbar');

  useEffect(() => {
    setFormData(data);
  }, [data]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const result = await res.json();
      if (result.success) {
        localStorage.setItem('adminToken', password);
        setIsLoggedIn(true);
      } else {
        setLoginError('Hatalı şifre.');
      }
    } catch (err) {
      setLoginError('Giriş yapılamadı.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setPassword('');
  };

  const handleChange = (section, key, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleArrayChange = (section, arrayName, index, key, value) => {
    setFormData(prev => {
      const newArray = [...(prev[section]?.[arrayName] || [])];
      newArray[index] = { ...newArray[index], [key]: value };
      return {
        ...prev,
        [section]: { ...prev[section], [arrayName]: newArray }
      };
    });
  };

  const handleAddProject = () => {
    setFormData(prev => ({
      ...prev,
      work: {
        ...prev.work,
        projects: [
          ...(prev.work?.projects || []),
          { title: 'Yeni Proje', description: 'Açıklama', tag: 'Etiket', image: '' }
        ]
      }
    }));
  };

  const handleRemoveProject = (index) => {
    setFormData(prev => ({
      ...prev,
      work: {
        ...prev.work,
        projects: prev.work.projects.filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddService = () => {
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        list: [
          ...(prev.services?.list || []),
          { id: Date.now().toString(), title: 'Yeni Hizmet', description: 'Açıklama', image: '', colSpan: 6 }
        ]
      }
    }));
  };

  const handleRemoveService = (index) => {
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        list: prev.services.list.filter((_, i) => i !== index)
      }
    }));
  };

  // --- All Projects (Gallery) Handlers ---
  const handleAddAllProject = () => {
    setFormData(prev => ({
      ...prev,
      allProjects: [
        ...(prev.allProjects || []),
        { id: Date.now().toString(), title: 'Yeni Galeri Projesi', description: 'Kısa açıklama yazısı', coverImage: '', media: [] }
      ]
    }));
  };

  const handleRemoveAllProject = (index) => {
    setFormData(prev => ({
      ...prev,
      allProjects: (prev.allProjects || []).filter((_, i) => i !== index)
    }));
  };

  const handleAllProjectChange = (index, key, value) => {
    setFormData(prev => {
      const newAll = [...(prev.allProjects || [])];
      newAll[index] = { ...newAll[index], [key]: value };
      return { ...prev, allProjects: newAll };
    });
  };

  const handleAddMedia = (projectIndex) => {
    setFormData(prev => {
      const newAll = [...(prev.allProjects || [])];
      const newMedia = [...(newAll[projectIndex].media || [])];
      newMedia.push({ type: 'image', url: '' });
      newAll[projectIndex] = { ...newAll[projectIndex], media: newMedia };
      return { ...prev, allProjects: newAll };
    });
  };

  const handleRemoveMedia = (projectIndex, mediaIndex) => {
    setFormData(prev => {
      const newAll = [...(prev.allProjects || [])];
      const newMedia = newAll[projectIndex].media.filter((_, i) => i !== mediaIndex);
      newAll[projectIndex] = { ...newAll[projectIndex], media: newMedia };
      return { ...prev, allProjects: newAll };
    });
  };

  const handleMediaChange = (projectIndex, mediaIndex, key, value) => {
    setFormData(prev => {
      const newAll = [...(prev.allProjects || [])];
      const newMedia = [...(newAll[projectIndex].media || [])];
      newMedia[mediaIndex] = { ...newMedia[mediaIndex], [key]: value };
      newAll[projectIndex] = { ...newAll[projectIndex], media: newMedia };
      return { ...prev, allProjects: newAll };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    const success = await updateData(formData);
    setIsSaving(false);
    if (success) {
      setMessage('Değişiklikler başarıyla kaydedildi!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('Hata: Kaydedilemedi! Şifreniz değişmiş olabilir.');
      handleLogout();
    }
  };

  if (loading) return <div className="min-h-screen bg-[#111] flex items-center justify-center text-white">Yükleniyor...</div>;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#111] flex flex-col items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-[#1a1a1a] rounded-2xl p-8 border border-white/10 shadow-2xl">
          <h1 className="text-2xl font-semibold text-white mb-6 text-center">Yönetim Paneli Girişi</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input 
              type="password" 
              placeholder="Şifrenizi girin" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-white/30"
              required
            />
            {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
            <button type="submit" className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition">Giriş Yap</button>
          </form>
          <a href="/" className="block text-center mt-6 text-gray-400 hover:text-white text-sm">Siteye Dön</a>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'navbar', label: 'Menü (Navbar)', icon: <Layout className="w-4 h-4" /> },
    { id: 'hero', label: 'Ana Ekran (Hero)', icon: <Home className="w-4 h-4" /> },
    { id: 'work', label: 'Vitrin Çalışmalar', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'allProjects', label: 'Tüm Projeler (Galeri)', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'about', label: 'Hakkımda (About)', icon: <User className="w-4 h-4" /> },
    { id: 'services', label: 'Hizmetler (Services)', icon: <Video className="w-4 h-4" /> },
    { id: 'contact', label: 'İletişim (Contact)', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'footer', label: 'Alt Bilgi (Footer)', icon: <Layout className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex bg-[#111] text-white font-sans">
      <div className="w-64 bg-[#161616] border-r border-white/5 flex flex-col hidden md:flex">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight">Portfolyo Admin</h2>
        </div>
        <nav className="flex-1 px-4 flex flex-col gap-1 overflow-y-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                activeTab === tab.id ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5 shrink-0">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium">
            <LogOut className="w-4 h-4" />
            Çıkış Yap
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="md:hidden flex items-center justify-between p-4 bg-[#161616] border-b border-white/5">
          <h2 className="text-xl font-bold">Admin</h2>
          <select 
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="bg-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm border border-white/10"
          >
            {tabs.map(tab => <option key={tab.id} value={tab.id}>{tab.label}</option>)}
          </select>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-4xl mx-auto pb-32">
            <div className="mb-8 flex justify-between items-center">
              <h1 className="text-2xl font-semibold">{tabs.find(t => t.id === activeTab)?.label}</h1>
              <a href="/" className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition text-sm">Siteye Dön</a>
            </div>

            {message && (
              <div className={`p-4 mb-6 rounded-lg font-medium ${message.includes('başarı') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                {message}
              </div>
            )}

            {/* TAB: NAVBAR */}
            {activeTab === 'navbar' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1 text-gray-400">İsim</label>
                    <input type="text" value={formData.navbar?.name || ''} onChange={(e) => handleChange('navbar', 'name', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-gray-400">Avatar URL</label>
                    <input type="text" value={formData.navbar?.avatar || ''} onChange={(e) => handleChange('navbar', 'avatar', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB: HERO */}
            {activeTab === 'hero' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1 text-gray-400">Başlık (Normal Kısım)</label>
                      <input type="text" value={formData.hero?.headlinePrefix || ''} onChange={(e) => handleChange('hero', 'headlinePrefix', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-gray-400">Başlık (Vurgulu Kısım)</label>
                      <input type="text" value={formData.hero?.headlineHighlight || ''} onChange={(e) => handleChange('hero', 'headlineHighlight', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-gray-400">Açıklama</label>
                    <textarea rows="3" value={formData.hero?.description || ''} onChange={(e) => handleChange('hero', 'description', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB: WORK */}
            {activeTab === 'work' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-300">Ana Sayfa Projeleri</h3>
                  <button onClick={handleAddProject} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition text-sm">
                    <Plus className="w-4 h-4" /> Yeni Ekle
                  </button>
                </div>
                
                <div className="space-y-6">
                  {(formData.work?.projects || []).map((project, index) => (
                    <div key={index} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 relative group">
                      <button onClick={() => handleRemoveProject(index)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition">
                        <Trash className="w-5 h-5" />
                      </button>
                      <h4 className="text-sm font-semibold text-gray-400 mb-4">Proje #{index + 1}</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs mb-1 text-gray-500">Proje Adı</label>
                          <input type="text" value={project.title} onChange={(e) => handleArrayChange('work', 'projects', index, 'title', e.target.value)} className="w-full bg-[#2a2a2a] border border-transparent rounded-lg p-2.5 text-white text-sm focus:border-white/30 focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs mb-1 text-gray-500">Etiket (Örn: Video Kurgu)</label>
                          <input type="text" value={project.tag} onChange={(e) => handleArrayChange('work', 'projects', index, 'tag', e.target.value)} className="w-full bg-[#2a2a2a] border border-transparent rounded-lg p-2.5 text-white text-sm focus:border-white/30 focus:outline-none" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs mb-1 text-gray-500">Görsel URL</label>
                          <input type="text" value={project.image} onChange={(e) => handleArrayChange('work', 'projects', index, 'image', e.target.value)} className="w-full bg-[#2a2a2a] border border-transparent rounded-lg p-2.5 text-white text-sm focus:border-white/30 focus:outline-none" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs mb-1 text-gray-500">Açıklama</label>
                          <textarea rows="2" value={project.description} onChange={(e) => handleArrayChange('work', 'projects', index, 'description', e.target.value)} className="w-full bg-[#2a2a2a] border border-transparent rounded-lg p-2.5 text-white text-sm focus:border-white/30 focus:outline-none" />
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!formData.work?.projects || formData.work.projects.length === 0) && (
                    <p className="text-gray-500 text-sm italic">Henüz proje eklenmemiş.</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB: ALL PROJECTS (GALLERY) */}
            {activeTab === 'allProjects' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="flex justify-between items-center bg-[#1a1a1a] p-4 rounded-xl border border-white/10">
                  <div>
                    <h3 className="text-lg font-medium text-white">Projeler Galerisi</h3>
                    <p className="text-sm text-gray-400">Bu projeler detaylı "Projeler" sayfasında görünür.</p>
                  </div>
                  <button onClick={handleAddAllProject} className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-5 py-2.5 rounded-lg transition text-sm font-semibold">
                    <Plus className="w-4 h-4" /> Yeni Proje Kartı Ekle
                  </button>
                </div>
                
                <div className="space-y-10">
                  {(formData.allProjects || []).map((project, pIndex) => (
                    <div key={pIndex} className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 relative">
                      <div className="flex justify-between items-start mb-6">
                        <h4 className="text-lg font-semibold text-white">Proje #{pIndex + 1}</h4>
                        <button onClick={() => handleRemoveAllProject(pIndex)} className="text-gray-500 hover:text-red-400 transition bg-red-500/10 p-2 rounded-lg">
                          <Trash className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-5 mb-8">
                        <div>
                          <label className="block text-sm mb-1 text-gray-400">Proje Adı</label>
                          <input type="text" value={project.title} onChange={(e) => handleAllProjectChange(pIndex, 'title', e.target.value)} className="w-full bg-[#2a2a2a] border border-transparent rounded-xl p-3 text-white text-sm focus:border-white/30 focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm mb-1 text-gray-400">Kapak Görseli URL</label>
                          <input type="text" value={project.coverImage || ''} onChange={(e) => handleAllProjectChange(pIndex, 'coverImage', e.target.value)} className="w-full bg-[#2a2a2a] border border-transparent rounded-xl p-3 text-white text-sm focus:border-white/30 focus:outline-none" placeholder="https://..." />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm mb-1 text-gray-400">Açıklama</label>
                          <textarea rows="2" value={project.description} onChange={(e) => handleAllProjectChange(pIndex, 'description', e.target.value)} className="w-full bg-[#2a2a2a] border border-transparent rounded-xl p-3 text-white text-sm focus:border-white/30 focus:outline-none" />
                        </div>
                      </div>

                      {/* Medias Section */}
                      <div className="bg-[#111] border border-white/5 rounded-xl p-5">
                        <div className="flex justify-between items-center mb-4">
                          <h5 className="text-sm font-medium text-gray-300">Medya Galerisi (Görsel ve Videolar)</h5>
                          <button onClick={() => handleAddMedia(pIndex)} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition text-xs font-medium">
                            <Plus className="w-3 h-3" /> Medya Ekle
                          </button>
                        </div>

                        <div className="space-y-4">
                          {(project.media || []).map((item, mIndex) => (
                            <div key={mIndex} className="flex gap-3 items-start bg-[#1a1a1a] p-3 rounded-lg border border-white/5 relative">
                              <div className="w-32 shrink-0">
                                <label className="block text-xs mb-1 text-gray-500">Tip</label>
                                <select 
                                  value={item.type} 
                                  onChange={(e) => handleMediaChange(pIndex, mIndex, 'type', e.target.value)}
                                  className="w-full bg-[#2a2a2a] text-white rounded-lg p-2 text-xs border border-transparent focus:border-white/30"
                                >
                                  <option value="image">Görsel (Resim)</option>
                                  <option value="video">Video (YouTube/mp4)</option>
                                </select>
                              </div>
                              <div className="flex-1 min-w-0">
                                <label className="block text-xs mb-1 text-gray-500">Medya Linki (URL)</label>
                                <input 
                                  type="text" 
                                  value={item.url} 
                                  onChange={(e) => handleMediaChange(pIndex, mIndex, 'url', e.target.value)} 
                                  className="w-full bg-[#2a2a2a] border border-transparent rounded-lg p-2 text-white text-xs focus:border-white/30 focus:outline-none" 
                                  placeholder="https://..."
                                />
                              </div>
                              <button onClick={() => handleRemoveMedia(pIndex, mIndex)} className="mt-5 text-gray-500 hover:text-red-400 transition">
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          {(!project.media || project.media.length === 0) && (
                            <p className="text-gray-500 text-xs italic">Henüz görsel veya video eklenmemiş.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!formData.allProjects || formData.allProjects.length === 0) && (
                    <p className="text-gray-500 text-sm italic text-center py-10">Henüz galeri projesi eklenmemiş.</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB: ABOUT */}
            {activeTab === 'about' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm mb-1 text-gray-400">Biyografi</label>
                    <textarea rows="3" value={formData.about?.headline || ''} onChange={(e) => handleChange('about', 'headline', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-gray-400">Unvan</label>
                    <input type="text" value={formData.about?.title || ''} onChange={(e) => handleChange('about', 'title', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-gray-400">Fotoğraf URL</label>
                    <input type="text" value={formData.about?.avatar || ''} onChange={(e) => handleChange('about', 'avatar', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-gray-400">Instagram Linki</label>
                    <input type="text" value={formData.about?.instagram || ''} onChange={(e) => handleChange('about', 'instagram', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-gray-400">YouTube Linki</label>
                    <input type="text" value={formData.about?.youtube || ''} onChange={(e) => handleChange('about', 'youtube', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB: SERVICES */}
            {activeTab === 'services' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-white/10 pb-6">
                  <div>
                    <label className="block text-sm mb-1 text-gray-400">Ana Başlık</label>
                    <input type="text" value={formData.services?.headline || ''} onChange={(e) => handleChange('services', 'headline', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm mb-1 text-gray-400">Açıklama</label>
                    <textarea rows="2" value={formData.services?.description || ''} onChange={(e) => handleChange('services', 'description', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30" />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-300">Hizmet Kartları</h3>
                  <button onClick={handleAddService} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition text-sm">
                    <Plus className="w-4 h-4" /> Yeni Ekle
                  </button>
                </div>
                
                <div className="space-y-6">
                  {(formData.services?.list || []).map((service, index) => (
                    <div key={index} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 relative group">
                      <button onClick={() => handleRemoveService(index)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition">
                        <Trash className="w-5 h-5" />
                      </button>
                      <h4 className="text-sm font-semibold text-gray-400 mb-4">Hizmet #{index + 1}</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs mb-1 text-gray-500">Başlık</label>
                          <input type="text" value={service.title} onChange={(e) => handleArrayChange('services', 'list', index, 'title', e.target.value)} className="w-full bg-[#2a2a2a] border border-transparent rounded-lg p-2.5 text-white text-sm focus:border-white/30 focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs mb-1 text-gray-500">Görsel URL</label>
                          <input type="text" value={service.image} onChange={(e) => handleArrayChange('services', 'list', index, 'image', e.target.value)} className="w-full bg-[#2a2a2a] border border-transparent rounded-lg p-2.5 text-white text-sm focus:border-white/30 focus:outline-none" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs mb-1 text-gray-500">Kısa Açıklama</label>
                          <textarea rows="2" value={service.description} onChange={(e) => handleArrayChange('services', 'list', index, 'description', e.target.value)} className="w-full bg-[#2a2a2a] border border-transparent rounded-lg p-2.5 text-white text-sm focus:border-white/30 focus:outline-none" />
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!formData.services?.list || formData.services.list.length === 0) && (
                    <p className="text-gray-500 text-sm italic">Henüz hizmet eklenmemiş.</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB: CONTACT */}
            {activeTab === 'contact' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1 text-gray-400">Başlık</label>
                    <input type="text" value={formData.contact?.headline || ''} onChange={(e) => handleChange('contact', 'headline', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm mb-1 text-gray-400">Açıklama</label>
                    <textarea rows="2" value={formData.contact?.description || ''} onChange={(e) => handleChange('contact', 'description', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-gray-400">Telefon Numarası</label>
                    <input type="text" value={formData.contact?.phone || ''} onChange={(e) => handleChange('contact', 'phone', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-gray-400">E-Posta Adresi</label>
                    <input type="text" value={formData.contact?.email || ''} onChange={(e) => handleChange('contact', 'email', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB: FOOTER */}
            {activeTab === 'footer' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1 text-gray-400">Logo Metni (Büyük İsim)</label>
                    <input type="text" value={formData.footer?.name || ''} onChange={(e) => handleChange('footer', 'name', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm mb-1 text-gray-400">Telif Hakkı Metni (Copyright)</label>
                    <input type="text" value={formData.footer?.copyright || ''} onChange={(e) => handleChange('footer', 'copyright', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30" />
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>

        {/* Save Bar */}
        <div className="bg-[#161616] border-t border-white/5 p-4 md:p-6 flex justify-end shrink-0 z-50">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </div>
    </div>
  );
}
