import React, { useState } from "react";
import { createTransaction } from "../services/apiCalls";

const TransactionForm: React.FC = () => {
  // state management
  const [value, setValue] = useState<number>(0);
  const [receiver, setReceiver] = useState<string>("");
  const [sender, setSender] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const timestamp = Date.now();

    const transaction = { value, sender, receiver, timestamp };

    // send post request
    try {
      const response = await createTransaction(transaction);

      if (response.status === "success") {
        setMessage("Transaction Created Successfully!");
        console.log("Transaction Created!");
      }
      //   clear form fields upon failure or success
      setValue(0);
      setSender("");
      setReceiver("");

      //   Clear success message after 5 minutes
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setError("Error Creating Transaction");
      console.log(error);

      //   Clear error message after 5 minutes
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };
  return (
    <div>
      <h2>Create Transaction</h2>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
        <div>
          <label htmlFor="sender">Sender:</label>
          <input
            type="text"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="receiver">Receiver:</label>
          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="value">Value: </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default TransactionForm;
