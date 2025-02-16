-- CreateTable
CREATE TABLE "TransactionType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TransactionType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TransactionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
