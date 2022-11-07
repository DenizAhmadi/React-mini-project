import React, { useState } from "react";
import "./AuthContainer.css";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Login from "../Components/Auth/Login/Login";
import Signup from "../Components/Auth/Signup/Signup";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <div className="auth">
      <Box
        className="Mui-login-box"
        sx={{ bgcolor: "background.paper", width: 500 }}
      >
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            // indicatorColor="secondary"
            variant="fullWidth"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#D97D54",
              },
            }}
          >
            <Tab
              style={{ color: "white", fontSize: 18 }}
              label="ورود"
              {...a11yProps(0)}
            />
            {/*signup*/}
            {/* <Tab
              style={{ color: "white", fontSize: 18 }}
              label="ثبت‌نام"
              {...a11yProps(1)}
            /> */}
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} dir={theme.direction}>
          <Login />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Signup />
        </TabPanel>
      </Box>
    </div>
  );
}
