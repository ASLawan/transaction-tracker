// src/components/Header.tsx
// import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Header = () => {
  return (
    <header className="bg-teal-700 p-4 h-[120px] content-center">
      <div className="flex flex-col w-full mx-auto justify-center items-center sm:flex sm:flex-row sm:justify-around">
        <h1 className="font-bold text-white text-3xl hover:text-gray-300">
          <Link to={"/"}>Transaction Tracker</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4 ">
            <li>
              <Link
                to="/"
                className="text-white hover:text-gray-300 text-[16px] font-bold"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/add-transaction"
                className="text-white hover:text-gray-300 text-[16px] font-bold"
              >
                Create Transaction
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
