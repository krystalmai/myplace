import { ThumbDownAltRounded, ThumbUpAltRounded } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react'
import { useDispatch } from 'react-redux';
import {sendCommentReaction} from "./commentSlice"

function CommentReaction({ comment }) {
  const dispatch = useDispatch();

  const handleClick = (emoji) => {
    dispatch(sendCommentReaction({commentId: comment._id, emoji}))
  }
  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={() => handleClick("like")}>
        <ThumbUpAltRounded sx={{ fontSize: 20, color: "primary.main" }} />
      </IconButton>
      <Typography variant="h6" mr={1}>
        {comment?.reactions?.like}
      </Typography>

      <IconButton onClick={() => handleClick("dislike")}>
        <ThumbDownAltRounded sx={{ fontSize: 20, color: "error.main" }} />
      </IconButton>
      <Typography variant="h6" mr={1}>
        {comment?.reactions?.dislike}
      </Typography>
    </Stack>
  );
}

export default CommentReaction