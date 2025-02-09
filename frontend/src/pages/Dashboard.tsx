import React, { useEffect, useState } from "react";
import { getAllTransactions } from "../services/apiCalls";
import { Link } from "react-router-dom";

// type definition for transactions to be fetched

type FetchedTransactions = {
  id: string;
  value: number;
  timestamp: number;
  receiver: string;
  sender: string;
  confirmed: boolean;
};
const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<FetchedTransactions[]>([]);

  // Get transactions by default
  useEffect(() => {
    const allTransactions = async () => {
      try {
        const response = await getAllTransactions();

        // check status of response and set transactions accordingly
        if (response.status === "success") {
          setTransactions(response.data);
        }

        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    allTransactions();
  }, []);
  return (
    <>
      <h2>List of Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Value</th>
            <th>Timestamp</th>
            <th>Confirmed</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <th>{transaction.sender}</th>
              <th>{transaction.receiver}</th>
              <th>{transaction.value}</th>
              <th>{transaction.timestamp}</th>
              <th>{`${transaction.confirmed ? "Yes" : "No"} `}</th>
              <th>
                <Link to={`/detail-transaction/${transaction.id}`}>
                  Details
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Dashboard;
