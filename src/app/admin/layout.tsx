import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, FolderKanban, MessageSquare, LogOut, Settings, Briefcase, Star } from "lucide-react";
import { logout } from "@/actions/auth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
    { name: "Site Ayarları", href: "/admin/settings", icon: <Settings size={18} /> },
    { name: "İş Deneyimleri", href: "/admin/experiences", icon: <Briefcase size={18} /> },
    { name: "Uzmanlık Alanları", href: "/admin/skills", icon: <Star size={18} /> },
    { name: "Projeler", href: "/admin/projects", icon: <FolderKanban size={18} /> },
    { name: "Mesajlar", href: "/admin/messages", icon: <MessageSquare size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-white/5 flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <Link href="/" className="font-heading text-xl font-bold tracking-wider text-foreground">
            ADMIN<span className="text-accent">.</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} className="flex items-center px-4 py-3 text-sm font-medium text-muted hover:text-white hover:bg-white/5 rounded-xl transition-colors">
              <span className="mr-3">{item.icon}</span> {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <form action={logout}>
            <button type="submit" className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
              <LogOut size={18} className="mr-3" /> Çıkış Yap
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
