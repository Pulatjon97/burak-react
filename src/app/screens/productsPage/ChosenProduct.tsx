import { useRef, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "@mui/material/Rating";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { addCartItem } from "../../../lib/data/cart";
import { menuProducts } from "./Products";
import "swiper/css";

type SwiperInstance = {
  slidePrev: () => void;
  slideNext: () => void;
};

export default function ChosenProduct() {
  const { productId } = useParams<{ productId: string }>();
  const [added, setAdded] = useState(false);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const product = menuProducts.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="chosen-product">
        <Box className="title">Product not found</Box>
        <Link to="/products">Back to menu</Link>
      </div>
    );
  }

  const productPhotos = [product.image, "/img/cutlet.webp", "/img/kebab-fresh.webp"].filter(
    (photo, index, photos) => photos.indexOf(photo) === index,
  );

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
                  alt={`${product.name}, view ${index + 1}`}
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
            <strong className="product-name">{product.name}</strong>
            <span className="resto-name">Burak Restaurant</span>
            <Box className="rating-box">
              <Rating name="product-rating" defaultValue={2.5} precision={0.5} readOnly />
              <div className="evaluation-box">
                <div className="product-view">
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>20</span>
                </div>
              </div>
            </Box>
            <p className="product-desc">A delicious {product.name.toLowerCase()} made fresh by Burak Restaurant.</p>
            <div className="product-divider" />
            <div className="product-price">
              <span>Price:</span>
              <span>${product.price}</span>
            </div>
            <div className="button-box">
              <Button
                variant="contained"
                onClick={() => {
                  addCartItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
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
