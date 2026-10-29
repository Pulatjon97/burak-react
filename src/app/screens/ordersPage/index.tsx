import { useState } from "react";
import { Box, Container, Tab, Tabs } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FinishedOrders from "./FinishedOrders";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import "../../../css/Order.css";

type OrderStatus = "paused" | "process" | "finished";

export default function OrdersPage() {
  const [status, setStatus] = useState<OrderStatus>("paused");

  return (
    <main className="orders-page">
      <Container className="orders-page-container">
        <section className="orders-main-column" aria-label="Your orders">
          <Tabs
            value={status}
            onChange={(_, nextStatus: OrderStatus) => setStatus(nextStatus)}
            className="orders-tabs"
            aria-label="Order status"
          >
            <Tab value="paused" label="Paused Order" />
            <Tab value="process" label="Process Order" />
            <Tab value="finished" label="Finished Orders" />
          </Tabs>

          <Box className="orders-content" role="tabpanel" id={`${status}-orders-panel`}>
            {status === "paused" && <PausedOrders />}
            {status === "process" && <ProcessOrders />}
            {status === "finished" && <FinishedOrders />}
          </Box>
        </section>

        <aside className="orders-sidebar" aria-label="Account and payment details">
          <section className="orders-profile-card">
            <div className="orders-profile-summary">
              <img className="orders-avatar" src="/img/justin.webp" alt="Justin" />
              <strong>Justin</strong>
              <span>User</span>
            </div>
            <div className="orders-address">
              <LocationOnIcon aria-hidden="true" />
              <span>South Korea, Busan</span>
            </div>
          </section>

          <section className="orders-payment-card" aria-label="Saved payment method">
            <div className="payment-fields">
              <div className="payment-field payment-field-wide">Card number: **** 4090 2002 7495</div>
              <div className="payment-field">07 / 24</div>
              <div className="payment-field">CVV: 010</div>
              <div className="payment-field payment-field-wide">Justin Robertson</div>
            </div>
            <div className="payment-logos" aria-label="Accepted payment methods">
              <img src="/icons/western-card.svg" alt="Western Union" />
              <img src="/icons/master-card.svg" alt="Mastercard" />
              <img src="/icons/paypal-card.svg" alt="PayPal" />
              <img src="/icons/visa-card.svg" alt="Visa" />
            </div>
          </section>
        </aside>
      </Container>
    </main>
  );
}
