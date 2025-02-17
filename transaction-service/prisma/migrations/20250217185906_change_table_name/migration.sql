/*
  Warnings:

  - You are about to drop the column `typeId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `transferId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "typeId",
ADD COLUMN     "transferId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TransferType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TransferType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transferId_fkey" FOREIGN KEY ("transferId") REFERENCES "TransferType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
