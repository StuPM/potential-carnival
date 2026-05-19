import { serve } from '@hono/node-server';
import app from './src/index.js'; // Import your main Hono app

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

serve({
  fetch: app.fetch,
  port
});

console.log(`🚀 Hono Backend standalone server running at http://localhost:${port}`);