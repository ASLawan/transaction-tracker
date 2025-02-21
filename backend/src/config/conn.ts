// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";

// dotenv.config();

// // Initialize Sequelize
// export const sequelize = new Sequelize(
//   process.env.DB_NAME || "transactions_db",
//   process.env.DB_USER || "postgres",
//   process.env.DB_PASS || "Sewoyebaa12",
//   {
//     host: process.env.DB_HOST || "127.0.0.1",
//     dialect: "postgres",
//     logging: false,
//   }
// );

// // Test database connection
// export const testDBConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("✅ Database connection successful!");
//   } catch (error) {
//     console.error("❌ Unable to connect to the database:", error);
//   }
// };

// // testDBConnection();

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Use DATABASE_URL if available (for Render deployment)
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://super_admin:O585oT4dHckChGT9X3JWyGplpWuEn2pK@dpg-curu93l6l47c73a34qc0-a:5432/transactions_b0fn";

export const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, {
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: {
          require: true, // Render requires SSL for PostgreSQL
          rejectUnauthorized: false, // Prevents self-signed certificate errors
        },
      },
    })
  : new Sequelize(
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

// Uncomment for testing locally
// testDBConnection();
