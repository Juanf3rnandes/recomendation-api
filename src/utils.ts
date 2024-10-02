import dotenv from "dotenv";
dotenv.config();

export const config = {
  cluster: process.env.CLUSTER,
  pino_level: process.env.PINO_LEVEL || "info",
  redis_url: process.env.REDIS_URL || "",
  use_timeout: process.env.USE_TIMEOUT || false,
  mongoose_url: process.env.MONGOOSE_URL || "",
};
