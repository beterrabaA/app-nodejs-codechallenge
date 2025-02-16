import { Kafka } from "kafkajs";

export const clientKafka = new Kafka({
  clientId: "antifraud-service",
  brokers: ["broker:9092"],
});
