import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";

/** REDUX SLICE & SELECTOR */

// Select and memoize the newest-products list from the homePage Redux state.
const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function NewDishes() {
  // STEP 10: Read Redux state; a new array triggers a fresh card render.
  const { newDishes } = useSelector(newDishesRetriever);

  console.log("newDishes:", newDishes);

  // Display the newest products as Fresh Menu cards.
  return (
    <div className="new-products-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Fresh Menu</Box>

          <Stack className="cards-frame">
            <CssVarsProvider>
              {/* Show the empty state or map each API product into a card. */}
              {newDishes.length !== 0 ? (
                newDishes.map((product: Product) => {
                  // STEP 11: Build a browser URL for the first uploaded product image.
                  const imagePath = product.productImages?.[0]
                    ? `${serverApi}/${product.productImages[0]}`
                    : "";
                  // Display drink volume or dish size in the badge.
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume
                        ? `${product.productVolume}l`
                        : ""
                      : product.productSize
                        ? `${product.productSize} size`
                        : "Normal size";
                  // The card uses live name, size, price, image, and view fields.
                  return (
                    <Card key={product._id} variant="outlined" className="card">
                      <CardOverflow className="image-frame">
                        <Box className="product-sale">{sizeVolume}</Box>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt={product.productName} />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft" className="product-detail">
                        <Stack className="info">
                          <Stack direction="row">
                            <Typography className="title">
                              {product.productName}
                            </Typography>
                            <Divider width="2" height="24" bg="#d9d9d9" />
                            <Typography className="price">
                              ${product.productPrice}
                            </Typography>
                          </Stack>
                          <Stack className="view-count">
                            <Typography className="views">
                              {product.productViews ?? 0}
                              <VisibilityIcon
                                sx={{ fontSize: 20, marginLeft: "5px" }}
                              />
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">New dishes are not available!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
