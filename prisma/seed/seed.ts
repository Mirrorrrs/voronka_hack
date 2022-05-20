import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data:[
      {
        name: 'Администратор',
        binary: 1,
      },
      {
        name: 'Вожатый',
        binary: 2,
      },
      {
        name: 'Родитель',
        binary: 4,
      },
      {
        name: 'Ребенок',
        binary: 8,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
