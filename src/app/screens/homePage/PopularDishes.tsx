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

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes }),
);

export default function PopularDishes() {
  const { popularDishes } = useSelector(popularDishesRetriever);
  console.log("popularDishes: ", popularDishes);


  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Popular Dishes</Box>

          <Stack className="cards-frame">
            {popularDishes.length !== 0 ? (
              popularDishes.map((ele: Product) => {
                const imagePath = ele.productImages?.[0]
                  ? `${serverApi}/${ele.productImages[0]}`
                  : "";

                return (
                  <CssVarsProvider key={ele._id}>
                    <Card className={"card"}>
                    <CardCover>
                      <img src={imagePath} alt={ele.productName} />
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
                          {ele.productName}
                        </Typography>

                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "neutral.300",
                            fontWeight: "md",
                          }}
                        >
                          {ele.productViews ?? 0}
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
                        {ele.productDesc}
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
