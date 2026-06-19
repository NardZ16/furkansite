"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- SITE SETTINGS ---
export async function updateSiteSettings(formData: FormData) {
  try {
    const heroTitle = formData.get("heroTitle") as string;
    const heroSubtitle = formData.get("heroSubtitle") as string;
    const aboutText1 = formData.get("aboutText1") as string;
    const aboutText2 = formData.get("aboutText2") as string;
    const licenseTitle = formData.get("licenseTitle") as string;
    const licenseDesc = formData.get("licenseDesc") as string;
    const heroImage = formData.get("heroImage") as string;

    await prisma.siteSettings.upsert({
      where: { id: "global" },
      update: {
        heroTitle, heroSubtitle, aboutText1, aboutText2, licenseTitle, licenseDesc, heroImage
      },
      create: {
        id: "global",
        heroTitle, heroSubtitle, aboutText1, aboutText2, licenseTitle, licenseDesc, heroImage
      }
    });

    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Site Settings Error:", error);
    return { success: false, error: "Ayarlar kaydedilemedi." };
  }
}

// --- EXPERIENCES ---
export async function createExperience(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const company = formData.get("company") as string;
    const date = formData.get("date") as string;
    const description = formData.get("description") as string;
    const sortOrder = parseInt((formData.get("sortOrder") as string) || "0");

    await prisma.experience.create({
      data: { title, company, date, description, sortOrder }
    });

    revalidatePath("/");
    revalidatePath("/admin/experiences");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Deneyim eklenemedi." };
  }
}

export async function deleteExperience(id: string) {
  try {
    await prisma.experience.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/experiences");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Deneyim silinemedi." };
  }
}

// --- SKILLS ---
export async function createSkill(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const iconName = formData.get("iconName") as string;
    const sortOrder = parseInt((formData.get("sortOrder") as string) || "0");

    await prisma.skill.create({
      data: { title, description, iconName, sortOrder }
    });

    revalidatePath("/");
    revalidatePath("/admin/skills");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Yetenek eklenemedi." };
  }
}

export async function deleteSkill(id: string) {
  try {
    await prisma.skill.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/skills");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Yetenek silinemedi." };
  }
}
