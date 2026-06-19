"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function markMessageRead(id: string) {
  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });

    revalidatePath("/admin/messages");
    revalidatePath("/admin"); // For dashboard counter
    return { success: true };
  } catch (error) {
    console.error("Mark Read Error:", error);
    return { success: false, error: "İşlem başarısız oldu." };
  }
}

export async function deleteMessage(id: string) {
  try {
    await prisma.contactMessage.delete({
      where: { id },
    });

    revalidatePath("/admin/messages");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Delete Message Error:", error);
    return { success: false, error: "Mesaj silinemedi." };
  }
}
