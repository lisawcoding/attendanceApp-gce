import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useTranslation } from "react-i18next";
import "./App.scss";
import FaceCamera from "./components/FaceCamera/FaceCamera";
import Nav from "./components/Nav";
import Home from "./components/Home/Home";
import Punch from "./components/Front/Punch";
import FaceFind from "./components/FaceFind";
import SignUp from "./components/Landing/SignUp";
import Landing from "./components/Landing/Landing";
import AllEmployees from "./components/DashBoard/AllEmployees";
import EachEmployee from "./components/DashBoard/EachEmployee";
import CreateEmployee from "./components/DashBoard/CreateEmployee";
import User from "./components/DashBoard/User";
import NotFound from "./NotFund";

import { URLContext } from "../src/contexts/URLContext";
import { FunctionContext } from "../src/contexts/FunctionContext";
import { DataContext } from "../src/contexts/DataContext";

function App(props) {
     // const { loading, setLoading } = useContext(InitContext);
     const { t, i18n } = useTranslation();

     // const { loginURL, usersURL, reIssueTokenURL } = useContext(URLContext);
     // const { reIssueToken } = useContext(FunctionContext);
     // const { thisUser, setThisUser } = useContext(DataContext);

     // const getThisUser = () => {
     //      fetch(`${usersURL}/find`, {
     //           method: "POST",
     //           headers: {
     //                "Content-Type": "application/json",
     //                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
     //           },
     //      })
     //           .then((res) => res.json())
     //           .then((data) => {
     //                console.log(data);
     //                if (data.error) {
     //                     reIssueToken();
     //                } else {
     //                     setThisUser(data);
     //                }
     //           })
     //           .catch((err) => console.error(err));
     // };

     const DashBoardNav = ({ exact, path, component: Component, ...rest }) => {
          return (
               <Route
                    // exact
                    // path={path}
                    {...rest}
                    render={(routeProps) => (
                         <>
                              <Nav {...routeProps} />
                              <Component {...routeProps} />
                         </>
                    )}
               />
          );
     };

     return (
          <div className="App">
               {window.onload ? (
                    <div className="loader-wrapper">
                         <div className="loader"></div>
                    </div>
               ) : (
                    <Router>
                         {/* <Nav /> */}
                         <Switch>
                              <Route exact path="/" component={Landing} />
                              <Route exact path="/home" component={Home} />
                              <DashBoardNav exact path="/user" component={User} />
                              <DashBoardNav exact path="/employees" component={(props) => <AllEmployees {...props} />} />
                              <DashBoardNav exact path="/create_employee" component={(props) => <CreateEmployee {...props} />} />
                              <DashBoardNav exact path="/employees/:id" component={EachEmployee} />

                              {/* <Route exact path="/facecamera" component={FaceCamera} /> */}
                              <Route exact path="/punch" component={Punch} />
                              <Route exact path="/facefind" component={FaceFind} />
                              <Route path="" component={NotFound} />
                         </Switch>
                    </Router>
               )}
          </div>
     );
}

export default App;
