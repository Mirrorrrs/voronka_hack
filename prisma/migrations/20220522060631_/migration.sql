/*
  Warnings:

  - You are about to drop the `transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_user_id_fkey";

-- DropTable
DROP TABLE "transaction";

-- CreateTable
CREATE TABLE "user_transaction" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "hash" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_transaction" ADD CONSTRAINT "user_transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
