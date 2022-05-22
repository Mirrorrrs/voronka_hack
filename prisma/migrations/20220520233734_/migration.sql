-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_parent_id_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "parent_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
