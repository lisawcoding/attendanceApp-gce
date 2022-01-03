import { useContext } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../images/logo.png";
import dashboard from "../../images/dashboard.png";
import "./Home.scss";
import { DataContext } from "../../contexts/DataContext";
import Logout from "../Common/Logout";

function Home(props) {
     const { thisUser } = useContext(DataContext);
     
     return (
          <main id="Home">
               <section className="top">
                    <div className="right-div">
                         <img src={logo} alt="logo" />
                         <h2>Hello {thisUser.name}</h2>
                    </div>
                    <Logout props={props} />
               </section>
               <section className="main">
                    <div className="clockIn" style={{backgroundImage: `url(${dashboard})`}}>
                         <NavLink exact to="/punch" activeClassName="nav-active">
                              go to clockIn desk
                         </NavLink>
                    </div>
                    <div className="dashboard" style={{backgroundImage: `url(${dashboard})`}}>
                         <NavLink exact to="/employees" activeClassName="nav-active">
                              go to dashboard
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