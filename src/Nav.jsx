import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import TranslateIcon from "@mui/icons-material/Translate";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import DraftsIcon from "@mui/icons-material/Drafts";
import CloseIcon from "@mui/icons-material/Close";

const GreenDotBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-dot": {
    backgroundColor: "#4caf50",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(7)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100ch",
    },
  },
}));

const activeMenuItemStyle = {
  color: "#7367f0",
  backgroundColor: "#e9e7fd",
};

const Nav = ({ toggleTheme, mode }) => {
  const [searchText, setSearchText] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLanguageClick = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchor(null);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    handleLanguageClose();
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchText}
              onChange={handleSearchChange}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={handleLanguageClick}>
            <TranslateIcon />
          </IconButton>
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <IconButton color="inherit">
            <DashboardCustomizeIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge color="error" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleMenuClick}>
            <GreenDotBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src="img/1.jpg" alt="Profile" />
            </GreenDotBadge>
          </IconButton>

          <Menu
            anchorEl={languageAnchor}
            open={Boolean(languageAnchor)}
            onClose={handleLanguageClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              style: {
                width: "200px",
              },
            }}
          >
            {["English", "French", "Arabic", "German"].map((language) => (
              <MenuItem
                key={language}
                onClick={() => handleLanguageSelect(language)}
                sx={selectedLanguage === language ? activeMenuItemStyle : {}}
              >
                {language}
              </MenuItem>
            ))}
          </Menu>

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem>
              <Box display="flex" alignItems="center" p={1}>
                <Avatar src="img/1.jpg" alt="Profile" />
                <Box ml={2}>
                  <Typography variant="body1">Siddharth</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Admin
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose} sx={{ width: "250px" }}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <Typography variant="inherit">My Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <Typography variant="inherit">Settings</Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <RequestPageIcon />
              </ListItemIcon>
              <Typography variant="inherit">Billing</Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <MonetizationOnIcon />
              </ListItemIcon>
              <Typography variant="inherit">Pricing</Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <QuestionMarkIcon />
              </ListItemIcon>
              <Typography variant="inherit">FAQ</Typography>
            </MenuItem>
            <Divider />
            <MenuItem>
              <Button
                onClick={() => {
                  handleMenuClose();
                }}
                endIcon={<LogoutIcon />}
                variant="contained"
                color="error"
                fullWidth
              >
                Logout
              </Button>
            </MenuItem>
          </Menu>

          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={handleNotificationClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem disabled>
              <div style={{ position: "relative", width: "100%" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Notifications
                </Typography>
                <DraftsIcon
                  style={{ position: "absolute", top: 0, right: 0 }}
                />
              </div>
            </MenuItem>
            <Divider />
            <MenuItem
              style={{
                width: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ marginRight: 2 }} />
                <Typography variant="body2">New message</Typography>
              </div>
              <CloseIcon style={{ cursor: "pointer" }} />
            </MenuItem>
            <MenuItem
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ marginRight: 2 }} />
                <Typography variant="body2">New message</Typography>
              </div>
              <CloseIcon style={{ cursor: "pointer", marginLeft: 30 }} />
            </MenuItem>
            <Divider />
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
