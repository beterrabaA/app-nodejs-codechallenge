import { clientKafka } from "./client.js";

import { EVENTS, type TrMessage } from "../types/index.js";

const producer = clientKafka.producer();

export const connectProducer = async () => {
  try {
    await producer.connect();
    console.log("\x1b[32m Kafka Producer connected successfully. \x1b[0m");
  } catch (error) {
    console.error("\x1b[41m Error connecting Kafka Producer: \x1b[0m\n", error);
    process.exit(1);
  }
};

export const emitTrStatus = async (message: TrMessage, status: EVENTS) => {
  await producer.send({
    topic: status,
    messages: [
      {
        key: message.id,
        value: JSON.stringify(message),
        headers: { source: "antifraud-service" },
      },
    ],
  });
};
