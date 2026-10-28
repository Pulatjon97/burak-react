import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardCover from "@mui/joy/CardCover";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";

const dishes = [
  {
    productName: "Lavash",
    imagePath: "/img/lavash.webp",
    description: "This is Turkish Lavash",
  },
  {
    productName: "Cutlet",
    imagePath: "/img/cutlet.webp",
    description: "This is Turkish Cutlet",
  },
  {
    productName: "Kebab",
    imagePath: "/img/kebab.webp",
    description: "Kebab",
  },
  {
    productName: "Kebab",
    imagePath: "/img/kebab-fresh.webp",
    description: "This is Turkish Kebab",
  },
];

export default function PopularDishes() {
  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Popular Dishes</Box>

          <Stack className="cards-frame">
            {dishes.map((dish) => (
              <Card className="card" key={dish.imagePath}>
                <CardCover>
                  <img src={dish.imagePath} alt={dish.productName} />
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
                    <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
                      {dish.productName}
                    </Typography>

                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "neutral.300",
                        fontWeight: "md",
                      }}
                    >
                      20
                      <VisibilityIcon sx={{ fontSize: 25, marginLeft: "5px" }} />
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
                    {dish.description}
                  </Typography>
                </CardOverflow>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}