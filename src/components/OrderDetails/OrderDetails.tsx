import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Order } from "../../types/order";
import { fetchRefundOrders } from "../../api";
import CustomTable from "../CustomTable/CustomTable";
import { Column } from "../../types/column";
import { Box, Typography } from "@mui/material";

// OrderDetails Component
//Displays detailed information about a specific refund order, including order details and item list

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>(); // Extract the order id from the URL parameters
  const [order, setOrder] = useState<Order | null>(null);

  //Fetches the order details based on the provided ID
  //get the list of refund orders and finds the matching order
  useEffect(() => {
    const fetchOrder = async () => {
      const data = await fetchRefundOrders();
      const foundOrder = data.find((o: Order) => o.id === id);
      setOrder(foundOrder || null);
    };

    fetchOrder();
  }, [id]);

  if (!order) return <p>Order items not found</p>;

  //Defines the column structure for displaying order items
  //each column corresponds to a property in the item object
  const itemColumns: Column<Order["Items"][0]>[] = [
    { key: "id", label: "Item ID" },
    { key: "name", label: "Item Name" },
    { key: "price", label: "Price ($)" },
    { key: "quantity", label: "Quantity" },
  ];

  return (
    <Box>
      <Box sx={{ textAlign: "left", padding: 3 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} color="default">
          Order Details for {order.id}
        </Typography>
        <Typography variant="body1" mb={1}>
          <strong>Reason:</strong> {order.reason}
        </Typography>
        <Typography variant="body1" mb={1}>
          <strong>Store:</strong> {order.store_name}
        </Typography>
        <Typography variant="body1" mb={1}>
          <strong>Amount:</strong> ${order.amount}
        </Typography>
      </Box>
      <CustomTable data={order.Items} columns={itemColumns} />
    </Box>
  );
};

export default OrderDetails;
