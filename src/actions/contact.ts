"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitContact(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string | null;
    const projectType = formData.get("projectType") as string | null;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return { success: false, error: "Ad, E-posta ve Mesaj alanları zorunludur." };
    }

    await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        projectType,
        message,
      },
    });

    revalidatePath("/admin/messages"); // Revalidate admin messages if using it

    return { success: true };
  } catch (error) {
    console.error("Contact Form Error:", error);
    return { success: false, error: "Bir hata oluştu. Lütfen tekrar deneyin." };
  }
}
