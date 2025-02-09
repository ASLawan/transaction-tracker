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
      <div>
        <h2>Transction Details.</h2>
      </div>
      <div>
        {loading && <p>Loading Transction....</p>}
        {error && <p>{error}</p>}
        {/* <p>
          <strong>ID:</strong> {transaction.id}
        </p> */}
        <p>
          <strong>Sender:</strong> {transaction.sender}
        </p>
        <p>
          <strong>Receiver:</strong> {transaction.receiver}
        </p>
        <p>
          <strong>Value:</strong> ${transaction.value}
        </p>
        <p>
          <strong>Timestamp:</strong>{" "}
          {new Date(transaction.timestamp).toLocaleString()}
        </p>
        <p>
          <strong>Confirmed:</strong> {transaction.confirmed ? "Yes" : "No"}
        </p>
      </div>
      <Link to={"/"}>Back to Transactions</Link>
    </>
  );
};

export default TransactionDetails;
