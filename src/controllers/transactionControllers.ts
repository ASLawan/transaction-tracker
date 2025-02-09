import { Request, Response } from "express";
import Transaction from "../models/transaction";
import { Op } from "sequelize";
import { stat } from "fs";

// Create a new transaction
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { value, timeStamp, receiver, sender } = req.body;

    const newTransaction = await Transaction.create({
      value,
      timeStamp,
      receiver,
      sender,
    });

    res.status(201).json({
      status: "success",
      message: "successfully created transaction",
      data: newTransaction,
    });
    return;
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "Error creating transaction",
      error,
    });
    return;
  }
};

// Update a given Transaction
export const updateTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { value, timestamp, receiver, sender, confirmed } = req.body;

  try {
    // look for transction to update
    const transactionToUpdate = await Transaction.findByPk(id);

    // Handle error if not found
    if (!transactionToUpdate) {
      res.status(404).json({
        status: "failure",
        message: "Transction not Found!",
      });
      return;
    }

    // Update transction
    transactionToUpdate.value = value || transactionToUpdate.value;
    transactionToUpdate.timestamp = timestamp || transactionToUpdate.timestamp;
    transactionToUpdate.receiver = receiver || transactionToUpdate.receiver;
    transactionToUpdate.sender = sender || transactionToUpdate.sender;
    transactionToUpdate.confirmed = confirmed || transactionToUpdate.confirmed;

    // save updated transction
    await transactionToUpdate.save();

    res.status(200).json({
      status: "success",
      message: "Successfully updated transaction",
    });
    return;
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "Error updating transaction",
      error,
    });
    return;
  }
};

// Get all transactions
export const getTransactions = async (req: Request, res: Response) => {
  try {
    // get transctions
    const transactions = await Transaction.findAll();

    // handle 404 error
    if (!transactions) {
      res.status(404).json({
        status: "failure",
        message: "No transtions were found!",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Successfully fetched transctions",
      data: transactions,
    });
    return;
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "Error fetching transactions",
      data: error,
    });
    return;
  }
};

// Get transaction by id
export const getTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Get transtion
    const transaction = await Transaction.findByPk(id);

    //handle error
    if (!transaction) {
      res.status(404).json({
        status: "failure",
        message: "Transction not Found!",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Successfully fetched transaction",
      data: transaction,
    });
    return;
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "Error fetching Transaction",
      data: error,
    });
    return;
  }
};

// Delete transaction

// (Optional) Query transactions for a range of dates
export const getTransactionsByDateRange = async (
  req: Request,
  res: Response
) => {
  const { startDate, endDate } = req.query;

  try {
    const transactions = await Transaction.findAll({
      where: {
        timestamp: {
          [Op.between]: [
            new Date(startDate as string).getTime(),
            new Date(endDate as string).getTime(),
          ],
        },
      },
    });

    // handle 404 error
    if (!transactions) {
      res.status(404).json({
        status: "failure",
        message: "No transtions were found!",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Successfully fetched transctions",
      data: transactions,
    });
    return;
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "Error fetching transactions by date range",
    });
    return;
  }
};
