import prisma from "@/lib/prisma";
import { FolderKanban, MessageSquare, PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const projectCount = await prisma.project.count();
  const unreadMessagesCount = await prisma.contactMessage.count({
    where: { isRead: false }
  });

  return (
    <div className="p-8">
      <h1 className="font-heading text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-surface border border-white/5 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-muted text-sm font-medium mb-1">Toplam Proje</p>
            <h2 className="text-3xl font-bold">{projectCount}</h2>
          </div>
          <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
            <FolderKanban size={24} />
          </div>
        </div>

        <div className="bg-surface border border-white/5 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-muted text-sm font-medium mb-1">Okunmamış Mesajlar</p>
            <h2 className="text-3xl font-bold">{unreadMessagesCount}</h2>
          </div>
          <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center">
            <MessageSquare size={24} />
          </div>
        </div>
      </div>

      <h2 className="font-heading text-xl font-bold mb-6">İçerik Yönetimi (CMS)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <Link href="/admin/settings" className="bg-surface border border-white/5 p-6 rounded-2xl hover:border-accent/50 transition-colors group">
          <h3 className="font-bold text-lg text-white mb-2 group-hover:text-accent transition-colors">Site Ayarları</h3>
          <p className="text-sm text-muted">Ana sayfa başlıkları ve Hakkımda metinlerini düzenle.</p>
        </Link>
        <Link href="/admin/experiences" className="bg-surface border border-white/5 p-6 rounded-2xl hover:border-accent/50 transition-colors group">
          <h3 className="font-bold text-lg text-white mb-2 group-hover:text-accent transition-colors">İş Deneyimleri</h3>
          <p className="text-sm text-muted">Zaman çizelgesindeki iş tecrübelerini ekle veya çıkar.</p>
        </Link>
        <Link href="/admin/skills" className="bg-surface border border-white/5 p-6 rounded-2xl hover:border-accent/50 transition-colors group">
          <h3 className="font-bold text-lg text-white mb-2 group-hover:text-accent transition-colors">Uzmanlık Alanları</h3>
          <p className="text-sm text-muted">Yetenek kartlarını ve ikonları yönet.</p>
        </Link>
      </div>

      <h2 className="font-heading text-xl font-bold mb-6">Hızlı İşlemler</h2>
      <div className="flex flex-wrap gap-4">
        <Link href="/admin/projects/new" className="inline-flex items-center px-6 py-3 bg-accent text-black font-semibold rounded-xl hover:bg-amber-400 transition-colors">
          <PlusCircle size={18} className="mr-2" /> Yeni Proje Ekle
        </Link>
      </div>
    </div>
  );
}
