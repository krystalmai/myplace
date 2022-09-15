import React from "react";
import { Card, Stack, Typography, Divider } from "@mui/material";
import { formatNumber } from "../../utils/numberFormat";

function ProfileScorecard({ profile }) {
  const { postCount, friendCount } = profile;
  return (
    <Card sx={{ py: 3 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{formatNumber(friendCount)}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Friends
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{formatNumber(postCount)}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Posts
          </Typography>
        </Stack>
        
      </Stack>
    </Card>
  );
}

export default ProfileScorecard;
