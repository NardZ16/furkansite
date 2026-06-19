"use client";

import { useState } from "react";
import { createExperience, deleteExperience } from "@/actions/settings";
import { Trash2 } from "lucide-react";

type Experience = {
  id: string;
  title: string;
  company: string;
  date: string;
  description: string;
};

export default function ExperienceManager({ experiences }: { experiences: Experience[] }) {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    await createExperience(formData);
    setIsPending(false);
  }

  async function handleDelete(id: string) {
    if (confirm("Silmek istediğinize emin misiniz?")) {
      await deleteExperience(id);
    }
  }

  return (
    <div className="space-y-12">
      <form action={handleSubmit} className="bg-surface border border-white/5 p-8 rounded-2xl max-w-3xl space-y-6">
        <h2 className="text-xl font-bold font-heading">Yeni İş Deneyimi Ekle</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Unvan / Pozisyon</label>
            <input required type="text" name="title" placeholder="Örn: Video Yönetmeni" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Şirket / Kurum</label>
            <input required type="text" name="company" placeholder="Örn: Tulu Porselen" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Tarih Aralığı</label>
            <input required type="text" name="date" placeholder="Örn: 2024 - Günümüz" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Sıralama (Küçük sayı önce çıkar)</label>
            <input type="number" name="sortOrder" defaultValue="0" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted">Kısa Açıklama</label>
          <textarea required name="description" rows={3} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none"></textarea>
        </div>

        <button type="submit" disabled={isPending} className="px-6 py-3 bg-accent text-black font-bold rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50">
          {isPending ? "Ekleniyor..." : "Deneyimi Ekle"}
        </button>
      </form>

      <div className="max-w-3xl space-y-4">
        <h2 className="text-xl font-bold font-heading mb-4">Mevcut Deneyimler</h2>
        {experiences.length === 0 ? (
          <p className="text-muted">Henüz deneyim eklenmemiş.</p>
        ) : (
          experiences.map(exp => (
            <div key={exp.id} className="bg-surface border border-white/5 p-6 rounded-2xl flex justify-between items-start group hover:border-accent/30 transition-colors">
              <div>
                <h3 className="font-bold text-lg text-white">{exp.title}</h3>
                <p className="text-accent text-sm mb-2">{exp.company} | {exp.date}</p>
                <p className="text-muted text-sm">{exp.description}</p>
              </div>
              <button onClick={() => handleDelete(exp.id)} className="text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
