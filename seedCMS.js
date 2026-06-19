const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding CMS defaults...");

  // Delete existing to avoid duplicates if run multiple times
  await prisma.experience.deleteMany({});
  await prisma.skill.deleteMany({});

  // 1. Experiences
  const experiences = [
    {
      title: "Video Yönetmeni & Sosyal Medya Yöneticisi",
      company: "Tulu Porselen",
      date: "2024 – 2026",
      description: "Kapsamlı sosyal medya stratejileri geliştirme, YouTube içerik üretimi, kurumsal video kurgu ve kampanya yönetimi.",
      sortOrder: 1,
    },
    {
      title: "Freelance Videographer & Grafik Tasarımcı",
      company: "Çeşitli Markalar",
      date: "2020 – 2026",
      description: "Tanıtım filmleri, sosyal medya içerikleri, logo ve kurumsal kimlik projeleri. Adobe Creative Suite ile uçtan uca üretim.",
      sortOrder: 2,
    },
    {
      title: "Grafik Tasarımcı (Yarı Zamanlı)",
      company: "Kütahya Dumlupınar Üniversitesi",
      date: "2021 – 2023",
      description: "Basın Yayın biriminde görsel iletişim ve kurumsal etkinlik afişleri.",
      sortOrder: 3,
    },
    {
      title: "Prodüksiyon & Radyo Programcısı",
      company: "Radyo Dumlupınar",
      date: "2021 – 2024",
      description: "Organize Gençler programı yapımcılığı ve sunuculuğu. Sahne yönetimi ve tanıtım videoları kurgusu.",
      sortOrder: 4,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }

  // 2. Skills
  const skills = [
    {
      iconName: "Video",
      title: "Video Prodüksiyon",
      description: "Reklam filmleri, tanıtım videoları ve sosyal medya içerikleri için konsept geliştirmeden yayına kadar tüm video üretim süreçlerini yönetebilirim.",
      sortOrder: 1,
    },
    {
      iconName: "Plane",
      title: "Drone & Hava Çekimi",
      description: "Ticari İHA-1 Pilot Lisansım ile yasal ve profesyonel hava çekimleri gerçekleştirebiliyorum. Geniş açılı mekan ve dış mekan çekimlerine hakimim.",
      sortOrder: 2,
    },
    {
      iconName: "MonitorPlay",
      title: "Kurgu & Post-Prodüksiyon",
      description: "Adobe Premiere Pro ve After Effects kullanarak dinamik kurgu, profesyonel renk düzenleme (Color Grading) ve ses tasarımı yapabiliyorum.",
      sortOrder: 3,
    },
    {
      iconName: "Camera",
      title: "Sosyal Medya Yönetimi",
      description: "Instagram Reels, YouTube Shorts ve TikTok için trendlere uygun dikey formatta içerikler üretebiliyor, markanın sosyal medya dinamiklerini yönetebiliyorum.",
      sortOrder: 4,
    },
    {
      iconName: "Edit3",
      title: "Grafik & Tasarım",
      description: "Photoshop ve Illustrator programlarında ileri düzey bilgiye sahibim. Logo, kurumsal kimlik, sosyal medya şablonları ve basılı materyal tasarımları yapabilirim.",
      sortOrder: 5,
    },
    {
      iconName: "Image",
      title: "Profesyonel Fotoğrafçılık",
      description: "Ürün, mekan, etkinlik ve portre fotoğrafçılığında deneyimliyim. Çekim sonrası detaylı görsel manipülasyon ve retouch işlemlerini profesyonelce uygularım.",
      sortOrder: 6,
    }
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  // 3. Settings (if not exists)
  await prisma.siteSettings.upsert({
    where: { id: "global" },
    update: {},
    create: {
      id: "global",
      heroTitle: "BEN KİMİM?",
      heroSubtitle: "Videographer, Video Yapımcısı & Grafik Tasarım Uzmanı",
      aboutText1: "Çekimden kurguya kadar tüm süreci tek başına yürütebilen, 5 yılı aşkın süredir markalar için tanıtım filmleri, sosyal medya videoları ve kurumsal içerikler üreten bir video yapımcısıyım.",
      aboutText2: "Konsept geliştirme, çekim, yönetmenlik ve post-prodüksiyon (kurgu, renk, ses) aşamalarını uçtan uca bizzat üstleniyorum. Video prodüksiyonun yanında grafik tasarım ve sosyal medya yönetimi alanlarındaki deneyimimle ekibinize değer katmaya hazırım.",
      licenseTitle: "Ticari İHA-1 Pilot Lisansı",
      licenseDesc: "Profesyonel Drone ve Hava Çekimi Yetkisi"
    }
  });

  console.log("Seeding completed.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
