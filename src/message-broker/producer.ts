import amqp from "amqplib/callback_api";
import { logger } from "../logger";

amqp.connect("amqp://localhost", (error0, connection) => {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }
    const queue = "recommendation_queue";
    const message = JSON.stringify({
      userId: 123,
      action: "generate_recommendation",
    });

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(message));

    logger.info("[x] Sent %s", message);
  });
  setTimeout(() => {
    connection.close();
  }, 500);
});
