import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.transactionType.createMany({
    data: [
      { name: "ATM" },
      { name: "Charge" },
      { name: "Check" },
      { name: "Deposit" },
      { name: "Online" },
      { name: "POS" },
      { name: "Transfer" },
      { name: "Withdrawal" },
    ],
  });
  console.log("Database seeded");
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
