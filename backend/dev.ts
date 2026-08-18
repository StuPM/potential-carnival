import { serve } from "@hono/node-server";
import app from "./src/index.js"; // Import your main Hono app
import { env } from "./src/lib/env.js";

const port = env.PORT ? env.PORT : 8088;

serve({
  fetch: app.fetch,
  port,
});

console.log(
  `🚀 Hono Backend standalone server running at http://localhost:${port}`,
);
