import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, IconButton, Paper, Typography } from "@mui/material";

import { Box, Stack } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import ConfirmDelete from "../../components/ConfirmDelete";
import { formatDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import { deleteComment } from "./commentSlice";

function CommentCard({ comment }) {
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Avatar src={comment?.author?.avatarUrl} alt={comment?.author?.name} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {formatDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleOpenDialog}>
            <DeleteIcon sx={{ fontSize: 20, color: "secondary.light" }} />
          </IconButton>
          <CommentReaction comment={comment} />
          <ConfirmDelete
            open={openDialog}
            handleClose={handleCloseDialog}
            callback={() => dispatch(deleteComment(comment._id))}
          />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
