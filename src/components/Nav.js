import React, { useState, useContext, useLayoutEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";

import { BiHome } from "react-icons/bi";
import { RiTeamLine, RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";
import "./Nav.scss";
import { FunctionContext } from "../contexts/FunctionContext";
import { DataContext } from "../contexts/DataContext";
import { HiUserCircle } from "react-icons/hi";

function Nav(props) {
     const { logout, fetchUser } = useContext(FunctionContext);
     const { thisUser } = useContext(DataContext);
     const [isUserDropdown, setIsUserDropdown] = useState(false);

     useLayoutEffect(() => {
          fetchUser(props);
     }, []);

     const clickUserIcon = () => setIsUserDropdown(!isUserDropdown);

     return (
          <nav style={{ display: props.match.path === "/puch" && "none" }}>
               <div className="link-div">
                    {/* <h2>{thisUser.name}</h2> */}
                    <NavLink exact to="/home" activeClassName="nav-active">
                         <BiHome />
                         <h2>home</h2>
                    </NavLink>
                    <NavLink exact to="/employees" activeClassName="nav-active">
                         <RiTeamLine />
                         <h2>show all employees</h2>
                         
                    </NavLink>
                    <NavLink exact to="/employees/create" activeClassName="nav-active">
                         <AiOutlineUserAdd />
                         <h2>create new employee</h2>
                    </NavLink>
               </div>
               {thisUser && (
                    <section className="link-div" onClick={clickUserIcon}>
                              <NavLink to="/user" className="user-link" activeClassName="nav-active">
                                   <HiUserCircle />
                                   <h2>my account</h2>
                              </NavLink>
                              <div className="user-link" onClick={() => logout(props)}>
                                   <RiLogoutBoxRLine/>
                                   <h2>logout</h2>
                              </div>
                         {/* <HiUserCircle />
                         <h2>{thisUser.name}</h2>
                         
                         <div className="user-dropdown" style={{ display: isUserDropdown ? "block" : "none" }}>
                              <NavLink to="/user" className="user-link" activeClassName="nav-active">
                                   my account
                              </NavLink>
                              <div className="user-link" onClick={() => logout(props)}>
                                   logout
                              </div>
                         </div> */}
                    </section>
               )}
          </nav>
     );
}

export default withRouter(Nav);