import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";
import withStyles from "@mui/styles/withStyles";
import UsersListTable from "./UsersList/UsersListTable";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddUser from "./AddUser/AddUser";
import axios from "axios";
import { toast } from "react-toastify";

const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("user_token"),
};

const CustomTab = withStyles({
  root: {
    backgroundColor: "#37a1ff",
  },
  selected: {
    backgroundColor: "#37a1ff",
  },
})(Tab);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const theme = createTheme({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const UsersManagement = () => {
  const [page, setPage] = useState(window.location.hash === "#AddUser" ? 1 : 0);
  const [alertDetails, setAlertDetail] = useState([]);
  const [userData, setUserData] = useState({});
  const [userImageCode, setUserImageCode] = useState("");
  useEffect(() => {
    // getRules();
    let path = window.location.hash;
    if (path == "#UsersList") {
      setPage(0);
    } else if (path == "#AddUser") {
      setPage(1);
    }
  }, []);
  const handleChange = (event, newValue) => {
    setUserData({});
    setUserImageCode("");
    setPage(newValue);
  };

  const handleEdit = async (userId) => {
    console.log(userId)
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
          }}
        >
          <AppBar position="static">
            <Tabs
              value={page}
              onChange={handleChange}
              variant="fullWidth"
              textColor="inherit"
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#D97D54",
                },
              }}
            >
              <CustomTab
                component={Link}
                to="/home/UsersManagement/#UsersList"
                label="لیست کاربران"
                {...a11yProps(0)}
              />
              <CustomTab
                component={Link}
                to="/home/UsersManagement/#AddUser"
                label="ثبت کاربر"
                {...a11yProps(1)}
              />
            </Tabs>
          </AppBar>
          <TabPanel className="alert-tabpanel" value={page} index={0}>
            <UsersListTable setPage={setPage} handleEdit={handleEdit} />
          </TabPanel>
          <TabPanel className="alert-tabpanel" value={page} index={1}>
            <AddUser
              setUserData={setUserData}
              setPage={setPage}
              userData={userData}
            />
          </TabPanel>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default UsersManagement;
