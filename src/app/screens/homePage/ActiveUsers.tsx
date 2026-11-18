import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";

/** REDUX SLICE & SELECTOR */

// Memoize the topUsers selection so this section only follows that Redux list.
const topUsersRetriever = createSelector(
  retrieveTopUsers,
  (topUsers) => ({ topUsers }),
);




export default function ActiveUsers() {
  // STEP 10: Read the members saved by HomePage's setTopUsers action.
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active User</Box>

          <Stack className="cards-frame">
            <CssVarsProvider>
              {/* Render one member card per API result, or an empty-state message. */}
              {topUsers.length !== 0 ? (
                topUsers.map((member: Member) => {
                  // STEP 11: Use absolute image URLs as-is; prefix backend paths otherwise.
                  const imagePath = member.memberImage
                    ? member.memberImage.startsWith("http")
                      ? member.memberImage
                      : `${serverApi}/${member.memberImage}`
                    : "";

                  // The database record supplies both the nickname and photo path.
                  return (
                    <Card
                      key={member._id}
                      variant="outlined"
                      className="card"
                    >
                      <CardOverflow className="member-image">
                        <AspectRatio ratio={1.1}>
                          {/* This portrait gets a small crop adjustment for alignment. */}
                          <img
                            src={imagePath}
                            alt={member.memberNick}
                            style={
                              member.memberImage?.endsWith(
                                "a2d30a6e-9d25-4e5b-be15-e83792b6353d.jpeg",
                              )
                                ? { objectPosition: "center 35%" }
                                : undefined
                            }
                          />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow className="member-nickname">
                        <Typography level="body-sm">
                          {member.memberNick}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  );
                })
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
