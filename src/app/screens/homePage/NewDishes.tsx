import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";

const newDishes = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
];

export default function NewDishes() {
  return (
    <div className="new-products-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Fresh Menu</Box>

          <Stack className="cards-frame">
            <CssVarsProvider>
              {newDishes.map((dish) => (
                <Card
                  key={dish.imagePath}
                  variant="outlined"
                  className="card"
                >
                  <CardOverflow className="image-frame">
                    <Box className="product-sale">Normal size</Box>
                    <AspectRatio ratio="1">
                      <img src={dish.imagePath} alt={dish.productName} />
                    </AspectRatio>
                  </CardOverflow>

                  <CardOverflow className="product-detail">
                    <Typography level="body-sm">{dish.productName}</Typography>
                    <Divider width="1" height="16" bg="#d5d5d5" />
                    <Typography level="body-sm">$12</Typography>
                    <Box className="view-count">
                      <Typography level="body-sm">20</Typography>
                      <VisibilityIcon />
                    </Box>
                  </CardOverflow>
                </Card>
              ))}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
