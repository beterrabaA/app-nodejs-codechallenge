import { GraphQLError } from "graphql";
import prisma from "../utils/db.js";
import { emitTrCreated } from "../kafka/producer.js";
import type { transactionType } from "../types/index.js";
import { Prisma, type $Enums } from "@prisma/client";

export const resolvers = {
  getTransactions: async () => {
    try {
      const transactions = await prisma.transaction.findMany();
      return transactions;
    } catch (error) {
      throw new GraphQLError("Error accessing the database", {
        extensions: { code: "DATABASE_ERROR" },
      });
    }
  },
  getTransaction: async ({ id }: { id: string }) => {
    try {
      const transaction = await prisma.transaction.findUniqueOrThrow({
        where: { id },
      });

      return transaction;
    } catch (error) {
      throw new GraphQLError("Can't find transaction", {
        extensions: { code: "NOT_FOUND_TRANSACTION" },
      });
    }
  },
  createTransaction: async ({ input }: { input: transactionType }) => {
    let tr;
    try {
      const {
        accountExternalIdCredit,
        accountExternalIdDebit,
        tranferTypeId,
        value,
      } = input;
      tr = await prisma.transaction.create({
        data: {
          idDebit: accountExternalIdDebit,
          idCredit: accountExternalIdCredit,
          transferId: tranferTypeId,
          value,
        },
        include: {
          trType: {
            select: {
              name: true,
            },
          },
        },
      });

      await emitTrCreated({ id: tr.id, value: tr.value });
      return {
        transactionExternalId: tr.id,
        transactionType: { name: tr.trType.name },
        transactionStatus: { name: tr.status.toLocaleLowerCase() },
        value: tr.value,
        createdAt: tr.createdAt,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new GraphQLError(
            `There is a unique constraint violation, a new transaction cannot be created with this accountExternalIdDebit or accountExternalIdCredit`,
            {
              extensions: { code: "UNIQUE_CONSTRAINT_VIOLATION" },
            }
          );
        }
        if (error.code === "P2003") {
          throw new GraphQLError(
            `Transfer type not found,should be used a valid id`,
            {
              extensions: { code: "INVALID_TRANSFER_TYPE" },
            }
          );
        }
      }

      if (tr) {
        await prisma.transaction.delete({ where: { id: tr.id } });
        throw new GraphQLError("Canno't reach antifraud service", {
          extensions: { code: "CRITICAL" },
        });
      }

      throw new GraphQLError("Something went wrong", {
        extensions: { code: "UNKNOWN_ERROR" },
      });
    }
  },
  updateTrStatus: async (
    id: string,
    updatedStatus: $Enums.Status
  ): Promise<void> => {
    try {
      await prisma.transaction.update({
        where: {
          id,
        },
        data: {
          status: updatedStatus,
        },
      });
    } catch (error) {}
  },
};
