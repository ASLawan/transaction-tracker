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
      <div className="flex justify-center items-center p-8">
        <h2 className="p-4 text-teal-700 font-bold text-[50px]">
          Create Transaction
        </h2>
      </div>
      <div className="flex justify-center w-[40%]  bg-teal-600 p-4 rounded-md  m-auto ">
        <form
          onSubmit={handleSubmit}
          className="text-white flex flex-col gap-4 w-[40%] border border-white p-4 rounded-lg my-6"
        >
          {error && <p>{error}</p>}
          {message && <p>{message}</p>}
          <div className="flex justify-center gap-2 w-full">
            <label htmlFor="sender" className="text-[14px] font-bold">
              Sender:
            </label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="outline-none bg-white w-full text-black rounded-md"
            />
          </div>
          <div className="flex justify-center gap-2 w-full">
            <label htmlFor="receiver" className="text-[14px] font-bold">
              Receiver:
            </label>
            <input
              type="text"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              className="outline-none bg-white w-full text-black rounded-md"
            />
          </div>
          <div className="flex justify-center gap-2 w-full">
            <label htmlFor="value" className="text-[14px] font-bold">
              Value:{" "}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="outline-none bg-white w-full text-black rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-white text-teal-600 font-bold hover:bg-teal-600 hover:text-white rounded-md cursor-pointer"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
