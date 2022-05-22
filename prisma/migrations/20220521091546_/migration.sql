-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_camp_member_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_group_member_id_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "camp_member_id" DROP NOT NULL,
ALTER COLUMN "group_member_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_camp_member_id_fkey" FOREIGN KEY ("camp_member_id") REFERENCES "camp"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_group_member_id_fkey" FOREIGN KEY ("group_member_id") REFERENCES "group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
