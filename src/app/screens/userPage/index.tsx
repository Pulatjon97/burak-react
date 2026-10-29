import { useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Settings } from "./Settings";
import {
  defaultMemberProfile,
  loadMemberProfile,
  saveMemberProfile,
  type MemberProfile,
} from "./profile";
import "../../../css/userPage.css";

export default function UserPage() {
  const [profile, setProfile] = useState<MemberProfile>(() =>
    typeof window === "undefined" ? defaultMemberProfile : loadMemberProfile(),
  );

  const handleSaveProfile = (updatedProfile: MemberProfile) => {
    setProfile(updatedProfile);
    saveMemberProfile(updatedProfile);
  };

  return (
    <div className={"user-page"}>
      <Container>
        <Stack className={"my-page-frame"}>
          <Stack className={"my-page-left"}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box className={"menu-name"}>Modify Member Details</Box>
              <Box className={"menu-content"}>
                <Settings profile={profile} onSave={handleSaveProfile} />
              </Box>
            </Box>
          </Stack>

          <Stack className={"my-page-right"}>
            <Box className={"order-info-box"}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className={"order-user-img"}>
                  <img
                    src={profile.image}
                    className={"order-user-avatar"}
                    alt="Member profile"
                  />
                  <div className={"order-user-icon-box"}>
                    <img src={"/icons/user-badge.svg"} alt="Member badge" />
                  </div>
                </div>
                <span className={"order-user-name"}>{profile.name}</span>
                <span className={"order-user-prof"}>User</span>
                <span className={"order-user-prof"}>{profile.address}</span>
              </Box>
              <Box className={"user-media-box"}>
                <FacebookIcon />
                <InstagramIcon />
                <TelegramIcon />
                <YouTubeIcon />
              </Box>
              <p className={"user-desc"}>{profile.description}</p>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
