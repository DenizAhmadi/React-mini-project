import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import AuthContainer from "./Containers/AuthContainer";
import AppBar from "./Components/Appbar/ResponsiveAppBar";
import { withRouter } from "react-router";
import "bootstrap-icons/font/bootstrap-icons.css";
import UsersManagement from "./Components/Tabs/UsersManagement/UsersManagement";
const tabIndexToName = {
  1: "UsersManagement",
};
const tabNametoIndex = {
  UsersManagement: 1,
};

const App = (props) => {
  const [dir, setDir] = useState("rtl");
  const { location } = props;
  const [selectedTab, setSelectedTab] = useState(
    tabNametoIndex[location.pathname.split("/")[2]]
      ? tabNametoIndex[location.pathname.split("/")[2]]
      : 1
  );

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <div dir={dir} className="SEPANTA">
      {!localStorage.getItem("user_token") && <Redirect to="/login/" />}
      <ToastContainer
        rtl
        position="top-left"
        newestOnTop={true}
        pauseOnFocusLoss
        draggable
      />
      {!location.pathname.match(/login/) && (
        <AppBar
          handleTabChange={handleTabChange}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      )}
      <Switch>
        <Route exact path="/">
          {!localStorage.getItem("user_token") ? (
            // <Redirect to="/login/" />
            <Redirect to="/home/UsersManagement/" />
          ) : (
            <Redirect to="/home/UsersManagement/" />
          )}
        </Route>

        <Route exact path="/login/" component={AuthContainer} />
        <Route
          exact
          path="/home/UsersManagement/"
          component={UsersManagement}
        />

      </Switch>
    </div>
  );
};

export default withRouter(App);
