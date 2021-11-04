import { useLayoutEffect, useContext, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";

import logo from "../../images/logo.png";
// import "../Home/Home.scss";
import dashboard from "../../images/dashboard.png";
import clockIn from "../../images/clockIn.png";
import "./Home.scss";
import { DataContext } from "../../contexts/DataContext";

function Home(props) {
     const { thisUser, setThisUser } = useContext(DataContext);
     return (
          <main id="Home">
               <section className="top">
                    <img src={logo} alt="logo" />
                    <h1>Hello {thisUser.name}</h1>
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
                         <NavLink exact to="/punch" activeClassName="nav-active">
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
