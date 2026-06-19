import { Metadata } from "next";
import ContactClient from "@/components/sections/ContactClient";

export const metadata: Metadata = {
  title: "İletişim | Furkan Efe Kocabaş",
  description: "Projeleriniz için Furkan Efe Kocabaş ile iletişime geçin. Fiyat teklifi alın, iş birliği yapın.",
};

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen">
      <ContactClient />
    </main>
  );
}
