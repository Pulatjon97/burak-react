import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardCover from "@mui/joy/CardCover";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";

/** REDUX SLICE & SELECTOR */

// Build a memoized selector result so this component reads the popular list.
const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes }),
);

export default function PopularDishes() {
  // STEP 10: Read the list; Redux changes cause this component to render again.
  const { popularDishes } = useSelector(popularDishesRetriever);
  // console.log("popularDishes: ", popularDishes);

  // This section displays the popular-product cards.
  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Popular Dishes</Box>

          <Stack className="cards-frame">
            {/* Empty data gets a message; otherwise map each product into a card. */}
            {popularDishes.length !== 0 ? (
              popularDishes.map((product: Product) => {
                // STEP 11: Join the backend base URL to the stored image path.
                const imagePath = product.productImages?.[0]
                  ? `${serverApi}/${product.productImages[0]}`
                  : "";

                // Product fields supply the image, name, views, and description.
                return (
                  <CssVarsProvider key={product._id}>
                    <Card className={"card"}>
                    <CardCover>
                      <img src={imagePath} alt={product.productName} />
                    </CardCover>

                    <CardCover className="card-cover" />

                    <CardContent sx={{ justifyContent: "flex-end" }}>
                      <Stack
                        direction="row"
                        sx={{
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          level="h2"
                          fontSize="lg"
                          textColor="#fff"
                          mb={1}
                        >
                          {product.productName}
                        </Typography>

                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "neutral.300",
                            fontWeight: "md",
                          }}
                        >
                          {product.productViews ?? 0}
                          <VisibilityIcon
                            sx={{ fontSize: 25, marginLeft: "5px" }}
                          />
                        </Typography>
                      </Stack>
                    </CardContent>

                    <CardOverflow
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        py: 1.5,
                        px: "var(--Card-padding)",
                        borderTop: "1px solid",
                        height: "60px",
                      }}
                    >
                      <Typography
                        startDecorator={<DescriptionOutlinedIcon />}
                        textColor="neutral.300"
                      >
                        {product.productDesc}
                      </Typography>
                    </CardOverflow>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">
                Popular products are not available!
              </Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
