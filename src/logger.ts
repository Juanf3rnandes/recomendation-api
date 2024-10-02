import pino from "pino";
import { config } from "./utils";

export const logger = pino({
  level: config.pino_level,
});
