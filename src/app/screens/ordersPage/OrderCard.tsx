import { Box, Button } from "@mui/material";
import type { Order } from "./orderTypes";

type OrderCardProps = {
  order: Order;
  status: "paused" | "process" | "finished";
};

export default function OrderCard({ order, status }: OrderCardProps) {
  const subtotal = order.products.reduce(
    (sum, product) => sum + product.unitPrice * product.quantity,
    0,
  );

  return (
    <Box className="order-card" aria-label={`Order ${order.id}`}>
      <div className="order-product-list">
        {order.products.map((product) => (
          <div className="order-product-row" key={`${order.id}-${product.name}`}>
            <img src={product.image} alt={product.name} className="order-product-image" />
            <span className="order-product-name">{product.name}</span>
            <span className="order-product-calculation">
              ${product.unitPrice} <span aria-hidden="true">×</span> {product.quantity}{" "}
              <span aria-hidden="true">=</span> ${product.unitPrice * product.quantity}
            </span>
          </div>
        ))}
      </div>

      <div className="order-card-footer">
        <div className="order-totals">
          <span>Product price</span>
          <span>${subtotal}</span>
          <span className="total-symbol" aria-hidden="true">+</span>
          <span>Delivery cost</span>
          <span>${order.deliveryCost}</span>
          <span className="total-symbol" aria-hidden="true">=</span>
          <strong>Total</strong>
          <strong>${subtotal + order.deliveryCost}</strong>
        </div>

        {status === "paused" && (
          <div className="order-actions">
            <Button className="order-cancel-button" variant="contained">Cancel</Button>
            <Button className="order-payment-button" variant="contained">Payment</Button>
          </div>
        )}
        {status === "process" && (
          <div className="order-actions">
            <time className="order-time">{order.placedAt}</time>
            <Button className="order-verify-button" variant="contained">Verify to fulfil</Button>
          </div>
        )}
      </div>
    </Box>
  );
}
