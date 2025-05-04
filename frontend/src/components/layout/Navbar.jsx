import React, { useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logout } from "../../store/slices/authSlice";
import { clearProfile } from "../../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import MenuMUI from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Navbar = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const userProfile = useAppSelector((state) => state.user.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearProfile());
    navigate("/login");
  };

  const getInitials = () => {
    if (userProfile) {
      return `${userProfile.firstName[0]}${userProfile.lastName[0]}`;
    }
    return user && user.email ? user.email[0].toUpperCase() : "?";
  };

  const menuItems =
    user && user.role === "alumni"
      ? [
          { name: "Dashboard", path: "/dashboard" },
          { name: "Jobs", path: "/jobs" },
          { name: "Post Job", path: "/post-job" },
          { name: "Mentorship", path: "/mentorship" },
          { name: "Requests", path: "/mentorship-requests" },
        ]
      : [
          { name: "Dashboard", path: "/dashboard" },
          { name: "Jobs", path: "/jobs" },
          { name: "Mentors", path: "/mentors" },
          { name: "My Applications", path: "/my-applications" },
        ];

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <header
      style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 1.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography variant="h5" fontWeight="bold" color="primary">
                Alumni Connect
              </Typography>
            </Link>
            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
              {isAuthenticated &&
                menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{
                      color: "#444",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {!isAuthenticated ? (
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                <Button variant="outlined" component={Link} to="/login">
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <IconButton onClick={handleAvatarClick} size="large">
                  <Avatar src={userProfile?.avatar}>{getInitials()}</Avatar>
                </IconButton>
                <MenuMUI
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem disabled>
                    <Typography variant="subtitle2">
                      {userProfile
                        ? `${userProfile.firstName} ${userProfile.lastName}`
                        : user?.email}
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleMenuClose}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      handleMenuClose();
                    }}
                    sx={{ color: "error.main" }}
                  >
                    <LogOut size={18} style={{ marginRight: 8 }} />
                    Logout
                  </MenuItem>
                </MenuMUI>
              </Box>
            )}
            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                size="large"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </IconButton>
            </Box>
          </Box>
        </Box>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "column",
              pt: 2,
              pb: 1,
            }}
          >
            {isAuthenticated ? (
              <>
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{
                      padding: 8,
                      color: "#444",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/profile"
                  style={{
                    padding: 8,
                    color: "#444",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  color="error"
                  startIcon={<LogOut size={18} />}
                  sx={{ justifyContent: "flex-start", pl: 1, mt: 1 }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    padding: 8,
                    color: "#444",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={{
                    padding: 8,
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </Box>
        )}
      </Box>
    </header>
  );
};

export default Navbar;
