import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Punch from "./components/FrontDesk/Punch";
import Landing from "./components/Landing/Landing";
import AllEmployees from "./components/DashBoard/AllEmployees";
import EmployeeProfile from "./components/DashBoard/EmployeeProfile";
import CreateEmployee from "./components/DashBoard/CreateEmployee";
import User from "./components/DashBoard/User";
import EmployeeRecords from "./components/DashBoard/EmployeeRecords/EmployeeRecords";
import NotFound from "./components/Common/NotFound";


function App(props) {
     const DashBoardNav = ({ exact, path, component: Component, ...rest }) => {
          return (
               <Route
                    // exact
                    // path={path}
                    {...rest}
                    render={(routeProps) => (
                         <>
                              <Navbar {...routeProps} />
                              <Component {...routeProps} />
                         </>
                    )}
               />
          );
     };

     return (
          <div className="App">
               <Router>
                    <Switch>
                         <Route exact path="/" component={Landing} />
                         <Route exact path="/home" component={Home} />
                         <DashBoardNav exact path="/user" component={User} />
                         <DashBoardNav exact path="/employees" component={(props) => <AllEmployees {...props} />} />
                         <DashBoardNav exact path="/employee/create" component={(props) => <CreateEmployee {...props} />} />
                         <DashBoardNav exact path="/employee/profile/:id" component={EmployeeProfile} />
                         <DashBoardNav exact path="/employee/records/:id" component={EmployeeRecords} />
                         <Route exact path="/punch" component={Punch} />
                         <Route path="" component={NotFound} />
                    </Switch>
               </Router>
          </div>
     );
}

export default App;