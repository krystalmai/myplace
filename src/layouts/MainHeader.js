import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Divider
} from "@mui/material";

import { useNavigate, Link as RouterLink } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo";

export default function MainHeader() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate()

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        navigate("/login")
      })
    } catch (error) {
      console.error(error)
    }
  }

  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.name}
        </Typography>
        <Typography variant="body2" sx={{color: "text.secondary"}} noWrap>
          {user?.email}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />
      
      <MenuItem onClick={handleMenuClose}
        to="/"
        component={RouterLink} sx={{ mx: 1 }}>
        My Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}
        to="/account"
        component={RouterLink} sx={{ mx: 1 }}>
        Account Settings
      </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem onClick={handleLogout} sx={{m:1}}>Log out</MenuItem>

    </Menu>
  );
  return (
    <Box sx={{ mb: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyPlace
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Avatar
              src={user.avatarUrl}
              alt={user.name}
              onClick={handleProfileMenuOpen}
            />
            {renderMenu}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
