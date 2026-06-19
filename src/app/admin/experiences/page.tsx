import prisma from "@/lib/prisma";
import ExperienceManager from "@/components/admin/ExperienceManager";

export default async function AdminExperiencesPage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { sortOrder: 'asc' }
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold">İş Deneyimleri</h1>
        <p className="text-muted mt-2">Ana sayfada listelenen iş deneyimlerinizi buradan yönetebilirsiniz.</p>
      </div>

      <ExperienceManager experiences={experiences} />
    </div>
  );
}
