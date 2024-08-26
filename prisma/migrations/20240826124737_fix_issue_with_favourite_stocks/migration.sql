/*
  Warnings:

  - You are about to drop the column `favorite_stocks` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "favorite_stocks",
ADD COLUMN     "favoriteStocks" TEXT[];
