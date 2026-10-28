import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { addCartItem } from "../../../lib/data/cart";
import "../../../css/products.css";

type MenuProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

const menuProducts: MenuProduct[] = [
  {
    id: "korean-spicy-soup",
    name: "Korean Spicy Soup",
    category: "Dish",
    price: 15,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=640&q=85",
  },
  {
    id: "salad-elegant",
    name: "Salad Elegant",
    category: "Salad",
    price: 9,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=640&q=85",
  },
  {
    id: "salmon-pasta",
    name: "Salmon Pasta",
    category: "Dish",
    price: 15,
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=640&q=85",
  },
  {
    id: "kebuli-rice",
    name: "Kebuli Rice",
    category: "Dish",
    price: 15,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=640&q=85",
  },
  {
    id: "korean-spicy-soup-special",
    name: "Korean Spicy Soup",
    category: "Dish",
    price: 15,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=640&q=85",
  },
  {
    id: "fr-kebab",
    name: "FR Kebab",
    category: "Dish",
    price: 15,
    image: "/img/kebab-fresh.webp",
  },
  {
    id: "salmon-pasta-special",
    name: "Salmon Pasta",
    category: "Dish",
    price: 15,
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=640&q=85",
  },
  {
    id: "kebuli-rice-special",
    name: "Kebuli Rice",
    category: "Dish",
    price: 15,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=640&q=85",
  },
  {
    id: "lavash",
    name: "Lavash",
    category: "Dish",
    price: 12,
    image: "/img/lavash.webp",
  },
];

const categories = ["Dish", "Salad", "Drink", "Dessert", "Other"];
const familyBrands = [
  { name: "CZN Burak Gurme", image: "/img/gurme.webp" },
  { name: "CZN Burak Seafood", image: "/img/seafood.webp" },
  { name: "CZN Burak Sweets", image: "/img/sweets.webp" },
  { name: "CZN Burak Doner", image: "/img/doner.webp" },
];
const productsPerPage = 4;

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("Dish");
  const [query, setQuery] = useState("");
  const [sortByPrice, setSortByPrice] = useState(false);
  const [sortByViews, setSortByViews] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cartStatus, setCartStatus] = useState("");

  const visibleProducts = useMemo(() => {
    const filtered = menuProducts.filter((product) => {
      const matchesCategory =
        activeCategory === "Dish" || product.category === activeCategory;
      const matchesQuery = product.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });

    if (sortByPrice) return [...filtered].sort((a, b) => a.price - b.price);
    if (sortByViews) return [...filtered].reverse();
    return filtered;
  }, [activeCategory, query, sortByPrice, sortByViews]);

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
              {paginatedProducts.map((product) => (
                <article className="menu-product" key={product.id}>
                  <div className="menu-product-image">
                    <span className="new-badge">Normal size</span>
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <div className="product-hover-actions">
                      <button
                        type="button"
                        className="add-to-basket"
                        aria-label={`Add ${product.name} to basket`}
                        onClick={() => {
                          addCartItem({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                          });
                          setCartStatus(`${product.name} added to basket`);
                        }}
                      >
                        <ShoppingCartIcon aria-hidden="true" />
                      </button>
                      <div className="product-views" aria-label="20 views">
                        <span>20</span>
                        <VisibilityIcon aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                  <Link className="menu-product-link" to={`/products/${product.id}`}>
                    <div className="menu-product-info">
                      <span className="product-name">{product.name}</span>
                      <span className="product-price">
                        <span className="price-coin" aria-hidden="true">$</span>
                        <span>{product.price}</span>
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
              {visibleProducts.length === 0 && (
                <p className="no-products">No menu items match your search.</p>
              )}
            </div>
            <span className="sr-only" aria-live="polite">{cartStatus}</span>
            {visibleProducts.length > 0 && (
              <nav className="products-pagination" aria-label="Product pages">
                <button
                  type="button"
                  aria-label="Previous page"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                >
                  ←
                </button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                  (page) => (
                    <button
                      type="button"
                      key={page}
                      className={currentPage === page ? "active" : ""}
                      aria-current={currentPage === page ? "page" : undefined}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  aria-label="Next page"
                  disabled={currentPage === pageCount}
                  onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
                >
                  →
                </button>
              </nav>
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
