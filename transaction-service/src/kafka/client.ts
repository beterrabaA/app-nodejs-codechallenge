import { Kafka } from "kafkajs";

export const clientKafka = new Kafka({
  clientId: "transaction-service",
  brokers: ["broker:9092"],
});
