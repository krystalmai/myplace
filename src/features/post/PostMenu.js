import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { deletePost } from "./postSlice";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import ConfirmDelete from "../../components/ConfirmDelete";

const ITEM_HEIGHT = 48;

export default function LongMenu({ postId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const options = [
    {
      name: "Remove",
      onClick: () => {
        
        handleOpenDialog()
      },
    },
    {
      name: "Edit",
      onClick: () => {
        navigate(`postupdate/${postId}`);
      },
    },
  ];

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ zIndex: 100 }}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4,
            width: "15ch",
            marginRight: 4,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.name}
            onClick={() => {
              option.onClick();
              handleClose();
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
      <ConfirmDelete
        open={openDialog}
        handleClose={handleCloseDialog}
        callback={() => dispatch(deletePost(postId))}
      />
    </>
  );
}
