#!/usr/bin/env node

/**
 * Local Development Server
 * This file starts the server for local development
 */

require("dotenv").config();
const app = require("./src/server");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║                                                            ║");
  console.log("║                🚀 StudySync API Server                     ║");
  console.log("║                                                            ║");
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log(
    `║  Server:           http://localhost:${PORT}                   ║`,
  );
  console.log(
    `║  API Docs:         http://localhost:${PORT}/api-docs         ║`,
  );
  console.log(
    `║  Health Check:     http://localhost:${PORT}/health           ║`,
  );
  console.log(
    `║  Swagger JSON:     http://localhost:${PORT}/swagger.json     ║`,
  );
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log(
    `║  Environment:      ${process.env.NODE_ENV || "development"}                 ║`,
  );
  console.log(
    `║  MongoDB:          ${process.env.MONGO_URI ? "Connected" : "Not configured"}                   ║`,
  );
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log("");
});

process.on("SIGTERM", () => {
  console.log("\n🛑 SIGTERM signal received: closing HTTP server");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("\n🛑 SIGINT signal received: closing HTTP server");
  process.exit(0);
});
