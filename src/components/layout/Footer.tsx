import Link from "next/link";
import { Mail, Phone, Camera, Video } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-heading text-3xl font-bold tracking-wider text-foreground block mb-4">
              FURKAN EFE<span className="text-accent">.</span>
            </Link>
            <p className="text-muted max-w-sm">
              Videographer, grafik tasarımcı ve İHA-1 pilotu. Markalar için uçtan uca görsel içerik ve prodüksiyon çözümleri.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted hover:text-accent transition-colors">Ana Sayfa</Link></li>
              <li><Link href="/portfolio" className="text-muted hover:text-accent transition-colors">Portfolyo</Link></li>
              <li><Link href="/services" className="text-muted hover:text-accent transition-colors">Uzmanlık</Link></li>
              <li><Link href="/contact" className="text-muted hover:text-accent transition-colors">İletişim</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">İletişim</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:f.efekocabas1@gmail.com" className="flex items-center text-muted hover:text-accent transition-colors">
                  <Mail size={18} className="mr-2" />
                  f.efekocabas1@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+905353050240" className="flex items-center text-muted hover:text-accent transition-colors">
                  <Phone size={18} className="mr-2" />
                  +90 535 305 02 40
                </a>
              </li>
              <li className="flex space-x-4 pt-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                  <Camera size={24} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                  <Video size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} Furkan Efe Kocabaş. Tüm hakları saklıdır.</p>
          <p className="mt-2 md:mt-0">Ümraniye, İstanbul</p>
        </div>
      </div>
    </footer>
  );
}
