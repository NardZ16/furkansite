import { Metadata } from "next";
import prisma from "@/lib/prisma";
import PortfolioClient from "@/components/sections/PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolyo | Furkan Efe Kocabaş",
  description: "Furkan Efe Kocabaş'ın video prodüksiyon, drone çekimi ve grafik tasarım portfolyosu.",
};

export const revalidate = 60;

export default async function PortfolioPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });
  
  const projects = await prisma.project.findMany({
    include: {
      category: true,
    },
    orderBy: {
      sortOrder: 'asc',
    }
  });

  return (
    <main className="bg-background min-h-screen">
      <PortfolioClient projects={projects} categories={categories} />
    </main>
  );
}
