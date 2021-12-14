import React, { useState, useContext, useLayoutEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";

import { BiHome } from "react-icons/bi";
import { RiTeamLine, RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlineUserAdd, AiOutlinePushpin } from "react-icons/ai";
import "./Nav.scss";
import { FunctionContext } from "../contexts/FunctionContext";
import { DataContext } from "../contexts/DataContext";
import { HiUserCircle } from "react-icons/hi";

function Nav(props) {
     const { logout, fetchUser } = useContext(FunctionContext);
     const { thisUser, isLoading } = useContext(DataContext);
     const [ isPin, setIsPin ] = useState(false)
     const [isDropdown, setIsDropdown] = useState(false);

     useLayoutEffect(() => {
          fetchUser(props);
     }, []);

     const clickPinBtn = () => setIsPin(!isPin);
     const clickDropDown = () => setIsDropdown(!isDropdown)

     return (
          <>
               <div className="loader-wrapper" style={{ display: isLoading ? "flex" : "none" }}>
                    <div className="loader"></div>
               </div>
               <nav style={{ display: props.match.path === "/puch" && "none" }} className={isPin ? "pin" : ""}>
               <div className={ isDropdown ? "hamburger drop-down" : "hamburger"} onClick={clickDropDown}><span></span><span></span><span></span></div>
               <div className="link-div" onClick={clickDropDown}>
                    {/* <h2>{thisUser.name}</h2> */}
                    <AiOutlinePushpin onClick={clickPinBtn} className="pin-icon" />
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
                    <section className="link-div"  onClick={clickDropDown}>
                              <NavLink to="/user" className="user-link" activeClassName="nav-active">
                                   <HiUserCircle />
                                   <h2>my account</h2>
                              </NavLink>
                              <div className="user-link" onClick={() => logout(props)}>
                                   <RiLogoutBoxRLine/>
                                   <h2>logout</h2>
                              </div>
                    </section>
               )}
          </nav>
          </>

     );
}

export default withRouter(Nav);