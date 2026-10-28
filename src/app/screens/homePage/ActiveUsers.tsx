import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";

const activeUsers = [
  { memberNick: "Martin", memberImage: "/img/martin.webp" },
  { memberNick: "Justin", memberImage: "/img/justin.webp" },
  { memberNick: "Rose", memberImage: "/img/rose.webp" },
  { memberNick: "Nusret", memberImage: "/img/nusret.webp" },
];

export default function ActiveUsers() {
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active User</Box>

          <Stack className="cards-frame">
            <CssVarsProvider>
              {activeUsers.length > 0 ? (
                activeUsers.map((member) => (
                  <Card
                    key={member.memberImage}
                    variant="outlined"
                    className="card"
                  >
                    <CardOverflow className="member-image">
                      <AspectRatio ratio={1.1}>
                        <img src={member.memberImage} alt={member.memberNick} />
                      </AspectRatio>
                    </CardOverflow>

                    <CardOverflow className="member-nickname">
                      <Typography level="body-sm">{member.memberNick}</Typography>
                    </CardOverflow>
                  </Card>
                ))
              ) : (
                <Box className="no-data">No Active Users!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
