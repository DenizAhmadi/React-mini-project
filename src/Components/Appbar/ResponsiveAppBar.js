import React, { useEffect, useState } from "react";
import "./Appbar.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {
  MdKeyboardArrowDown,
} from "react-icons/md";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {  FaUsers } from "react-icons/fa";
import { Link, Route } from "react-router-dom";
import Logo from "../../Assets/Icons/gps-navigation.png";

const tabs = [
  {
    label: "مدیریت کاربران",
    value: 1,
    icon: <FaUsers style={{ color: "white", fontSize: "1.2rem" }} />,
    route: "/home/UsersManagement/",
  },
];

const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [notifBadgeContent, setNotifBadgeContent] = useState(100);
  const [selectedTab, setSelectedTab] = useState(
    props.selectedTab ? props.selectedTab : 1
  );

  useEffect(() => {
    setSelectedTab(props.selectedTab);
  }, [props.selectedTab]);

  const handleChange = (event, newValue) => {
    props.handleTabChange(newValue);
  };
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

  const onNotifBadgeClick = () => {
    if (notifBadgeContent) setNotifBadgeContent(null);
    else setNotifBadgeContent(100);
  };

  const handleLogout = () => {
    window.location = "/login";
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_image");
  };

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
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
                  display: { xs: "block", lg: "none" },
                }}
              >
                {tabs.map((page) => (
                  <MenuItem
                    component={Link}
                    to={page.route}
                    key={page.value}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <IconButton
              style={{ marginRight: -20 }}
              sx={{ display: { xs: "none", lg: "flex" } }}
            >
              <Avatar
                alt="Remy Sharp"
                src={Logo}
                style={{ height: 55, width: 55 }}
              />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}
            >
              سپنتا
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}>
              <Tabs
                value={selectedTab}
                onChange={handleChange}
                // indicatorColor={{ style: { background: "blue" } }}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#D97D54",
                  },
                }}
                aria-label="secondary tabs example"
              >
                {tabs.map((tab) => {
                  return (
                    <Tab
                      component={Link}
                      to={tab.route}
                      style={{ color: "white" }}
                      key={tab.value}
                      label={tab.label}
                      value={tab.value}
                      icon={tab.icon}
                    />
                  );
                })}
              </Tabs>
            </Box>
            {/* <Badge
              className="notification-badge"
              color="secondary"
              badgeContent={notifBadgeContent}
              max={99}
              onClick={onNotifBadgeClick}
            >
              <NotificationsIcon />
            </Badge> */}
            <Box sx={{ flexGrow: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {localStorage.getItem("user_token")}
                <IconButton
                  style={{ marginLeft: -4 }}
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                >
                  <MdKeyboardArrowDown style={{ color: "white" }} />
                </IconButton>
                <Tooltip title="تنظیمات">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={localStorage.getItem("user_token")}
                      src={localStorage.getItem("user_image")}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
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
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography>پروفایل</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography>خروج</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* {window.location.pathname === "/home/Zonemapping/" && <Zonemapping />}
      {window.location.pathname === "/home/Dashboard/" && <Dashboard />}
      {window.location.pathname === "/home/Alerts/" && <Alerts />}
      {window.location.pathname === "/home/History/" && <History />}
      {window.location.pathname === "/home/DeviceManagement/" && (
        <DeviceManagement />
      )}
      {window.location.pathname === "/home/Users/" && <Users />}
      {window.location.pathname === "/home/Geofences/" && <Geofences />}
      {window.location.pathname === "/home/TrackMonitoring/" && (
        <TrackMonitoring />
      )} */}
    </>
  );
};
export default ResponsiveAppBar;
