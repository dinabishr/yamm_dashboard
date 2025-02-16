import { useState, useEffect } from "react";
import CustomTable from "../CustomTable/CustomTable";
import { Order } from "../../types/order";
import { Column } from "../../types/column";
import {
  Select,
  MenuItem,
  Switch,
  Avatar,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { fetchRefundOrders } from "../../api";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdOutlineAssignmentReturn } from "react-icons/md";

/// Orders Component
//  shows a list of refund orders in a table format
// Allows users to update order decisions, toggle  activity status, and view order details

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //Fetch refund orders from the API+ handles loading and error states
  useEffect(() => {
    const getRefundOrders = async () => {
      try {
        const data = await fetchRefundOrders();
        setOrders(data);
      } catch {
        setError("Failed to fetch refunds");
        toast.error("Failed to load refund orders");
      } finally {
        setLoading(false);
      }
    };

    getRefundOrders();
  }, []);

  if (loading) return <p>Loading refunds...</p>;
  if (error) return <p>{error}</p>;

  // Updates the decision status of a specific order
  //takes order id as param and new decision value ( accept, reject, escalate)
  const updateDecision = (id: string, newDecision: Order["decision"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, decision: newDecision } : order
      )
    );
    toast.success(`Refund Order ${id} marked as ${newDecision}`);
  };

  //Toggles the active status of a specific order.
  const toggleActive = (id: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, active: !order.active } : order
      )
    );
    toast.info("Refund Order status updated");
  };

  //Column definitions for the table
  // Each column represents a field in the Order object
  const columns: Column<Order>[] = [
    { key: "id", label: "Order ID" },
    { key: "reason", label: "Reason" },
    { key: "store_name", label: "Store Name" },
    {
      key: "store_logo",
      label: "Store",
      render: (order) => (
        <Avatar src={order.store_logo} alt={order.store_name} />
      ),
    },
    {
      key: "store_url",
      label: "Store URL",
      render: (order) => (
        <Button
          variant="contained"
          href={order.store_url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: "#f3e5f5",
            color: "black",
            textTransform: "none",
            "&:hover": { backgroundColor: "#7b1fa2", color: "white" },
          }}
        >
          Visit
        </Button>
      ),
    },
    { key: "amount", label: "Amount ($)" },
    {
      key: "total_items",
      label: "# of Items",
      render: (order) => order.Items.length,
    },
    {
      key: "decision",
      label: "Decision",
      render: (order) => (
        <Select
          value={order.decision || "not yet"}
          onChange={(e) =>
            updateDecision(order.id, e.target.value as Order["decision"])
          }
          size="small"
          sx={{
            minWidth: 80,
            fontSize: "0.875rem",
          }}
        >
          <MenuItem value="not yet">Not Yet</MenuItem>
          <MenuItem value="accept">Accept</MenuItem>
          <MenuItem value="reject">Reject</MenuItem>
          <MenuItem value="escalate">Escalate</MenuItem>
        </Select>
      ),
    },
    {
      key: "active",
      label: "Active",
      render: (order) => (
        <Switch
          size="small"
          color="secondary"
          checked={order.active}
          onChange={() => toggleActive(order.id)}
        />
      ),
    },
    {
      key: "Items",
      label: "Items",
      render: (order) => (
        <IconButton onClick={() => navigate(`/orders/${order.id}`)}>
          <VisibilityIcon color="secondary" />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      <Box
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        mb={2}
        p={2}
        borderRadius={2}
      >
        <Box flexDirection="row" display="flex">
          <MdOutlineAssignmentReturn size={"7%"} />
          <Typography variant="h4" fontWeight="bold" mb={2} ml={1}>
            Refund Orders
          </Typography>
        </Box>
        <Typography>
          Manage and review all refund requests in one place.
        </Typography>
      </Box>

      <CustomTable<Order> data={orders} columns={columns} />
    </Box>
  );
};

export default Orders;
