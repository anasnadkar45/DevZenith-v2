/*
  Warnings:

  - You are about to drop the column `image` on the `Squad` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Squad` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Squad_username_key";

-- AlterTable
ALTER TABLE "Squad" DROP COLUMN "image",
DROP COLUMN "username";
