import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
import dashboard from "../../images/dashboard.png";
import clork from "../../images/clork.png";
import "./Home.scss";
import { LogoutLink } from "../Common/IconLinks";

function Home() {
     
     
     return (
          <main id="Home">
               <section className="top">
                    <div className="right-div">
                         <img src={logo} alt="logo" />
                         <h2>Hello</h2>
                    </div>
                    <LogoutLink />
               </section>
               <section className="main">
                    <div className="clockIn" style={{backgroundImage: `url(${clork})`}}>
                         <NavLink exact to="/punch" activeClassName="nav-active" title="employees' clock in/out Plateform">
                              go to clockIn desk
                         </NavLink>
                    </div>
                    <div className="dashboard" style={{backgroundImage: `url(${dashboard})`}} title="employeer's dashboard" >
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