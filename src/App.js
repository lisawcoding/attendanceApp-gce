import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.scss";
import Nav from "./components/Nav";
import Home from "./components/Home/Home";
import Punch from "./components/Front/Punch";
import Landing from "./components/Landing/Landing";
import AllEmployees from "./components/DashBoard/AllEmployees";
import EachEmployee from "./components/DashBoard/EachEmployee";
import CreateEmployee from "./components/DashBoard/CreateEmployee";
import User from "./components/DashBoard/User";
import Records from "./components/DashBoard/Records";
import NotFound from "./NotFund";


function App(props) {
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
                         <Switch>
                              <Route exact path="/" component={Landing} />
                              <Route exact path="/home" component={Home} />
                              <DashBoardNav exact path="/user" component={User} />
                              <DashBoardNav exact path="/employees" component={(props) => <AllEmployees {...props} />} />
                              <DashBoardNav exact path="/employees/create" component={(props) => <CreateEmployee {...props} />} />
                              <DashBoardNav exact path="/employees/edit/:id" component={EachEmployee} />
                              <DashBoardNav exact path="/employees/edit/:id/records" component={Records} />
                              <Route exact path="/punch" component={Punch} />
                              <Route path="" component={NotFound} />
                         </Switch>
                    </Router>
               )}
          </div>
     );
}

export default App;