import "primeicons/primeicons.css";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { toast } from "react-toastify";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import "./UsersListTable.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import { Box } from "@mui/system";
import { BsGeoFill } from "react-icons/bs";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import Control from "react-leaflet-custom-control";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { IoMdRefresh } from "react-icons/io";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MuiButton from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SampleAvatar from "../../../../Assets/Images/sample-profile-pic.jfif";
import Avatar from "@mui/material/Avatar";
import {
  API_USERS_MANAGEMENT_GET_USERS,
  API_USERS_MANAGEMENT_RESET_PASS,
  API_USERS_MANAGEMENT_SEARCH_USER,
} from "../../../../Static/Constants";
const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("user_token"),
};
export default function Table(props) {
  const [records, setRecords] = useState([]);
  const [fields, setFields] = useState([]);
  const [recordsCount, setRecordsCount] = useState(0);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [newPasswordConfirm, setNewPasswordConfirm] = useState(null);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [changePassUserId, setChangePassUserId] = useState(null);
  const [searched_lastname, set_searched_lastname] = useState("");
  const [searched_name, set_searched_name] = useState("");
  const [searched_username, set_searched_username] = useState("");
  const [dataRes, setDataRes] = useState([]);

  const [loading, setLoading] = useState(false);
  const dt = useRef(null);

  useEffect(() => {
    getUsers();
    let current = new Date();
    current = new Intl.DateTimeFormat("fa-IR", {
      dateStyle: "full",
      timeStyle: "medium",
    })
      .format(current)
      .replace(",", "،");
    setCurrentDate(current);
  }, [props.records]);

  const getUsers = async () => {

  };

  const resetPass = async () => {

  };

  const changePassHandler = (userId) => {
    setChangePassUserId(userId);
    setShowPasswordDialog(true);
  };
  const editUserDataHandler = (userData) => {
    props.handleEdit(userData.id);
  };

  const actionBodyChangePassword = (rowData) => {
    return (
      <React.Fragment>
        <MuiButton
          variant="text"
          size="small"
          onClick={() => changePassHandler(rowData.id)}
        >
          تغییر گذرواژه
        </MuiButton>
      </React.Fragment>
    );
  };

  const actionBodyEdit = (rowData) => {
    return (
      <React.Fragment>
        <MuiButton
          variant="text"
          size="small"
          onClick={() => editUserDataHandler(rowData)}
        >
          ویرایش
        </MuiButton>
      </React.Fragment>
    );
  };

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = fields.filter((col) =>
      selectedColumns.some((sCol) => sCol.feature_name === col.feature_name)
    );
    setSelectedColumns(orderedSelectedColumns);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const onSearchClick = async () => {

  };

  const onTableRefresh = () => {
    // getClusteringTable(API_GET_DASHBOARD_CLUSTERING_TABLE);
  };

  const representativeBodyTemplate = (data) => {
    let name_image_object = data.name_image_object;
    return (
      <div className="user-table-center-element">
        <div className="table-user-image">
          <Avatar
            className="table-user-avatar"
            sx={{ width: 52, height: 52 }}
            alt={name_image_object.name + " تصوریر"}
            src={
              name_image_object.image_code
                ? name_image_object.image_code
                : SampleAvatar
            }
          />
        </div>
        <span className="table-user-name">{name_image_object.name}</span>
      </div>
    );
  };

  const BodyTemplate = (props, data) => {
    return (
      <div className="user-table-center-element">
        <span>{props[data.field]}</span>
      </div>
    );
  };

  const panelHeaderTemplate = (values, options) => {
    const noDataFound = {
      textAlign: "center",
      paddingTop: "0.5rem",
      fontSize: "1.2rem",
    };
    let content = "";
    if (values.length > 0)
      content = (
        <div className="p-multiselect-header">
          <div>
            <span title="Select All">{options.checkboxElement}</span>
            <b> همه</b>
          </div>
        </div>
      );
    else content = <div style={noDataFound}>داده‌ای موجود نیست</div>;
    return content;
  };

  const header = (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "normal",

          color: "#444444",
        }}
      >
        <span>لیست کاربران</span>
      </Box>
      <Box
        className="table-header"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="table-header1">
          <Tooltip title="بروزرسانی">
            <div className="table-header1-btn">
              <IoMdRefresh
                color="#1976d2"
                className="table-header1-icon"
                size="1.5rem"
                onClick={getUsers}
              />
            </div>
          </Tooltip>
        </div>
        <div className="flex align-items-center export-buttons table-header2-left">
          <MultiSelect
            value={selectedColumns}
            options={fields}
            optionLabel="label"
            placeholder="نمایش ستون‌ها"
            fixedPlaceholder="نمایش ستون‌ها"
            onChange={onColumnToggle}
            style={{ width: "10rem", textAlign: "right" }}
            panelHeaderTemplate={(options) => {
              return panelHeaderTemplate(fields, options);
            }}
          />
          <Tooltip title="خروجی اکسل">
            <Button
              type="button"
              icon="pi pi-file"
              onClick={() => exportCSV(false)}
              className="mr-2"
              data-pr-tooltip="CSV"
            />
          </Tooltip>
        </div>
      </Box>
    </div>
  );

  return (
    <div>
      <div className="UsersList-Header">
        <h4>جست‌وجوی کاربر</h4>
        <Grid container spacing={2}>
          <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
            <FormControl
              variant="outlined"
              style={{ direction: "rtl", width: "100%" }}
            >
              <TextField
                type={"text"}
                value={searched_username}
                onChange={(event) => {
                  set_searched_username(event.target.value);
                }}
                label="نام کاربری"
                placeholder="مثال: ali123"
              />
            </FormControl>
          </Grid>
          <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
            <FormControl
              variant="outlined"
              style={{ direction: "rtl", width: "100%" }}
            >
              <TextField
                type={"text"}
                value={searched_name}
                onChange={(event) => {
                  set_searched_name(event.target.value);
                }}
                label="نام"
                placeholder="مثال: علی"
              />
            </FormControl>
          </Grid>
          <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
            <FormControl
              variant="outlined"
              style={{ direction: "rtl", width: "100%" }}
            >
              <TextField
                type={"text"}
                value={searched_lastname}
                onChange={(event) => {
                  set_searched_lastname(event.target.value);
                }}
                label="نام خانوادگی"
                placeholder="مثال: محمدی"
              />
            </FormControl>
          </Grid>
          <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
            <MuiButton
              variant="contained"
              onClick={onSearchClick}
              sx={{ mt: 1, width: "100%" }}
              type="submit"
            >
              جست‌وجو
            </MuiButton>
          </Grid>
          <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
            <MuiButton
              variant="outlined"
              onClick={() => props.setPage(1)}
              sx={{ mt: 1, width: "100%" }}
              type="submit"
            >
              ثبت کاربر
            </MuiButton>
          </Grid>
        </Grid>
      </div>
      <div className="datatable-crud-demo">
        <div className="card">
          <DataTable
            ref={dt}
            header={header}
            value={records}
            responsiveLayout="scroll"
            stripedRows
            loading={loading}
            emptyMessage="هیچ کاربری موجود نیست"
            paginator
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            currentPageReportTemplate={`نمایش {first} تا {last} از ${recordsCount} کاربر`}
            rows={7}
          >
            <Column
              header="ردیف"
              body={(data, props) => <div>{props.rowIndex + 1}</div>}
              style={{ minWidth: "1rem" }}
            />
            {selectedColumns?.map((col) => {
              return (
                <Column
                  // sortable
                  body={
                    col.feature_name === "name_image_object" &&
                    representativeBodyTemplate
                  }
                  style={{ minWidth: "8rem" }}
                  bodyStyle={{ textAlign: "center", verticalAlign: "middle" }}
                  key={col.feature_name}
                  field={col.feature_name}
                  header={col.label}
                />
              );
            })}
            <Column
              body={actionBodyChangePassword}
              bodyStyle={{ textAlign: "center", verticalAlign: "middle" }}
              field="password"
              header="رمزعبور"
            />
            <Column
              body={actionBodyEdit}
              bodyStyle={{ textAlign: "center", verticalAlign: "middle" }}
              field="edit"
              header="ویرایش"
            />
          </DataTable>
          <Dialog
            visible={showPasswordDialog}
            style={{ direction: "rtl", width: "450px" }}
            header={"تغییر گذرواژه"}
            modal
            dismissableMask
            draggable={false}
            onHide={() => setShowPasswordDialog(false)}
          >
            <div className="user-reset-password" style={{ direction: "rtl" }}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  sx={{
                    mt: 1,
                  }}
                  id="user-reset-password"
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  label="گذرواژه جدید"
                  variant="outlined"
                  value={newPassword}
                />
              </FormControl>
            </div>
            <div
              className="user-confirm-reset-password"
              style={{ direction: "rtl" }}
            >
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  sx={{
                    mt: 1,
                  }}
                  id="user-confirm-reset-password"
                  type="password"
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                  label="تکرار گذرواژه"
                  variant="outlined"
                  value={newPasswordConfirm}
                />
              </FormControl>
            </div>

            <div className="submit-password-btn" style={{ direction: "rtl" }}>
              <MuiButton
                variant="contained"
                onClick={resetPass}
                sx={{ mt: 1 }}
                type="submit"
                // form-submit
              >
                تایید و ثبت
              </MuiButton>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
