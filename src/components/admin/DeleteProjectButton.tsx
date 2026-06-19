"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteProject } from "@/actions/projects";

export default function DeleteProjectButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Bu projeyi silmek istediğinize emin misiniz?")) {
      startTransition(async () => {
        await deleteProject(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors p-2 rounded-lg hover:bg-red-500/10"
      title="Projeyi Sil"
    >
      <Trash2 size={18} />
    </button>
  );
}
