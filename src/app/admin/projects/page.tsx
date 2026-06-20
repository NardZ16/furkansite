import prisma from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle, Image as ImageIcon, Edit2 } from "lucide-react";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl font-bold">Projeler</h1>
        <Link href="/admin/projects/new" className="inline-flex items-center px-4 py-2 bg-accent text-black font-semibold rounded-lg hover:bg-amber-400 transition-colors">
          <PlusCircle size={18} className="mr-2" /> Yeni Ekle
        </Link>
      </div>

      <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 border-b border-white/5 text-muted">
              <tr>
                <th className="px-6 py-4 font-medium">Görsel</th>
                <th className="px-6 py-4 font-medium">Başlık</th>
                <th className="px-6 py-4 font-medium">Kategori</th>
                <th className="px-6 py-4 font-medium">Tip</th>
                <th className="px-6 py-4 font-medium text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted">
                    Henüz hiç proje eklenmemiş.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      {project.coverImage ? (
                        <div className="w-16 h-12 rounded bg-zinc-800 overflow-hidden relative">
                           <img src={project.coverImage} alt={project.title} className="object-cover w-full h-full" />
                        </div>
                      ) : (
                        <div className="w-16 h-12 rounded bg-white/10 flex items-center justify-center text-muted">
                          <ImageIcon size={20} />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{project.title}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                        {project.category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted capitalize">{project.mediaType}</td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      <Link href={`/admin/projects/${project.id}`} className="text-muted hover:text-white transition-colors p-2 bg-white/5 rounded-lg">
                        <Edit2 size={18} />
                      </Link>
                      <DeleteProjectButton id={project.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
