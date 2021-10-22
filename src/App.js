import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useTranslation } from "react-i18next";
import "./App.scss";
import FaceCamera from "./components/FaceCamera/FaceCamera";
import Nav from "./components/Nav";
import Home from "./components/Home/Home";
import Punch from "./components/Punch";
import FaceFind from "./components/FaceFind";
import SignUp from "./components/Landing/SignUp";
import Landing from "./components/Landing/Landing";
import AllEmployees from "./components/DashBoard/AllEmployees";
import EachEmployee from "./components/DashBoard/EachEmployee";
import CreateEmployee from "./components/DashBoard/CreateEmployee";

function App(props) {
     // const { loading, setLoading } = useContext(InitContext);
     const { t, i18n } = useTranslation();

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
                              <DashBoardNav exact path="/employees" component={(props) => <AllEmployees {...props} />} />
                              <DashBoardNav exact path="/create_employee" component={(props) => <CreateEmployee {...props} />} />
                              <DashBoardNav exact path="/employees/:id" component={EachEmployee} />
                              <Route exact path="/facecamera" component={FaceCamera} />
                              <Route exact path="/punch" component={Punch} />
                              <Route exact path="/facefind" component={FaceFind} />
                         </Switch>
                    </Router>
               )}
          </div>
     );
}

export default App;
