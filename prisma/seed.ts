import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create Categories
  const catVideo = await prisma.category.upsert({
    where: { name: 'Video Prodüksiyon' },
    update: {},
    create: { name: 'Video Prodüksiyon' },
  })

  const catDrone = await prisma.category.upsert({
    where: { name: 'Drone / Hava Çekimi' },
    update: {},
    create: { name: 'Drone / Hava Çekimi' },
  })

  const catGraphic = await prisma.category.upsert({
    where: { name: 'Grafik Tasarım' },
    update: {},
    create: { name: 'Grafik Tasarım' },
  })

  // Create Projects
  await prisma.project.create({
    data: {
      title: 'Tulu Porselen Tanıtım Filmi',
      description: 'Tulu Porselen için kurumsal tanıtım filmi ve sosyal medya içerikleri.',
      clientName: 'Tulu Porselen',
      categoryId: catVideo.id,
      coverImage: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop',
      mediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      mediaType: 'embed',
      featured: true,
      sortOrder: 1,
    }
  })

  await prisma.project.create({
    data: {
      title: 'Kütahya Ticaret ve Sanayi Odası Reels',
      description: 'KUTSO için düzenlenen etkinliklerin Reels formatında kurgusu ve yayını.',
      clientName: 'KUTSO',
      categoryId: catVideo.id,
      coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop',
      featured: true,
      sortOrder: 2,
    }
  })

  await prisma.project.create({
    data: {
      title: 'Nüans Proje Serisi',
      description: 'Mustafa Murat Aydın iş birliği ile 8 bölümlük özel proje serisi.',
      clientName: 'Nüans',
      categoryId: catVideo.id,
      coverImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop',
      featured: true,
      sortOrder: 3,
    }
  })

  await prisma.project.create({
    data: {
      title: 'Gürok Grup Kurumsal Drone Çekimleri',
      description: 'Gürok Grup üretim tesisleri için havadan detaylı video çekimleri.',
      clientName: 'Gürok Grup',
      categoryId: catDrone.id,
      coverImage: 'https://images.unsplash.com/photo-1506869640319-ce1a160a4a7b?q=80&w=2070&auto=format&fit=crop',
      featured: true,
      sortOrder: 4,
    }
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
