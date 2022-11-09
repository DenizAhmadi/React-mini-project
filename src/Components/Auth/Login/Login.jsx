import React, { useEffect, useState } from "react";
import gpsIcon from "../../../Assets/Icons/gps-navigation.png";
import "./Login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import axios from "axios";
import { API_LOGIN_URL } from "../../../Static/Constants";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

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

const Login = () => {
  const history = useHistory();
  const [values, setValues] = React.useState({
    password: "",
    username: "",
    showPassword: false,
    passwordError: false,
    usernameError: false,
  });

  const [authenticated, setAuthenticated] = useState(false);

  const handleChange = (prop) => (event) => {
    if (prop === "username")
      setValues({
        ...values,
        [prop]: event.target.value,
        usernameError: false,
      });
    else if (prop === "password")
      setValues({
        ...values,
        [prop]: event.target.value,
        passwordError: false,
      });
    else
      setValues({
        ...values,
        [prop]: event.target.value,
      });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onLogin = async (e) => {
    e.preventDefault();
    window.location = "/home/UsersManagement/";
  };
  return (
    <div>
      <div className="loginLogo">
        <img src={gpsIcon} alt="logo" />
      </div>
      <div className="loginLogoLabel">
        <h1>
          به <b className="sepantaText">سپنتا</b> خوش آمدید
        </h1>
      </div>
      <div className="white-space" />
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, maxWidth: "100%" },
            }}
            noValidate
            autoComplete="off"
            dir="rtl"
          >
            <form onSubmit={onLogin} id={"signup-Form"}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  error={values.usernameError}
                  helperText={
                    values.usernameError
                      ? "یک نام کاربری مناسب برای خود اتخاب کنید!"
                      : ""
                  }
                  inputProps={{
                    name: "email",
                  }}
                  id="login-outlined-adornment-username"
                  type={"text"}
                  value={values.username}
                  onChange={handleChange("username")}
                  label="نام کاربری"
                />
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <TextField
                  error={values.passwordError}
                  helperText={
                    values.passwordError
                      ? "یک رمز عبور مناسب رای خود انتخاب کنید!"
                      : ""
                  }
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="رمز عبور"
                />
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <Button
                  sx={{ m: 1 }}
                  id="login-btn"
                  // onSubmit={onLogin}
                  onSubmit={onLogin}
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  ورود
                </Button>
              </FormControl>
            </form>
          </Box>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
};

export default Login;
