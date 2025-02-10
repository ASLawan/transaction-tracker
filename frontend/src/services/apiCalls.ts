import axios from "axios";

// Type definition for the createTransaction api call
type Transaction = {
  value: number;
  timestamp: number;
  receiver: string;
  sender: string;
};

// Base url
export const baseUrl = "http://localhost:5000/api/transactions";

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all transactions from the database
export const getAllTransactions = async (search: string = "") => {
  const response = await api.get("/getAll", { params: { search: search } });

  return response.data;
};

// Get one transaction
export const getTransaction = async (id: string) => {
  const response = await api.get(`/getOne/${id}`);

  return response.data;
};

// Create a transaction
export const createTransaction = async (transaction: Transaction) => {
  const response = await api.post("/create", transaction);

  return response.data;
};

// Update a transaction
export const updateTransaction = async (
  id: string,
  updates: Partial<Transaction>
) => {
  const response = await api.put(`/update/${id}`, updates);
  return response.data;
};

// Get transactions between given date range
export const getTransactionsByDateRange = async (
  startDate: number,
  endDate: number
) => {
  const response = await api.get("/dateRange", {
    params: { startDate, endDate },
  });

  return response.data;
};
