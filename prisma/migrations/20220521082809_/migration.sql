/*
  Warnings:

  - Added the required column `camp_member_id` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `group_member_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "camp_member_id" INTEGER NOT NULL,
ADD COLUMN     "group_member_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "camp" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "admin_id" INTEGER NOT NULL,

    CONSTRAINT "camp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "leader_id" INTEGER NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "group_id" INTEGER NOT NULL,
    "access_binary" INTEGER NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "chat_id" INTEGER NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_alert" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "group_alert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time_from" TIMESTAMP(3) NOT NULL,
    "time_to" TIMESTAMP(3) NOT NULL,
    "action" TEXT NOT NULL,
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "camp_admin_id_key" ON "camp"("admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "group_leader_id_key" ON "group"("leader_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_camp_member_id_fkey" FOREIGN KEY ("camp_member_id") REFERENCES "camp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_group_member_id_fkey" FOREIGN KEY ("group_member_id") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "camp" ADD CONSTRAINT "camp_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_leader_id_fkey" FOREIGN KEY ("leader_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_alert" ADD CONSTRAINT "group_alert_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
