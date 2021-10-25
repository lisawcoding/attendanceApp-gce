import { useLayoutEffect, useContext, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";

import logo from "../../images/logo.png";
// import "../Home/Home.scss";
import dashboard from "../../images/dashboard.png";
import clockIn from "../../images/clockIn.png";
import "./Home.scss";
import { FunctionContext } from "../../contexts/FunctionContext";
import { URLContext } from "../../contexts/URLContext";
import { DataContext } from "../../contexts/DataContext";

function Home(props) {
     return (
          <main id="Home">
               <section className="top">
                    <img src={logo} alt="logo" />
               </section>
               <section className="main">
                    <div className="dashboard">
                         <img src={dashboard} alt="dashboard" />
                         <NavLink exact to="/employees" activeClassName="nav-active">
                              go to dashboard
                         </NavLink>
                    </div>
                    <div className="clockIn">
                         <img src={clockIn} alt="clorckIn" />
                         <NavLink exact to="/facecamera" activeClassName="nav-active">
                              go to clockIn desk
                         </NavLink>
                    </div>
               </section>
               <section className="bottom">
                    <p>Copyright © 2010-2021 tolisacoding All rights reserved.</p>
               </section>
          </main>
     );
}

export default Home;
