"use client";

import { useState } from "react";
import { updateSiteSettings } from "@/actions/settings";
import { Save } from "lucide-react";

type SettingsProps = {
  heroTitle: string;
  heroSubtitle: string;
  aboutText1: string;
  aboutText2: string;
  licenseTitle: string;
  licenseDesc: string;
  heroImage: string;
};

export default function SiteSettingsForm({ settings }: { settings: SettingsProps | null }) {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{type: 'success'|'error', text: string} | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setMessage(null);
    const result = await updateSiteSettings(formData);
    if (result.success) {
      setMessage({ type: 'success', text: 'Ayarlar başarıyla güncellendi.' });
    } else {
      setMessage({ type: 'error', text: result.error || 'Hata oluştu.' });
    }
    setIsPending(false);
  }

  return (
    <form action={handleSubmit} className="space-y-6 bg-surface border border-white/5 p-8 rounded-2xl max-w-3xl">
      {message && (
        <div className={`p-4 rounded-xl border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted">Ana Başlık</label>
          <input required type="text" name="heroTitle" defaultValue={settings?.heroTitle || "BEN KİMİM?"} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted">Alt Başlık (Meslek/Unvan)</label>
          <input required type="text" name="heroSubtitle" defaultValue={settings?.heroSubtitle || "Videographer, Video Yapımcısı & Grafik Tasarım Uzmanı"} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted">Hakkımda Paragraf 1</label>
        <textarea required name="aboutText1" rows={3} defaultValue={settings?.aboutText1 || "Çekimden kurguya kadar tüm süreci tek başına yürütebilen..."} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none"></textarea>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted">Hakkımda Paragraf 2</label>
        <textarea required name="aboutText2" rows={3} defaultValue={settings?.aboutText2 || "Konsept geliştirme, çekim, yönetmenlik ve post-prodüksiyon..."} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none"></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted">Özel Yetenek Başlığı</label>
          <input required type="text" name="licenseTitle" defaultValue={settings?.licenseTitle || "Ticari İHA-1 Pilot Lisansı"} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted">Özel Yetenek Açıklaması</label>
          <input required type="text" name="licenseDesc" defaultValue={settings?.licenseDesc || "Profesyonel Drone ve Hava Çekimi Yetkisi"} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted">Profil Görseli URL</label>
        <input required type="text" name="heroImage" defaultValue={settings?.heroImage || "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=2070&auto=format&fit=crop"} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center px-8 py-3 bg-accent text-black font-bold rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50"
        >
          <Save size={18} className="mr-2" />
          {isPending ? "Kaydediliyor..." : "Ayarları Kaydet"}
        </button>
      </div>
    </form>
  );
}
