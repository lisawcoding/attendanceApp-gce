import React, { useState, useContext, useLayoutEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";

import { BiHome } from "react-icons/bi";
import { RiTeamLine } from "react-icons/ri";
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
                    <NavLink exact to="/home" activeClassName="nav-active">
                         <BiHome />
                    </NavLink>
                    <NavLink exact to="/employees" activeClassName="nav-active">
                         <RiTeamLine />
                         all employees
                    </NavLink>
                    <NavLink exact to="/employees/create" activeClassName="nav-active">
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
          </nav>
     );
}

export default withRouter(Nav);