import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { CartItem } from "../../../lib/data/cart";
import "../../../css/products.css";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

const familyBrands = [
  { name: "CZN Burak Gurme", image: "/img/gurme.webp" },
  { name: "CZN Burak Seafood", image: "/img/seafood.webp" },
  { name: "CZN Burak Sweets", image: "/img/sweets.webp" },
  { name: "CZN Burak Doner", image: "/img/doner.webp" },
];
interface ProductsProps {
  onAdd: (input: Omit<CartItem, "quantity">) => void;
}

export default function Products({ onAdd }: ProductsProps) {
  const dispatch = useDispatch();
  const { setProducts } = useMemo(() => actionDispatch(dispatch), [dispatch]);
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch, setProducts]);

  const [activeCategory, setActiveCategory] = useState("Dish");
  const [query, setQuery] = useState("");
  const [sortByPrice, setSortByPrice] = useState(false);
  const [sortByViews, setSortByViews] = useState(false);
  const [cartStatus, setCartStatus] = useState("");

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS **/
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch, search: query.trim() });
  };

  const searchOrderHandler = (order: ProductInquiry["order"]) => {
    setSortByPrice(order === "productPrice");
    setSortByViews(order === "productViews");
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.page = 1;
    productSearch.search = searchText.trim();
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

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

  const paginatedProducts = visibleProducts;

  return (
    <div className={"products"}>
      <main className="products-page">
        <section
          className="products-catalog"
          aria-labelledby="restaurant-title"
        >
          <div className="products-topline">
            <h1 id="restaurant-title">Burak Restaurant</h1>
            <label className="product-search">
              <span className="sr-only">Search menu</span>
              <input
                type="search"
                placeholder="Type here"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                onKeyDown={(event) => {
                  console.log(event.key);
                  if (event.key === "Enter") {
                    searchProductHandler();
                  }
                }}
              />
              <button
                type="button"
                aria-label="Search menu"
                onClick={searchProductHandler}
              >
                <span>Search</span>
                <span aria-hidden="true">⌕</span>
              </button>
            </label>
          </div>

          <div className="products-layout">
            <nav className="category-rail" aria-label="Menu categories">
              {[
                ["Dish", ProductCollection.DISH],
                ["Salad", ProductCollection.SALAD],
                ["Drink", ProductCollection.DRINK],
                ["Dessert", ProductCollection.DESSERT],
                ["Other", ProductCollection.OTHER],
              ].map(([category, collection]) => (
                <Button
                  type="button"
                  key={category}
                  variant="contained"
                  color={
                    productSearch.productCollection === collection
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => {
                    setActiveCategory(category as string);
                    searchCollectionHandler(collection as ProductCollection);
                  }}
                  aria-pressed={productSearch.productCollection === collection}
                >
                  {category}
                </Button>
              ))}
            </nav>

            <div className="products-content">
              <div className="products-toolbar" aria-label="Sort menu items">
                <button
                  type="button"
                  className={
                    productSearch.order === "createdAt" ? "active" : ""
                  }
                  onClick={() => searchOrderHandler("createdAt")}
                >
                  New
                </button>
                <button
                  type="button"
                  className={
                    productSearch.order === "productPrice" ? "active" : ""
                  }
                  onClick={() => searchOrderHandler("productPrice")}
                >
                  Price
                </button>
                <button
                  type="button"
                  className={
                    productSearch.order === "productViews" ? "active" : ""
                  }
                  onClick={() => searchOrderHandler("productViews")}
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
                        className="product-card"
                        key={product._id}
                        tabIndex={0}
                        aria-label={`${product.productName}, ${product.productPrice}`}
                        onClick={() => chooseDishHandler(product._id)}
                        onKeyDown={(event) => {
                          if (
                            event.target === event.currentTarget &&
                            event.key === "Enter"
                          ) {
                            chooseDishHandler(product._id);
                          }
                        }}
                      >
                        <Stack
                          className="product-img"
                          role="img"
                          aria-label={product.productName}
                          sx={{
                            backgroundImage: imagePath
                              ? `url(${imagePath})`
                              : "none",
                          }}
                        >
                          <div className="product-sale">{sizeVolume}</div>
                          <Box className="product-hover-actions">
                            <Button
                              type="button"
                              className="shop-btn"
                              aria-label={`Add ${product.productName} to basket`}
                              onClick={(event) => {
                                event.stopPropagation();
                                onAdd({
                                  id: product._id,
                                  name: product.productName,
                                  price: product.productPrice,
                                  image: imagePath,
                                });
                                setCartStatus(
                                  `${product.productName} added to basket`,
                                );
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
                              className="view-btn"
                              aria-label={`${product.productViews ?? 0} views`}
                              onClick={(event) => event.stopPropagation()}
                            >
                              <Badge
                                badgeContent={product.productViews ?? 0}
                                color="secondary"
                              >
                                <RemoveRedEyeIcon
                                  sx={{
                                    color:
                                      (product.productViews ?? 0) === 0
                                        ? "gray"
                                        : "white",
                                  }}
                                />
                              </Badge>
                            </Button>
                          </Box>
                        </Stack>
                        <Box className="product-desc">
                          <span className="product-title">
                            {product.productName}
                          </span>
                          <Box className="product-price">
                            <MonetizationOnIcon aria-hidden="true" />
                            <span>{product.productPrice}</span>
                          </Box>
                        </Box>
                      </Stack>
                    );
                  })
                ) : (
                  <p className="no-products">
                    No products found on page {productSearch.page}. Try another
                    page or category.
                  </p>
                )}
              </div>
              <span className="sr-only" aria-live="polite">
                {cartStatus}
              </span>
              <Stack className="products-pagination pagination-section">
                <Pagination
                  count={
                    products.length !== 0
                      ? productSearch.page + 1
                      : productSearch.page
                  }
                  page={productSearch.page}
                  onChange={paginationHandler}
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
            </div>
          </div>
        </section>

        <section
          className="family-brands"
          aria-labelledby="family-brands-title"
        >
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
    </div>
  );
}
