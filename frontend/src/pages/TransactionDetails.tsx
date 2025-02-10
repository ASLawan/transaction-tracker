import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getTransaction } from "../services/apiCalls";

type FetchedTransaction = {
  id: string;
  value: number;
  timestamp: number;
  receiver: string;
  sender: string;
  confirmed: boolean;
};

const TransactionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [transaction, setTransaction] = useState<FetchedTransaction>({
    id: "",
    value: 0,
    timestamp: 0,
    receiver: "",
    sender: "",
    confirmed: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // get transaction
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await getTransaction(id as string);

        if (response.status === "failure") {
          setError("Transaction not found!");
          return;
        }

        if (response.status === "success") {
          setTransaction(response.data);
        }
      } catch (error) {
        setError("Error fetching transaction");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);
  return (
    <>
      <div className="flex flex-col justify-center items-center p-4">
        <h2 className="p-4 text-teal-700 font-bold text-[50px]">
          Transction Details.
        </h2>
        <p className="text-lg">
          <span className="text-teal-700 font-bold">Transaction ID:</span>{" "}
          {transaction.id}
        </p>
      </div>
      <div>
        {loading && <p>Loading Transction....</p>}
        {error && <p>{error}</p>}
        {/* <p>
          <strong>ID:</strong> {transaction.id}
        </p> */}
        <div className="flex flex-col items-center w-[40%] m-auto gap-4">
          <p>
            <strong className="font-bold text-teal-700 mr-4">Sender:</strong>{" "}
            {transaction.sender}
          </p>
          <p>
            <strong className="font-bold text-teal-700 mr-4">Receiver:</strong>{" "}
            {transaction.receiver}
          </p>
          <p>
            <strong className="font-bold text-teal-700 mr-4">Value:</strong> $
            {transaction.value}
          </p>
          <p>
            <strong className="font-bold text-teal-700 mr-4">Timestamp:</strong>{" "}
            {new Date(transaction.timestamp).toLocaleString()}
          </p>
          <p>
            <strong className="font-bold text-teal-700 mr-4">Confirmed:</strong>{" "}
            {transaction.confirmed ? "Yes" : "No"}
          </p>
        </div>
      </div>
      <div className="flex justify-center mx-auto font-semibold mt-8 bg-teal-700 text-white rounded-md hover:bg-white hover:text-teal-700 w-fit px-4 py-1 cursor-pointer">
        <Link to={"/"}>Back to Transactions</Link>
      </div>
    </>
  );
};

export default TransactionDetails;
