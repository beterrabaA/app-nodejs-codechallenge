-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_typeId_fkey";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TransactionType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
