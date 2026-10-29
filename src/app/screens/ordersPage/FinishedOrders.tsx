import OrderCard from "./OrderCard";
import OrderEmptyState from "./OrderEmptyState";
import type { Order } from "./orderTypes";

const finishedOrders: Order[] = [];

export default function FinishedOrders() {
  if (finishedOrders.length === 0) return <OrderEmptyState status="finished" />;

  return (
    <div className="orders-list">
      {finishedOrders.map((order) => (
        <OrderCard key={order.id} order={order} status="finished" />
      ))}
    </div>
  );
}
