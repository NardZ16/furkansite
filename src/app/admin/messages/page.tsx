import prisma from "@/lib/prisma";
import MessageActionButtons from "@/components/admin/MessageActionButtons";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: {
      createdAt: 'desc',
    }
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold">Gelen Mesajlar</h1>
        <p className="text-muted mt-2">İletişim formundan gelen başvurular ve mesajlar.</p>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="bg-surface border border-white/5 p-8 rounded-2xl text-center text-muted">
            Henüz hiç mesajınız bulunmuyor.
          </div>
        ) : (
          messages.map((message) => (
            <div 
              key={message.id} 
              className={`bg-surface border p-6 rounded-2xl transition-colors ${
                message.isRead ? 'border-white/5 opacity-70' : 'border-accent/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-bold text-lg text-white flex items-center gap-3">
                    {message.name}
                    {!message.isRead && (
                      <span className="bg-accent text-black text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Yeni</span>
                    )}
                  </h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted">
                    <a href={`mailto:${message.email}`} className="hover:text-accent transition-colors">{message.email}</a>
                    {message.phone && <span>• {message.phone}</span>}
                    {message.projectType && <span>• {message.projectType}</span>}
                  </div>
                </div>
                <div className="text-sm text-muted/60 whitespace-nowrap">
                  {new Date(message.createdAt).toLocaleDateString('tr-TR', {
                    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </div>
              </div>
              
              <div className="bg-background rounded-xl p-4 text-white/90 text-sm leading-relaxed mb-4 border border-white/5">
                {message.message}
              </div>

              <div className="flex justify-end">
                <MessageActionButtons id={message.id} isRead={message.isRead} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
