import React, { useState, useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";

import { BiHome } from "react-icons/bi";
import { RiTeamLine } from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";
import "../styles/Nav.scss";
import { useLayoutEffect } from "react/cjs/react.development";
import { FunctionContext } from "../contexts/FunctionContext";
import { URLContext } from "../contexts/URLContext";
import { DataContext } from "../contexts/DataContext";
import { HiUserCircle } from "react-icons/hi";

function Nav(props) {
     const { loginURL, usersURL, reIssueTokenURL, logoutURL } = useContext(URLContext);
     const { reIssueToken } = useContext(FunctionContext);
     const { thisUser, setThisUser } = useContext(DataContext);
     const [isUserDropdown, setIsUserDropdown] = useState(false);

     useLayoutEffect(() => {
          //get user information
          fetch(`${usersURL}/find`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    if (data.error) {
                         reIssueToken(props);
                    } else {
                         setThisUser(data);
                    }
               })
               .catch((err) => console.error(err));
     }, []);

     const clickUserIcon = () => setIsUserDropdown(!isUserDropdown);

     const clickLogoutBtn = () => {
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");

          fetch(logoutURL, {
               method: "DELETE",
          })
               .then((res) => res.json())
               .then((data) => console.log(data))
               .catch((err) => console.error(err));
          props.history.push("/");
     };

     return (
          <nav>
               <div className="link-div">
                    <NavLink exact to="/home" activeClassName="nav-active">
                         <BiHome />
                    </NavLink>
                    <NavLink exact to="/employees" activeClassName="nav-active">
                         <RiTeamLine />
                         all employees
                    </NavLink>
                    <NavLink exact to="/create_employee" activeClassName="nav-active">
                         <AiOutlineUserAdd />
                         create_employee
                    </NavLink>
               </div>

               {thisUser && (
                    <section className="user-div" onClick={clickUserIcon}>
                         <HiUserCircle />
                         {thisUser.name}

                         <div className="user-dropdown" style={{ display: isUserDropdown ? "block" : "none" }}>
                              <NavLink to="/user" className="user-link" activeClassName="nav-active">
                                   my account
                              </NavLink>
                              <div className="user-link" onClick={clickLogoutBtn}>
                                   logout
                              </div>
                         </div>
                    </section>
               )}

               {/* <NavLink exact to="/facecamera" activeClassName="nav-active">
                    faceCamera
               </NavLink>
               <NavLink exact to="/punch" activeClassName="nav-active">
                    Punch
               </NavLink>
               <NavLink exact to="/facefind" activeClassName="nav-active">
                    faceFind
               </NavLink> */}
          </nav>
     );
}

export default withRouter(Nav);
