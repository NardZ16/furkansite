"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    let categoryId = formData.get("categoryId") as string;
    const newCategoryName = formData.get("newCategoryName") as string;
    const mediaType = formData.get("mediaType") as string || "video";
    
    // Optional fields
    const clientName = formData.get("clientName") as string | null;
    const coverImage = formData.get("coverImage") as string | null;
    const mediaUrl = formData.get("mediaUrl") as string | null;
    const sortOrder = parseInt((formData.get("sortOrder") as string) || "0");

    if (!title || !description) {
      return { success: false, error: "Başlık ve Açıklama zorunludur." };
    }

    // Handle new category creation
    if (categoryId === "new" && newCategoryName) {
      const newCat = await prisma.category.create({
        data: { name: newCategoryName.trim() }
      });
      categoryId = newCat.id;
    } else if (!categoryId || categoryId === "new") {
      return { success: false, error: "Lütfen bir kategori seçin veya yeni bir kategori adı girin." };
    }

    await prisma.project.create({
      data: {
        title,
        description,
        categoryId,
        mediaType,
        clientName: clientName || null,
        coverImage: coverImage || null,
        mediaUrl: mediaUrl || null,
        sortOrder,
      },
    });

    revalidatePath("/");
    revalidatePath("/portfolio");
    revalidatePath("/admin/projects");

    return { success: true };
  } catch (error) {
    console.error("Create Project Error:", error);
    return { success: false, error: "Proje eklenirken bir hata oluştu." };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/portfolio");
    revalidatePath("/admin/projects");

    return { success: true };
  } catch (error) {
    console.error("Delete Project Error:", error);
    return { success: false, error: "Proje silinirken bir hata oluştu." };
  }
}
