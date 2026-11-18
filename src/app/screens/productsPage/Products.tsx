import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Box, Button, Pagination, PaginationItem, Stack } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { addCartItem } from "../../../lib/data/cart";
import "../../../css/products.css";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(
  retrieveProducts,
  (products) => ({ products }),
);
const categories = ["Dish", "Salad", "Drink", "Dessert", "Other"];
const familyBrands = [
  { name: "CZN Burak Gurme", image: "/img/gurme.webp" },
  { name: "CZN Burak Seafood", image: "/img/seafood.webp" },
  { name: "CZN Burak Sweets", image: "/img/sweets.webp" },
  { name: "CZN Burak Doner", image: "/img/doner.webp" },
];
const productsPerPage = 8;

export default function Products() {
  const dispatch = useDispatch();
  const { setProducts } = useMemo(() => actionDispatch(dispatch), [dispatch]);
  const { products } = useSelector(productsRetriever);

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 8,
        order: "createdAt",
        productCollection: ProductCollection.DISH,
        search: "",
      })
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [setProducts]);

  const [activeCategory, setActiveCategory] = useState("Dish");
  const [query, setQuery] = useState("");
  const [sortByPrice, setSortByPrice] = useState(false);
  const [sortByViews, setSortByViews] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cartStatus, setCartStatus] = useState("");

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product: Product) => {
      const productCategory = {
        [ProductCollection.DISH]: "Dish",
        [ProductCollection.SALAD]: "Salad",
        [ProductCollection.DRINK]: "Drink",
        [ProductCollection.DESSERT]: "Dessert",
        [ProductCollection.OTHER]: "Other",
      }[product.productCollection];
      const matchesCategory =
        activeCategory === "Dish" || productCategory === activeCategory;
      const matchesQuery = product.productName
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });

    if (sortByPrice)
      return [...filtered].sort((a, b) => a.productPrice - b.productPrice);
    if (sortByViews)
      return [...filtered].sort(
        (a, b) => (b.productViews ?? 0) - (a.productViews ?? 0),
      );
    return filtered;
  }, [products, activeCategory, query, sortByPrice, sortByViews]);

  const pageCount = Math.max(1, Math.ceil(visibleProducts.length / productsPerPage));
  const paginatedProducts = visibleProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, query, sortByPrice, sortByViews]);

  return (
    <main className="products-page">
      <section className="products-catalog" aria-labelledby="restaurant-title">
        <div className="products-topline">
          <h1 id="restaurant-title">Burak Restaurant</h1>
          <label className="product-search">
            <span className="sr-only">Search menu</span>
            <input
              type="search"
              placeholder="Type here"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="button" aria-label="Search menu">
              <span>Search</span>
              <span aria-hidden="true">⌕</span>
            </button>
          </label>
        </div>

        <div className="products-layout">
          <nav className="category-rail" aria-label="Menu categories">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </nav>

          <div className="products-content">
            <div className="products-toolbar" aria-label="Sort menu items">
              <button
                type="button"
                className={!sortByPrice && !sortByViews ? "active" : ""}
                onClick={() => {
                  setSortByPrice(false);
                  setSortByViews(false);
                }}
              >
                New
              </button>
              <button
                type="button"
                className={sortByPrice ? "active" : ""}
                onClick={() => {
                  setSortByPrice((current) => !current);
                  setSortByViews(false);
                }}
              >
                Price
              </button>
              <button
                type="button"
                className={sortByViews ? "active" : ""}
                onClick={() => {
                  setSortByViews((current) => !current);
                  setSortByPrice(false);
                }}
              >
                Views
              </button>
            </div>

            <div className="product-grid">
              {visibleProducts.length !== 0 ? (
                paginatedProducts.map((product: Product) => {
                  const firstImage = product.productImages?.[0] ?? "";
                  const imagePath = firstImage.startsWith("http")
                    ? firstImage
                    : firstImage
                      ? `${serverApi}/${firstImage.replace(/^\/+/, "")}`
                      : "";
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume
                        ? `${product.productVolume} litre`
                        : ""
                      : product.productSize
                        ? `${product.productSize} size`
                        : "Normal size";

                  return (
                    <Stack
                      component="article"
                      key={product._id}
                      className="menu-product product-card"
                    >
                      <Stack
                        className="menu-product-image product-img"
                        role="img"
                        aria-label={product.productName}
                        sx={{ backgroundImage: imagePath ? `url(${imagePath})` : "none" }}
                      >
                        <Box className="product-sale new-badge">{sizeVolume}</Box>
                        <Box className="product-hover-actions">
                          <Button
                            type="button"
                            className="add-to-basket shop-btn"
                            aria-label={`Add ${product.productName} to basket`}
                            onClick={() => {
                              addCartItem({
                                id: product._id,
                                name: product.productName,
                                price: product.productPrice,
                                image: imagePath,
                              });
                              setCartStatus(`${product.productName} added to basket`);
                            }}
                          >
                            <img
                              src="/icons/shopping-cart.svg"
                              style={{ display: "flex" }}
                              alt=""
                            />
                          </Button>
                          <Button
                            type="button"
                            className="product-views view-btn"
                            aria-label={`${product.productViews ?? 0} views`}
                          >
                            <Badge badgeContent={product.productViews ?? 0} color="secondary">
                              <RemoveRedEyeIcon
                                sx={{
                                  color: (product.productViews ?? 0) === 0 ? "gray" : "white",
                                }}
                              />
                            </Badge>
                          </Button>
                        </Box>
                      </Stack>
                      <Link className="menu-product-link" to={`/products/${product._id}`}>
                        <Box className="menu-product-info product-desc">
                          <span className="product-name product-title">
                            {product.productName}
                          </span>
                          <Box className="product-price">
                            <MonetizationOnIcon aria-hidden="true" />
                            <span>{product.productPrice}</span>
                          </Box>
                        </Box>
                      </Link>
                    </Stack>
                  );
                })
              ) : (
                <p className="no-products">No menu items match your search.</p>
              )}
            </div>
            <span className="sr-only" aria-live="polite">{cartStatus}</span>
            {visibleProducts.length > 0 && (
              <Stack className="products-pagination pagination-section">
                <Pagination
                  count={pageCount}
                  page={currentPage}
                  onChange={(_event, page) => setCurrentPage(page)}
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                      }}
                      {...item}
                      color="secondary"
                    />
                  )}
                />
              </Stack>
            )}
          </div>
        </div>
      </section>

      <section className="family-brands" aria-labelledby="family-brands-title">
        <h2 id="family-brands-title">Our Family Brands</h2>
        <div className="family-brand-grid">
          {familyBrands.map((brand) => (
            <div className="family-brand" key={brand.name}>
              <img src={brand.image} alt={brand.name} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <section className="restaurant-address" aria-labelledby="address-title">
        <h2 id="address-title">Our address</h2>
        <iframe
          title="Map to Burak Restaurant in Downtown Dubai"
          src="https://maps.google.com/maps?q=Downtown%20Dubai&t=&z=14&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </main>
  );
}
