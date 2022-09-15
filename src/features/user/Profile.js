import React from "react";
import { Grid, Stack, TextField } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import ProfileScorecard from "./ProfileScorecard";
import ProfileAbout from "./ProfileAbout";
import ProfileSocialInfo from "./ProfileSocialInfo";
import PostList from "../post/PostList";
import { useNavigate } from "react-router-dom";


function Profile({ profile }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileScorecard profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileSocialInfo profile={profile} />
        </Stack>
      </Grid>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {/* {user._id === profile._id && <PostForm />} */}
          {user._id === profile._id && <TextField
            name="content"
            multiline
            rows={1}
            placeholder="What are you thinking..."
            sx={{
              "& fieldset": {
                borderWidth: "2px !important",
                borderColor: "primary",
              },
            }}
            onClick={() => navigate("postform")}
          />}
          <PostList userId={profile._id} />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Profile;
