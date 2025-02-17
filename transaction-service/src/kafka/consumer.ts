import { clientKafka } from "./client.js";

import { $Enums } from "@prisma/client";
import { EVENTS, type TrMessage } from "../types/index.js";
import { resolvers } from "../graphql/resolvers.js";

const consumer = clientKafka.consumer({ groupId: "transaction-group" });

export const connectConsumer = async () => {
  try {
    await consumer.connect();
    console.log("\x1b[32m Kafka Consumer connected successfully. \x1b[0m");

    await consumer.subscribe({ topics: [EVENTS.APPROVED, EVENTS.REJECTED] });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        if (message.value) {
          const messageObj: TrMessage = JSON.parse(message.value.toString());
          if (topic === EVENTS.APPROVED) {
            await resolvers.updateTrStatus(
              messageObj.id,
              $Enums.Status.ACCEPTED
            );
          } else if (topic === EVENTS.REJECTED) {
            await resolvers.updateTrStatus(
              messageObj.id,
              $Enums.Status.REJECTED
            );
          }
        } else {
          console.log("invalid message");
        }
      },
    });
  } catch (error) {
    console.error("\x1b[41m Error connecting Kafka Consumer: \x1b[0m\n", error);
    process.exit(1); // Sai do processo para evitar falhas silenciosas
  }
};
