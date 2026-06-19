import prisma from "@/lib/prisma";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold">Site Ayarları</h1>
        <p className="text-muted mt-2">Ana sayfadaki kişisel bilgilerinizi ve giriş metinlerini buradan güncelleyebilirsiniz.</p>
      </div>

      <SiteSettingsForm settings={settings} />
    </div>
  );
}
