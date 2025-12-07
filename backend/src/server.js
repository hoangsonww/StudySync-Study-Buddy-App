const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("../config/db");
const routes = require("../routes/routes");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/api-docs", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/swagger-inline.html"));
});

app.get("/swagger.json", (req, res) => {
  try {
    const swaggerSpec = require("../swagger/swaggerConfig");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(swaggerSpec);
  } catch (error) {
    console.error("Error loading swagger spec:", error);
    res.status(500).json({ error: "Failed to load API specification" });
  }
});

app.use("/api", routes);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    vercelUrl: process.env.VERCEL_URL || "not-set",
  });
});

app.get("/api/debug", (req, res) => {
  res.json({
    environment: process.env.NODE_ENV || "development",
    vercelUrl: process.env.VERCEL_URL || "not-set",
    nodeVersion: process.version,
    platform: process.platform,
    timestamp: new Date().toISOString(),
    baseUrl: `${req.protocol}://${req.get("host")}`,
    swaggerUrl: `${req.protocol}://${req.get("host")}/swagger.json`,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
