import React, { useState } from 'react';
import {Typography,  Box, Container, Tabs, Tab} from '@mui/material'

import IncomingRequests from './IncomingRequest';
import OutgoingRequests from './OutgoingRequest';
import { capitalCase } from 'change-case';
import styled from '@emotion/styled';


const TabWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",

  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));
function FriendRequests() {
  const [currentTab, setCurrentTab] = useState("incoming");
  const handleTabChange = (newTab) => {
    setCurrentTab(newTab);
  };

  const FRIEND_REQUESTS_TABS = [
    {
      value: "incoming",
      component: <IncomingRequests/>,
    },
    {
      value: "outgoing",
      component: <OutgoingRequests/>,
    },
  ]
  return (
    <Container>
      <Typography variant='h4' sx={{ mb: 3 }}>
        Friend Requests
      </Typography>
      <TabWrapperStyle>
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          textColor='primary'
          allowScrollButtonsMobile
          onChange={(e, value) => handleTabChange(value)}
        >
          {FRIEND_REQUESTS_TABS.map((tab) => (
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
      {FRIEND_REQUESTS_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  )
}

export default FriendRequests