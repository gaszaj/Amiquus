// prisma/seed.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
  const plainPassword = "DemoPass123!";
  const hashed = await bcrypt.hash(plainPassword, 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@amiquus.com" },
    update: {},
    create: {
      email: "demo@amiquus.com",
      hashedPassword: hashed,
      preferredLanguage: "en",
      emailVerified: new Date(),
    },
  });

  console.log("Seeded demo user:", user);
  console.log("Demo password:", plainPassword);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
