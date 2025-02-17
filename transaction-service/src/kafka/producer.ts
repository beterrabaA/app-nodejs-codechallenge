import { clientKafka } from "./client.js";

import { EVENTS } from "../types/index.js";

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

export const emitTrCreated = async (tr: { id: string; value: number }) => {
  try {
    await producer.send({
      topic: EVENTS.VALIDATED,
      messages: [
        {
          key: tr.id,
          value: JSON.stringify(tr),
          headers: { source: "transaction-service" },
        },
      ],
    });
  } catch (error) {
    console.error("\x1b[43m Error sending message to Kafka: \x1b[0m", error);
    throw new Error("Error sending message to Kafka");
  }
};

process.on("SIGTERM", async () => {
  try {
    await producer.disconnect();
    console.log("⚡ Kafka Producer disconnected.");
    process.exit(0);
  } catch (error) {
    console.error("Error disconnecting Kafka Producer:", error);
    process.exit(1);
  }
});
