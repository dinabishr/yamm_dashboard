import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Orders from "./components/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="content">
        <Orders />
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  );
}

export default App;
