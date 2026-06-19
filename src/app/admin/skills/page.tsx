import prisma from "@/lib/prisma";
import SkillManager from "@/components/admin/SkillManager";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: { sortOrder: 'asc' }
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold">Uzmanlık Alanları</h1>
        <p className="text-muted mt-2">Ana sayfada listelenen uzmanlık alanı kartlarınızı buradan yönetebilirsiniz.</p>
      </div>

      <SkillManager skills={skills} />
    </div>
  );
}
