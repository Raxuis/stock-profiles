/*
  Warnings:

  - Added the required column `symbol` to the `Query` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Query" ADD COLUMN     "symbol" TEXT NOT NULL;
