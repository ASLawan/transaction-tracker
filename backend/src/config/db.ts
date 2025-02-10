import dotenv from "dotenv";

dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "Sewoyebaa12",
    database: process.env.DB_NAME || "transactions_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
    logging: false, // Disable logging for clean output
  },
};
