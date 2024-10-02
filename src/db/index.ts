import mongoose from "mongoose";
import { logger } from "../logger";
import { config } from "../utils";

export default async function dbConnect() {
  try {
    return await mongoose.connect(config.mongoose_url).then(() => {
      logger.info("Connected to database");
    });
  } catch (error) {
    logger.info(error);
  }
}
