import prisma from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NewProjectPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/admin/projects" className="inline-flex items-center text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft size={18} className="mr-2" /> Projelere Dön
        </Link>
        <h1 className="font-heading text-3xl font-bold">Yeni Proje Ekle</h1>
      </div>

      <ProjectForm categories={categories} />
    </div>
  );
}
