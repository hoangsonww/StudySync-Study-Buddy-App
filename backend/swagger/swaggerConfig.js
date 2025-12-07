const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "StudySync API",
    version: "1.0.0",
    description:
      "API documentation for the StudySync app - A comprehensive study management platform with materials, quizzes, progress tracking, goals, and planner.",
    contact: {
      name: "StudySync Team",
      email: "support@studysync.com",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  servers: [
    {
      url:
        process.env.VERCEL_URL && !process.env.VERCEL_URL.includes("localhost")
          ? `https://${process.env.VERCEL_URL}`
          : process.env.NODE_ENV === "production"
            ? "https://studysync-backend-l7jev7bwe-hoangsonw.vercel.app"
            : "http://localhost:5000",
      description:
        process.env.NODE_ENV === "production"
          ? "Production Server"
          : "Development Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

// Options for the swagger docs
const path = require("path");
const options = {
  swaggerDefinition,
  apis: [
    path.join(__dirname, "../routes/routes.js"),
    path.join(__dirname, "../controllers/controllers.js"),
  ],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
