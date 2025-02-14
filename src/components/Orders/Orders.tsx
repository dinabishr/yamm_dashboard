import { useState, useEffect } from "react";
import CustomTable from "../CustomTable/CustomTable";
import { Order } from "../../types/order";
import { Column } from "../../types/column";
import { Select, MenuItem, Switch, TableCell, Avatar } from "@mui/material";
import { fetchRefundOrders } from "../../api";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRefundOrders = async () => {
      try {
        const data = await fetchRefundOrders();
        setOrders(data);
      } catch {
        setError("Failed to fetch refunds");
      } finally {
        setLoading(false);
      }
    };

    getRefundOrders();
  }, []);

  if (loading) return <p>Loading refunds...</p>;
  if (error) return <p>{error}</p>;

  const updateDecision = (id: string, newDecision: Order["decision"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, decision: newDecision } : order
      )
    );
    toast.success(`Refund Order ${id} marked as ${newDecision}`);
  };

  const toggleActive = (id: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, active: !order.active } : order
      )
    );
    toast.info("Refund Order status updated");
  };

  const columns: Column<Order>[] = [
    { key: "id", label: "Order ID" },
    { key: "reason", label: "Reason" },
    { key: "store_name", label: "Store Name" },
    {
      key: "store_logo",
      label: "Store",
      render: (order) => (
        <TableCell>
          <Avatar src={order.store_logo} alt={order.store_name} />
        </TableCell>
      ),
    },
    {
      key: "store_url",
      label: "Store URL",
      render: (order) => (
        <a href={order.store_url} target="_blank" rel="noopener noreferrer">
          Visit Store
        </a>
      ),
    },
    { key: "amount", label: "Amount ($)" },
    {
      key: "Items",
      label: "Total Items",
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
          checked={order.active}
          onChange={() => toggleActive(order.id)}
        />
      ),
    },
    // {
    //   key: "Items",
    //   label: "Items",
    //   render: (order) => (
    //     <IconButton
    //       onClick={() => console.log(`Navigating to order ${order.id}`)}
    //     >
    //       <VisibilityIcon />
    //     </IconButton>
    //   ),
    // },
  ];

  return (
    <div>
      <CustomTable<Order> data={orders} columns={columns} />
    </div>
  );
};

export default Orders;
