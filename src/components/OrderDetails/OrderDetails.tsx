import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Order } from "../../types/order";
import { fetchRefundOrders } from "../../api";
import CustomTable from "../CustomTable/CustomTable";
import { Column } from "../../types/column";

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await fetchRefundOrders();
      const foundOrder = data.find((o: Order) => o.id === id);
      setOrder(foundOrder || null);
    };

    fetchOrder();
  }, [id]);

  if (!order) return <p>Order items not found</p>;

  const itemColumns: Column<Order["Items"][0]>[] = [
    { key: "id", label: "Item ID" },
    { key: "name", label: "Item Name" },
    { key: "price", label: "Price ($)" },
    { key: "quantity", label: "Quantity" },
  ];

  return (
    <div>
      <h2>Order Details for {order.id}</h2>
      <p>Reason: {order.reason}</p>
      <p>Store: {order.store_name}</p>
      <p>Amount: ${order.amount}</p>

      <h3>Items:</h3>
      <CustomTable data={order.Items} columns={itemColumns} />
    </div>
  );
};

export default OrderDetails;
