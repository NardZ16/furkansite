import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Furkan Efe Kocabaş | Videographer & Tasarımcı",
  description: "Furkan Efe Kocabaş'ın kişisel portfolyosu. Videographer, Grafik Tasarımcı, İHA-1 (Drone) Pilotu ve Sosyal Medya Uzmanı.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-foreground overflow-x-hidden">
        {/* Deep Mesh Background */}
        <div className="fixed top-0 right-0 w-[80vw] max-w-[800px] aspect-square bg-[#E5E7EB]/50 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="fixed bottom-0 left-0 w-[60vw] max-w-[600px] aspect-square bg-[#E5E7EB]/50 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

        <CustomCursor />
        <Navbar />
        <main className="flex-grow relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

