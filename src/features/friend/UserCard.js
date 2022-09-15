import React from "react";
import { Avatar, Box, Card, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { EmailRounded } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import ActionButton from "./ActionButton";
import { Stack } from "@mui/system";
function UserCard({ profile }) {
  const { user } = useAuth();
  const currentUserId = user._id;
  const { _id: targetUserId, name, avatarUrl, friendship, email } = profile;

  const actionButton = (
    <ActionButton
      currentUserId={currentUserId}
      targetUserId={targetUserId}
      friendship={friendship}
    />
  );
  return (
    <Card sx={{ display: "flex", flexDirection:"column", alignItems: "center", p: 3 }}>
      <Stack direction="row" mb={2}>
      <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Link variant='subtitle2'
          sx={{ fontWeight: 600 }}
          component={RouterLink}
          to={`/user/${targetUserId}`}
        >
          {name}
        </Link>
        

      
        <Box sx={{
          display: "flex", alignItems: "center"
        }}>
          <EmailRounded sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {email}
          </Typography>
          </Box>
        </Box>
        </Stack>
        <Stack>
      {actionButton}
      </Stack>
    </Card>
  )
}

export default UserCard;
