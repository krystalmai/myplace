import { Pagination, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { COMMENTS_PER_POST } from "../../app/config";
import CommentCard from "./CommentCard";
import LoadingScreen from "../../components/LoadingScreen"
import { getComments } from "./commentSlice";

function CommentList({ postId }) {
  const {
    commentsByPost,
    totalComments,
    currentPage,
    commentsById,
    isLoading,
  } = useSelector((state) => ({
    commentsByPost: state.comment.commentsByPost[postId],
    totalComments: state.comment.totalCommentsByPost[postId],
    currentPage: state.comment.currentPageByPost[postId] || 1,
    commentsById: state.comment.commentsById,
    isLoading: state.comment.isLoading,
  }), shallowEqual);

  const totalPages = Math.ceil(totalComments / COMMENTS_PER_POST);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postId) dispatch(getComments({ postId }));
  }, [postId, dispatch]);

  let renderComments;

  if (commentsByPost) {
    const comments = commentsByPost.map((commentId) => commentsById[commentId]);
    renderComments = (
      <Stack spacing={.5}>
        {comments.map((comment) => (
          <CommentCard key={comment._id} comment={comment}/>
        ))}
      </Stack>
    )
  } else if (isLoading) {
    renderComments = <LoadingScreen/>
  }

  return (
    <div>
      <Stack spacing={1.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle" sx={{ color: "text.seconndary" }}>
            {totalComments > 1
              ? `${totalComments} comments`
              : totalComments === 1
                ? `${totalComments} comment`
                : "No comment"}
          </Typography>
          {totalComments > COMMENTS_PER_POST && (
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, page) => dispatch(getComments({ postId, page }))}
            />
          )}
        </Stack>
        {renderComments}
      </Stack>
    </div>
  );
}

export default CommentList;
