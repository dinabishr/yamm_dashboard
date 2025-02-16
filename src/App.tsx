import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Orders from "./components/Orders/Orders";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";

// custom Material-UI theme with Poppins font
const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* React Router for navigation */}
        <Box sx={{ display: "flex" }}>
          <Navbar /> {/* Sidebar Navigation */}
          <Box sx={{ flexGrow: 1, p: 3, ml: { xs: 0, sm: "240px" } }}>
            <Routes>
              <Route path="/" element={<Orders />} />{" "}
              {/* Default Orders page */}
              <Route path="/orders/:id" element={<OrderDetails />} />{" "}
              {/* Order details page */}
            </Routes>
            {/* Notification system */}
            <ToastContainer position="top-right" autoClose={3000} />
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
