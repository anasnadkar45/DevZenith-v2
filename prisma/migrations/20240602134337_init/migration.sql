-- CreateEnum
CREATE TYPE "CategoryTypes" AS ENUM ('frontend', 'backend', 'devops');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
