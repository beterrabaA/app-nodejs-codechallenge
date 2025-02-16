/*
  Warnings:

  - Added the required column `updatedAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ;
