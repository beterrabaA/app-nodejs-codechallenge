import { clientKafka } from "./client.js";

import { emitTrStatus } from "./producer.js";

import { EVENTS, type TrMessage } from "../types/index.js";

const TRANSACTION_VALUE_LIMIT = 1000;

const consumer = clientKafka.consumer({ groupId: "antifraud-group" });

export const connectConsumer = async () => {
  try {
    await consumer.connect();
    console.log("\x1b[32m Kafka Consumer connected successfully. \x1b[0m");

    await consumer.subscribe({ topics: [EVENTS.VALIDATED] });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        if (message.value) {
          const event: TrMessage = JSON.parse(message.value.toString());
          if (event.value <= TRANSACTION_VALUE_LIMIT) {
            emitTrStatus(event, EVENTS.APPROVED);
          } else {
            emitTrStatus(event, EVENTS.REJECTED);
          }
          console.log(event);
        } else {
          console.log("invalid message");
        }
      },
    });
  } catch (error) {
    console.error("\x1b[41m Error connecting Kafka Consumer: \x1b[0m\n", error);
    process.exit(1);
  }
};
