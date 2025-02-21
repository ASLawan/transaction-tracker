import express, { application, Application } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { testDBConnection } from "./config/conn";
import transactionRoutes from "./routes/transactionRoutes";
import { setupSwagger } from "./config/swagger";

dotenv.config(); // retrieve env variables from .env file

const app: Application = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

// Middlware
app.use(
  cors({
    origin: "https://transaction-tracker-static.onrender.com", // Allow only your frontend domain
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
  })
);
app.use(express.json());

//Setup Swagger
setupSwagger(app);

testDBConnection();
// testTransaction();

// Routes
app.get("/", (req, res) => {
  res.send("Transaction Tracking Systen API");
});

// transaction Routes
app.use("/api/transactions/", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${HOST}, port: ${PORT} `);
});
