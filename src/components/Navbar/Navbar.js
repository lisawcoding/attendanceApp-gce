import React, { useState, useContext, useLayoutEffect } from "react";
import { withRouter } from "react-router-dom";
import { AiOutlinePushpin } from "react-icons/ai";
import { FunctionContext } from "../../contexts/FunctionContext";
import "./Navbar.scss";
import { AllEmployeesLink, CreateEmployeeLink, HomeLink, LogoutLink, UserLink } from "../Common/IconLinks";

function Navbar(props) {
     const { fetchUser } = useContext(FunctionContext);
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
                    <HomeLink/>
                    <AllEmployeesLink/>
                    <CreateEmployeeLink/>
                    <UserLink/>
                    <LogoutLink/>
               </div>
          </nav>
     );
}

export default withRouter(Navbar);