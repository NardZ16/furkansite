"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/actions/projects";

type Category = { id: string; name: string };

export default function ProjectForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError(null);
    
    const result = await createProject(formData);
    
    if (result.success) {
      router.push("/admin/projects");
      router.refresh();
    } else {
      setError(result.error || "Bir hata oluştu");
      setIsPending(false);
    }
  }

  return (
    <form action={handleSubmit} className="bg-surface border border-white/5 p-8 rounded-2xl max-w-2xl space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-muted">Proje Başlığı *</label>
        <input required type="text" id="title" name="title" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
      </div>

      <div className="space-y-2">
        <label htmlFor="categoryId" className="text-sm font-medium text-muted">Kategori *</label>
        <select required id="categoryId" name="categoryId" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none">
          <option value="">Seçiniz...</option>
          {categories.map(c => (
             <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-muted">Açıklama *</label>
        <textarea required id="description" name="description" rows={4} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none"></textarea>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="mediaType" className="text-sm font-medium text-muted">Medya Tipi</label>
          <select id="mediaType" name="mediaType" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none">
            <option value="video">Video</option>
            <option value="image">Görsel</option>
            <option value="embed">Embed (YouTube/Vimeo vb.)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="clientName" className="text-sm font-medium text-muted">Müşteri / Kurum</label>
          <input type="text" id="clientName" name="clientName" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="coverImage" className="text-sm font-medium text-muted">Kapak Görseli URL (Opsiyonel)</label>
        <input type="url" id="coverImage" name="coverImage" placeholder="https://..." className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
      </div>

      <div className="space-y-2">
        <label htmlFor="mediaUrl" className="text-sm font-medium text-muted">Medya Linki URL (Opsiyonel)</label>
        <input type="url" id="mediaUrl" name="mediaUrl" placeholder="https://..." className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 text-muted hover:text-white transition-colors mr-4"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="px-8 py-3 bg-accent text-black font-bold rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50"
        >
          {isPending ? "Kaydediliyor..." : "Projeyi Kaydet"}
        </button>
      </div>
    </form>
  );
}
