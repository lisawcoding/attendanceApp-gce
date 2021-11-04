import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";

import { BiHome } from "react-icons/bi";
import { RiTeamLine } from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";
import "../styles/Nav.scss";
// import { useLayoutEffect } from "react/cjs/react.development";
import { FunctionContext } from "../contexts/FunctionContext";
import { URLContext } from "../contexts/URLContext";
import { DataContext } from "../contexts/DataContext";
import { HiUserCircle } from "react-icons/hi";

function Nav(props) {
     const { loginURL, usersURL, reIssueTokenURL, logoutURL, getUserURL } = useContext(URLContext);
     const { reIssueToken, logout } = useContext(FunctionContext);
     const { thisUser, setThisUser, allEmployees, setAllemployees } = useContext(DataContext);
     const [isUserDropdown, setIsUserDropdown] = useState(false);
     const [isReIssueToken, setIsReIssueToken] = useState(false);
     const [isLoading, setIsLoading] = useState(true);

     useLayoutEffect(() => {
          const runFetch = (next) => {
               fetch(getUserURL, {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                         refreshToken: `Bearer ${sessionStorage.getItem("accessToken")}`,
                    },
               })
                    .then((res) => res.json())
                    .then(async (data) => {
                         console.log(data);
                         if (data.error) {
                              await reIssueToken(props);
                              runFetch();
                              return;
                         } else {
                              delete data.password;
                              setThisUser(data);
                              console.log(data.employees);
                              setIsLoading(false);
                         }
                    })
                    .catch((err) => console.error(err));
          };
          runFetch();
     }, []);

     const clickUserIcon = () => setIsUserDropdown(!isUserDropdown);

     return (
          <nav>
               {isLoading && (
                    <div className="loader-wrapper">
                         <div className="loader"></div>
                    </div>
               )}
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
                              <div className="user-link" onClick={() => logout(props)}>
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
