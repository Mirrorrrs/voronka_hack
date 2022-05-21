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

  await prisma.user.createMany({
    data: [
      {
        name:"Admin",
        role: 1 << 0,
        hash: await argon.hash('1234'),
        login: 'admin',
      },
      {
        name:"Ruler",
        role: 1 << 1,
        hash: await argon.hash('1234'),
        login: 'ruler',
      },
      {
        name:"Parent",
        role: 1 << 1,
        hash: await argon.hash('1234'),
        login: 'parent',
      },
      {
        name: "Child 1",
        role: 1 << 3,
        hash: await argon.hash('1234'),
        login: 'child_1',
        wallet_hash: await argon.hash(
          generateRandomPassword(60),
        ),
      },
      {
        name: "Child 2",
        role: 1 << 3,
        hash: await argon.hash('1234'),
        login: 'child_2',
        wallet_hash: await argon.hash(
          generateRandomPassword(60),
        ),
      },
    ],
  });

  // const date = new Date()
  //
  // await prisma.user.create({
  //   data:{
  //     login: 2000,
  //     name: 'Savva',
  //     surname: 'Shulgin',
  //     second_name: 'Dmitrievich',
  //     hash: await argon.hash('savva2004'),
  //     email: 'savvashu@gmail.com',
  //     phone: '+79178964543',
  //     role: 1 << 1,
  //     camp:{
  //       create:{
  //         name: 'My camp',
  //         groups:{
  //           create: {
  //             name:"Camp group",
  //             schedules:{
  //               create:{
  //                 date: date,
  //                 time_from: date,
  //                 time_to: new Date(date.getTime()+200000000),
  //                 action: "Кушаем",
  //               }
  //             },
  //             alarms:{
  //               create:{
  //                 time: date,
  //
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //
  //   }
  // })


}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
