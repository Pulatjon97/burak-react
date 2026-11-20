import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import Container from "@mui/material/Container";
import { Box, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import HelpPage from "./screens/helpPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/home.css";
import Test from "./screens/Test";
import {
  CartItem,
  getCartItems,
  subscribeToCart,
} from "../lib/data/cart";

function App() {
  const location = useLocation();
  const [cartItems, setCartItems] = useState<CartItem[]>(getCartItems);

  useEffect(
    () => subscribeToCart(() => setCartItems(getCartItems())),
    [],
  );

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar cartItems={cartItems} />
      ) : (
        <OtherNavbar cartItems={cartItems} />
      )}
      <Switch>
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          <Test />
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;

// For test purposes!
// Test 2
