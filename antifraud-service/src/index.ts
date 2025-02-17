import { connectConsumer } from "./kafka/consumer.js";
import { connectProducer } from "./kafka/producer.js";

const start = async () => {
  await connectConsumer();
  await connectProducer();
};

start().then(() => console.log("Antifraud service is running..."));
