import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Initialize Sequelize
export const sequelize = new Sequelize(
  process.env.DB_NAME || "transactions_db",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "Sewoyebaa12",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
    logging: false,
  }
);

// Test database connection
export const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection successful!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

// testDBConnection();
