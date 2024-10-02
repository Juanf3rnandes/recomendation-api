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

    channel.assertQueue(queue, {
      durable: false,
    });

    logger.info("[*] Waiting for messages in %s.", queue);

    channel.consume(
      queue,
      (msg) => {
        if (!msg) {
          return;
        }
        logger.info(" [x] Received %s", msg.content.toString());
        const recommendationTask = JSON.parse(msg.content.toString());
        // Processar a tarefa de recomendação aqui
      },
      {
        noAck: true,
      }
    );
  });
});
