import "./AddUser.css";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { FormLabel } from "@mui/material";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import validator from "validator";
import Avatar from "@mui/material/Avatar";
import SampleAvatar from "../../../../Assets/Images/sample-profile-pic.jfif";
import { IconButton, Button } from "@mui/material";
import axios from "axios";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { toast } from "react-toastify";
import {
  API_USERS_MANAGEMENT_ADD_USER,
  API_USERS_MANAGEMENT_EDIT_USER,
} from "../../../../Static/Constants";
import { Spin } from "antd";
import { convertFileToBase64 } from "../../../../utils/utils";

// Require `PhoneNumberFormat`.
const PNF = require("google-libphonenumber").PhoneNumberFormat;

// Get an instance of `PhoneNumberUtil`.
const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();

const initialState = {
  name: "",
  lastname: "",
  email: "",
  phone_number: "",
  password: "",
  passwordConfirm: "",
  role: "admin",
  birthdate: "",
  national_code: "",
  license_code: "",
  userGender: 1,
  address: "",
  username: "",
  nameErr: false,
  lastnameErr: false,
  usernameErr: false,
  national_codeErr: false,
  passwordErr: false,
  passwordConfirmErr: false,
  image_code: "",
};
const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("user_token"),
};

const AddUser = (props) => {
  const [
    {
      name,
      lastname,
      email,
      phone_number,
      password,
      passwordConfirm,
      role,
      birthdate,
      national_code,
      license_code,
      userGender,
      address,
      username,
      nameErr,
      lastnameErr,
      usernameErr,
      national_codeErr,
      passwordErr,
      passwordConfirmErr,
      image_code,
    },
    setState,
  ] = useState(initialState);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageSizeErr, setImageSizeErr] = useState(false);
  useEffect(() => {
    let data = props.userData;
    if (data.username) {
      setIsEditing(true);
      let birthdate = "";
      if (data.birthdate) {
        birthdate = new Date(data.birthdate);
        birthdate = new Intl.DateTimeFormat("fa-IR", {
          dateStyle: "short",
        }).format(birthdate);
      }
      setState((prevState) => ({
        ...prevState,
        name: data.name_image_object.name,
        lastname: data.lastname,
        username: data.username,
        phone_number: data.phone_number,
        email: data.email,
        birthdate: birthdate,
        national_code: data.national_code,
        userGender: data.gender === "مرد" ? 1 : data.gender === "زن" ? 2 : "",
        address: data.address,
        role: data.role,
        license_code: data.license_code,
        license_code: data.license_code,
        image_code: data.name_image_object.image_code,
      }));
    }
  }, [props.userData]);

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    if (name === "phone_number") {
      if (!isNaN(+value)) {
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      } else return;
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("submit")
  };

  const onCancel = () => {
    props.setUserData({});
    if (isEditing) props.setPage(0);
    else setState(initialState);
  };

  const onBirthDatePickerChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      birthdate: e,
    }));
  };

  const setAvatar = async (e) => {
    const file = e.target.files[0];
    const size_mb = e.target.files[0].size / 1024 ** 2;
    const size_kb = size_mb * 1000;
    if (size_kb <= 300) {
      const base64Avatar = await convertFileToBase64(file);
      setImageSizeErr(false);
      setState((prevState) => ({
        ...prevState,
        image_code: base64Avatar ? base64Avatar : "",
      }));
    } else {
      setImageSizeErr(true);
      toast.warning("حجم تصویر حداکثر باید 300 کیلوبایت باشد.");
    }
  };

  return (
    <>
      <Spin spinning={loading} tip="لطفا صبر کنید..." className="spinner">
        <Box className="add-user-center-element">
          <Box className="user-management-add-user">
            <Grid container spacing={2}>
              <Grid item xl={3} lg={3} md={12} sm={12} xs={12}>
                <Box className="add-user-center-element">
                  <IconButton component="label">
                    <input
                      onChange={(e) => setAvatar(e)}
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      max={20}
                    />
                    <Avatar
                      className="new-user-avatar"
                      sx={{ width: 150, height: 150 }}
                      alt="avatar"
                      src={image_code ? image_code : SampleAvatar}
                    />
                  </IconButton>
                </Box>
                {imageSizeErr && (
                  <div className="add-user-center-element add-userimage-size-err">
                    <span>*حداکثر حجم قابل قبول 300 کیلوبایت است.</span>
                  </div>
                )}

                <Box className="add-user-center-element">
                  <Button
                    sx={{ width: "50%" }}
                    variant="contained"
                    component="label"
                  >
                    انتخاب تصویر
                    <input
                      onChange={(e) => setAvatar(e)}
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                    />
                  </Button>
                </Box>
                <Box className="add-user-center-element">
                  <Button
                    sx={{ mt: 1, width: "50%" }}
                    variant="text"
                    color="error"
                    onClick={() => {
                      setState((prevState) => ({
                        ...prevState,
                        image_code: "",
                      }));
                      setImageSizeErr(false);
                    }}
                  >
                    حذف تصویر
                  </Button>
                </Box>
              </Grid>
              <Grid item xl={9} lg={9} md={12} sm={12} xs={12}>
                {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 20,
          }}
          component={"h1"}
        >
          <FormControl sx={{ width: "20%" }}>
            <InputLabel id="user-role-label">نقش کاربر</InputLabel>
            <Select
              labelId="user-role-label"
              id="user-role"
              value={role
}
              label="نقش کاربر"
              onChange={handleChange}
              name="role
"
            >
              <MenuItem value="admin">ادمین</MenuItem>
              <MenuItem value="driver">منظور</MenuItem>
            </Select>
          </FormControl>
        </Box> */}
                <Box className="add-user-center-element">
                  <form className="add-user-form">
                    <Box>
                      <Box className="add-user-center-element profile-title">
                        <h1>اطلاعات کاربر جدید را وارد کنید</h1>
                      </Box>
                      <Grid container spacing={2}>
                        {/* <h1>اطلاعات سپنتا</h1> */}
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              // sx={{
                              //   mt: 1,
                              // }}
                              error={!name && nameErr}
                              id="new-user-name"
                              name="name"
                              type="text"
                              onChange={handleChange}
                              label="نام"
                              variant="outlined"
                              value={name}
                              inputProps={{
                                maxLength: 20,
                              }}
                              required
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              // sx={{
                              //   mt: 1,
                              // }}
                              error={!lastname && lastnameErr}
                              id="new-user-family-name"
                              type="text"
                              name="lastname"
                              onChange={handleChange}
                              label="نام خانوادگی"
                              variant="outlined"
                              value={lastname}
                              inputProps={{
                                maxLength: 20,
                              }}
                              required
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              // sx={{
                              //   mt: 1,
                              // }}
                              disabled={isEditing}
                              error={!username && usernameErr}
                              id="new-user-username"
                              type="text"
                              name="username"
                              onChange={handleChange}
                              label="نام‌کاربری"
                              variant="outlined"
                              value={username}
                              required
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              // sx={{
                              //   mt: 1,
                              // }}
                              disabled={isEditing}
                              error={!password && passwordErr}
                              id="new-user-password"
                              type="password"
                              name="password"
                              onChange={handleChange}
                              label="گذرواژه"
                              variant="outlined"
                              value={password}
                              required
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              // sx={{
                              //   mt: 1,
                              // }}
                              disabled={isEditing}
                              error={!passwordConfirm && passwordConfirmErr}
                              id="new-user-confirm-password"
                              type="password"
                              name="passwordConfirm"
                              onChange={handleChange}
                              label="تکرار گذرواژه"
                              variant="outlined"
                              value={passwordConfirm}
                              required
                            />
                          </FormControl>
                        </Grid>
                        {/* <h1>اطلاعات شخصی</h1> */}
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              id="new-user-national_code"
                              name="national_code"
                              type="national_code"
                              onChange={handleChange}
                              label="کدملی"
                              variant="outlined"
                              value={national_code}
                              inputProps={{
                                maxLength: 10,
                              }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              // sx={{
                              //   mt: 1,
                              // }}
                              id="new-user-license_code"
                              type="license_code"
                              name="license_code"
                              onChange={handleChange}
                              label="شماره گواهینامه"
                              variant="outlined"
                              value={license_code}
                              inputProps={{
                                maxLength: 12,
                              }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <FormControl
                            className="rtlDatePicker"
                            sx={{ mt: 1 }}
                            style={{ width: "100%" }}
                          >
                            <DatePicker
                              animations={[
                                transition({
                                  from: 35,
                                  transition:
                                    "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
                                }),
                              ]}
                              style={{ width: "100%" }}
                              inputClass="new-user-birth-date-picker-input"
                              className="new-user-birth-date-picker"
                              value={birthdate}
                              format="YYYY/MM/DD"
                              onChange={onBirthDatePickerChange}
                              name="birthdate"
                              calendar={persian}
                              locale={persian_fa}
                              calendarPosition="top-right"
                              placeholder="تاریخ تولد"
                              hideOnScroll
                              editable
                              maxDate={
                                new DateObject({
                                  calendar: persian,
                                  locale: persian_fa,
                                })
                              }
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="user-gender-label">
                              جنسیت
                            </InputLabel>
                            <Select
                              // sx={{
                              //   mt: 1,
                              // }}
                              labelId="user-gender-label"
                              id="user-gender"
                              value={userGender}
                              label="جنسیت"
                              onChange={handleChange}
                              name="userGender"
                            >
                              <MenuItem value={1}>مرد</MenuItem>
                              <MenuItem value={2}>زن</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        {/* <h1>اطلاعات تماس</h1> */}
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              // sx={{
                              //   mt: 1,
                              // }}
                              id="new-user-address"
                              type="address"
                              name="address"
                              onChange={handleChange}
                              label="آدرس"
                              variant="outlined"
                              value={address}
                              multiline
                              inputProps={{
                                maxLength: 150,
                              }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              // sx={{
                              //   mt: 1,
                              // }}
                              id="new-user-email"
                              name="email"
                              type="email"
                              onChange={handleChange}
                              label="ایمیل"
                              placeholder="example@gmail.com"
                              variant="outlined"
                              value={email}
                              inputProps={{
                                maxLength: 60,
                              }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              // sx={{
                              //   mt: 1,
                              // }}
                              id="new-user-phone_number"
                              type="phone_number"
                              name="phone_number"
                              onChange={handleChange}
                              label="شماره تماس"
                              variant="outlined"
                              placeholder="09121234567"
                              value={phone_number}
                              inputProps={{
                                maxLength: 11,
                              }}
                            />
                          </FormControl>
                        </Grid>

                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                          <Button
                            variant="contained"
                            onClick={onSubmit}
                            sx={{ width: "50%" }}
                            type="submit"
                          >
                            تایید و ثبت
                          </Button>
                        </Grid>

                        <Grid
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                          item
                          xl={6}
                          lg={6}
                          md={6}
                          sm={12}
                          xs={12}
                        >
                          <Button
                            variant="outlined"
                            onClick={onCancel}
                            sx={{
                              width: "50%",
                            }}
                            type="submit"
                          >
                            انصراف
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box />
                  </form>
                </Box>
              </Grid>
            </Grid>
            {/* {role
 === "admin" ? (
          <form className="new-user-form">
            <h1>اطلاعات ادمین جدید</h1>
            <Grid container spacing={2}>
              <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    sx={{
                      mt: 1,
                    }}
                    id="new-user-name"
                    name="name"
                    type="text"
                    onChange={handleChange}
                    label="نام"
                    variant="outlined"
                    value={name}
                    inputProps={{
                      maxLength: 20,
                    }}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    sx={{
                      mt: 1,
                    }}
                    id="new-user-family-name"
                    type="text"
                    name="lastname"
                    onChange={handleChange}
                    label="نام خانوادگی"
                    variant="outlined"
                    value={lastname}
                    inputProps={{
                      maxLength: 20,
                    }}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    sx={{
                      mt: 1,
                    }}
                    id="new-user-phone_number"
                    type="tel"
                    pattern="&#91;0-9&#93;{3}-&#91;0-9&#93;{3}-&#91;0-9&#93;{4}"
                    name="phone_number"
                    onChange={handleChange}
                    label="شماره تماس"
                    variant="outlined"
                    value={phone_number}
                    inputProps={{
                      maxLength: 11,
                    }}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    sx={{
                      mt: 1,
                    }}
                    id="new-user-email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    label="ایمیل"
                    variant="outlined"
                    value={email}
                    inputProps={{
                      maxLength: 50,
                    }}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    sx={{
                      mt: 1,
                    }}
                    id="new-user-password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    label="گذرواژه"
                    variant="outlined"
                    value={password}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    sx={{
                      mt: 1,
                    }}
                    id="new-user-confirm-password"
                    type="password"
                    name="passwordConfirm"
                    onChange={handleChange}
                    label="تکرار گذرواژه"
                    variant="outlined"
                    value={passwordConfirm}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
            <MuiButton
              variant="contained"
              onClick={onSubmit}
              sx={{ mt: 1 }}
              type="submit"
            >
              تایید و ثبت
            </MuiButton>
          </form>
        ) : (
          <>
            <form className="new-user-form">
              <Box sx={{ mb: 2 }}>
                <h1>اطلاعات هویتی</h1>
                <Grid container spacing={2}>
                  <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        sx={{
                          mt: 1,
                        }}
                        id="new-user-name"
                        name="name"
                        type="text"
                        onChange={handleChange}
                        label="نام"
                        variant="outlined"
                        value={name}
                        inputProps={{
                          maxLength: 20,
                        }}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        sx={{
                          mt: 1,
                        }}
                        id="new-user-family-name"
                        type="text"
                        name="lastname"
                        onChange={handleChange}
                        label="نام خانوادگی"
                        variant="outlined"
                        value={lastname}
                        inputProps={{
                          maxLength: 20,
                        }}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
                    <FormControl
                      className="rtlDatePicker"
                      sx={{ mt: 1 }}
                      style={{ width: "100%" }}
                    >
                      <DatePicker
                        animations={[
                          transition({
                            from: 35,
                            transition:
                              "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
                          }),
                        ]}
                        style={{ width: "100%" }}
                        inputClass="new-user-birth-date-picker-input"
                        className="new-user-birth-date-picker"
                        value={birthdate}
                        format="YYYY/MM/DD"
                        onChange={onBirthDatePickerChange}
                        name="birthdate"
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                        placeholder="تاریخ تولد"
                        hideOnScroll
                        editable
                        maxDate={
                          new DateObject({
                            calendar: persian,
                            locale: persian_fa,
                          })
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        sx={{
                          mt: 1,
                        }}
                        id="new-user-national_code
"
                        name="national_code
"
                        type="national_code
"
                        onChange={handleChange}
                        label="کدملی"
                        variant="outlined"
                        value={national_code
}
                        inputProps={{
                          maxLength: 12,
                        }}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        sx={{
                          mt: 1,
                        }}
                        id="new-user-license_code"
                        type="license_code"
                        name="license_code"
                        onChange={handleChange}
                        label="شماره گواهینامه"
                        variant="outlined"
                        value={license_code}
                        inputProps={{
                          maxLength: 12,
                        }}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="user-gender-label">جنسیت</InputLabel>
                      <Select
                        sx={{
                          mt: 1,
                        }}
                        labelId="user-gender-label"
                        id="user-gender"
                        value={userGender}
                        label="جنسیت"
                        onChange={handleChange}
                        name="userGender"
                        required
                      >
                        <MenuItem value="male">مرد</MenuItem>
                        <MenuItem value="female">زن</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ mb: 2 }}>
                <h1>اطلاعات تماس</h1>
                <Grid container spacing={2}>
                  <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        sx={{
                          mt: 1,
                        }}
                        id="new-user-email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        label="ایمیل"
                        variant="outlined"
                        value={email}
                        inputProps={{
                          maxLength: 60,
                        }}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        sx={{
                          mt: 1,
                        }}
                        id="new-user-phone_number"
                        type="phone_number"
                        name="phone_number"
                        onChange={handleChange}
                        label="شماره تماس"
                        variant="outlined"
                        value={phone_number}
                        inputProps={{
                          maxLength: 10,
                        }}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        sx={{
                          mt: 1,
                        }}
                        id="new-user-address"
                        type="address"
                        name="address"
                        onChange={handleChange}
                        label="آدرس"
                        variant="outlined"
                        value={address}
                        multiline
                        inputProps={{
                          maxLength: 150,
                        }}
                        required
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ mb: 2 }}>
                <h1>گذرواژه سپنتا</h1>
                <Grid container spacing={2}>
                  <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        sx={{
                          mt: 1,
                        }}
                        id="new-user-password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        label="گذرواژه"
                        variant="outlined"
                        value={password}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        sx={{
                          mt: 1,
                        }}
                        id="new-user-confirm-password"
                        type="password"
                        name="passwordConfirm"
                        onChange={handleChange}
                        label="تکرار گذرواژه"
                        variant="outlined"
                        value={passwordConfirm}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    sx={{ display: "flex", alignItems: "center" }}
                    item
                    xl={4}
                    lg={4}
                    md={3}
                    sm={6}
                    xs={12}
                  >
                    <MuiButton
                      variant="contained"
                      onClick={onSubmit}
                      sx={{ width: "50%" }}
                      type="submit"
                    >
                      تایید و ثبت
                    </MuiButton>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </>
        )} */}
          </Box>
        </Box>
      </Spin>
    </>
  );
};

export default AddUser;
