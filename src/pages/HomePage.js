import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { capitalCase } from "change-case";
import {
  AccountBox,
  People,
  ContactMail,
  PersonAddRounded,
} from "@mui/icons-material";
import { Container, Tabs, Tab, Box, Card } from "@mui/material";
import Profile from "../features/user/Profile";
import FriendList from "../features/friend/FriendList";
import FriendRequests from "../features/friend/FriendRequests";
import AddFriend from "../features/friend/AddFriend";
import ProfileCover from "../features/user/ProfileCover";
import { styled } from "@mui/material/styles";

 const TabWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  backgroundColor: "#000000",
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));
function HomePage() {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState("profile");

  const handleTabChange = (newTab) => {
    setCurrentTab(newTab);
  };

  const PROFILE_TABS = [
    {
      value: "profile",
      icon: <AccountBox sx={{ fontSize: 24 }} />,
      component: <Profile profile={user} />,
    },
    {
      value: "friends",
      icon: <People sx={{ fontSize: 24 }} />,
      component: <FriendList />,
    },
    {
      value: "requests",
      icon: <ContactMail sx={{ fontSize: 24 }} />,
      component: <FriendRequests />,
    },
    {
      value: "add_friend",
      icon: <PersonAddRounded sx={{ fontSize: 24 }} />,
      component: <AddFriend />,
    },
  ];
  return (
    <Container>
      <Card
        sx={{
          mb: 3,
          height: 280,
          position: "relative",
        }}
      >
        <ProfileCover profile={user} />
        <TabWrapperStyle>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            textColor="primary"
            allowScrollButtonsMobile
            onChange={(e, value) => handleTabChange(value)}
          >
            {PROFILE_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={capitalCase(tab.value)}
              />
            ))}
          </Tabs>
        </TabWrapperStyle>
      </Card>

      {PROFILE_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default HomePage;
