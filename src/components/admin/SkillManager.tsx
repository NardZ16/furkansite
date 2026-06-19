"use client";

import { useState } from "react";
import { createSkill, deleteSkill } from "@/actions/settings";
import { Trash2 } from "lucide-react";
// Import icons dynamically or just display the name for simplicity in admin
import * as LucideIcons from "lucide-react";

type Skill = {
  id: string;
  iconName: string;
  title: string;
  description: string;
};

export default function SkillManager({ skills }: { skills: Skill[] }) {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    await createSkill(formData);
    setIsPending(false);
  }

  async function handleDelete(id: string) {
    if (confirm("Silmek istediğinize emin misiniz?")) {
      await deleteSkill(id);
    }
  }

  return (
    <div className="space-y-12">
      <form action={handleSubmit} className="bg-surface border border-white/5 p-8 rounded-2xl max-w-3xl space-y-6">
        <h2 className="text-xl font-bold font-heading">Yeni Uzmanlık Alanı Ekle</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Başlık</label>
            <input required type="text" name="title" placeholder="Örn: Video Prodüksiyon" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">İkon Adı (Lucide React)</label>
            <input required type="text" name="iconName" placeholder="Örn: Video, Camera, Edit" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted">Sıralama</label>
          <input type="number" name="sortOrder" defaultValue="0" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted">Açıklama</label>
          <textarea required name="description" rows={3} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none"></textarea>
        </div>

        <button type="submit" disabled={isPending} className="px-6 py-3 bg-accent text-black font-bold rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50">
          {isPending ? "Ekleniyor..." : "Uzmanlık Ekle"}
        </button>
      </form>

      <div className="max-w-3xl space-y-4">
        <h2 className="text-xl font-bold font-heading mb-4">Mevcut Uzmanlıklar</h2>
        {skills.length === 0 ? (
          <p className="text-muted">Henüz uzmanlık eklenmemiş.</p>
        ) : (
          skills.map(skill => {
            const IconComponent = (LucideIcons as any)[skill.iconName] || LucideIcons.CheckCircle;
            return (
              <div key={skill.id} className="bg-surface border border-white/5 p-6 rounded-2xl flex justify-between items-start group hover:border-accent/30 transition-colors">
                <div className="flex gap-4">
                  <div className="text-accent mt-1">
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">{skill.title}</h3>
                    <p className="text-muted text-sm">{skill.description}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(skill.id)} className="text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
