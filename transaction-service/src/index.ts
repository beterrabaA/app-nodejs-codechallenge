import express from "express";
import { createHandler } from "graphql-http/lib/use/express";

import "dotenv/config";

import { schema } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import { connectProducer } from "./kafka/producer.js";
import { connectConsumer } from "./kafka/consumer.js";
import { createTopics } from "./kafka/admin.js";

const app = express();
const port = 4000;

app.get("/status", async (_req, res) => {
  res.json({ message: "everything ok!" });
});

app.all(
  "/graphql",
  createHandler({
    schema,
    rootValue: resolvers,
  })
);

createTopics();
connectProducer();
connectConsumer();

app.listen(port, () => {
  console.log(
    `\x1b[34m [server]: Server is running at http://localhost:${port} \x1b[0m`
  );
});
