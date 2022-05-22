/*
  Warnings:

  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_group_id_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "second_name" TEXT,
ADD COLUMN     "surname" TEXT;

-- DropTable
DROP TABLE "Schedule";

-- CreateTable
CREATE TABLE "schedule" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time_from" TIMESTAMP(3) NOT NULL,
    "time_to" TIMESTAMP(3) NOT NULL,
    "action" TEXT NOT NULL,
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diagnoz" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "diagnoz_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnoz" ADD CONSTRAINT "diagnoz_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
