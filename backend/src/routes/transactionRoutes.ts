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

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new transaction
 *     description: Generates a new transaction entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *               timestamp:
 *                 type: number
 *               receiver:
 *                 type: string
 *               sender:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction successfully created
 *       500:
 *         description: Error creating transaction
 */
router.post("/create", createTransaction);

/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Update an existing transaction
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *               timestamp:
 *                 type: number
 *               receiver:
 *                 type: string
 *               sender:
 *                 type: string
 *               confirmed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Successfully updated transaction
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Error updating transaction
 */
router.put("/update/:id", updateTransaction);

/**
 * @swagger
 * /getOne/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Successfully fetched transaction
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Error fetching transaction
 */
router.get("/getOne/:id", getTransaction);

/**
 * @swagger
 * /getAll:
 *   get:
 *     summary: Get all transactions
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for transactions
 *     responses:
 *       200:
 *         description: Successfully fetched transactions
 *       404:
 *         description: No transactions found
 *       500:
 *         description: Error fetching transactions
 */
router.get("/getAll", getTransactions);

/**
 * @swagger
 * /getRange/date-range:
 *   get:
 *     summary: Get transactions by date range
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         required: true
 *         description: Start date of the range
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         required: true
 *         description: End date of the range
 *     responses:
 *       200:
 *         description: Successfully fetched transactions
 *       404:
 *         description: No transactions found
 *       500:
 *         description: Error fetching transactions
 */
router.get("/getRange/date-range", getTransactionsByDateRange);

export default router;
