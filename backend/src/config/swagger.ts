import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

// Swagger definition
const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Transaction Tracker API",
      version: "1.0.0",
      description: "API documentation for the Transaction Tracking System",
    },
    servers: [
      {
        url: "https://transaction-tracker-gkfw.onrender.com/api/transactions", // Change this to your deployed URL when live
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Ensure this path matches your routes folder
};

// Initialize Swagger Docs
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Function to serve Swagger docs
export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Swagger Docs available at: http://localhost:5000/api-docs");
};
