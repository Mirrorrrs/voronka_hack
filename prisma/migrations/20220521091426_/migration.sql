/*
  Warnings:

  - Added the required column `camp_id` to the `group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "group" ADD COLUMN     "camp_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_camp_id_fkey" FOREIGN KEY ("camp_id") REFERENCES "camp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
