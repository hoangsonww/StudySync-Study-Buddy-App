#!/usr/bin/env node

/**
 * Test Swagger Configuration Locally
 * Run: node test-swagger.js
 */

const path = require("path");

console.log("🔍 Testing Swagger Configuration...\n");

try {
  // Load swagger config
  const swaggerSpec = require("./swagger/swaggerConfig");

  console.log("✅ Swagger spec loaded successfully!\n");
  console.log("📊 Spec Details:");
  console.log(`   Title: ${swaggerSpec.info.title}`);
  console.log(`   Version: ${swaggerSpec.info.version}`);
  console.log(`   OpenAPI: ${swaggerSpec.openapi}`);
  console.log(`   Servers: ${swaggerSpec.servers.length}`);

  swaggerSpec.servers.forEach((server, index) => {
    console.log(`   Server ${index + 1}: ${server.url}`);
  });

  console.log(
    `\n📝 Total Paths: ${Object.keys(swaggerSpec.paths || {}).length}`,
  );

  if (Object.keys(swaggerSpec.paths || {}).length === 0) {
    console.log(
      "\n⚠️  WARNING: No API paths found! Check your route annotations.",
    );
  } else {
    console.log("\n✅ API paths found:");
    Object.keys(swaggerSpec.paths).forEach((path) => {
      console.log(`   - ${path}`);
    });
  }

  // Save spec to file for testing
  const fs = require("fs");
  const outputPath = path.join(__dirname, "public", "swagger-test.json");
  fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));
  console.log(`\n💾 Spec saved to: ${outputPath}`);
  console.log(
    "   You can use this file to test Swagger UI locally or import into Postman",
  );

  console.log("\n✅ All tests passed!");
  console.log(
    "\n💡 To test in browser, run: npm run dev and visit http://localhost:5000/api-docs",
  );
} catch (error) {
  console.error("\n❌ Error loading swagger spec:");
  console.error(error.message);
  console.error("\n🔧 Troubleshooting:");
  console.error("   1. Check that routes/routes.js exists");
  console.error("   2. Check that controllers/controllers.js exists");
  console.error("   3. Verify JSDoc comments in route files");
  console.error("   4. Run: npm install");
  process.exit(1);
}
