import React from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { formatDate } from "../../utils/formatTime";
import PostReaction from "./PostReaction";
import PostMenu from "./PostMenu";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import useAuth from "../../hooks/useAuth";

function PostCard({ post }) {
 
  const {user} = useAuth()
  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {formatDate(post.createdAt)}
          </Typography>
        }
        action={user._id === post.author._id && (<PostMenu postId={post._id} />
          
        )
        }
      />
      <Stack spacing={2} p={3}>
        <Typography>{post.content}</Typography>
        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post"></img>
          </Box>
        )}
        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
