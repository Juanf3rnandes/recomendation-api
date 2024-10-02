import express, { Express } from "express";
import os from "os";
import { logger } from "./logger";
import cluster from "cluster";
import { config } from "./utils";
import { apolloConnection } from "./graphql/apollo-server";
import dbConnect from "./db";

dbConnect();

const TIMEOUT = 5000;

const numCPUs = Math.ceil(os.cpus().length / 2);

export const app: Express = express();

if (cluster.isPrimary && config.cluster) {
  logger.info(`index.js: Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker: any, code: number, signal: number) => {
    logger.info(
      `index.js: worker ${worker.process.pid} died: code ${code} signal ${signal}`
    );
  });
} else {
  const serverApp = app.listen(8080, () => {
    logger.info(`index.js:${process.pid}:Listening on 8080`);
  });

  if (process.env.USE_TIMEOUT === "true") {
    serverApp.setTimeout(TIMEOUT);
    logger.info(`Starting with timeout as ${TIMEOUT}ms`);

    serverApp.on("timeout", (socket) => {
      logger.warn(`Timing out connection`);
      socket.end();
    });
  }
}

apolloConnection();
