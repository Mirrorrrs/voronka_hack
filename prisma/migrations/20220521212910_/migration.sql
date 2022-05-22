-- DropForeignKey
ALTER TABLE "group" DROP CONSTRAINT "group_leader_id_fkey";

-- AlterTable
ALTER TABLE "group" ALTER COLUMN "leader_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_leader_id_fkey" FOREIGN KEY ("leader_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
