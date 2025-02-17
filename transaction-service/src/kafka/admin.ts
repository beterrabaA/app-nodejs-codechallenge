import { clientKafka } from "./client.js";

import { EVENTS } from "../types/index.js";

const admin = clientKafka.admin();

export const createTopics = async () => {
  try {
    await admin.connect();
    console.log("\x1b[32m Kafka Admin connected successfully. \x1b[0m");

    // creating topics
    await admin.createTopics({
      topics: [
        {
          topic: EVENTS.APPROVED,
          replicationFactor: 1,
        },
        {
          topic: EVENTS.REJECTED,
          replicationFactor: 1,
        },
        {
          topic: EVENTS.VALIDATED,
          replicationFactor: 1,
        },
      ],
    });

    // increasing number of partitions of each topic
    await admin.createPartitions({
      topicPartitions: [
        {
          topic: EVENTS.APPROVED,
          count: 5,
        },
        {
          topic: EVENTS.REJECTED,
          count: 5,
        },
        {
          topic: EVENTS.VALIDATED,
          count: 10,
        },
      ],
    });

    console.log("\x1b[45m Topic partitions created with success! \x1b[0m");
  } catch (error) {
    console.error("\x1b[31m Error creating topic: \x1b[0m", error);
  } finally {
    await admin.disconnect();
  }
};
