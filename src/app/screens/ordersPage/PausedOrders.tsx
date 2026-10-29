import OrderCard from "./OrderCard";
import { pausedOrderSamples } from "./orderTypes";
import OrderEmptyState from "./OrderEmptyState";

export default function PausedOrders() {
  if (pausedOrderSamples.length === 0) return <OrderEmptyState status="paused" />;

  return (
    <div className="orders-list">
      {pausedOrderSamples.map((order) => (
        <OrderCard key={order.id} order={order} status="paused" />
      ))}
    </div>
  );
}
