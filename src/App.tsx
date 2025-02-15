import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Orders from "./components/Orders/Orders";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </main>
      </div>
    </Router>
  );
}

export default App;
