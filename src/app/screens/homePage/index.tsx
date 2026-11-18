import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";


import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPopularDishes, setNewDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { Member } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";



/** REDUX SLICE & SELECTOR */
// Convert Redux dispatch into named functions that accept typed API results.
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data))
});

export default function HomePage() {
  // Get the dispatch helpers used to save each backend response in Redux.
  const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(useDispatch());
  // Selectors: Store => Data
  console.log(process.env.REACT_APP_API_URL);

 // STEP 4: When HomePage mounts, request the data used by the home-page sections.
 useEffect(() => {
  // ProductService centralizes the product API URL and Axios request.
  const product = new ProductService();

  // STEP 4a: Ask for four DISH products, sorted by their view counts.
  product
    .getProducts({
      page: 1,
      limit: 4,
      order: "productViews",
      productCollection: ProductCollection.DISH,
    })
    .then((data) => {
      // STEP 8: Save the returned array in Redux for PopularDishes.tsx.
      setPopularDishes(data);
    })
    .catch((err) => console.log(err));

  // STEP 4b: Ask for the four newest products for the Fresh Menu section.
  product
    .getProducts({
      page: 1,
      limit: 4,
      order: "createdAt",
    })
    // STEP 8: Save the returned array in Redux for NewDishes.tsx.
    .then((data) => setNewDishes(data))
    .catch((err) => console.log(err));

  // STEP 4c: Create the service that retrieves the current top-user list.
  const member = new MemberService();
  member
    .getTopUsers()
    // STEP 8: Save the returned member array for ActiveUsers.tsx.
    .then((data) => setTopUsers(data))
    .catch((err) => console.log(err));
// An empty dependency list means this fetch effect runs on mount (twice in React StrictMode development).
}, []);
  // Render the page sections; data-driven cards read their arrays from Redux.
  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <div className="advertisement-gap" aria-hidden="true" />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
