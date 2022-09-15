import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import { getPosts } from "./postSlice";

import { Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

function PostList({ userId }) {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { currentPagePosts, postsById, totalPosts, isLoading } = useSelector(
    (state) => state.post
  );

  const posts = currentPagePosts.map((postId) => postsById[postId]);

  useEffect(() => {
    if (userId) dispatch(getPosts({ userId, page }));
  }, [userId, page, dispatch]);
  return (
    <>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {totalPosts ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
            disabled={Boolean(totalPosts) && posts.length >= totalPosts}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="h6"> No post yet </Typography>
        )}
      </Box>
    </>
  );
}

export default PostList;
