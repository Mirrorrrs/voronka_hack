import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import * as argon from 'argon2';

function generateRandomPassword(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function main() {
  await prisma.role.createMany({
    data: [
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

  await prisma.user.create({
    data: {
      name: 'Child 1',
      role: 1 << 3,
      hash: await argon.hash('1234'),
      login: 'child_1',
      wallet_hash: await argon.hash(generateRandomPassword(60)),
      diagnozes: {
        create: {
          title: 'Аллергия',
          description: 'Не переносит яблоки',
        },
      },
    },
  });

  await prisma.user.createMany({
    data: [
      {
        name: 'Admin',
        role: 1 << 0,
        hash: await argon.hash('1234'),
        login: 'admin',
      },
      {
        name: 'Ruler',
        role: 1 << 1,
        hash: await argon.hash('1234'),
        login: 'ruler',
      },
      {
        name: 'Parent',
        role: 1 << 1,
        hash: await argon.hash('1234'),
        login: 'parent',
      },
      {
        name: 'Child 2',
        role: 1 << 3,
        hash: await argon.hash('1234'),
        login: 'child_2',
        wallet_hash: await argon.hash(generateRandomPassword(60)),
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
