import redis from "redis";
import { logger } from "./logger";
import { config } from "./utils";

export const store = redis.createClient({ url: config.redis_url });

store.on("error", (error) => {
  logger.error(`cache.js: an error occurred ${error} retrying in sec`);
  setTimeout(() => {
    module.exports.store.connect();
  }, 1000);
});

store.on("connect", function () {
  logger.info(`cache.js: cached is connected!`);
});

export default store.connect();
