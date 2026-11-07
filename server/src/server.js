/**
 * src/server.js
 * Layer: Application Core / HTTP Runtime Bootstrap
 * Responsibility: Loads environment, initializes database connectivity via Prisma,
 *                 starts Express HTTP listener, and handles graceful shutdown on SIGTERM/SIGINT.
 * Interaction: Entry point for `npm start` and `npm run dev` in the server workspace.
 */

require('dotenv').config();

const app = require('./app');
const prisma = require('./config/database');
const redisClient = require('./config/redis');

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    // Attempt database connection
    console.log('[Database] Connecting to PostgreSQL via Prisma...');
    try {
      await prisma.$connect();
      console.log('[Database] PostgreSQL connected successfully.');
    } catch (dbErr) {
      console.warn('[Database Notice] PostgreSQL not reachable on local port 5432.');
      console.warn('[Database Notice] API server will run with mock/unconnected state until PostgreSQL is started.');
    }

    const server = app.listen(PORT, () => {
      console.log(`[Server] CodeONE API server listening on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
      console.log(`[Server] Health probe ready at: http://localhost:${PORT}/api/v1/health`);
    });

    // Graceful Shutdown Handler
    async function gracefulShutdown(signal) {
      console.log(`\n[Server] Received ${signal}. Draining connections and shutting down gracefully...`);
      server.close(async () => {
        console.log('[Server] HTTP connections closed.');
        try {
          await prisma.$disconnect();
          console.log('[Database] PostgreSQL disconnected.');
          if (redisClient) {
            await redisClient.quit();
            console.log('[Cache] Redis disconnected.');
          }
          process.exit(0);
        } catch (err) {
          console.error('[Shutdown Error]', err.message);
          process.exit(1);
        }
      });
    }

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (err) {
    console.error('[Bootstrap Error] Failed to start server:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  bootstrap();
}

module.exports = bootstrap;
