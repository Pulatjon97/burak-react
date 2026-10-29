import OrderCard from "./OrderCard";
import { processOrderSamples } from "./orderTypes";
import OrderEmptyState from "./OrderEmptyState";

export default function ProcessOrders() {
  if (processOrderSamples.length === 0) return <OrderEmptyState status="process" />;

  return (
    <div className="orders-list">
      {processOrderSamples.map((order) => (
        <OrderCard key={order.id} order={order} status="process" />
      ))}
    </div>
  );
}
