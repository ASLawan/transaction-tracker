import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TransactionForm from "./pages/TransactionForm";
import TransactionDetails from "./pages/TransactionDetails";
import Header from "./components/Header";
import "./App.css";
import "./index.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-transaction" element={<TransactionForm />} />
        <Route
          path="/detail-transaction/:id"
          element={<TransactionDetails />}
        />
      </Routes>
    </Router>
  );
}

export default App;
