import React, { useState, useContext, useLayoutEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import { RiTeamLine, RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlineUserAdd, AiOutlinePushpin } from "react-icons/ai";
import { HiUserCircle } from "react-icons/hi";
import { FunctionContext } from "../../contexts/FunctionContext";
import "./Navbar.scss";

function Navbar(props) {
     const { logout, fetchUser } = useContext(FunctionContext);
     const [ isPin, setIsPin ] = useState(false)
     const [isDropdown, setIsDropdown] = useState(false);

     useLayoutEffect(() => {
          fetchUser(props);
     }, []);

     const clickPinBtn = () => setIsPin(!isPin);
     const clickDropDown = () => setIsDropdown(!isDropdown)

     const pin = isPin ? "pin" : "";
     const dropDown = isDropdown ? "drop-down" : "";

     return (
          <nav style={{ display: props.match.path === "/puch" && "none" }} className={`${pin} ${dropDown}`}>
               <div className="hamburger" onClick={clickDropDown}><span></span><span></span><span></span></div>
               <div className="link-div" onClick={clickDropDown}>
                    <AiOutlinePushpin onClick={clickPinBtn} className="pin-icon" />
                    <NavLink exact to="/home" activeClassName="nav-active">
                         <div>
                              <BiHome />
                              <h2>home</h2>
                         </div>
                    </NavLink>
                    <NavLink exact to="/employees" activeClassName="nav-active">
                         <div>
                              <RiTeamLine />
                              <h2>show all employees</h2>
                         </div>
                    </NavLink>
                    <NavLink exact to="/employee/create" activeClassName="nav-active">
                         <div>
                              <AiOutlineUserAdd />
                              <h2>create new employee</h2>
                         </div>
                    </NavLink>
                    <NavLink to="/user" activeClassName="nav-active" className="icon-bottom user-icon">
                         <div>
                              <HiUserCircle />
                              <h2>my account</h2>
                         </div>
                    </NavLink>
                    <NavLink to="/" onClick={() => logout(props)}>
                         <div>
                              <RiLogoutBoxRLine/>
                              <h2>logout</h2>
                         </div>
                    </NavLink>
               </div>
          </nav>
     );
}

export default withRouter(Navbar);