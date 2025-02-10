import Transaction from "./models/transaction";

export const testTransaction = async () => {
  try {
    const newTransaction = await Transaction.create({
      value: 1000.5,
      timestamp: Date.now(),
      receiver: "John Doe",
      sender: "Jane Doe",
    });

    console.log("✅ Transaction created:", newTransaction.toJSON());
  } catch (error) {
    console.error("❌ Error creating transaction:", error);
  }
};
