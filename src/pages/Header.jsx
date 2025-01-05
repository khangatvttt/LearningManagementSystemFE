import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import { styled, alpha } from "@mui/material/styles";
import { Typography, Button, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginLeft: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create("width"),
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "20ch",
  },
}));

const Header = () => {
  return (
    <AppBar position="static" color="default" elevation={0} style={{ borderBottom: "1px solid #ddd" }}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" noWrap component="div" sx={{ display: "flex", alignItems: "center" }}>
          <img src="logo-placeholder.png" alt="Logo" style={{ height: "30px", marginRight: "10px" }} />
          Cursus
        </Typography>

        {/* Search Bar */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search for Tuts Videos, Tutors, Tests and more.."
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        {/* Spacer */}
        <div style={{ flexGrow: 1 }} />

        {/* Create New Course Button */}
        <Button variant="contained" color="error" sx={{ textTransform: "none", marginRight: "10px" }}>
          Create New Course
        </Button>

        {/* Icons */}
        <IconButton size="large" aria-label="show cart items" color="inherit">
          <Badge badgeContent={2} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton size="large" aria-label="show messages" color="inherit">
          <Badge badgeContent={3} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton size="large" aria-label="show notifications" color="inherit">
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* User Avatar */}
        <IconButton sx={{ p: 0 }}>
          <Avatar alt="User" src="avatar-placeholder.png" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
