/*
  Warnings:

  - Added the required column `name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wallet_hash` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "wallet_hash" TEXT NOT NULL;
