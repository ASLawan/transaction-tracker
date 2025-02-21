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
  const [showConfirmed, setShowConfirm] = useState(false);

  // Get transactions by default
  useEffect(() => {
    const allTransactions = async () => {
      //   console.log(searchTerm);
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

  // Filter confirmed
  const filteredTransactions = transactions
    .filter((t) => (showConfirmed ? t.confirmed === true : true))
    .filter((t) => {
      const query = searchTerm.toLowerCase();
      return (
        t.sender.toLowerCase().includes(query) ||
        t.receiver.toLowerCase().includes(query) ||
        String(t.value).includes(query)
      );
    });
  return (
    <>
      <div className="flex flex-wrap justify-center items-center  p-4 text-teal-700 font-bold text-[30px] sm:text-[50px]">
        <h2>List of Transactions.</h2>
      </div>
      <div className="bg-teal-600 border-b border-white p-4 flex flex-col justify-center gap-2 sm:flex sm:flex-row sm:justify-around">
        <input
          type="text"
          placeholder="Search trannsaction here...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="outline-none rounded-full h-8 bg-white w-full text-black pl-4 sm:max-w-[400px]"
        />
        <button
          onClick={() => setShowConfirm((prev) => !prev)}
          className="bg-white px-4 py-1 rounded-full text-teal-600 font-bold cursor-pointer w-full sm:w-fit"
        >
          {showConfirmed ? "All Transactions" : "Confirmed Transactions"}
        </button>
      </div>
      <table className="bg-white w-full border-collapse table-auto">
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
          {filteredTransactions.map((transaction) => (
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
              <th
                className={`border-b border-b-teal-500 ${
                  transaction.confirmed ? "bg-teal-100" : "bg-red-100"
                }`}
              >{`${transaction.confirmed ? "Success" : "Pending..."} `}</th>
              <th className="border-b border-b-teal-500 bg-teal-600 text-white hover:bg-white hover:text-teal-700">
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
