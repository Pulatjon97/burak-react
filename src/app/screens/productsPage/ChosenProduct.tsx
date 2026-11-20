import { useEffect, useRef, useState } from "react"; // React hooks hold page state, run API requests, and keep a reference to the photo slider.
import { Box, Button, Container, Stack } from "@mui/material"; // Layout and button components used to build the details screen.
import { Link, useParams } from "react-router-dom"; // Link returns to the menu; useParams reads the product ID from the URL.
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper displays each product photo as a slide.
import Rating from "@mui/material/Rating"; // Shows the product's rating stars.
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"; // Icon displayed beside the product view count.
import { useDispatch, useSelector } from "react-redux"; // Redux hooks dispatch loaded data and read stored data.
import { addCartItem } from "../../../lib/data/cart"; // Adds the selected product to the shopping basket.
import { serverApi } from "../../../lib/config"; // Backend base URL used to build uploaded-photo URLs.
import ProductService from "../../services/ProductService"; // Makes requests for product data.
import MemberService from "../../services/MemberService"; // Makes requests for restaurant/member data.
import { setChosenProduct, setRestaurant } from "./slice"; // Redux actions that save the product and restaurant responses.
import {
  retrieveChosenProduct,
  retrieveProducts,
  retrieveRestaurant,
} from "./selector"; // Selectors read the product, menu products, and restaurant from Redux.
import "swiper/css"; // Loads Swiper's base styles so slides and controls display correctly.

// This is the small part of Swiper's API that this page uses for its custom arrows.
type SwiperInstance = {
  slidePrev: () => void; // Move the gallery to the previous photo.
  slideNext: () => void; // Move the gallery to the next photo.
};

export default function ChosenProduct() {
  const { productId } = useParams<{ productId: string }>(); // Read the chosen product's ID from a URL such as /products/abc123.
  const [added, setAdded] = useState(false); // Tracks whether this page has added this product to the basket.
  const [loading, setLoading] = useState(true); // Prevents a premature "Product not found" message while the API request is pending.
  const swiperRef = useRef<SwiperInstance | null>(null); // Keeps the slider instance available to the custom arrow buttons.
  const dispatch = useDispatch(); // Provides the function used to save API results in Redux.
  const chosenProduct = useSelector(retrieveChosenProduct); // Reads the last product detail saved in Redux.
  const products = useSelector(retrieveProducts); // Reads the current menu results, useful immediately after navigating from the menu.
  // Use the matching detail record first; otherwise use the matching menu result.
  const product =
    chosenProduct?._id === productId
      ? chosenProduct
      : products.find((item) => item._id === productId) ?? null;
  const restaurant = useSelector(retrieveRestaurant); // Reads the restaurant name and phone number saved in Redux.

  useEffect(() => {
    // A missing ID means there is no product URL to request.
    if (!productId) {
      setLoading(false);
      return;
    }

    setLoading(true); // Mark this product request as in progress.

    const productService = new ProductService(); // Create the service that talks to the product API.
    productService
      .getProduct(productId) // Fetch this product by ID; this also works after a browser refresh clears Redux.
      .then((data) => {
        dispatch(setChosenProduct(data)); // Put the returned product into Redux so the page can render its fields.
      })
      .catch((err) => {
        console.log(err); // Show request failures in the browser console for diagnosis.
      })
      .finally(() => setLoading(false)); // Stop showing the loading state whether the request succeeds or fails.

    const memberService = new MemberService(); // Create the service that loads the restaurant profile.
    memberService
      .getRestaurant() // Request restaurant name and phone number from the backend.
      .then((data) => dispatch(setRestaurant(data))) // Save that response in Redux for the detail panel.
      .catch((err) => console.log(err)); // Log restaurant lookup errors without blocking the product details.
  }, [productId, dispatch]); // Re-run these requests if the URL product ID changes.

  // Show this while no cached product exists and the backend is still responding.
  if (!product && loading) {
    return (
      <div className="chosen-product">
        <Box className="title">Loading product details…</Box>
      </div>
    );
  }

  // Show a fallback only after loading has finished and there is still no matching product.
  if (!product) {
    return (
      <div className="chosen-product">
        <Box className="title">Product not found</Box>
        <Link to="/products">Back to menu</Link>
      </div>
    );
  }

  // Convert each stored image path into a browser URL; absolute URLs are already usable.
  const productPhotos = (product.productImages ?? []).map((image) =>
    image.startsWith("http")
      ? image
      : `${serverApi}/${image.replace(/^\/+/, "")}`,
  );
  const mainImage = productPhotos[0] ?? ""; // Use the first photo as the basket thumbnail, or an empty string if there are no photos.

  return (
    <div className="chosen-product">
      {/* Page heading and two-column product detail layout. */}
      <Box className="title">Product Detail</Box>
      <Container className="product-container">
        <Stack className="chosen-product-slider">
          <Swiper
            loop={productPhotos.length > 1}
            className="swiper-area"
            onSwiper={(swiper) => {
              swiperRef.current = swiper; // Save Swiper so the external arrow buttons can control it.
            }}
          >
            {/* Turn each image stored for this product into one slide. */}
            {productPhotos.map((photo, index) => (
              <SwiperSlide key={`${photo}-${index}`}>
                <img
                  className="slider-image"
                  src={photo}
                  alt={`${product.productName}, view ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {productPhotos.length > 1 && (
            <>
              {/* Arrows are useful only when the product has multiple photos. */}
              <button
                type="button"
                className="product-photo-arrow product-photo-arrow-prev"
                aria-label="Previous photo"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                ‹
              </button>
              <button
                type="button"
                className="product-photo-arrow product-photo-arrow-next"
                aria-label="Next photo"
                onClick={() => swiperRef.current?.slideNext()}
              >
                ›
              </button>
            </>
          )}
        </Stack>
        <Stack className="chosen-product-info">
          <Box className="info-box">
            {/* Product and restaurant values below come from API data, not hardcoded product records. */}
            <strong className="product-name">{product.productName}</strong>
            <span className="resto-name">
              {restaurant?.memberNick ?? "Burak Restaurant"}
            </span>
            {restaurant?.memberPhone && (
              <a className="resto-phone" href={`tel:${restaurant.memberPhone}`}>
                {restaurant.memberPhone}
              </a>
            )}
            <Box className="rating-box">
              <Rating
                name="product-rating"
                defaultValue={2.5}
                precision={0.5}
                readOnly
              />
              {/* Show the database view count; use zero if the API omitted it. */}
              <div className="evaluation-box">
                <div className="product-view">
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{product.productViews ?? 0}</span>
                </div>
              </div>
            </Box>
            {/* Prefer the product's own description, with a readable fallback if it is blank. */}
            <p className="product-desc">
              {product.productDesc ||
                `A delicious ${product.productName.toLowerCase()} made fresh by Burak Restaurant.`}
            </p>
            {/* Price and basket action use the same product record loaded above. */}
            <div className="product-divider" />
            <div className="product-price">
              <span>Price:</span>
              <span>${product.productPrice}</span>
            </div>
            <div className="button-box">
              <Button
                variant="contained"
                onClick={() => {
                  addCartItem({
                    id: product._id,
                    name: product.productName,
                    price: product.productPrice,
                    image: mainImage,
                  });
                  setAdded(true);
                }}
              >
                {added ? "Added to Basket" : "Add To Basket"}
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
