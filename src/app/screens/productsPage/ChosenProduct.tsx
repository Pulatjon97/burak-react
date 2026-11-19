import { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "@mui/material/Rating";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../../lib/data/cart";
import { serverApi } from "../../../lib/config";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { setChosenProduct, setRestaurant } from "./slice";
import {
  retrieveChosenProduct,
  retrieveProducts,
  retrieveRestaurant,
} from "./selector";
import "swiper/css";

type SwiperInstance = {
  slidePrev: () => void;
  slideNext: () => void;
};

export default function ChosenProduct() {
  const { productId } = useParams<{ productId: string }>();
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const dispatch = useDispatch();
  const chosenProduct = useSelector(retrieveChosenProduct);
  const products = useSelector(retrieveProducts);
  const product =
    chosenProduct?._id === productId
      ? chosenProduct
      : products.find((item) => item._id === productId) ?? null;
  const restaurant = useSelector(retrieveRestaurant);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const productService = new ProductService();
    productService
      .getProduct(productId)
      .then((data) => {
        dispatch(setChosenProduct(data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));

    const memberService = new MemberService();
    memberService
      .getRestaurant()
      .then((data) => dispatch(setRestaurant(data)))
      .catch((err) => console.log(err));
  }, [productId, dispatch]);

  if (!product && loading) {
    return (
      <div className="chosen-product">
        <Box className="title">Loading product details…</Box>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="chosen-product">
        <Box className="title">Product not found</Box>
        <Link to="/products">Back to menu</Link>
      </div>
    );
  }

  const productPhotos = (product.productImages ?? []).map((image) =>
    image.startsWith("http")
      ? image
      : `${serverApi}/${image.replace(/^\/+/, "")}`,
  );
  const mainImage = productPhotos[0] ?? "";

  return (
    <div className="chosen-product">
      <Box className="title">Product Detail</Box>
      <Container className="product-container">
        <Stack className="chosen-product-slider">
          <Swiper
            loop={productPhotos.length > 1}
            className="swiper-area"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
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
              <div className="evaluation-box">
                <div className="product-view">
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{product.productViews ?? 0}</span>
                </div>
              </div>
            </Box>
            <p className="product-desc">
              {product.productDesc ||
                `A delicious ${product.productName.toLowerCase()} made fresh by Burak Restaurant.`}
            </p>
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
