import prisma from "@/lib/prisma";
import HomeClient from "@/components/sections/HomeClient";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const projects = await prisma.project.findMany({
    where: { featured: true },
    include: { category: true },
    orderBy: { sortOrder: 'asc' },
    take: 4,
  });

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });

  const experiences = await prisma.experience.findMany({
    orderBy: { sortOrder: 'asc' }
  });

  const skills = await prisma.skill.findMany({
    orderBy: { sortOrder: 'asc' }
  });

  return (
    <main className="min-h-screen">
      <HomeClient 
        projects={projects} 
        settings={settings}
        experiences={experiences}
        skills={skills}
      />
    </main>
  );
}
