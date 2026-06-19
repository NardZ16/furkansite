"use client";

import { useTransition } from "react";
import { CheckCircle, Trash2 } from "lucide-react";
import { markMessageRead, deleteMessage } from "@/actions/messages";

export default function MessageActionButtons({ id, isRead }: { id: string; isRead: boolean }) {
  const [isPending, startTransition] = useTransition();

  const handleMarkRead = () => {
    startTransition(async () => {
      await markMessageRead(id);
    });
  };

  const handleDelete = () => {
    if (confirm("Bu mesajı silmek istediğinize emin misiniz?")) {
      startTransition(async () => {
        await deleteMessage(id);
      });
    }
  };

  return (
    <div className="flex justify-end gap-2">
      {!isRead && (
        <button
          onClick={handleMarkRead}
          disabled={isPending}
          className="text-green-400 hover:text-green-300 disabled:opacity-50 transition-colors p-2 rounded-lg hover:bg-green-500/10"
          title="Okundu İşaretle"
        >
          <CheckCircle size={18} />
        </button>
      )}
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors p-2 rounded-lg hover:bg-red-500/10"
        title="Mesajı Sil"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
