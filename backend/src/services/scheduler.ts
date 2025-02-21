import schedule from "node-schedule";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Transaction from "../models/transaction";

const baseUrl = "http://localhost:5000/api/transactions";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Generate random Transactions data
const generateTransaction = () => ({
  id: uuidv4(),
  value: parseFloat((Math.random() * 10000 + 500).toFixed(1)),
  timestamp: Date.now(),
  sender: [
    "Austin",
    "Joel",
    "Desmond",
    "Kingsley",
    "Capwell",
    "Thelma",
    "Patrick",
  ][Math.floor(Math.random() * 7)],
  receiver: ["Lawan", "Njodzeka", "Laiven", "Wirba", "Echo", "Nchila", "Ngum"][
    Math.floor(Math.random() * 7)
  ],
  confirmed: false,
});

// Create Transaction from the generated data
const createTransaction = async () => {
  try {
    // generate data
    const transactionData = await generateTransaction();
    console.log("Transaction Data:", transactionData);
    // create transaction
    const response = await api.post("/create", transactionData);
    const createdTransaction = response.data;

    console.log("Created Transaction: ", createdTransaction);

    // Update transaction confirmed status after 10 seconds
    setTimeout(() => {
      updateTransactionStatus(createdTransaction.id);
    }, 10000);
  } catch (error: any) {
    console.log("Error creating Transaction ", error.message);
  }
};

// function to update transaction confirmed status after creation
const updateTransactionStatus = async (transactionId: string) => {
  try {
    const taction = await Transaction.findByPk(transactionId);

    if (!taction) {
      console.log("Transaction not found!");
      return;
    }

    const updated = await api.put(`/update/${transactionId}`, {
      ...taction,
      confirmed: true,
    });

    console.log(
      `Transaction with id: ${transactionId}, confirmed status updated to 'true' ${updated}`
    );
  } catch (error: any) {
    console.log("Error updating transaction confirmed status: ", error);
  }
};

// Set scheduler to run every minute

schedule.scheduleJob("* * * * *", () => {
  console.log("Running Scheduler");

  createTransaction();
});

console.log("Scheduler service initialized...");
