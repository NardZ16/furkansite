import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const content = await prisma.portfolioContent.findFirst();
      if (content) {
        return res.status(200).json(content.data);
      } else {
        return res.status(200).json({});
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      return res.status(500).json({ error: "Failed to fetch content" });
    }
  } 
  
  else if (req.method === 'PUT') {
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
    if (req.headers['x-admin-password'] !== adminPassword) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const newData = req.body;
      const existing = await prisma.portfolioContent.findFirst();
      
      if (existing) {
        const updated = await prisma.portfolioContent.update({
          where: { id: existing.id },
          data: { data: newData }
        });
        return res.status(200).json(updated.data);
      } else {
        const created = await prisma.portfolioContent.create({
          data: { data: newData }
        });
        return res.status(200).json(created.data);
      }
    } catch (error) {
      console.error("Error updating content:", error);
      return res.status(500).json({ error: "Failed to update content" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
