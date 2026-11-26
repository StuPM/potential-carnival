import "dotenv/config";
import { type } from "arktype";

const envSchema = type({
  DATABASE_URL: "string > 0",
  TMDB_TOKEN: "string > 0",
  "PORT?": "string.numeric.parse",
  "NODE_ENV?": "'development' | 'production' | 'test'",
});

const result = envSchema(process.env); 

if (result instanceof type.errors) {
  console.error("Invalid enviornment: " + result.summary);
  process.exit(1);
}

export const env = result;
