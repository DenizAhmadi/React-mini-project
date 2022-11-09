import React, { useEffect, useState } from "react";
import gpsIcon from "../../../Assets/Icons/gps-navigation.png";
import "./Singup.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import { useFormControl } from "@mui/material/FormControl";
import axios from "axios";
import { API_SIGNUP_URL } from "../../../Static/Constants";
import { toast } from "react-toastify";

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

const Signup = () => {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
    username: "",
    confirmPassword: "",
    showConfirmPassword: false,
    lastname: "",
    firstname: "",
  });

  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showCofirmPasswordError, setShowCofirmPasswordError] = useState(false);
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showFirstnameError, setShowFirstnameError] = useState(false);
  const [showLastnameError, setShowLastnameError] = useState(false);

  const handleChange = (prop) => (event) => {
    if (prop === "confirmPassword" && event.target.value !== values.password)
      setShowCofirmPasswordError(true);
    else if (
      prop === "confirmPassword" &&
      event.target.value === values.password
    )
      setShowCofirmPasswordError(false);
    if (prop === "firstname") setShowFirstnameError(false);
    if (prop === "lastname") setShowLastnameError(false);
    if (prop === "password") setShowPasswordError(false);
    if (prop === "username") setShowUsernameError(false);

    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSignup = (e) => {
    e.preventDefault();
    if (!values.password) setShowPasswordError(true);
    if (!values.username) setShowUsernameError(true);
    if (!values.confirmPassword) setShowCofirmPasswordError(true);
    if (!values.firstname) setShowFirstnameError(true);
    if (!values.lastname) setShowLastnameError(true);

    if (
      values.password &&
      values.username &&
      values.confirmPassword &&
      values.firstname &&
      values.lastname
    ) {
      setShowPasswordError(false);
      setShowUsernameError(false);
      setShowCofirmPasswordError(false);
      setShowFirstnameError(false);
      setShowLastnameError(false);
      axios({
        method: "post",
        url: API_SIGNUP_URL,
        headers: {},
        data: {
          username: values.username,
          password: values.password,
        },
      })
        .then((res) => {
          localStorage.setItem("access", res.data.token);
          localStorage.setItem("user_token", res.data.token);
          localStorage.setItem("user_id", res.data.user_id);
        })
        .catch((err) => {
          toast.error("در سیستم مشکلی به وجود آمده است.");
        });
    }
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
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, maxWidth: "100%" },
            }}
            noValidate
            autoComplete="off"
            dir="rtl"
          >
            <form
              id={"Signup-Form"}
              onSubmit={(e) => {
                e.preventDefault();
                onSignup();
              }}
            >
              <FormControl fullWidth variant="outlined">
                <TextField
                  error={showFirstnameError}
                  helperText={showFirstnameError ? "نام خود را وارد کنید!" : ""}
                  id="outlined-adornment-firstname"
                  type={"text"}
                  value={values.firstname}
                  onChange={handleChange("firstname")}
                  //   endAdornment={
                  //     <InputAdornment position="end">
                  //       <PersonIcon />
                  //     </InputAdornment>
                  //   }
                  label="نام"
                />
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <TextField
                  error={showLastnameError}
                  helperText={
                    showLastnameError ? "نام خانوادگی خود را وارد کنید!" : ""
                  }
                  id="outlined-adornment-lastname"
                  type={"text"}
                  value={values.lastname}
                  onChange={handleChange("lastname")}
                  label="نام خانوادگی"
                />
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <TextField
                  error={showUsernameError}
                  helperText={
                    showUsernameError
                      ? "یک نام کاربری برای خود انتخاب کنید!"
                      : ""
                  }
                  id="signup-outlined-adornment-username"
                  type={"text"}
                  value={values.username}
                  onChange={handleChange("username")}
                  //   endAdornment={
                  //     <InputAdornment position="end">
                  //       <PersonIcon />
                  //     </InputAdornment>
                  //   }
                  label="نام کاربری"
                />
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <TextField
                  error={showPasswordError}
                  helperText={
                    showPasswordError ? "یک رمز عبور مناسب انتخاب کنید!" : ""
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
                <TextField
                  error={showCofirmPasswordError}
                  helperText={
                    showCofirmPasswordError ? "تکرار رمز عبور معتبر نیست" : ""
                  }
                  id="outlined-adornment-confirmPassword"
                  type={values.showConfirmPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="تکرار رمز عبور"
                />
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <Button
                  sx={{ m: 1 }}
                  onClick={onSignup}
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  ثبت نام
                </Button>
              </FormControl>
            </form>
          </Box>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
};

export default Signup;
