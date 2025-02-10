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
  const [searchTerm, setSearchTerm] = useState("");

  // Get transactions by default
  useEffect(() => {
    const allTransactions = async () => {
      //   console.log(searchTerm);
      try {
        const response = await getAllTransactions(searchTerm);

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
  }, [searchTerm]);
  return (
    <>
      <div className="flex justify-center items-center content-center p-4 text-teal-700 font-bold text-[50px]">
        <h2>List of Transactions.</h2>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="bg-white w-full border-separate table-auto">
        <thead className="bg-teal-600">
          <tr className="text-white font-bold text-[20px] h-16">
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
              <th className="border-b border-b-teal-500 h-12">
                {transaction.sender}
              </th>
              <th className="border-b border-b-teal-500">
                {transaction.receiver}
              </th>
              <th className="border-b border-b-teal-500">
                {transaction.value}
              </th>
              <th className="border-b border-b-teal-500">
                {transaction.timestamp}
              </th>
              <th className="border-b border-b-teal-500">{`${
                transaction.confirmed ? "Yes" : "No"
              } `}</th>
              <th className="border-b border-b-teal-500 bg-teal-700 text-white hover:bg-white hover:text-teal-700">
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
