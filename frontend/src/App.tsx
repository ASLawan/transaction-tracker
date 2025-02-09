import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TransactionForm from "./pages/TransactionForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-transaction" element={<TransactionForm />} />
      </Routes>
    </Router>
  );
}

export default App;
