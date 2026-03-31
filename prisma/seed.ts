import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { CATEGORIES } from "../src/lib/categories";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding structural data...");

  // Upsert categories (structural records only)
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        status: cat.status,
        sortOrder: cat.sortOrder,
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon,
        status: cat.status,
        sortOrder: cat.sortOrder,
      },
    });
    console.log(`  ✓ Category: ${cat.name} [${cat.status}]`);
  }

  // Upsert forum settings
  const settings = [
    { key: "forum_name", value: "Fashion Enthusiasts" },
    { key: "forum_description", value: "La community italiana dedicata alla moda e allo stile" },
    { key: "forum_language", value: "it" },
  ];

  for (const setting of settings) {
    await prisma.forumSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { key: setting.key, value: setting.value },
    });
    console.log(`  ✓ Setting: ${setting.key}`);
  }

  console.log("\nStructural seed completed. No content data was inserted.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
