import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { COMMENTS_PER_POST } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  commentsByPost: {},
  commentsById: {},
  currentPageByPost: {},
  totalCommentsByPost: {},
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { postId, comments, count, page } = action.payload;
      comments.forEach(
        (comment) => (state.commentsById[comment._id] = comment)
      );
      state.commentsByPost[postId] = comments
        .map((comment) => comment._id)
        .reverse();
      state.totalCommentsByPost[postId] = count;
      state.currentPageByPost[postId] = page;
    },
    
    sendCommentReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { commentId, reactions } = action.payload;
      state.commentsById[commentId].reactions = reactions;
    },
    deleteCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { commentId, post } = action.payload;
      delete state.commentsById[commentId];
      if (state.commentsByPost[post]) {
        const index = state.commentsByPost[post].indexOf(commentId);
        state.commentsByPost[post].splice(index, 1);
      }
      
    },
  },
});

export default commentSlice.reducer;

export const createComment =
  ({ postId, content }) =>
  async (dispatch) => {
    dispatch(commentSlice.actions.startLoading());
    try {
      const response = await apiService.post("/comments", {
        content,
        postId,
      });
      dispatch(commentSlice.actions.createCommentSuccess(response.data));
      dispatch(getComments({ postId }));
    } catch (error) {
      dispatch(commentSlice.actions.hasError(error.message));
    }
  };
export const getComments =
  ({ postId, page = 1, limit = COMMENTS_PER_POST }) =>
  async (dispatch) => {
    dispatch(commentSlice.actions.startLoading());
    try {
      const params = {
        page,
        limit,
      };
      const response = await apiService.get(`/posts/${postId}/comments`, {
        params,
      });
      dispatch(
        commentSlice.actions.getCommentSuccess({
          ...response.data,
          postId,
          page,
        })
      );
    } catch (error) {
      dispatch(commentSlice.actions.hasError(error.message));
    }
  };

export const sendCommentReaction =
  ({ commentId, emoji }) =>
  async (dispatch) => {
    dispatch(commentSlice.actions.startLoading());
    try {
      const response = await apiService.post(`/reactions`, {
        targetType: "Comment",
        targetId: commentId,
        emoji,
      });

      dispatch(
        commentSlice.actions.sendCommentReactionSuccess({
          commentId,
          reactions: response.data,
        })
      );
    } catch (error) {
      dispatch(commentSlice.actions.hasError(error.message));
    }
  };
  export const deleteComment = (commentId) => async (dispatch) => {
    dispatch(commentSlice.actions.startLoading());
    try {
      const response = await apiService.delete(`/comments/${commentId}`);
      const postId = response.data.post;
      dispatch(
        commentSlice.actions.deleteCommentSuccess({
          ...response.data,
          commentId,
        })
        );
      dispatch(getComments({ postId }))
      toast.success("Comment removed");
    } catch (error) {
      dispatch(commentSlice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };