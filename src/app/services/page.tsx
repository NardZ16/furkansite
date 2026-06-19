import { Metadata } from "next";
import ServicesClient from "@/components/sections/ServicesClient";

export const metadata: Metadata = {
  title: "Hizmetler | Furkan Efe Kocabaş",
  description: "Video Prodüksiyon, Drone & Hava Çekimi, Kurgu & Post-Prodüksiyon, Sosyal Medya Yönetimi ve Grafik Tasarım hizmetleri.",
};

export default function ServicesPage() {
  return (
    <main className="bg-background min-h-screen">
      <ServicesClient />
    </main>
  );
}
