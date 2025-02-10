import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { testDBConnection } from "./config/conn";
import transactionRoutes from "./routes/transactionRoutes";

dotenv.config(); // retrieve env variables from .env file

const app: Application = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

// Middlware
app.use(cors());
app.use(express.json());

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
