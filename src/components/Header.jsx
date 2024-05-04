import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import StyledLogo from "./StyledLogo";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../context/UserContext";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { authUser } = useContext(UserContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = [
    {
      name: "New Game",
      to: "/new_game",
    },
    // {
    // 	name: 'Leaderboard',
    // 	to: '/leaderboard'
    // },
    {
      name: "Contact",
      to: "/contact",
    },
  ];

  const userSettings = [
    {
      name: "Profile",
      to: "/profile",
    },
    {
      name: "Logout",
      to: "/logout",
    },
  ];

  const guestSettings = [
    {
      name: "Login",
      to: "/login",
    },
    {
      name: "Sign Up",
      to: "/signup",
    },
  ];

  const settings = authUser ? userSettings : guestSettings;

  return (
    <>
      <AppBar position="fixed" style={{ background: "#00000050" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <StyledLogo xsDisplay="none" mdDisplay="flex" variant="h6" />
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="Menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem
                    key={index}
                    component={Link}
                    to={page.to}
                    onClick={handleCloseNavMenu}
                  >
                    {page.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <StyledLogo xsDisplay="flex" mdDisplay="none" variant="h6" />
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={page.to}
                  sx={{ my: 2, color: "inherit", display: "block" }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem
                    key={index}
                    component={Link}
                    to={setting.to}
                    onClick={handleCloseUserMenu}
                  >
                    {setting.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar sx={{ marginBottom: "4rem" }} />
    </>
  );
};
export default Header;
