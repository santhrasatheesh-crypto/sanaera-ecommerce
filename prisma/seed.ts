import { prisma } from '../src/lib/prisma'
import bcryptjs from 'bcryptjs'

async function main() {
  console.log('🌱 Seeding database...')

  const category = await prisma.category.upsert({
    where: { slug: 'festive-wear' },
    update: {},
    create: {
      name: 'Festive Wear',
      slug: 'festive-wear',
      description: 'Traditional and modern festive collection',
      image: 'https://via.placeholder.com/500?text=Festive',
    },
  })

  const hashedPassword = await bcryptjs.hash('Admin@123456', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sanaera.com' },
    update: {},
    create: {
      email: 'admin@sanaera.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  })

  const product = await prisma.product.create({
    data: {
      name: 'Luxury Silk Saree',
      slug: 'luxury-silk-saree',
      description: 'Premium silk saree with traditional embroidery',
      longDescription: 'Handwoven premium silk saree with intricate traditional embroidery patterns.',
      price: 5000,
      sku: 'SAREE-001',
      mainImage: 'https://via.placeholder.com/400x500?text=Silk+Saree',
      fabricType: 'Silk',
      occasion: 'Festive',
      stock: 15,
      categoryId: category.id,
    },
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
