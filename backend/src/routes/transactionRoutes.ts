import express from "express";
import {
  createTransaction,
  updateTransaction,
  getTransactions,
  getTransaction,
  getTransactionsByDateRange,
} from "../controllers/transactionControllers";

const router = express.Router();

// Routes for CRUD operations

router.post("/create", createTransaction);
router.put("/update/:id", updateTransaction);
router.get("/getAll", getTransactions);
router.get("/getOne/:id", getTransaction);
router.get("/getRange/date-range", getTransactionsByDateRange);

export default router;
