import axios from "axios";
import { Order } from "./types/order";

const API_URL = "http://localhost:5000/refunds";

export const fetchRefundOrders = async (): Promise<Order[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};