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
  "postgresql://transactions_n1cz_user:wxtXH5lVTqW8keJVLExcVYcPjotpX29Y@dpg-curhvrpopnds73f2veig-a/transactions_n1cz";

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
