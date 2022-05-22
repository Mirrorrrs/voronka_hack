import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import * as argon from 'argon2';
import { faker } from '@faker-js/faker';

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

  const admin = await prisma.user.create({
    data: {
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      second_name: faker.name.middleName(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      role: 1 << 0,
      hash: await argon.hash('1234'),
      login: 'admin@mail.ru',
    },
  });

  const camp = await prisma.camp.create({
    data: {
      name: 'ДОЛ Зеленый Сад',
      admin_id: admin.id,
    },
  });

  const ruler = await prisma.user.create({
    data: {
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      second_name: faker.name.middleName(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      camp_member_id: camp.id,
      role: 1 << 1,
      hash: await argon.hash('1234'),
      login: 'ruler@mail.ru',
    },
  });

  const group = await prisma.group.create({
    data: {
      name: 'Веснушки',
      leader_id: ruler.id,
      camp_id: camp.id,
    },
  });

  await prisma.user.create({
    data: {
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      second_name: faker.name.middleName(),
      role: 1 << 3,
      hash: await argon.hash('1234'),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      balance: 10000,
      camp_member_id: camp.id,
      login: 'brawlstars1@mail.ru',
      group_member_id: group.id,
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
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        second_name: faker.name.middleName(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        camp_member_id: camp.id,
        group_member_id: group.id,
        role: 1 << 2,
        hash: await argon.hash('1234'),
        login: 'daddy@mail.ru',
      },
      {
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        second_name: faker.name.middleName(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        camp_member_id: camp.id,
        group_member_id: group.id,
        role: 1 << 3,
        hash: await argon.hash('1234'),
        login: 'brawlstars2@mail.ru',
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
